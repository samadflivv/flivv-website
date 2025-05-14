import AboutpageHeroSection from '@/components/AboutpageHeroSection'
import FaqSection from '@/components/FaqSection'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import OurPurpose from '@/components/OurPurpose'
import OurStorySection from '@/components/OurStorySection'
import React from 'react'

const About = () => {
  return (
    <div>
      <Navigation/>
      <AboutpageHeroSection/>
      <OurStorySection/>
      <OurPurpose/>
      <FaqSection/>
      <Footer/>
    </div>
  )
}

export default About