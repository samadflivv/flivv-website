import React from 'react'
import Link from 'next/link'

function Navigation() {
  return (
    <div className="flex justify-between items-center px-[100px] py-6 w-full z-50 text-white h-30 absolute">
      <div>
        <img src="flivv-logo.png" alt="Flivv Logo" width={150} />
      </div>
      <div>
        <ul className="flex items-center gap-x-9 font-medium text-lg">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation
