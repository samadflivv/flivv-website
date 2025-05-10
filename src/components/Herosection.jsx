import React from 'react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/button'

const Herosection = () => {
  return (
    <header>
      <div className="relative bg-[url('/hero-img-2.jpg')] bg-cover bg-center h-screen m-3 rounded-xl overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />

        {/* Navigation */}
        <div className="absolute top-0 left-0 w-full z-30">
          <Navigation />
        </div>

        {/* Hero Content */}
        <div className="flex flex-col justify-center h-full px-[100px] z-20 relative gap-6">
          <h1 className="text-7xl font-normal text-white leading-tight">
            Elevating Spaces <br /> Crafting Dreams
          </h1>
          <p className="text-white text-lg leading-relaxed">
            Discover homes built for better living. Designed for comfort, crafted with <br />
            excellence, made for you.
          </p>
          <div className="flex gap-6">
            <Button variant="secondary" className="rounded-full pt-6 pb-6 pr-5 pl-5 border border-black">
              Book Visit
            </Button>
            <Button variant="secondary" className="flex items-center gap-2 bg-white/10 text-white border border-white rounded-full pt-6 pb-6 pr-5 pl-5 font-semibold backdrop-blur-md hover:bg-white/20 transition-all">
              Explore Projects
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Herosection
