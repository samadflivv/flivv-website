import FaqsPage from '@/components/FaqsPage'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navigation/>
        <FaqsPage/>
        <Footer/>
    </div>
  )
}

export default page