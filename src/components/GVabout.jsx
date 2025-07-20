"use client";


export default function GVabout() {
  
  return (
    <section className="w-full py-30 px-6 md:px-24 font-sans bg-white text-[#0a0a0a]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
        {/* Text Section */}
        <div>
          <button className="border border-black rounded-full px-4 py-1 mb-4 font-medium">
            Gulmohar Villas
          </button>
          <h2 className="text-6xl font-normal mb-4">About</h2>
          <p className="mb-4 text-lg sm:text-justify">
            Located in the rapidly developing <strong>Shadnagar, Gulmohar Villas</strong> offers prime
            connectivity to NH 44, <strong>Shadnagar town</strong> and RGIA, just 38 km from Aramgarh X Roads —
            an ideal choice for families seeking a peaceful retreat.
          </p>
          <p className="mb-4 text-lg sm:text-justify">
            This thoughtfully designed, self-sustained community blends modern conveniences with natural serenity.
            With personalized villas, modern infrastructure and lush landscapes, it promotes well-being, freedom
            and simplicity. The community offers <strong>wellness center, outdoor spaces</strong> and essential
            amenities such as a <strong>healthcare facility, supermarket</strong> and a <strong>café</strong>.
          </p>
          <p className="mb-6 text-lg sm:text-justify">
            For a long-term leisure living, Gulmohar Villas redefines simple living, nurturing a harmonious
            connection with nature and modern comfort.
          </p>

          {/* Logo Scroller */}
          <div className="relative overflow-hidden mt-6">
  <div
    className="pointer-events-none absolute inset-0 z-10"
    style={{
      background:
        'linear-gradient(to right, white 0%, transparent 10%, transparent 90%, white 100%)',
    }}
  />

  <div className="flex w-max animate-scroll whitespace-nowrap">
    {[...Array(2)].flatMap((_, index) =>
      [
        'Gulmohar Villas',
        'Premium Plots',
        'Luxury Villas',
        'Eco Community',
        'Shadnagar',
        'Smart Living',
        'Green Spaces',
        'Family Retreat',
      ].map((label, i) => (
        <span
          key={`${index}-${i}`}
          className="mx-4 inline-block rounded-full border border-gray-400 px-6 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
        >
          {label}
        </span>
      ))
    )}
  </div>

  <style>
    {`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-scroll {
        animation: scroll 20s linear infinite;
      }
    `}
  </style>
</div>
        </div>

      
        <div className="relative h-auto flex justify-center items-center sm:p-2">
  <div className="w-500 overflow-hidden rounded-2xl shadow-md bg-white p-1">
    <img
      src="/GVabout.jpeg"
      alt="Gulmohar Villas"
      className="w-full max-h-[500px] object-cover rounded-xl"
    />
  </div>
</div>

      </div>
    </section>
  );
}
