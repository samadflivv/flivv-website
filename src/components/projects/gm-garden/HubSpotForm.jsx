'use client';

import { useEffect, useId, useRef } from 'react';

// Reusable HubSpot "no-code embed" form.
// This script (js-na2.hsforms.net/forms/embed/...) does NOT expose a window.hbspt.forms.create
// API. It works by scanning the page for a div with class "hs-form-frame" and the
// data-portal-id / data-form-id / data-region attributes, then rendering the form into it,
// exactly as HubSpot's own embed snippet shows. The frame div must exist in the DOM before
// (or at the same time as) the script runs, and must keep those exact data attributes.
export default function HubSpotForm({ portalId, region, formId, scriptUrl }) {
  const reactId = useId();
  const scriptIdRef = useRef(`hs-embed-script-${scriptUrl}`.replace(/[^a-zA-Z0-9-_]/g, ''));

  useEffect(() => {
    if (!portalId || !formId || !scriptUrl) return undefined;

    const existing = document.getElementById(scriptIdRef.current);
    if (existing) return undefined;

    const script = document.createElement('script');
    script.id = scriptIdRef.current;
    script.src = scriptUrl;
    script.defer = true;
    script.addEventListener('error', () => {
      console.error('HubSpot embed script failed to load:', scriptUrl);
    });
    document.body.appendChild(script);

    // The embed script is left in place for the page's lifetime (as HubSpot's own snippet
    // does) since it can serve more than one hs-form-frame and HubSpot does not document a
    // teardown call.
    return undefined;
  }, [portalId, formId, scriptUrl]);

  if (!portalId || !formId || !region) return null;

  return (
    <div
      key={`${portalId}-${formId}-${reactId}`}
      className="hs-form-frame min-h-[420px] w-full overflow-x-hidden"
      data-region={region}
      data-form-id={formId}
      data-portal-id={portalId}
    />
  );
}
