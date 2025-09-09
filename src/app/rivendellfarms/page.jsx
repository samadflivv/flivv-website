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
import RFScta from '@/components/RFScta'

const page = () => {
  return (
    <div>
        <Navigation/>
        <RivendellHeader/>
        <RivendellAbout/>
        <RFShighlights/>
        <WhyRFS/>
        <RFSactivityGuide/>
        <RFSlocationAndform/>
        <RFSgallery/>
        <RFSfaqs/>
        <RFScta/>
        <Footer/>
    </div>
  )
}
export default page