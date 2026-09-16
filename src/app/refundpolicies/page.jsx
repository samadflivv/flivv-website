import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import RefundPolicies from '@/components/RefundPolicies'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navigation/>
        <RefundPolicies/>
        <Footer/>
    </div>
  )
}

export default page