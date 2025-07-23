'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import GVHerotop from './GVHerotop'

export default function HeroSection() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile on mount
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Capsule morph effects - different values for mobile
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1])
  const borderRadius = useTransform(
    scrollYProgress, 
    [0, 0.3], 
    [isMobile ? '100px' : '300px', '0px']
  )
  const height = useTransform(
    scrollYProgress, 
    [0, 0.3], 
    [isMobile ? '40px' : '50px', '100vh']
  )

  const [hasPlayed, setHasPlayed] = useState(false)
  const [showPoster, setShowPoster] = useState(true)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const video = videoRef.current

      // Play video when scroll reaches threshold
      if (v >= 0.3 && !hasPlayed && video) {
        setShowPoster(false)
        
        // Enable sound on mobile
        if (isMobile) {
          video.muted = false
        }
          
        video.play().catch(error => {
          console.log("Video play failed:", error)
          // Fallback: mute and try again if autoplay fails
          if (error.name === 'NotAllowedError') {
            video.muted = true
            video.play()
          }
        })
        
        setHasPlayed(true)
      }

      // Pause video when reaching second section
      if (v > 0.95 && video && !video.paused) {
        video.pause()
        setHasPlayed(false)
        setShowPoster(true)
      }
    })

    return () => unsubscribe()
  }, [hasPlayed, scrollYProgress, isMobile])

  return (
    <section ref={sectionRef} className="relative bg-[#03050B] pt-25 md:pt-20">
      <GVHerotop/>

      {/* Animated Video Container - Mobile adjustments */}
      <motion.div
        className="sticky top-0 z-10 flex items-center justify-center mx-auto w-full bg-[#03050B] overflow-hidden"
        style={{ 
          scale, 
          borderRadius, 
          height,
          transition: 'all 0.10s cubic-bezier(0.25, 0.1, 0.25, 1)',
          // Mobile-specific styles
          maxWidth: isMobile ? '100vw' : undefined,
          aspectRatio: isMobile ? '16/9' : undefined
        }}
      >
        <div className="relative w-full h-full">
          {/* Poster */}
          <AnimatePresence>
            {showPoster && (
              <motion.img
                src="/GVdorneimg.png"
                alt="Poster"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 left-0 w-full h-full object-cover z-20"
              />
            )}
          </AnimatePresence>

          {/* Video with mobile aspect ratio handling */}
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              // Enable sound on mobile by default
              muted={!isMobile} // Desktop muted, mobile unmuted
              controls
              playsInline
              preload="metadata"
              controlsList="nodownload"
              className={`
                w-full h-full z-10
                ${isMobile ? 'object-contain' : 'object-cover'}
              `}
              src="https://flivv-web-cdn.s3.ap-south-1.amazonaws.com/GULMOHAR%203D%20FINALER.mp4"
              style={{
                // Maintain aspect ratio on mobile
                aspectRatio: isMobile ? '16/9' : undefined,
                maxHeight: isMobile ? '100%' : undefined
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}