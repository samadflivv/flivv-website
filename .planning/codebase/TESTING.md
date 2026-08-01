# Testing Patterns

**Analysis Date:** 2026-08-01

## Current State: No Tests Exist

There is **no test infrastructure** in this repository:

- **No test runner** — no `jest`, `vitest`, `mocha`, `playwright`, or `cypress` in `package.json` (`package.json` scripts are only `dev`, `build`, `start`, `lint`).
- **No test config** — no `jest.config.*`, `vitest.config.*`, `playwright.config.*`, or `cypress.config.*` at the repo root.
- **No test files** — zero `*.test.*` / `*.spec.*` files in `src/`, `pages/`, or `lib/` (the only matches are inside `node_modules/`).
- **No coverage tooling** — no `nyc`, `c8`, `istanbul`, or `@vitest/coverage-*` dependency.
- **CI runs no tests** — `.github/workflows/deploy.yml` runs `git pull → npm install → npm run build → pm2 restart` only; there is no test/lint job.
- **`npm run lint` is broken** — `next lint` was removed in Next.js 15.2+ and `eslint` is not installed; the script cannot currently gate anything.

The most unit-testable code today, in priority order:

| Code | File | What to test |
|------|------|--------------|
| Event data layer | `src/lib/events.js` | `readEvents`/`writeEvents` against a temp `data/events.json`; first-run file creation; corrupt JSON fallback to `[]` |
| Class-name utility | `src/lib/utils.js` | `cn()` merging (clsx + tailwind-merge conflict resolution) |
| Date helpers (extractable) | `src/components/EventCalendar.jsx` | `formatDateForInput`, `getCurrentDateTime` (currently module-private — would need extraction) |
| API route handlers | `src/app/api/events/route.js`, `src/app/api/events/[id]/route.js` | GET filtering of past events + sort; POST validation (missing field 400, past date 400, valid 201); PUT 404; DELETE 404/success |
| SWR fetchers | `src/components/GVProgressRoadmap.jsx` etc. | `gvizFetcher` GViz JSON extraction from wrapped `google.visualization.Query` text |
| Legacy proxy | `pages/api/meta-events.js` | method guard 405; SHA-256 email hashing before outbound call |

## Recommended Test Framework (Prescription)

The project is plain JavaScript + React 18 + Next.js 15 App Router. Recommended setup:

- **Runner/assertion:** Vitest (fast, zero-config for ESM/JSX, works with `jsconfig.json` path aliases). Add `vitest` + `@vitejs/plugin-react` to `devDependencies`.
- **Component testing:** `@testing-library/react` + `@testing-library/jest-dom` + `jsdom` environment.
- **API/data-layer tests:** Vitest `node` environment (no DOM needed) for `src/lib/events.js` and `src/app/api/events/*`.
- **Path alias config** in `vitest.config.js` (mirrors `jsconfig.json`):
```js
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    globals: true,
  },
})
```
- **Scripts to add** to `package.json`:
```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

**Run Commands (once configured):**
```bash
npm run test          # Run all tests once
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Test File Organization (Prescription)

Follow the co-located convention (`__tests__` is absent from the codebase, so co-location is the natural fit):

```
src/lib/__tests__/events.test.js        # data layer (node env)
src/lib/utils.test.js                   # cn() util (co-located)
src/app/api/events/route.test.js        # GET/POST handler
src/app/api/events/[id]/route.test.js   # PUT/DELETE handler
src/components/__tests__/EventCard.test.jsx
src/components/__tests__/button.test.jsx
```

Naming: `*.test.js` for pure logic, `*.test.jsx` for components. Group suites with `describe` per function/behavior.

## Test Structure Patterns (Prescription)

**Pure logic — `src/lib/utils.js` (the `cn` helper, currently untested):**
```js
import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('joins truthy class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('drops falsy values', () => {
    expect(cn('a', null, false, undefined, 'b')).toBe('a b')
  })

  it('tailwind-merge resolves conflicts (later wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})
```

