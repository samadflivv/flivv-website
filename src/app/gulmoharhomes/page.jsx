import AnnouncementStrip from '@/components/AnnouncementStrip'
import Footer from '@/components/Footer'
import GulmoharHomes from '@/components/GulmoharHomes'
import Navigation from '@/components/Navigation'
import React from 'react'

// Add this metadata export
export const metadata = {
  title: 'Gulmohar Homes | Flivv',
  description: 'Explore Gulmohar Homes by Flivv.',
};

const page = () => {

  return (
    <div>
        <AnnouncementStrip />
        <Navigation/>
        <GulmoharHomes/>
        <Footer/>
    </div>
  )
}

export default page