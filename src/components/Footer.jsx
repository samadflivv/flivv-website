import React from 'react'

const Footer = () => {
  return (
    <footer className="relative bg-black text-white m-3 rounded-xl">
  <div className="max-w-7xl mx-auto px-6 py-8 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
    
    {/* Column 1 */}
    <div className="col-span-2 md:col-span-1">
      <a href='/'>
        <img src="/corpped-logo.png" alt="Flivv Logo"className='w-40'/>
        </a>
      <a href='/contact'>
        <button className="mt-8 sm:mt-4 px-10 py-2 rounded-full border border-white bg-white text-black font-semibold transition w-full md:w-auto">
          Book Visit →
        </button>
      </a>
    </div>

    {/* Pages + Info */}
    <div className="col-span-2 md:col-span-2 grid grid-cols-2 gap-6">
      {/* Column 2 - Pages */}
      <div> 
        <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
        <ul className="space-y-1 text-sm text-gray-300">
          <li><a href="/">Home →</a></li>
          <li><a href="/about">About →</a></li>
          <li><a href="/projects">Projects →</a></li>
          <li><a href="/contact">Contact →</a></li>
        </ul>
      </div>

      {/* Column 3 - Info */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Social</h3>
        <ul className="space-y-1 text-sm text-gray-300">
          <li><a href="https://www.instagram.com/flivvdevelopers/">Instagram →</a></li>
          <li><a href="https://x.com/Flivv">Twitter →</a></li>
          <li><a href="https://www.facebook.com/flivvdevelopers">Facebook →</a></li>
          <li><a href="https://www.linkedin.com/company/flivv/">LinkedIn →</a></li>
        </ul>
      </div>
    </div>

    {/* Column 4 - Contact */}
    <div className="col-span-2 md:col-span-1">
      <h3 className="font-semibold text-lg mb-2">Office Address & Contact Details</h3>
      <ul className="space-y-1 text-sm text-gray-300">
        <li><a href="">&#9679; 8-1-301, 302 & 303, West World, II Floor, B Block, Front Portion, above Karachi Bakery, Shaikpet, Hyderabad, Telangana 500008</a></li>
        <li><a href="mailto:info@flivv.com">&#9679; info@flivv.com</a></li>
      </ul>
    </div>
  </div>
</footer>

  )
}

export default Footer