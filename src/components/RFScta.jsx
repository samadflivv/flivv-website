"use client";

import React, { useState } from "react";

export default function RFScta() {
  // Replace with your HubSpot details
  const PORTAL_ID = "21626983";
  const FORM_ID = "fe48d8bb-c0aa-41d3-8f45-a54c78e57d79";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    howDidYouFind: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name required";
    if (!form.email.trim()) err.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Invalid email";
    if (form.phone && !/^\+?[\d\s()-]{6,20}$/.test(form.phone)) err.phone = "Invalid phone";
    return err;
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const submitToHubspot = async (values) => {
    const fields = [
      { name: "firstname", value: values.name },
      { name: "email", value: values.email },
      { name: "phone", value: values.phone },
      { name: "message", value: values.message },
      { name: "how_did_you_find", value: values.howDidYouFind },
    ];

    const cookieMatch =
      typeof document !== "undefined" && document.cookie.match(/hubspotutk=([^;]+)/);
    const hutk = cookieMatch ? cookieMatch[1] : "";

    const body = {
      fields,
      context: {
        hutk,
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: typeof document !== "undefined" ? document.title : "",
      },
    };

    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

    const maxAttempts = 3;
    let attempt = 0;
    let lastError = null;

    while (attempt < maxAttempts) {
      try {
        attempt++;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (res.ok) return { ok: true };

        const text = await res.text();
        lastError = new Error(`HTTP ${res.status}: ${text}`);

        if (res.status >= 500) {
          // retry
        } else {
          // 4xx - likely bad payload/field names: don't retry
          return { ok: false, error: `HubSpot responded: ${res.status} - ${text}` };
        }
      } catch (err) {
        lastError = err;
      }

      await sleep(300 * Math.pow(2, attempt - 1));
    }

    return { ok: false, error: lastError?.message || "Unknown error" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        howDidYouFind: form.howDidYouFind,
      };

      const result = await submitToHubspot(payload);

      if (result.ok) {
        setDone(true);
        setForm({ name: "", email: "", phone: "", message: "", howDidYouFind: "" });
        setTimeout(() => setDone(false), 4000);
      } else {
        console.error("HubSpot submit failed:", result.error);
        setErrorMsg("Submission failed. Please try again or email us at info@yourcompany.com.");
      }
    } catch (ex) {
      console.error("Submit error", ex);
      setErrorMsg("Submission failed. Please try again or email us at info@yourcompany.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* LEFT - Content */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-1 h-10 rounded-full" style={{ background: "#52B788" }} />
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">Contact</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-normal text-[#081C15] mb-4">
            Request a Visit
          </h2>

          <p className="text-gray-700 text-base md:text-lg max-w-lg">
            Choose a convenient date & time and we'll arrange a personalised tour. Fill the form and we'll respond quickly.
          </p>

        </div>

        {/* RIGHT - Form Card */}
        <div className="lg:col-span-7 flex justify-center">
          <div
            className="w-full max-w-2xl rounded-3xl overflow-hidden p-6 md:p-8 relative"
            style={{
              background: "linear-gradient(180deg,#081C15 0%, #0d3328 100%)",
              boxShadow: "20px 30px 60px rgba(8,28,21,0.22), -10px -10px 30px rgba(255,255,255,0.02)",
              borderRadius: 22,
            }}
          >
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-white">Let's arrange a visit</h3>
              <p className="text-sm text-[#d6efe3] mt-1">Tell us a preferred date/time and we'll confirm availability.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              {/* ROW 1: Name | Whatsapp */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="sr-only" htmlFor="name">Full name</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={`rfs-input w-full ${errors.name ? "rfs-input-error" : ""}`}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <div className="text-xs text-rose-300 mt-1">{errors.name}</div>}
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">WhatsApp</label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="WhatsApp number"
                    className={`rfs-input w-full ${errors.phone ? "rfs-input-error" : ""}`}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <div className="text-xs text-rose-300 mt-1">{errors.phone}</div>}
                </div>
              </div>

              {/* ROW 2: Email | How did you find us */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="sr-only" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`rfs-input w-full ${errors.email ? "rfs-input-error" : ""}`}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <div className="text-xs text-rose-300 mt-1">{errors.email}</div>}
                </div>

                <div>
                  <label className="sr-only" htmlFor="howDidYouFind">How did you find us</label>
                  <select
                    id="howDidYouFind"
                    name="howDidYouFind"
                    value={form.howDidYouFind}
                    onChange={handleChange}
                    className="rfs-input w-full appearance-none"
                    style={{
                      background: "#0d3328",
                      color: form.howDidYouFind ? "#e8f8f0" : "rgba(230,246,236,0.55)",
                    }}
                  >
                    <option value="" disabled>How did you find us?</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="google">Google search</option>
                    <option value="referral">Referral</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
              </div>

              {/* ROW 3: Message */}
              <div>
                <label className="sr-only" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="rfs-input rfs-textarea w-full"
                />
              </div>

              {/* submit */}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="submit"
                  className="rfs-submit inline-flex items-center gap-3 justify-center px-6 py-3 rounded-full font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                      <path d="M22 12a10 10 0 00-10-10" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  ) : null}
                  <span>{loading ? "Sending..." : "Request Visit"}</span>
                </button>

                <div className="ml-auto">
                  {done && <div className="text-sm text-green-200 font-medium">Thanks — we will contact you soon.</div>}
                </div>
              </div>

              {errorMsg && <div className="text-sm text-rose-300 mt-2">{errorMsg}</div>}
            </form>

            {/* bottom visual bar */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: 56,
                background: "linear-gradient(90deg, rgba(82,183,136,0.04), rgba(82,183,136,0.02))",
                pointerEvents: "none",
                borderBottomLeftRadius: 22,
                borderBottomRightRadius: 22,
              }}
            />
          </div>
        </div>
      </div>

      {/* styles */}
      <style jsx>{`
        .rfs-input {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          color: #e8f8f0;
          border: 1px solid rgba(255,255,255,0.03);
          box-shadow: inset 6px 6px 14px rgba(0,0,0,0.62), inset -6px -6px 12px rgba(255,255,255,0.02);
          padding: 0.85rem 1rem;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
        }
        .rfs-input::placeholder {
          color: rgba(230,246,236,0.55);
        }
        .rfs-input:focus {
          box-shadow: inset 6px 6px 14px rgba(0,0,0,0.68),
                      inset -6px -6px 12px rgba(255,255,255,0.02),
                      0 0 0 6px rgba(82,183,136,0.06);
          border-color: rgba(82,183,136,0.4);
        }
        /* Ensure select uses same dark background and arrow is visible */
        select.rfs-input {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.35) 50%),
                            linear-gradient(135deg, rgba(255,255,255,0.35) 50%, transparent 50%);
          background-position: calc(100% - 18px) calc(1em + 2px), calc(100% - 13px) calc(1em + 2px);
          background-size: 6px 6px, 6px 6px;
          background-repeat: no-repeat;
        }
        .rfs-textarea { min-height: 110px; border-radius: 12px; padding-top: 0.9rem; }
        .rfs-input-error {
          box-shadow: inset 6px 6px 14px rgba(0,0,0,0.6), inset -6px -6px 12px rgba(255,255,255,0.02);
          border: 1px solid rgba(255,0,50,0.25);
        }
        .rfs-submit {
          background: linear-gradient(180deg,#52B788,#2D6A4F);
          color: white;
          border: none;
          box-shadow: 0 12px 30px rgba(18,60,50,0.28), inset 0 -4px 8px rgba(0,0,0,0.12);
          transition: transform .12s ease, box-shadow .12s ease;
        }
        .rfs-submit:hover:not(:disabled) { transform: translateY(-3px); }
        .rfs-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        @media (max-width: 1023px) {
          .rfs-textarea { min-height: 90px; }
        }
      `}</style>
    </section>
  );
}