import Footer from '@/components/Footer'
import GulmoharheroSection from '@/components/GulmoharheroSection'
import GVabout from '@/components/GVabout'
import GVamenities from '@/components/GVamenities'
import GVcta from '@/components/GVcta'
import GVgallery from '@/components/GVgallery'
import GVHerotest from '@/components/GVHerotop'
import GVLocationMapSection from '@/components/GVLocationMapSection'
import Navigation from '@/components/Navigation'
import ScrollVideoSection from '@/components/ScrollVideoSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navigation/>
      <GulmoharheroSection/>
      <GVabout/>
      <GVamenities/>
      <GVLocationMapSection/>
      <GVcta/>
      <GVgallery/>
      <Footer/>
    </div>
  )
}

export default page