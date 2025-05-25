import Exclusiveprojects2 from '@/components/Exclusiveproje2'
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
      <Exclusiveprojects2/>
      <ProjectAccordion/>
      <Footer/>
    </div>
  )
}

export default Projects