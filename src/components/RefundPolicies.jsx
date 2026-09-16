export default function RefundPolicies() {
  const tiers = [
    {
      heading: "Refunds below ₹5,00,000",
      note: "(Rupees Five Lakh)",
      duration: "1 month",
      description:
        "The refund shall be processed within one month from the date on which the refund becomes due.",
    },
    {
      heading: "Refunds from ₹5,00,000 to ₹20,00,000",
      note: "(Rupees Twenty Lakh)",
      duration: "2 months",
      description:
        "The refund shall be processed within two months from the date on which the refund becomes due.",
    },
    {
      heading: "Refunds above ₹20,00,000",
      note: "(Rupees Twenty Lakh)",
      duration: "3 months",
      description:
        "The refund shall be processed within three months from the date on which the refund becomes due.",
    },
  ];

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        // Reduced gradient from top:
        // Uses pixel values to keep the dark navy strictly at the top (for the navbar)
        // and fades to light blue quickly so the content area remains bright.
        backgroundImage:
          "linear-gradient(180deg, #0F1A2A 0px, #1B3A5C 50px, #6B8CA8 120px, #E4EDFA 220px, #F8FAFD 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(27,58,92,0.14) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-6 py-35 sm:px-8 sm:py-40">
        <header className="mb-14 sm:mb-20">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#14181F]">
            Refund Policies
          </h1>
        </header>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#14181F] mb-10 sm:mb-12">
            Refund Process
          </h2>

          <div className="relative">
            <div
              className="absolute left-1 top-2 bottom-2 w-px bg-[#E3E6EB]"
              aria-hidden="true"
            />

            <div className="space-y-12 sm:space-y-14">
              {tiers.map((tier) => (
                <div key={tier.heading} className="relative pl-8">
                  <span
                    className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-[#1B3A5C]"
                    aria-hidden="true"
                  />

                  <div className="flex flex-col gap-2 border-b border-[#E3E6EB] pb-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <p className="text-lg sm:text-xl font-semibold tracking-tight text-[#14181F]">
                      {tier.heading}{" "}
                      <span className="font-normal text-[#5B6472]">
                        {tier.note}
                      </span>
                    </p>

                    <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#1B3A5C]/[0.08] px-3 py-1 text-sm font-semibold text-[#1B3A5C]">
                      {tier.duration}
                    </span>
                  </div>

                  <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-[#5B6472]">
                    {tier.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}