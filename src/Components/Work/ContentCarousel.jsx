import React, { useState, useRef } from "react";
import ContentVideoCard from "./ContentVideoCard";

const ContentCarousel = ({
  videos,
  isMobile,
  isTablet,
  direction = "left",
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  // Calculate card width based on device
  const cardWidth = isMobile ? 240 : isTablet ? 280 : 320;
  const gap = isMobile ? 12 : isTablet ? 16 : 24;

  // Total width of ONE set of videos (including gaps)
  const singleSetWidth = (cardWidth + gap) * videos.length;

  // Duration calculation for consistent speed
  const duration = videos.length * 5; // Animation duration in seconds

  const pauseCarousel = () => {
    setIsPaused(true);
  };

  const resumeCarousel = () => {
    setIsPaused(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-12"
      style={{ width: "100%" }}
    >
      <div
        className="flex"
        style={{
          gap: `${gap}px`,
          willChange: "transform",
          animation:
            direction === "left"
              ? `scroll-left ${duration}s linear infinite`
              : `scroll-right ${duration}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* Double the videos for seamless infinite loop */}
        {[...videos, ...videos].map((video, index) => (
          <div
            key={`${video.id}-${index}`}
            style={{
              width: `${cardWidth}px`,
              flexShrink: 0,
            }}
          >
            <ContentVideoCard
              video={video}
              isMobile={isMobile}
              isTablet={isTablet}
              onPauseCarousel={pauseCarousel}
              onResumeCarousel={resumeCarousel}
              cardWidth={cardWidth}
            />
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-[#130e09] via-[#130e09] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-[#130e09] via-[#130e09] to-transparent pointer-events-none z-10" />

      {/* CSS Keyframes - Key fix: animate exactly one set width */}
      <style jsx="true">{`
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-${singleSetWidth}px);
          }
        }

        @keyframes scroll-right {
          from {
            transform: translateX(-${singleSetWidth}px);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ContentCarousel;
