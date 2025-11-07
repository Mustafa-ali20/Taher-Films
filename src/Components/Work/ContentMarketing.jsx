import React, { useState, useEffect } from 'react';
import ContentCarousel from './ContentCarousel';
import contentMarketingData from './data/contentMarketingData';

const ContentMarketing = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1280);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Split videos into two carousels
  // First carousel: 8 videos
  // Second carousel: 7 videos
  const firstCarouselVideos = contentMarketingData.slice(0, 9);
  const secondCarouselVideos = contentMarketingData.slice(9, 17);

  return (
    <section className="min-h-screen py-16 pt-26">
      <div className="max-w-full">
        
        {/* Optional Section Title */}
        <div className="text-center px-8">
          <h2 className="text-4xl md:text-5xl text-white mb-4 font-[villo]">
            Content <span className='font-[apple]'>Marketing</span> 
          </h2>
          
        </div>

        {/* First Carousel - 8 videos, scrolling left */}
        <ContentCarousel 
          videos={firstCarouselVideos}
          isMobile={isMobile}
          isTablet={isTablet}
          direction="left"
        />

        {/* Second Carousel - 7 videos, scrolling right */}
        <ContentCarousel 
          videos={secondCarouselVideos}
          isMobile={isMobile}
          isTablet={isTablet}
          direction="right"
        />

      </div>
    </section>
  );
};

export default ContentMarketing;