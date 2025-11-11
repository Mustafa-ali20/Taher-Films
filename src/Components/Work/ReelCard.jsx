import React, { useState, useRef, useEffect } from "react";
import { Eye, Heart, Send, Volume2, VolumeX } from "lucide-react";

const ReelCard = ({ reel, isMobile, isTablet }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(isMobile || isTablet);
  const videoRef = useRef(null);

  // Desktop hover handlers
  const handleMouseEnter = () => {
    if (!isMobile && !isTablet) {
      setIsHovered(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !isTablet) {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  const handleClick = () => {
    if (isMobile || isTablet) {
      if (isPlaying) {
        videoRef.current?.pause();
        setIsPlaying(false);
      } else {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.muted = false;
          videoRef.current.play();
        }
        setIsMuted(false);
        setIsPlaying(true);
      }
    }
  };

  // Mute toggle
  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // Update video muted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Determine when to show stats
  const showStats = isMobile || isTablet ? isPlaying : isHovered;
  
  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-3xl bg-black aspect-[9/16] transition-transform duration-300 origin-bottom lg:hover:scale-[1.03]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ transform: `rotate(${reel.rotation}deg)` }}
    >
      {/* Thumbnail Image */}
      <img
        src={reel.thumbnail}
        alt={reel.creatorName}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isHovered || isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video Element */}
      <video
        ref={videoRef}
        src={reel.video}
        preload="metadata"
        loop
        muted={isMuted}
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 rounded-3xl overflow-hidden ${
          isHovered || isPlaying ? "opacity-100 rounded-3xl" : "opacity-0 rounded-3xl"
        }`}
      />

      {/* Play Button - Mobile/Tablet Only */}
      {(isMobile || isTablet) && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-13 h-13 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Creator Info - Always visible */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10 font-[villo]">
        <img
          src={reel.creatorProfile}
          alt={reel.creatorName}
          className="w-8 h-8 md:w-9 md:h-9 lg:h-10 lg:w-10 rounded-full object-cover"
        />
        <span className="text-white text-sm md:text-base lg:text-base lg:font-semibold">
          @{reel.creatorName}
        </span>
      </div>

      {/* Stats Overlay - Shows when playing */}
      {showStats && (
        <>
          <div className="absolute bottom-4 lg:bottom-8 right-2 md:right-4 lg:right-4 flex flex-col gap-4 lg:gap-6 text-white font-[villo] font-normal lg:font-bold">
            {/* Views */}
            <div className="flex flex-col items-center gap-1">
              <Eye className="w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8" />
              <span className="font-semibold text-sm lg:text-base ">
                {reel.views}
              </span>
            </div>

            {/* Likes */}
            <div className="flex flex-col items-center gap-1">
              <Heart className="w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8" />
              <span className="font-semibold text-sm lg:text-base">
                {reel.likes}
              </span>
            </div>

            {/* Shares */}
            <div className="flex flex-col items-center gap-1">
              <Send className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8" />
              <span className="font-semibold text-sm lg:text-base">
                {reel.shares}
              </span>
            </div>
          </div>

          {/* Mute Toggle - Mobile/Tablet Only - Left Side */}
          {(isMobile || isTablet) && isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute bottom-4 left-2 md:left-4 p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ReelCard;