import { Asterisk, Volume2, VolumeX } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Blog.css";

gsap.registerPlugin(ScrollTrigger);

function Blog() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const [mutedStates, setMutedStates] = useState(Array(8).fill(true));
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const navigate = useNavigate();

  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const videoRefs = useRef([]);

  const cards = [
    {
      id: 1,
      video: "/videos/blog/taherfilms1.mp4",
      rotation: -1.5,
    },
    {
      id: 2,
      video: "/videos/blog/taherfilms5.mp4",
      rotation: 0.5,
    },
    {
      id: 3,
      video: "/videos/blog/taherfilms2.mp4",
      rotation: -1.5,
    },
    {
      id: 4,
      video: "/videos/blog/introvid.mp4",
      rotation: -1,
    },
    {
      id: 5,
      video: "/videos/blog/taherfilms4.mp4",
      rotation: 1,
    },
    {
      id: 6,
      video: "/videos/blog/taherfilms6.mp4",
      rotation: -0.5,
    },
    {
      id: 7,
      video: "/videos/blog/taherfilms7.mp4",
      rotation: 0.5,
    },
    {
      id: 8,
      video: "/videos/blog/taherfilms8.mp4",
      rotation: -1.5,
    },
  ];

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // GSAP Animations
  useEffect(() => {
    // Animate heading
    gsap.fromTo(
      headingRef.current,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Animate cards with random stagger
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const randomDelay = Math.random() * 0.4;

        gsap.fromTo(
          card,
          {
            y: 80,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: randomDelay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Desktop hover handler (large screens only)
  const handleVideoHover = (index) => {
    if (!isLargeScreen) return;
    
    setActiveVideoIndex(index);
    
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          video.currentTime = 0; // Restart video from beginning
          video.muted = false;
          video.play();
        } else {
          video.pause();
        }
      }
    });
  };

  // Desktop hover leave handler (large screens only)
  const handleVideoLeave = (index) => {
    if (!isLargeScreen) return;
    
    setActiveVideoIndex(null);
    
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.play();
      }
    });
  };

  // Mobile/Tablet click handler (small/medium screens only)
  const handleVideoClick = (index) => {
    if (isLargeScreen) return;
    
    const video = videoRefs.current[index];
    if (!video) return;

    const newMutedStates = [...mutedStates];
    const isCurrentlyMuted = newMutedStates[index];

    if (isCurrentlyMuted) {
      setActiveVideoIndex(index);
      newMutedStates[index] = false;
      video.currentTime = 0; // Restart video from beginning
      video.muted = false;
      video.play();

      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause();
        }
      });
    } else {
      setActiveVideoIndex(null);
      newMutedStates[index] = true;
      video.muted = true;

      videoRefs.current.forEach((v) => {
        if (v) {
          v.muted = true;
          v.play();
        }
      });
    }

    setMutedStates(newMutedStates);
  };

  return (
    <div className="blog-page">
      {/* Heading */}
      <h2 ref={headingRef} className="blog-page__heading">
        <span className="blog-page__heading-villo">Creative </span>
        <span className="blog-page__heading-apple">Journey.</span>
      </h2>

      {/* Cards Grid */}
      <div className="blog-page__grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="blog-page__card"
            style={{
              transform: `rotate(${card.rotation}deg)`,
              transformOrigin: "bottom",
            }}
            onClick={() => handleVideoClick(index)}
            onMouseEnter={(e) => {
              handleVideoHover(index);
              if (isLargeScreen) {
                gsap.to(e.currentTarget, {
                  scale: 1.03,
                  boxShadow: "0 0 30px rgba(255,255,255,0.15)",
                  duration: 0.5,
                  ease: "power2.out",
                });
              }
            }}
            onMouseLeave={(e) => {
              handleVideoLeave(index);
              if (isLargeScreen) {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  boxShadow: "0 0 0px rgba(255,255,255,0)",
                  duration: 0.5,
                  ease: "power2.out",
                });
              }
            }}
          >
            {card.video && (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={card.video}
                className="blog-page__card-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                loading="lazy"
              />
            )}

            {/* Blur Overlay */}
            <div
              className={`blog-page__card-overlay ${
                activeVideoIndex !== null && activeVideoIndex !== index
                  ? "blog-page__card-overlay--active"
                  : ""
              }`}
            />

            {/* Audio indicator for small/medium screens */}
            {!isLargeScreen && (
              <div
                className={`blog-page__audio-indicator ${
                  !mutedStates[index] ? 'blog-page__audio-indicator--unmuted' : ''
                }`}
              >
                {mutedStates[index] ? (
                  <VolumeX className="blog-page__audio-icon" strokeWidth={2} />
                ) : (
                  <Volume2 className="blog-page__audio-icon" strokeWidth={2} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Centered Button */}
      <div className="blog-page__button-container">
        <button
          onClick={() => navigate("/work")}
          className="blog-page__button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated Background Layer */}
          <div
            className="blog-page__button-bg"
            style={{
              opacity: isHovered ? 1 : 0,
              pointerEvents: "none",
            }}
          >
            {/* Glassmorphism Layer */}
            <div className="blog-page__button-glass" />

            {/* Animated Color Orbs Behind Glass */}
            <div className="blog-page__button-orbs">
              <div className="blog-page__button-orb blog-page__button-orb--1" />
              <div className="blog-page__button-orb blog-page__button-orb--2" />
              <div className="blog-page__button-orb blog-page__button-orb--3" />
            </div>
          </div>

          {/* Icon with circular white background */}
          <div className="blog-page__button-icon-wrapper">
            <Asterisk className="blog-page__button-icon" strokeWidth={2} />
          </div>

          {/* Text */}
          <span className="blog-page__button-text">Go to Works</span>
        </button>
      </div>
    </div>
  );
}

export default Blog;