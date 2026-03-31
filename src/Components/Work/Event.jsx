import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import "./EventGallery.css";

const VideoPlayer = ({ videoSrc, marqueeText, direction, poster }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const value = (video.currentTime / video.duration) * 100;
      setProgress(value || 0);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
      setIsMuted(false);
      video.muted = false;
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const handleVideoClick = () => {
    if (!isPlaying) {
      togglePlay();
    }
  };

  return (
    <div className="video-container">
      <div className="marquee-background">
        <div className={`marquee-track marquee-${direction === 'left' ? 'right' : 'left'}`}>
          <div className="marquee-content">
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
          </div>
          <div className="marquee-content">
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
          </div>
        </div>
        <div className={`marquee-track marquee-${direction}`}>
          <div className="marquee-content">
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
          </div>
          <div className="marquee-content">
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
            <span className="marquee-text">{marqueeText}</span>
          </div>
        </div>
      </div>

      <div className="video-wrapper" onClick={handleVideoClick}>
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted={isMuted}
          playsInline
          className="video-element"
          poster={poster}
        />

        <div className="video-controls">
          <button className="control-btn" onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <div className="progress-bar" onClick={(e) => { e.stopPropagation(); handleProgressClick(e); }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <button className="control-btn" onClick={(e) => { e.stopPropagation(); toggleMute(); }}>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

const EventGallery = () => {
  return (
    <div className="event-gallery">
      <div className="heading-container">
        <h1 className="heading-event">Event</h1>
        <h1 className="heading-gallery">Gallery</h1>
      </div>

      <div className="videos-section">
        <VideoPlayer
          videoSrc="https://res.cloudinary.com/du62cpjs7/video/upload/v1774966844/event1_enuni5.mp4"
          poster="https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Content%20Marketing/roadrush.png?updatedAt=1774954413452"
          marqueeText="ROADRUSH KUWAIT"
          direction="left"
        />

        <VideoPlayer
          videoSrc="https://res.cloudinary.com/du62cpjs7/video/upload/v1774966833/event2_c1hxro.mp4"
          poster="https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Content%20Marketing/amaron.png?updatedAt=1774954413358"
          marqueeText="AMARON LAUNCH"
          direction="right"
        />
      </div>
    </div>
  );
};

export default EventGallery;