**Data layer — `src/lib/events.js` (fs-dependent, use a temp data dir):**
```js
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock the module-level `eventsFilePath` by mocking `fs` before import,
// or refactor events.js to accept a path. With `fs` mocked:
vi.mock('fs', () => ({
  existsSync: vi.fn(() => true),
  readFileSync: vi.fn(() => '[]'),
  writeFileSync: vi.fn(),
  mkdirSync: vi.fn(),
  dirname: vi.fn(() => '/tmp'),
}))

import { readEvents, writeEvents } from '@/lib/events'

describe('readEvents', () => {
  it('returns [] when the file does not exist (creates it)', () => {
    // existsSync → false; expect readEvents() to be [] and writeFileSync called
  })

  it('parses valid JSON', () => {
    // readFileSync → '[{"id":"evt-1"}]'; expect readEvents() to equal that array
  })

  it('returns [] and logs on corrupt JSON', () => {
    // readFileSync → 'not-json'; expect readEvents() to be [] (console.error spy)
  })
})
```
Note: `src/lib/events.js` hardcodes `path.join(process.cwd(), 'data', 'events.json')` and performs synchronous fs calls — mock `fs` or use `vi.mock('node:fs')` rather than touching the real `data/events.json`.

**API route handler — `src/app/api/events/route.js`:**
```js
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/events', () => ({
  readEvents: vi.fn(() => []),
  writeEvents: vi.fn(() => true),
}))

import { GET, POST } from '@/app/api/events/route'

describe('GET /api/events', () => {
  it('returns 200 with only upcoming events, sorted by start', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(Array.isArray(body)).toBe(true)
  })
})

describe('POST /api/events', () => {
  it('rejects a missing required field with 400', async () => {
    const req = { json: async () => ({ title: 'X' }) } // missing description, start, ...
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('rejects a past start date with 400', async () => {
    const req = { json: async () => ({ ...validFields, start: '2020-01-01T00:00:00Z' }) }
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
```

**Component — `src/components/EventCard.jsx` (client component, requires jsdom + mocks for next/navigation if used):**
```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EventCard from '@/components/EventCard'

const event = {
  id: 'evt-1',
  title: 'Hyderabad Sales Meet',
  description: 'Premium investment options',
  start: '2026-09-01T10:00:00Z',
  country: 'India',
  city: 'Hyderabad',
  venue: 'Hyatt Place',
  type: 'SalesSession',
  capacity: 50,
}

describe('EventCard', () => {
  it('renders title, venue and formatted date', () => {
    render(<EventCard event={event} onClick={vi.fn()} />)
    expect(screen.getByText('Hyderabad Sales Meet')).toBeInTheDocument()
    expect(screen.getByText(/Hyatt Place/)).toBeInTheDocument()
  })

  it('fires onClick on Enter key (a11y)', async () => {
    const onClick = vi.fn()
    render(<EventCard event={event} onClick={onClick} />)
    await userEvent.keyboard('{Enter}') // or fireEvent on the card
    expect(onClick).toHaveBeenCalled()
  })
})
```
Caveat: `EventCard.jsx` imports `react-country-flag` and calls `parseISO` at render — both work under jsdom; `framer-motion` renders fine in jsdom. `navigator.share`/`clipboard` calls in `handleShare` need `vi.stubGlobal('navigator', { share: vi.fn(), clipboard: { writeText: vi.fn() } })` only if that path is exercised.

## Mocking (Prescription)

**Framework:** `vi` (Vitest) — `vi.mock()`, `vi.fn()`, `vi.stubGlobal()`.

**What to mock:**
- `fs` (`node:fs`) for anything touching `src/lib/events.js` — never read/write real `data/events.json` in tests.
- `fetch` for components that call the events API (`EventCalendar.jsx`) — stub `global.fetch` with `vi.fn()` returning `{ ok: true, json: async () => [] }`.
- `next/navigation` hooks (`useRouter`, `useSearchParams`, `usePathname`) in component tests — `vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }), useSearchParams: () => new URLSearchParams(), usePathname: () => '/' }))`.
- Browser APIs used at module/effect time: `IntersectionObserver` (`useScrollSpy.js`, `Herosection.jsx`), `window.matchMedia` (`usePrefersReducedMotion.js`), `sessionStorage` (`PopupModal.jsx`).

