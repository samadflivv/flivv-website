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
            Gulmohar Villas marks our very first HMDA-approved villa plot development, and it’s one that truly <b className= 'italic text-bold' >"sold itself".</b>
          </p>
          <p className="mb-4 text-lg sm:text-justify">
            Located in the fast-growing area of Shadnagar, this project offers great connectivity to NH 44, Shadnagar town, and Rajiv Gandhi International Airport (RGIA), just 38 km from Aramgarh X Roads. It’s the perfect blend of modern and natural tranquility, making it an ideal choice for families seeking a peaceful yet connected lifestyle. 
          </p>
          <p className="mb-6 text-lg sm:text-justify">
            <b className= 'italic text-bold' >With 100+ units sold in just 2 months,</b> Gulmohar Villas' success was built on a strong foundation of the trust we've earned over years of consistent branding.
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
