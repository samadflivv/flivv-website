import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-black text-white m-3 rounded-xl h-[800px]">
  {/* Content */}
  <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10 relative z-10">
    {/* Column 1 */}
    <div>
  <h2 className="text-4xl font-normal leading-tight md:pt-0">
    Making Luxury<br />Living Effortless
  </h2>
  <button className="mt-4 px-10 py-2 rounded-full border border-white bg-white text-black font-semibold transition w-full md:w-auto">
    Book Visit →
  </button>
</div>


    {/* Column 2 */}
    <div>
      <h3 className="font-semibold text-lg mb-2">Pages</h3>
      <ul className="space-y-1 text-sm text-gray-300">
        <li><a href="#">Home →</a></li>
        <li><a href="#">About →</a></li>
        <li><a href="#">Projects →</a></li>
        <li><a href="#">Contact →</a></li>
      </ul>
    </div>

    {/* Column 3 */}
    <div>
      <h3 className="font-semibold text-lg mb-2">Info</h3>
      <ul className="space-y-1 text-sm text-gray-300">
        <li><a href="#">Blog →</a></li>
        <li><a href="#">Privacy Policy →</a></li>
        <li><a href="#">Terms & Conditions →</a></li>
        <li><a href="#">Other Doc →</a></li>
      </ul>
    </div>

    {/* Column 4 */}
    <div>
      <h3 className="font-semibold text-lg mb-2">Social</h3>
      <ul className="space-y-1 text-sm text-gray-300">
        <li><a href="#">Instagram →</a></li>
        <li><a href="#">Facebook →</a></li>
        <li><a href="#">Twitter →</a></li>
        <li><a href="#">LinkedIn →</a></li>
      </ul>
    </div>
  </div>

  {/* Divider */}
  {/* <div className="border-t border-white mt-4 relative z-10">
    <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-400 flex justify-between">
      <p>All copyrights are server@flivvdevelopers</p>
      <p>Design and developed by khan</p>
    </div>
  </div> */}

  {/* Background Image (blended) */}
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-xl">
    <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/100 to-transparent" />
    <img
  src="/dream-home.jpg"
  alt="Footer Background"
  className="w-full h-[800px] object-cover"
/>

  </div>
</footer>

  );
};

export default Footer;