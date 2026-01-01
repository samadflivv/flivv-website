import EventCalendar from '@/components/EventCalendar'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navigation/>
        <EventCalendar
        enableAdmin={false}/>
        <Footer/>
    </div>
  )
}

export default page