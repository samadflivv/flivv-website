import Footer from '@/components/Footer'
import IdealAvenueLandingPage from '@/components/IdealAvenueLandingPage'
import Navigation from '@/components/Navigation'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navigation/>
        <IdealAvenueLandingPage/>
        <Footer/>
    </div>
  )
}

export default page