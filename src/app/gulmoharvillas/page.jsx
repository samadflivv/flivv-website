import Footer from '@/components/Footer'
import GulmoharheroSection from '@/components/GulmoharheroSection'
import GVabout from '@/components/GVabout'
import GVamenities from '@/components/GVamenities'
import GVcta from '@/components/GVcta'
import GVFaqs from '@/components/GVFaqs'
import GVgallery from '@/components/GVgallery'
import GVLocationMapSection from '@/components/GVLocationMapSection'
import GVProgressRoadmap from '@/components/GVProgressRoadmap'
import Navigation from '@/components/Navigation'
import React from 'react'

// Add this metadata block
export const metadata = {
  title: 'Gulmohar Villas | Flivv',
  description: 'Explore Gulmohar Villas by Flivv.',
};

const page = () => {
  return (
    <div>
      <Navigation/>
      <GulmoharheroSection/>
      <GVProgressRoadmap/>
      <GVabout/>
      <GVamenities/>
      <GVLocationMapSection/>
      <GVcta/>
      <GVgallery/>
      <GVFaqs/>
      <Footer/>
    </div> 
  )
}

export default page