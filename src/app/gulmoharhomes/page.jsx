import Footer from '@/components/Footer'
import GulmoharHomes from '@/components/GulmoharHomes'
import Navigation from '@/components/Navigation'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navigation/>
        <GulmoharHomes/>
        <Footer/>
    </div>
  )
}

export default page