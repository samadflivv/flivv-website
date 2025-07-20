'use client'

'use client'

// components/GVgallery.js
import { useState, useRef, useEffect } from 'react';

export default function GVgallery() {
  const [images, setImages] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const dialogRef = useRef(null);

  // Load images from public/gvimages folder
  useEffect(() => {
    // This should be replaced with your actual image loading logic
    const mockImages = Array.from({ length: 12 }, (_, i) => ({
      src: `/gvimages/image${i + 1}.jpg`,
      alt: `Image ${i + 1}`,
    }));
    setImages(mockImages);
  }, []);

  const openDialog = (index) => {
    setCurrentIndex(index);
    setIsDialogOpen(true);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setIsDialogOpen(false);
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * direction;
      carouselRef.current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isDialogOpen) return;
      
      if (e.key === 'Escape') closeDialog();
      if (e.key === 'ArrowLeft') scrollCarousel(-1);
      if (e.key === 'ArrowRight') scrollCarousel(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDialogOpen]);

  // Scroll to current image when dialog opens
  useEffect(() => {
    if (isDialogOpen && carouselRef.current) {
      const scrollPosition = carouselRef.current.clientWidth * currentIndex;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'auto'
      });
    }
  }, [isDialogOpen, currentIndex]);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Gallery */}
      <div className="container mx-auto py-20 sm:py:30 px-4 sm:px-25">
        {/* Added Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-normal text-gray-800 sm:mb-20">Gallery</h1>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              className="relative p-0 m-0 border-none overflow-hidden group aspect-square"
              onClick={() => openDialog(index)}
            >

              {/* Image without any overlay covering it */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              
              {/* Hover effect from original source code */}
              <div 
                className="absolute inset-0 hidden group-hover:block"
                style={{
                  backgroundColor: 'oklch(0 0 0 / 0.4)',
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M21.27,10.18l-5.5-5.47a1,1,0,0,0-.7-.29,1,1,0,0,0-.71.29L12.46,7.76,5.51,2.79a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l6.94,5-4.9,4.9a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.7-.3l4.9-4.9,2.35,2.35-4.9,4.89a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.7-.3l4.9-4.89,2.35,2.35-4.19,4.2a1,1,0,0,0,0,1.41,1,1,0,0,0,1.42,0l8.66-8.66A1,1,0,0,0,21.27,10.18Z'/%3E%3C/svg%3E\")",
                  backgroundSize: '1.5rem',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top 0.25rem right 0.25rem',
                  opacity: 0,
                  transition: 'opacity 0.2s ease'
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        className="fixed inset-0 z-50 bg-transparent w-screen h-screen overflow-hidden p-0 m-0"
        onClose={() => setIsDialogOpen(false)}
      >
        {/* Full-screen glassmorphism background - covers entire screen */}
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xl"></div>
        
        <div className="relative h-full w-full flex flex-col items-center justify-center">
          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory w-full h-full"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            {images.map((image, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-4"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="max-h-[85vh] max-w-[85vw] object-contain"
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="fixed top-1/2 left-0 right-0 flex justify-between px-4 z-20 transform -translate-y-1/2">
            <button
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-3xl text-gray-800 shadow-lg hover:bg-white transition-all duration-300"
              onClick={() => scrollCarousel(-1)}
            >
              ←
            </button>
            <button
              className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-3xl text-gray-800 shadow-lg hover:bg-white transition-all duration-300"
              onClick={() => scrollCarousel(1)}
            >
              →
            </button>
          </div>

          {/* Close Button */}
          <button
            className="fixed top-6 right-6 w-12 h-12 text-3xl text-gray-800 flex items-center justify-center z-20 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all duration-300"
            onClick={closeDialog}
          >
            ✕
          </button>
        </div>
      </dialog>
    </div>
  );
}