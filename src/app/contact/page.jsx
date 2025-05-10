import ContactHeroSection from '@/components/ContactHeroSection'
import ContactpageSecondsection from '@/components/ContactpageSecondsection'
import FaqSection from '@/components/FaqSection'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import React from 'react'

const Contact = () => {
  return (
    <div>
      <Navigation/>
      <ContactHeroSection/>
      <ContactpageSecondsection/>
      <FaqSection/>
      <Footer/>
    </div>
  )
}

export default Contact  