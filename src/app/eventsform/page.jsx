import EventFormPage from '@/components/EventFormPage'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import React from 'react'

const page = () => {
  return (
    <div>
         <React.StrictMode>
          <Navigation/>
    <EventFormPage />
    <Footer/>
  </React.StrictMode>
    </div>
  )
}

export default page