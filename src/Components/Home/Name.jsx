import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion, useSpring, useMotionValue } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

function Name() {
  const taherRef = useRef(null);
  const filmsRef = useRef(null);
  const taherRefLarge = useRef(null);
  const filmsRefLarge = useRef(null);
  const subhead = useRef(null);
  const subheadLarge = useRef(null);
  // Mouse position state for video magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for magnetic effect
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    const delayTime = hasSeenLoader ? 1 : 7;

    if (!hasSeenLoader) {
      sessionStorage.setItem("hasSeenLoader", "true");
    }

    const splitText = (element) => {
      if (!element) return [];
      const text = element.textContent;
      element.innerHTML = "";
      return text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        element.appendChild(span);
        return span;
      });
    };

    // Setup small screen animation
    const taherLetters = splitText(taherRef.current);
    const filmsElement = filmsRef.current;
    const subheadElement = subhead.current;

    gsap.set([filmsElement, subheadElement], { y: 40, opacity: 0 });

    // Setup large screen animation
    const taherLettersLarge = splitText(taherRefLarge.current);
    const filmsElementLarge = filmsRefLarge.current;
    const subheadElementLarge = subheadLarge.current;

    gsap.set([filmsElementLarge, subheadElementLarge], { y: 40, opacity: 0 });

    // Small screen timeline
    const tlSmall = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: delayTime,
    });

    tlSmall.fromTo(
      taherLetters,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.08 }
    );

    tlSmall.fromTo(
      subheadElement,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      "-=0.8"
    );

    tlSmall.fromTo(
      filmsElement,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      "-=1"
    );

    // Large screen timeline
    const tlLarge = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: delayTime,
    });

    tlLarge.fromTo(
      taherLettersLarge,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.08 }
    );

    tlLarge.fromTo(
      subheadElementLarge,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      "-=0.8"
    );

    tlLarge.fromTo(
      filmsElementLarge,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      "-=1"
    );

    return () => {
      tlSmall.kill();
      tlLarge.kill();
    };
  }, []);

  // Magnetic effect for video on large screens
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const strength = 0.03;

      mouseX.set(distanceX * strength);
      mouseY.set(distanceY * strength);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* IMPORTANT: Add data-component attribute to identify this section */}
      <div
        data-component="name"
        className="h-[65vh] md:h-[85vh] lg:h-screen w-full px-10 md:px-15 lg:px-20 text-white lg:pb-10 "
      >
        {/* Small and Medium Screens */}
        <div className="lg:hidden pt-20 md:pt-37 w-full flex flex-col justify-center">
          <p
            ref={subhead}
            className="flex justify-center mb-7 md:mb-10 text-xs md:text-sm font-[villo] font-bold text-zinc-500"
          >
            CRAFTING VISUAL STORIES SINCE — Y:2020
          </p>

          <div className="relative w-full">
            <VideoPlayer videoSrc="/videos/blog/introvid.mp4" />
            <h1 className="text-[28vw] sm:text-[16vw] md:text-[34vw] font-[villo3] leading-[0.9] tracking-tight text-center w-full select-none">
              <span ref={taherRef}>TAHER</span>
              <br />
              <span className="inline-block" ref={filmsRef}>
                FILMS
              </span>
            </h1>
          </div>

          <p className="text-center font-[villo] md:w-3/4 mx-auto mt-20 md:text-xl text-zinc-200 md:leading-10">
            I'm Taher Husain — a content marketer and filmmaker based in
            Kuwait, shaping brands through cinematic content and visual
            storytelling for over 5 years.
          </p>
        </div>

        {/* Large Screens with Magnetic Effect */}
        <div className="hidden lg:flex lg:flex-col pt-35 h-full">
          <p
            ref={subheadLarge}
            className="flex justify-center mb-10 lg:text-sm font-[villo] font-bold text-zinc-500"
          >
            CRAFTING VISUAL STORIES SINCE — Y:2020
          </p>

          <div className="relative w-full">
            <motion.div
              style={{ x, y }}
              className="absolute inset-0 pointer-events-none will-change-transform z-1"
            >
              <VideoPlayer videoSrc="/videos/blog/introvid.mp4" />
            </motion.div>

            <h1 className="text-[15vw] font-[villo3] leading-[0.9] tracking-tight text-center select-none">
              <span ref={taherRefLarge}>TAHER</span>
              <br />
              <span className="inline-block" ref={filmsRefLarge}>
                FILMS
              </span>
            </h1>
          </div>

          <p className="text-center font-[villo] md:w-2/6 mx-auto mt-20 md:text-xl text-zinc-200 md:leading-10">
            I'm Taher Husain — a content marketer and filmmaker based in
            Kuwait, shaping brands through cinematic content and visual
            storytelling for over 5 years.
          </p>
        </div>
      </div>
    </>
  );
}

export default Name;
