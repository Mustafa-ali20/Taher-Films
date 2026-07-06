import { Asterisk, Volume2, VolumeX } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./DisplayProjects.css";

gsap.registerPlugin(ScrollTrigger);

function DisplayProjects() {
  const [isHovered, setIsHovered] = useState(false);
  const [mutedStates, setMutedStates] = useState({});
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const cards = [
    {
      id: 1,
      bgColor: "card-bg-2",
      video:
        "https://vz-963c42bb-849.b-cdn.net/77257f41-437e-4c16-89a2-31618f9db7b2/playlist.m3u8",
      creatorName: "akfoddvlogg",
      creatorProfile: "/images/testi/AK.jpg",
      rotation: 0.7,
    },
    {
      id: 2,
      bgColor: "card-bg-1",
      video:
        "https://vz-963c42bb-849.b-cdn.net/b4c11c1f-4c78-4bdf-b5a7-c8ad7c8ad7a3/playlist.m3u8",
      creatorName: "abdu.tayyib",
      creatorProfile: "/images/testi/Abdu.jpg",
      rotation: -0.4,
    },
    {
      id: 4,
      bgColor: "card-bg-4",
      video:
        "https://vz-963c42bb-849.b-cdn.net/17cd54ee-b3dc-4dd2-bdc7-c851da28365c/playlist.m3u8",
      creatorName: "hussainhk",
      creatorProfile: "/images/testi/hussain HK.jpg",
      rotation: 1,
    },
    {
      id: 3,
      bgColor: "card-bg-3",
      video:
        "https://vz-963c42bb-849.b-cdn.net/4fc0717c-db67-4437-a7fe-6bc677ac4ddc/playlist.m3u8",
      creatorName: "prosportskw",
      creatorProfile: "/images/testi/prosports.jpg",
      rotation: 0.3,
    },
  ];

  useEffect(() => {
    // Initialize all videos as muted
    const initialMutedStates = {};
    cards.forEach((card) => {
      initialMutedStates[card.id] = true;
    });
    setMutedStates(initialMutedStates);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
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
      },
    );

    cardsRef.current.forEach((card, index) => {
      if (card) {
        const randomDelay = Math.random() * 0.4;

        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
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
          },
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleMute = (cardId) => {
    setMutedStates((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="featured-work">
      {/* Heading */}
      <h2 ref={headingRef} className="featured-work__heading">
        <span className="font-villo">Featured </span>
        <span className="font-apple">Work.</span>
      </h2>

      {/* Cards Grid */}
      <div className="featured-work__grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className={`featured-work__card ${card.bgColor}`}
            style={{
              transform: `rotate(${card.rotation}deg)`,
              transformOrigin: "bottom",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.03,
                boxShadow: "0 0 30px rgba(255,255,255,0.15)",
                duration: 0.5,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                boxShadow: "0 0 0px rgba(255,255,255,0)",
                duration: 0.5,
                ease: "power2.out",
              });
            }}
          >
            {card.video && (
              <video
                src={card.video}
                className="featured-work__card-video"
                autoPlay
                loop
                muted={mutedStates[card.id] !== false}
                playsInline
                onMouseEnter={(e) => {
                  e.currentTarget.muted = false;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.muted = true;
                }}
              />
            )}

            {/* Mute/Unmute Button for Mobile/Tablet */}
            <button
              onClick={() => toggleMute(card.id)}
              className="absolute bottom-4 right-4 lg:hidden p-2.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 z-10"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              {mutedStates[card.id] !== false ? (
                <VolumeX className="w-5 h-5 text-white" strokeWidth={2} />
              ) : (
                <Volume2 className="w-5 h-5 text-white" strokeWidth={2} />
              )}
            </button>

            {/* Creator Info */}
            <div className="featured-work__creator">
              <img
                src={card.creatorProfile}
                alt={card.creatorName}
                className="featured-work__creator-img"
              />
              <p className="featured-work__creator-name">{card.creatorName}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Centered Button - EXACT COPY FROM ORIGINAL */}
      <div className="featured-work__button-wrapper">
        <button
          onClick={() => navigate("/work")}
          className="group relative bg-[#1a1a1a] text-white px-6 py-3 md:px-10 md:py-4 lg:px-8 lg:py-3 rounded-full flex items-center gap-3 md:gap-4 transition-all duration-300 border-t border-l border-r border-gray-600/40 border-b-0 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated Background Layer */}
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              pointerEvents: "none",
            }}
          >
            {/* Glassmorphism Layer */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                zIndex: 1,
              }}
            />

            {/* Animated Color Orbs Behind Glass */}
            <div
              className="absolute inset-0 overflow-hidden rounded-full"
              style={{ zIndex: 0 }}
            >
              {/* Orb 1 - Bright Rose */}
              <div
                className="absolute w-24 h-24 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 85, 174, 0.9) 0%, rgba(255, 85, 174, 0) 70%)",
                  filter: "blur(20px)",
                  top: "20%",
                  left: "10%",
                  animation: "float1 8s ease-in-out infinite",
                }}
              />

              {/* Orb 2 - Bright Crimson */}
              <div
                className="absolute w-28 h-28 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 50, 50, 0.85) 0%, rgba(255, 50, 50, 0) 70%)",
                  filter: "blur(25px)",
                  top: "40%",
                  right: "15%",
                  animation: "float2 10s ease-in-out infinite",
                }}
              />

              {/* Orb 3 - Bright Maroon */}
              <div
                className="absolute w-20 h-20 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(200, 0, 60, 0.85) 0%, rgba(200, 0, 60, 0) 70%)",
                  filter: "blur(18px)",
                  bottom: "25%",
                  left: "40%",
                  animation: "float3 9s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          {/* Icon with circular white background */}
          <div className="bg-white rounded-full p-1 md:p-1 flex items-center justify-center transition-transform duration-300 group-hover:rotate-90 relative z-10">
            <Asterisk
              className="w-4 h-4 md:w-5 md:h-5 text-black"
              strokeWidth={2}
            />
          </div>

          {/* Text */}
          <span className="text-sm md:text-lg lg:text-lg font-light tracking-wide relative font-[villo] z-10">
            Go to Works
          </span>
        </button>
      </div>

      <style jsx="true">{`
        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -15px);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-25px, 20px);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(15px, 15px);
          }
        }
      `}</style>
    </div>
  );
}

export default DisplayProjects;