**What NOT to mock:**
- `cn()` / `clsx` / `tailwind-merge` — test them for real (they are pure).
- `date-fns` helpers — test real behavior; only freeze time via `vi.useFakeTimers()` + `vi.setSystemTime(new Date('2026-08-01T12:00:00Z'))` when asserting past/upcoming logic in `src/app/api/events/route.js`.
- GSAP/framer-motion render paths — let `framer-motion` render; mock `gsap` (`vi.mock('gsap')`) only if a component is unit-tested and gsap calls would need DOM layout.

## Fixtures and Factories (Prescription)

**Test Data:** Define a canonical `event` fixture object (see the `event` const above) in a shared helper, e.g. `src/components/__tests__/fixtures.js` or `test/fixtures/events.js`, and spread/override per test:
```js
export const eventFixture = {
  id: 'evt-1', title: 'Sample Meet', description: 'desc', start: '2026-09-01T10:00:00Z',
  country: 'SA', countryLabel: 'KSA', city: 'Riyadh', venue: 'Venue', type: 'SalesSession',
  capacity: 50, tags: [], rsvpUrl: '', organizer: 'Flivv',
}
export const makeEvent = (overrides = {}) => ({ ...eventFixture, ...overrides })
```
**Location:** `test/fixtures/` at repo root (no existing fixtures directory).

## Coverage

**Requirements:** None enforced today (no tooling). Recommended target once Vitest is added:
```bash
npm run test:coverage
```
Set a low baseline to start (e.g. lines/statements 50%) — the highest-value targets are `src/lib/events.js`, `src/lib/utils.js`, and both `src/app/api/events/*` route handlers, which together hold all business logic.

## Test Types

**Unit Tests:**
- `src/lib/utils.js` — `cn()` merging.
- `src/lib/events.js` — file read/write with mocked `fs`.
- `src/components/EventCalendar.jsx` — extract `formatDateForInput`/`getCurrentDateTime` first (currently module-private, no `export`), then unit test them.

**Integration Tests:**
- `src/app/api/events/route.js` GET/POST and `src/app/api/events/[id]/route.js` PUT/DELETE — invoke exported handlers with mock `Request` objects, no HTTP server needed.
- `pages/api/meta-events.js` — call `handler(req, res)` with a mock `res` (`{ status: vi.fn().mockReturnThis(), json: vi.fn() }`), mock `axios.post` via `vi.mock('axios')`, assert 405 guard and hashed `user_data.em` (SHA-256 hex of email).

**E2E Tests:**
- Not used. If added later, Playwright against `npm run dev` covering the home page, `/salesmeets` calendar flow, and one project landing page — but this is not the current gap; unit/integration coverage of the event API and data layer matters first.

## Common Patterns to Follow

**Async Testing:**
```js
it('fetches and filters events', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true, json: async () => [makeEvent(), makeEvent({ start: '2020-01-01T00:00:00Z' })],
  }))
  // render EventCalendar, await findByText(...)
})
```
Use `await screen.findBy*` (waitFor under the hood) whenever state updates after `useEffect`/fetch.

**Error Testing:**
```js
it('returns 500 JSON on read failure', async () => {
  vi.mocked(readEvents).mockImplementation(() => { throw new Error('boom') })
  const res = await GET()
  expect(res.status).toBe(500)
  expect((await res.json()).error).toBe('Failed to fetch events')
})
```
Matches the existing catch-block shape in `src/app/api/events/route.js`.

**Time-dependent logic:** `src/app/api/events/route.js` GET filters `isPast(parseISO(event.start))` and POST rejects past dates — always pin the clock with `vi.useFakeTimers()` + `vi.setSystemTime()` in those suites.

---

*Testing analysis: 2026-08-01*
