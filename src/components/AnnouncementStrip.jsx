"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";

/**
 * AnnouncementStrip
 * ----------------------------------------------------------------------------
 * Reusable, premium announcement bar:
 *   - a continuous, seamless right-to-left marquee of promo copy
 *   - a CTA button pinned to the right that never breaks the animation
 *   - clicking the CTA opens a responsive modal containing a HubSpot form
 *
 * Used on the Home page (`/`) and the Gulmohar Homes page (`/gulmoharhomes`)
 * so the markup/animation/HubSpot wiring lives in exactly one place.
 *
 * HubSpot notes:
 *   This is HubSpot's "no-code embed" (portal 21626983, region na2). That
 *   script does NOT expose `window.hbspt.forms.create`; it scans the page for
 *   `div.hs-form-frame` carrying data-portal-id / data-form-id / data-region and
 *   renders into it. So the frame div must exist in the DOM when the script
 *   runs — we therefore mount the frame on first open and load the embed script
 *   immediately after. The frame is kept mounted on close (hidden with CSS) so
 *   re-opening doesn't hand HubSpot an empty, already-scanned div.
 *   Same approach the site already uses in NSHomes.jsx / NSH20LandingPage.jsx.
 */

const STRIP_TEXT =
  "We're hosting our Final Gulmohar Homes Sales Meet on 01 Nov 2026. Unlock never-before discounts \u2014 Book your visit now!";
const CTA_LABEL = "RSVP Now";
const MODAL_TITLE = "Book your site visit";

const HUBSPOT = {
  portalId: "21626983",
  formId: "6450d9aa-617b-413b-93b4-9aa7f5450ed6",
  region: "na2",
  scriptUrl: "https://js-na2.hsforms.net/forms/embed/21626983.js",
  scriptId: "flivv-announcement-hubspot-embed",
};

// Copies of the message per marquee group. The group must stay wider than the
// viewport so the duplicated-track loop (translateX(-50%)) is seamless on
// ultrawide screens as well as phones.
const REPEATS_PER_GROUP = 12;
const MARQUEE_DURATION = "90s"; // long + slow = premium, and constant for any width

const AnnouncementStrip = ({
  text = STRIP_TEXT,
  ctaLabel = CTA_LABEL,
  portalId = HUBSPOT.portalId,
  formId = HUBSPOT.formId,
  region = HUBSPOT.region,
  scriptUrl = HUBSPOT.scriptUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Flips true on the first open and stays true: keeps the HubSpot frame (and
  // its rendered form) in the DOM so reopening is instant.
  const [hasOpened, setHasOpened] = useState(false);
  const modalRef = useRef(null);

  const openModal = useCallback(() => {
    setHasOpened(true);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeModal]);

  /* Lock background scroll while the modal is open */
  useEffect(() => {
    if (!isOpen) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  /* Move focus into the dialog on open, return it to the trigger on close */
  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.activeElement;
    const raf = requestAnimationFrame(() => {
      modalRef.current?.focus();
    });
    return () => {
      cancelAnimationFrame(raf);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [isOpen]);

  /* Load the HubSpot no-code embed script once the frame is on the page */
  useEffect(() => {
    if (!hasOpened || !scriptUrl) return undefined;
    if (document.getElementById(HUBSPOT.scriptId)) return undefined;

    const script = document.createElement("script");
    script.id = HUBSPOT.scriptId;
    script.src = scriptUrl;
    script.defer = true;
    script.addEventListener("error", () => {
      console.error("HubSpot embed script failed to load:", scriptUrl);
    });
    document.body.appendChild(script);
    return undefined;
  }, [hasOpened, scriptUrl]);

  return (
    <>
      <style>{`
        @keyframes flivv-ann-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .flivv-ann-viewport {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0, #000 7%, #000 87%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 7%, #000 87%, transparent 100%);
        }
        .flivv-ann-track {
          display: flex;
          width: max-content;
          flex-wrap: nowrap;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          animation: flivv-ann-scroll ${MARQUEE_DURATION} linear infinite;
        }
        @media (hover: hover) and (pointer: fine) {
          .flivv-ann-viewport:hover .flivv-ann-track { animation-play-state: paused; }
        }
        @media (prefers-reduced-motion: reduce) {
          .flivv-ann-track { animation: none; }
          .flivv-ann-clone { display: none; }
        }
      `}</style>

      {/* ---------------------------- announcement bar ---------------------------- */}
      <div
        className="relative z-[60] w-full border-b border-white/15 bg-[linear-gradient(90deg,#015f8f_0%,#0192D3_52%,#00a9e6_100%)] text-white shadow-[0_2px_14px_rgba(1,63,94,0.28)]"
        role="region"
        aria-label="Announcement"
      >
        <div className="mx-auto flex h-11 w-full items-center gap-4 pl-3 pr-2 sm:h-12 sm:gap-7 sm:pl-5 sm:pr-3 md:pl-6 md:pr-4">
          {/* marquee */}
          <div className="flivv-ann-viewport relative min-w-0 flex-1">
            <span className="sr-only">{text}</span>
            <div className="flivv-ann-track" aria-hidden="true">
              {[0, 1].map((group) => (
                <div
                  key={group}
                  className={group === 1 ? "flivv-ann-clone flex shrink-0 items-center" : "flex shrink-0 items-center"}
                >
                  {Array.from({ length: REPEATS_PER_GROUP }).map((_, index) => (
                    <span
                      key={index}
                      className="flex shrink-0 items-center whitespace-nowrap text-[11.5px] font-medium leading-none tracking-[0.03em] sm:text-[15px]"
                    >
                      <span>{text}</span>
                      <span
                        className="mx-3 text-white/45 sm:mx-5"
                        aria-hidden="true"
                      >
                        &#9679;
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* CTA — outside the animated track, so it stays put and clickable */}
          <div className="flex shrink-0 items-center">
            <span className="mr-2 hidden h-6 w-px bg-white/25 sm:mr-3 sm:block" aria-hidden="true" />
            <button
              type="button"
              onClick={openModal}
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11.5px] font-semibold text-[#01689b] shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-[#eaf7ff] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0192D3] sm:gap-2 sm:px-4 sm:py-2 sm:text-[13px]"
              aria-haspopup="dialog"
            >
              {ctaLabel}
              <ArrowRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------- modal -------------------------------- */}
      {hasOpened && (
        <div
          className={`fixed inset-0 z-[100] items-center justify-center p-3 sm:p-6 ${
            isOpen ? "flex" : "hidden"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={MODAL_TITLE}
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={closeModal}
            className="absolute inset-0 h-full w-full cursor-default bg-[#04131d]/70 backdrop-blur-sm"
            tabIndex={-1}
          />

          {/* panel */}
          <div
            ref={modalRef}
            tabIndex={-1}
            className="relative flex max-h-[92dvh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_24px_70px_rgba(4,19,29,0.45)] outline-none"
          >
            {/* header */}
            <div className="relative shrink-0 bg-[linear-gradient(135deg,#015f8f_0%,#0192D3_70%)] px-5 pb-5 pt-6 text-white sm:px-7 sm:pb-6 sm:pt-7">
              <div
                className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full bg-white/10"
                aria-hidden="true"
              />
              <h2 className="pr-10 text-[19px] font-semibold leading-snug sm:text-[22px]">
                {MODAL_TITLE}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-200 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:top-4"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* body — scrolls internally on short screens */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white px-5 py-5 sm:px-7 sm:py-6">
              <div className="hs-form-frame min-h-[360px] w-full" data-region={region} data-form-id={formId} data-portal-id={portalId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementStrip;
