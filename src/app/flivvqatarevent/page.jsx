import FlivvQatarEvent from '@/components/FlivvQatarEvent'
import Navigation from '@/components/Navigation'
import QatarMetaPixel from '@/components/QatarMetaPixel'
import React from 'react'

const page = () => {
  return (
    <div>
        <QatarMetaPixel/>
        <Navigation/>
        <FlivvQatarEvent/>
    </div>
  )
}

export default page