import React, { useState, useRef, useEffect } from "react";
import { Eye, Heart, Send, Volume2, VolumeX } from "lucide-react";

const ContentVideoCard = ({
  video,
  isMobile,
  isTablet,
  onPauseCarousel,
  onResumeCarousel,
  cardWidth = 320,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(isMobile || isTablet);
  const videoRef = useRef(null);

  const cardHeight = Math.round(cardWidth * 1.5);

  const handleMouseEnter = () => {
    if (!isMobile && !isTablet) {
      setIsHovered(true);
      onPauseCarousel?.();
      videoRef.current && (videoRef.current.currentTime = 0, videoRef.current.play());
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !isTablet) {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      onResumeCarousel?.();
    }
  };

  const handleClick = () => {
    if (isMobile || isTablet) {
      if (isPlaying) {
        videoRef.current?.pause();
        setIsPlaying(false);
        onResumeCarousel?.();
      } else {
        onPauseCarousel?.();
        videoRef.current && (videoRef.current.currentTime = 0, videoRef.current.play());
        setIsPlaying(true);
      }
    }
  };

  const handleVideoEnd = () => {
    if (isMobile || isTablet) {
      setIsPlaying(false);
      onResumeCarousel?.();
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  const showStats = isMobile || isTablet ? isPlaying : isHovered;

  return (
    <div
      className="relative cursor-pointer overflow-hidden rounded-2xl bg-black transition-transform duration-300 hover:scale-105 origin-bottom "
      style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnail}
        alt={video.title || "Content video"}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isHovered || isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video */}
      <video
        ref={videoRef}
        src={video.video}
        preload="metadata"
        loop={!isMobile && !isTablet}
        muted={isMuted}
        playsInline
        onEnded={handleVideoEnd}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isHovered || isPlaying ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Play button - mobile/tablet */}
      {(isMobile || isTablet) && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-black/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Always visible creators */}
      <div className="absolute top-2 md:top-4 left-4 md:left-6 flex ">
        <div className="flex items-center gap-2 font-[villo]">
          <img
            src={video.creator1Profile}
            alt={video.creator1Name}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full mt-3 z-1 object-cover"
          />
            {video.creator2Profile && (
              <img
                src={video.creator2Profile}
                alt={video.creator2Name}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full -ml-6 object-cover"
              />
            )}
          <div className="text-white drop-shadow-lg">
            <p className="text-xs md:text-base font-semibold">@{video.creator1Name}</p>
            {video.creator2Name && (
              <p className="text-xs md:text-base font-semibold opacity-90">@{video.creator2Name}</p>
            )}
          </div>
        </div>

      </div>

      {/* Stats & controls */}
      {showStats && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

          <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 flex flex-col gap-3 md:gap-4 text-white z-10 font-[villo]">
            <div className="flex flex-col items-center gap-1">
              <Eye className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
              <span className="text-xs md:text-sm lg:text-base font-semibold">{video.views}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Heart className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
              <span className="text-xs md:text-sm lg:text-base font-semibold">{video.likes}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Send className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
              <span className="text-xs md:text-sm lg:text-base font-semibold">{video.shares}</span>
            </div>
          </div>

          <button
            onClick={toggleMute}
            className="absolute bottom-4 md:bottom-6 left-4 md:left-6 p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default ContentVideoCard;
