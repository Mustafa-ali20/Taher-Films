import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const TextAnim = () => {
  const containerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timelineRef = useRef(null);

  const resetAnimation = () => {
    gsap.set(".taher-grey, .films-grey, .taher-white, .films-white", {
      opacity: 0,
    });
  };

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    timelineRef.current = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    // Grey reveal
    timelineRef.current
      .to(".taher-grey, .films-grey", {
        opacity: 1,
        duration: 0.15,
        ease: "power2.out",
        stagger: 0.02,
      })
      // White takeover
      .to(
        ".taher-white, .films-white",
        {
          opacity: 1,
          duration: 0.15,
          ease: "power2.out",
          stagger: 0.02,
        },
        "+=0.1"
      )
      // Quick exit
      .to(
        ".taher-white, .films-white, .taher-grey, .films-grey",
        {
          opacity: 0,
          duration: 0.06,
          ease: "power2.in",
          stagger: 0.01,
        },
        "+=0.6"
      );
  };

  useEffect(() => {
    resetAnimation();
    const timer = setTimeout(() => startAnimation(), 200);
    return () => {
      clearTimeout(timer);
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  // Generate 16 lines
  const textLines = Array.from({ length: 16 }, (_, index) => (
    <div
      key={index}
      className="flex gap-[50vw] items-center relative font-[nf]"
    >
      {/* First group */}
      <div className="flex gap-12 relative ">
        {/* Grey */}
        <span className="taher-grey text-gray-400 font-semibold uppercase tracking-[0.5em] opacity-0">
          TAHER
        </span>
        <span className="films-grey text-gray-400 font-semibold uppercase tracking-[0.5em] opacity-0">
          FILMS
        </span>
        {/* White overlay */}
        <div className="absolute inset-0 flex gap-12">
          <span className="taher-white text-white font-semibold uppercase tracking-[0.5em] opacity-0">
            TAHER
          </span>
          <span className="films-white text-white font-semibold uppercase tracking-[0.5em] opacity-0">
            FILMS
          </span>
        </div>
      </div>

      {/* Second group */}
      <div className="flex gap-12 relative ">
        {/* Grey */}
        <span className="taher-grey text-gray-400 font-semibold uppercase tracking-[0.5em] opacity-0">
          TAHER
        </span>
        <span className="films-grey text-gray-400 font-semibold uppercase tracking-[0.5em] opacity-0">
          FILMS
        </span>
        {/* White overlay */}
        <div className="absolute inset-0 flex gap-12">
          <span className="taher-white text-white font-semibold uppercase tracking-[0.5em] opacity-0">
            TAHER
          </span>
          <span className="films-white text-white font-semibold uppercase tracking-[0.5em] opacity-0">
            FILMS
          </span>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="h-screen flex flex-col">
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <div ref={containerRef} className="w-[75vw] z-20">
          <div className="text-md leading-10">{textLines}</div>
        </div>
      </div>
    </div>
  );
};

export default TextAnim;
