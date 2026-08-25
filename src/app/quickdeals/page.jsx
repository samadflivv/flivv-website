import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import QuickDeal from '@/components/QuickDeal'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navigation/>
        <QuickDeal/>
        <Footer/>
    </div>
  )
}

export default page