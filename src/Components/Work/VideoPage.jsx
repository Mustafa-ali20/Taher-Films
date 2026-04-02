import { useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./VideoPage.scss";

const SPRING = {
  duration: 0.7,
  type: "spring",
  stiffness: 90,
  damping: 20,
};

const fallbackEvent = {
  id: 1,
  title: "Event",
  subtitle: "Brand Event",
  video: "",
  thumbnail: "",
  description: "",
};

const VideoPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const event = state?.event || fallbackEvent;

  const fullVideoRef = useRef(null);
  const progressFillRef = useRef(null);
  const shouldAutoPlay = useRef(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleBack = (e) => {
    e.stopPropagation();
    navigate("/work");
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleTimeUpdate = useCallback(() => {
    const video = fullVideoRef.current;
    if (!video) return;
    setCurrentTime(formatTime(video.currentTime));
    const pct = video.duration ? (video.currentTime / video.duration) * 100 : 0;
    if (progressFillRef.current)
      progressFillRef.current.style.width = `${pct}%`;
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const video = fullVideoRef.current;
    if (!video) return;
    setDuration(formatTime(video.duration));
  }, []);

  const handleOpen = () => {
    shouldAutoPlay.current = true;
    setIsOpen(true);
  };

  const handleClose = () => {
    const video = fullVideoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime("0:00");
    if (progressFillRef.current) progressFillRef.current.style.width = "0%";
    setIsOpen(false);
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    const video = fullVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const video = fullVideoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  };

  return (
    <div className="video-page">
      <button
        className="video-page__back-btn"
        onClick={handleBack}
        aria-label="Back to work"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M15 18l-6-6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* Header */}
      <div className="video-page__header">
        <h1 className="video-page__title">{event.title}</h1>
        <p className="video-page__subtitle">{event.subtitle}</p>
      </div>

      {/* Small preview — always in DOM */}
      <div
        className="video-page__video-wrapper"
        onClick={handleOpen}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <video
          src={event.video}
          poster={event.thumbnail}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="video-page__cursor-label"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, x: cursorPos.x, y: cursorPos.y }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ x: cursorPos.x, y: cursorPos.y }}
            >
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overview */}
      <div className="video-page__overview">
        <span className="video-page__overview-label">Overview</span>
        <p className="video-page__overview-text">{event.description}</p>
      </div>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="video-page__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div
              className="video-page__overlay-backdrop"
              onClick={handleClose}
            />

            {/* Video panel — scales up from center of screen */}
            <motion.div
              className="video-page__overlay-content"
              initial={{ scale: 0.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.05, opacity: 0 }}
              transition={SPRING}
              onAnimationComplete={(def) => {
                if (def === "animate") {
                  const video = fullVideoRef.current;
                  if (video) {
                    video.play().then(() => setIsPlaying(true));
                  }
                }
              }}
            >
              <video
                ref={fullVideoRef}
                src={event.video}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onCanPlay={() => {
                  if (shouldAutoPlay.current) {
                    shouldAutoPlay.current = false;
                    fullVideoRef.current
                      ?.play()
                      .then(() => setIsPlaying(true))
                      .catch(() => {});
                  }
                }}
              />

              {/* Controls */}
              <div className="video-page__controls">
                <button className="video-page__close" onClick={handleClose}>
                  ✕ Close
                </button>

                <div className="video-page__bottom-controls">
                  <div
                    className="video-page__progress-bar"
                    onClick={handleSeek}
                  >
                    <div
                      ref={progressFillRef}
                      className="video-page__progress-bar-fill"
                      style={{ width: "0%" }}
                    />
                  </div>

                  <div className="video-page__controls-row">
                    <button
                      className="video-page__play-btn"
                      onClick={togglePlay}
                    >
                      {isPlaying ? (
                        <svg viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                    <span className="video-page__time">
                      {currentTime} / {duration}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPage;
