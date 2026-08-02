import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import NSHomes from '@/components/NSHomes'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navigation/>
        <NSHomes/>
        <Footer/>
    </div>
  )
}

export default page