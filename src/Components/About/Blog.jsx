// import { Asterisk, Volume2, VolumeX } from "lucide-react";

// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// function Blog() {
//   const [isHovered, setIsHovered] = useState(false);
//   const [activeVideoIndex, setActiveVideoIndex] = useState(null);
//   const [mutedStates, setMutedStates] = useState(Array(8).fill(true));
//   const [isLargeScreen, setIsLargeScreen] = useState(false);
//   const navigate = useNavigate();

//   const headingRef = useRef(null);
//   const cardsRef = useRef([]);
//   const videoRefs = useRef([]);

//   const cards = [
//     {
//       id: 1,
//       bgColor: "bg-zinc-500",
//       video: "/videos/blog/taherfilms1.mp4",
//       rotation: -1.5,
//     },
//     {
//       id: 2,
//       bgColor: "bg-zinc-500",
//       video: "/videos/blog/taherfilms5.mp4",
//       rotation: 0.5,
//     },
//     {
//       id: 3,
//       bgColor: "bg-zinc-500",
//       video: "/videos/blog/taherfilms2.mp4",
//       rotation: -1.5,
//     },
//     {
//       id: 4,
//       bgColor: "bg-zinc-500",
//       video: "/videos/blog/taherfilms3.mp4",
//       rotation: -1,
//     },
//     {
//       id: 5,
//       bgColor: "bg-zinc-500",
//       video: "/videos/blog/taherfilms4.mp4",
//       rotation: 1,
//     },
//     {
//       id: 6,
//       bgColor: "bg-zinc-500",
//       video: "/videos/blog/taherfilms6.mp4",
//       rotation: -0.5,
//     },
//     {
//       id: 7,
//       bgColor: "bg-zinc-500",
//       video: "/videos/blog/taherfilms7.mp4",
//       rotation: 0.5,
//     },
//     {
//       id: 8,
//       bgColor: "bg-zinc-500",
//       video: "/videos/blog/taherfilms8.mp4",
//       rotation: -1.5,
//     },
//   ];

//   // Check screen size
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);

//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // GSAP Animations
//   useEffect(() => {
//     // Animate heading
//     gsap.fromTo(
//       headingRef.current,
//       {
//         y: 60,
//         opacity: 0,
//       },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: headingRef.current,
//           start: "top 80%",
//           once: true,
//         },
//       }
//     );

//     // Animate cards with random stagger
//     cardsRef.current.forEach((card, index) => {
//       if (card) {
//         const randomDelay = Math.random() * 0.4;

//         gsap.fromTo(
//           card,
//           {
//             y: 80,
//             opacity: 0,
//           },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 1.2,
//             delay: randomDelay,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: card,
//               start: "top 90%",
//               once: true,
//             },
//           }
//         );
//       }
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   // Desktop hover handler (large screens only)
//   const handleVideoHover = (index) => {
//     if (!isLargeScreen) return;
    
//     setActiveVideoIndex(index);
    
//     // Pause all videos except the hovered one
//     videoRefs.current.forEach((video, i) => {
//       if (video) {
//         if (i === index) {
//           // Unmute and play the hovered video
//           video.muted = false;
//           video.play();
//         } else {
//           // Pause other videos
//           video.pause();
//         }
//       }
//     });
//   };

//   // Desktop hover leave handler (large screens only)
//   const handleVideoLeave = (index) => {
//     if (!isLargeScreen) return;
    
//     setActiveVideoIndex(null);
    
//     // Resume all videos muted
//     videoRefs.current.forEach((video) => {
//       if (video) {
//         video.muted = true;
//         video.play();
//       }
//     });
//   };

//   // Mobile/Tablet click handler (small/medium screens only)
//   const handleVideoClick = (index) => {
//     if (isLargeScreen) return;
    
//     const video = videoRefs.current[index];
//     if (!video) return;

//     const newMutedStates = [...mutedStates];
//     const isCurrentlyMuted = newMutedStates[index];

//     if (isCurrentlyMuted) {
//       // Unmute this video and pause all others
//       setActiveVideoIndex(index);
//       newMutedStates[index] = false;
//       video.muted = false;
//       video.play();

//       // Pause other videos
//       videoRefs.current.forEach((v, i) => {
//         if (v && i !== index) {
//           v.pause();
//         }
//       });
//     } else {
//       // Mute this video and resume all others
//       setActiveVideoIndex(null);
//       newMutedStates[index] = true;
//       video.muted = true;

//       // Resume all videos muted
//       videoRefs.current.forEach((v) => {
//         if (v) {
//           v.muted = true;
//           v.play();
//         }
//       });
//     }

//     setMutedStates(newMutedStates);
//   };

//   return (
//     <div className="min-h-screen w-full px-10 md:px-20 lg:px-30 py-20 lg:py-58">
//       {/* Heading */}
//       <h2
//         ref={headingRef}
//         className="text-4xl md:text-5xl lg:text-6xl text-white text-center mb-16 lg:mb-20 overflow-hidden"
//       >
//         <span className="font-[villo] leading-20">Blog </span>
//         <span className="font-[apple]">Space.</span>
//       </h2>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-4 justify-items-center mb-16 lg:mb-26">
//         {cards.map((card, index) => (
//           <div
//             key={card.id}
//             ref={(el) => (cardsRef.current[index] = el)}
//             className={`${card.bgColor} h-[30vh] w-[40vw] md:h-[40vh] md:w-[40vw] lg:h-[60vh] lg:w-[20vw] rounded-3xl transition-all duration-500 ease-out cursor-pointer mb-10 relative overflow-hidden`}
//             style={{
//               transform: `rotate(${card.rotation}deg)`,
//               transformOrigin: "bottom",
//             }}
//             onClick={() => handleVideoClick(index)}
//             onMouseEnter={(e) => {
//               handleVideoHover(index);
//               if (isLargeScreen) {
//                 gsap.to(e.currentTarget, {
//                   scale: 1.03,
//                   boxShadow: "0 0 30px rgba(255,255,255,0.15)",
//                   duration: 0.5,
//                   ease: "power2.out",
//                 });
//               }
//             }}
//             onMouseLeave={(e) => {
//               handleVideoLeave(index);
//               if (isLargeScreen) {
//                 gsap.to(e.currentTarget, {
//                   scale: 1,
//                   boxShadow: "0 0 0px rgba(255,255,255,0)",
//                   duration: 0.5,
//                   ease: "power2.out",
//                 });
//               }
//             }}
//           >
//             {card.video && (
//               <video
//                 ref={(el) => (videoRefs.current[index] = el)}
//                 src={card.video}
//                 className="w-full h-full object-cover rounded-3xl"
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//               />
//             )}

