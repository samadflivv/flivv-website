import Navigation from '@/components/Navigation'
import RivendellAbout from '@/components/RivendellAbout'
import RivendellHeader from '@/components/RivendellHeader'
import React from 'react'
import Footer from '@/components/Footer'
import RFShighlights from '@/components/RFShighlights'
import WhyRFS from '@/components/WhyRFS'
import RFSactivityGuide from '@/components/RFSactivityGuide'
import RFSlocationAndform from '@/components/RFSlocationAndform'
import RFSgallery from '@/components/RFSgallery'
import RFSfaqs from '@/components/RFSfaqs'

const page = () => {
  return (
    <div>
        <Navigation/>
        <RivendellHeader/>
        <RivendellAbout/>
        <RFShighlights/>
        <WhyRFS/>
        <RFSactivityGuide/>
        <RFSfaqs/>
        <RFSgallery/>
        <RFSlocationAndform/>
        <Footer/>
    </div>
  )
}
export default page