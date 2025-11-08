import { motion, useSpring } from "framer-motion";
import { Play, Plus } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import "./VideoPlayer.css";

export default function VideoPlayer({ videoSrc = "/videos/taherfilms2.mp4" }) {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [screenSize, setScreenSize] = useState("lg");
  const videoRef = useRef(null);

  const SPRING = { mass: 0.1 };
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  // Detect screen size
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("sm");
      } else if (window.innerWidth < 1024) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Handle video playback when enlarged state changes
  useEffect(() => {
    if (videoRef.current) {
      if (isEnlarged) {
        // Pause, unmute, reset time, then play when enlarged
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;

        setTimeout(() => {
          videoRef.current.play().catch((err) => {
            console.log("Play failed:", err);
          });
        }, 100);
      } else {
        videoRef.current.muted = true;
      }
    }
  }, [isEnlarged]);

  const handlePointerMove = (e) => {
    if (isEnlarged || screenSize !== "lg") return;
    opacity.set(1);
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setIsEnlarged(true);
  };

  // Get dimensions based on screen size and enlarged state
  const getDimensions = () => {
    if (isEnlarged) {
      switch (screenSize) {
        case "sm":
          return { width: "55vw", height: "45.5vh" };
        case "md":
          return { width: "45vw", height: "57vh" };
        case "lg":
          // FIXED: Use consistent aspect ratio for laptop (9:16 vertical video)
          return { width: "auto", height: "80vh", aspectRatio: "9/16" };
        default:
          return { width: "auto", height: "80vh", aspectRatio: "9/16" };
      }
    } else {
      switch (screenSize) {
        case "sm":
          return { width: "21vw", height: "15.5vh" };
        case "md":
          return { width: "22vw", height: "24vh" };
        case "lg":
          // FIXED: Use consistent aspect ratio for laptop (9:16 vertical video)
          return { width: "auto", height: "30vh", aspectRatio: "9/16" };
        default:
          return { width: "auto", height: "30vh", aspectRatio: "9/16" };
      }
    }
  };

  const dimensions = getDimensions();

  return (
    <>
      {/* Background blur + dim */}
      {isEnlarged && (
        <div
          className="video-player__backdrop"
          onClick={() => setIsEnlarged(false)}
        />
      )}

      {/* Video container */}
      <motion.div
        onMouseMove={handlePointerMove}
        onMouseLeave={() => opacity.set(0)}
        onClick={handleClick}
        initial={false}
        animate={
          isEnlarged
            ? {
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: dimensions.width,
                height: dimensions.height,
                aspectRatio: dimensions.aspectRatio,
                borderRadius: "16px",
                zIndex: 9999,
              }
            : {
                position: "absolute",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: dimensions.width,
                height: dimensions.height,
                aspectRatio: dimensions.aspectRatio,
                borderRadius: "9999px",
                zIndex: 1,
              }
        }
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="video-player__container"
        style={{ pointerEvents: "auto" }}
      >
        {/* Play overlay - ONLY ON LARGE SCREENS */}
        {!isEnlarged && screenSize === "lg" && (
          <motion.div
            style={{ x, y, opacity }}
            className="video-player__play-overlay"
          >
            <div className="video-player__play-button">
              <Play className="video-player__play-icon" /> Play
            </div>
          </motion.div>
        )}

        {/* Video element */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          loading="lazy"
          className="video-player__video"
        />

        {/* Close button */}
        {isEnlarged && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsEnlarged(false);
            }}
            className="video-player__close-button"
          >
            <Plus className="video-player__close-icon" />
          </span>
        )}
      </motion.div>
    </>
  );
}
