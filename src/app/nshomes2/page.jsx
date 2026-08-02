import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import NSH20LandingPage from '@/components/NSH20LandingPage'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navigation/>
        <NSH20LandingPage/>
        <Footer/>
    </div>
  )
}

export default page