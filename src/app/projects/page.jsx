import Aboutsection from '@/components/Aboutsection'
import ContactHeroSection from '@/components/ContactHeroSection'
import Exclusiveprojects from '@/components/Exclusiveprojects'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import ProjectAccordion from '@/components/ProjectAccordion'
import ProjectPageheader from '@/components/ProjectPageheader'
import React from 'react'


const Projects = () => {
  return (
    <div>
      <Navigation/>
      <ProjectPageheader/>
      <Exclusiveprojects/>
      <ProjectAccordion/>
      <Footer/>
    </div>
  )
}

export default Projects