//             {/* Blur Overlay - works on all screen sizes */}
//             <div
//               className={`absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none ${
//                 activeVideoIndex !== null && activeVideoIndex !== index
//                   ? "opacity-100"
//                   : "opacity-0"
//               }`}
//               style={{
//                 background: "rgba(0, 0, 0, 0.3)",
//                 backdropFilter: "blur(8px)",
//                 WebkitBackdropFilter: "blur(8px)",
//               }}
//             />

//             {/* Audio indicator for small/medium screens */}
//             {!isLargeScreen && (
//               <div
//                 className={`absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 transition-all duration-300 z-10 ${
//                   !mutedStates[index] ? 'bg-white/20' : ''
//                 }`}
//               >
//                 {mutedStates[index] ? (
//                   <VolumeX className="w-5 h-5 text-white" strokeWidth={2} />
//                 ) : (
//                   <Volume2 className="w-5 h-5 text-white" strokeWidth={2} />
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Centered Button */}
//       <div className="flex justify-center">
//         <button
//           onClick={() => navigate("/work")}
//           className="group relative bg-[#1a1a1a] text-white px-6 py-3 md:px-10 md:py-4 lg:px-8 lg:py-3 rounded-full flex items-center gap-3 md:gap-4 transition-all duration-300 border-t border-l border-r border-gray-600/40 border-b-0 overflow-hidden"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {/* Animated Background Layer */}
//           <div
//             className="absolute inset-0 rounded-full transition-opacity duration-300"
//             style={{
//               opacity: isHovered ? 1 : 0,
//               pointerEvents: "none",
//             }}
//           >
//             {/* Glassmorphism Layer */}
//             <div
//               className="absolute inset-0 rounded-full"
//               style={{
//                 background: "rgba(255, 255, 255, 0.05)",
//                 backdropFilter: "blur(10px)",
//                 WebkitBackdropFilter: "blur(10px)",
//                 border: "1px solid rgba(255, 255, 255, 0.1)",
//                 zIndex: 1,
//               }}
//             />

//             {/* Animated Color Orbs Behind Glass */}
//             <div
//               className="absolute inset-0 overflow-hidden rounded-full"
//               style={{ zIndex: 0 }}
//             >
//               {/* Orb 1 - Bright Rose */}
//               <div
//                 className="absolute w-24 h-24 rounded-full"
//                 style={{
//                   background:
//                     "radial-gradient(circle, rgba(255, 85, 174, 0.9) 0%, rgba(255, 85, 174, 0) 70%)",
//                   filter: "blur(20px)",
//                   top: "20%",
//                   left: "10%",
//                   animation: "float1 8s ease-in-out infinite",
//                 }}
//               />

//               {/* Orb 2 - Bright Crimson */}
//               <div
//                 className="absolute w-28 h-28 rounded-full"
//                 style={{
//                   background:
//                     "radial-gradient(circle, rgba(255, 50, 50, 0.85) 0%, rgba(255, 50, 50, 0) 70%)",
//                   filter: "blur(25px)",
//                   top: "40%",
//                   right: "15%",
//                   animation: "float2 10s ease-in-out infinite",
//                 }}
//               />

//               {/* Orb 3 - Bright Maroon */}
//               <div
//                 className="absolute w-20 h-20 rounded-full"
//                 style={{
//                   background:
//                     "radial-gradient(circle, rgba(200, 0, 60, 0.85) 0%, rgba(200, 0, 60, 0) 70%)",
//                   filter: "blur(18px)",
//                   bottom: "25%",
//                   left: "40%",
//                   animation: "float3 9s ease-in-out infinite",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Icon with circular white background */}
//           <div className="bg-white rounded-full p-1 md:p-1 flex items-center justify-center transition-transform duration-300 group-hover:rotate-90 relative z-10">
//             <Asterisk
//               className="w-4 h-4 md:w-5 md:h-5 text-black"
//               strokeWidth={2}
//             />
//           </div>

//           {/* Text */}
//           <span className="text-sm md:text-lg lg:text-lg font-light tracking-wide relative font-[villo] z-10">
//             Go to Works
//           </span>
//         </button>
//       </div>

//       <style jsx="true">{`
//         @keyframes float1 {
//           0%,
//           100% {
//             transform: translate(0, 0);
//           }
//           50% {
//             transform: translate(20px, -15px);
//           }
//         }
//         @keyframes float2 {
//           0%,
//           100% {
//             transform: translate(0, 0);
//           }
//           50% {
//             transform: translate(-25px, 20px);
//           }
//         }
//         @keyframes float3 {
//           0%,
//           100% {
//             transform: translate(0, 0);
//           }
//           50% {
//             transform: translate(15px, 15px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Blog;

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
      video: "/videos/blog/taherfilms3.mp4",
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