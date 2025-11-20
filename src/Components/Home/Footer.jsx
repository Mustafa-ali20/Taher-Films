import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// Animated gradient orbs component with 4 elements
const AnimatedGradientOrbs = () => {
  const orbs = [
    // Top Left
    {
      id: 1,
      sizeClasses: "w-64 h-64 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px]",
      color: "from-[#C1121F] to-[#72121B]",
      positionClasses:
        "-top-32 -left-32 md:-top-40 md:-left-40 lg:-top-48 lg:-left-48",
      initial: { x: 0, y: 0, opacity: 0.25 },
      animate: {
        x: [0, 120, -80, 100, 0],
        y: [0, 180, -120, 150, 0],
        opacity: [0.25, 0.4, 0.2, 0.35, 0.25],
      },
      duration: 16,
      delay: 0,
    },
    // Top Right
    {
      id: 2,
      sizeClasses: "w-72 h-72 md:w-96 md:h-96 lg:w-[550px] lg:h-[550px]",
      color: "from-[#ff1f5a] to-[#C1121F]",
      positionClasses:
        "-top-24 -right-24 md:-top-32 md:-right-32 lg:-top-40 lg:-right-40",
      initial: { x: 0, y: 0, opacity: 0.22 },
      animate: {
        x: [0, -140, 90, -120, 0],
        y: [0, 160, -140, 170, 0],
        opacity: [0.22, 0.38, 0.18, 0.36, 0.22],
      },
      duration: 18,
      delay: 2,
    },
    // Bottom Left
    {
      id: 3,
      sizeClasses: "w-80 h-80 md:w-96 md:h-96 lg:w-[520px] lg:h-[520px]",
      color: "from-[#AA1A21] to-[#ff1f5a]",
      positionClasses:
        "-bottom-32 -left-40 md:-bottom-40 md:-left-48 lg:-bottom-48 lg:-left-56",
      initial: { x: 0, y: 0, opacity: 0.23 },
      animate: {
        x: [0, 110, -100, 90, 0],
        y: [0, -150, 130, -160, 0],
        opacity: [0.23, 0.39, 0.19, 0.37, 0.23],
      },
      duration: 17,
      delay: 3,
    },
    // Bottom Right
    {
      id: 4,
      sizeClasses: "w-72 h-72 md:w-80 md:h-80 lg:w-[480px] lg:h-[480px]",
      color: "from-[#72121B] to-[#AA1A21]",
      positionClasses:
        "-bottom-24 -right-32 md:-bottom-32 md:-right-40 lg:-bottom-40 lg:-right-48",
      initial: { x: 0, y: 0, opacity: 0.2 },
      animate: {
        x: [0, -130, 100, -110, 0],
        y: [0, 140, -160, 120, 0],
        opacity: [0.2, 0.36, 0.15, 0.34, 0.2],
      },
      duration: 19,
      delay: 1,
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          initial={orb.initial}
          animate={orb.animate}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
          className={`absolute ${orb.sizeClasses} bg-gradient-to-br ${orb.color} rounded-full blur-3xl ${orb.positionClasses}`}
        />
      ))}
    </div>
  );
};

// Magnetic effect component with Framer Motion
const MagneticEffect = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const emailAddress = "taherfilmss@gmail.com";

const handleGmailClick = () => {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;
  window.open(gmailUrl, "_blank");
};

function Footer() {
  const headingLine1Ref = useRef(null);
  const headingLine2Ref = useRef(null);
  const quoteRef = useRef(null);
  const copyrightRef = useRef(null);
  const nameRef = useRef(null);
  const navLinksDesktopRef = useRef([]);
  const navLinksMobileRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Heading line 1 animation
    gsap.fromTo(
      headingLine1Ref.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingLine1Ref.current,
          start: "top 95%",
          once: true,
        },
      }
    );

    // Heading line 2 animation with stagger delay
    gsap.fromTo(
      headingLine2Ref.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: headingLine1Ref.current,
          start: "top 95%",
          once: true,
        },
      }
    );

    // Quote animation
    gsap.fromTo(
      quoteRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 95%",
          once: true,
        },
      }
    );

    // Copyright animation - earlier trigger
    gsap.fromTo(
      copyrightRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: copyrightRef.current,
          start: "top 95%",
          once: true,
        },
      }
    );

    // Name animation with slight delay - earlier trigger
    gsap.fromTo(
      nameRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: copyrightRef.current,
          start: "top 95%",
          once: true,
        },
      }
    );

    // Desktop navigation links - letter by letter animation (no position change)
    navLinksDesktopRef.current.forEach((link) => {
      if (link) {
        const letters = link.querySelectorAll(".nav-letter");
        gsap.fromTo(
          letters,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.04,
            scrollTrigger: {
              trigger: link,
              start: "top 95%",
              once: true,
            },
          }
        );
      }
    });

    // Mobile navigation links - letter by letter animation (no position change)
    navLinksMobileRef.current.forEach((link) => {
      if (link) {
        const letters = link.querySelectorAll(".nav-letter");
        gsap.fromTo(
          letters,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.04,
            scrollTrigger: {
              trigger: link,
              start: "top 95%",
              once: true,
            },
          }
        );
      }
    });
  }, []);

  // Function to split text into individual letters
  const splitIntoLetters = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="nav-letter inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div className="relative lg:h-fit w-full text-white font-[villo] overflow-hidden">
      {/* Animated gradient orbs */}
      <AnimatedGradientOrbs />

      {/* Lighter glassmorphic overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl border border-white/15 pointer-events-none" />

      {/* Content container */}
      <div className="relative z-10 h-full w-full px-8 md:px-16 lg:px-58 py-16 md:py-20 lg:py-17">
        {/* Main Container */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start w-full">
          {/* Left Side Content */}
          <div className="flex flex-col lg:w-[80%] lg:pr-20">
            {/* Heading */}
            <h1 className="font-bold text-3xl md:text-5xl lg:text-5xl mb-6 md:mb-8 lg:mb-4 lg:leading-14 overflow-hidden">
              <span ref={headingLine1Ref} className="inline-block">
                Bring your stories to{" "}
                <span className="font-[apple-lg] font-light">life,</span>
              </span>{" "}
              <br />
              <span ref={headingLine2Ref} className="inline-block">
                frame by frame.
              </span>
            </h1>

            {/* Quote */}
            <p
              ref={quoteRef}
              className="w-2/3 lg:w-2/4 md:w-2/3 text-base md:text-lg lg:text-xl mb-8 md:mb-10 lg:mb-5 text-gray-300 leading-relaxed overflow-hidden"
            >
              <i>
                {" "}
                You've got a story. Let's tell it in a way that feels real, hits
                home, and sticks with people.
              </i>
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-10 mb-8 md:mb-10 lg:mb-12">
              <MagneticEffect>
                <div className="cursor-pointer">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/taherfilms/"
                    className="block"
                  >
                    <FaInstagram className="w-6 h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 " />
                  </a>
                </div>
              </MagneticEffect>

              <MagneticEffect>
                <div className="cursor-pointer">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://wa.me/+96597522752"
                    className="block"
                  >
                    <FaWhatsapp className="w-6 h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 " />
                  </a>
                </div>
              </MagneticEffect>

              <MagneticEffect>
                <div className="cursor-pointer">
                  <a
                    onClick={handleGmailClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <IoMailOutline className="w-6 h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 " />
                  </a>
                </div>
              </MagneticEffect>
            </div>

            {/* Navigation - Shows on small screens only */}
            {/* <div className="flex flex-col gap-2 mb-12 lg:hidden">
              <h2 className="font-bold text-lg mb-2">[NAVIGATION]</h2>
              <h3
                ref={(el) => (navLinksMobileRef.current[0] = el)}
                onClick={() => navigate("/")}
                className="text-base cursor-pointer text-zinc-300 hover:text-zinc-100 transition-colors w-fit"
              >
                {splitIntoLetters("Home")}
              </h3>
              <h3
                ref={(el) => (navLinksMobileRef.current[1] = el)}
                onClick={() => navigate("/work")}
                className="text-base cursor-pointer text-zinc-300 hover:text-zinc-100 transition-colors w-fit"
              >
                {splitIntoLetters("Work")}
              </h3>
              <h3
                ref={(el) => (navLinksMobileRef.current[2] = el)}
                onClick={() => navigate("/results")}
                className="text-base cursor-pointer text-zinc-300 hover:text-zinc-100 transition-colors w-fit"
              >
                {splitIntoLetters("Results")}
              </h3>
              <h3
                ref={(el) => (navLinksMobileRef.current[3] = el)}
                onClick={() => navigate("/about")}
                className="text-base cursor-pointer text-zinc-300 hover:text-zinc-100 transition-colors w-fit"
              >
                {splitIntoLetters("About")}
              </h3>
            </div> */}

            {/* Copyright and Name */}
            <div className="mt-auto overflow-hidden">
              <h2
                ref={copyrightRef}
                className="font-bold text-4xl md:text-5xl lg:text-7xl mb-3"
              >
                © 2025
              </h2>
              <h1
                ref={nameRef}
                className="font-extrabold text-5xl md:text-7xl lg:text-9xl w-full"
              >
                Taher Husain
              </h1>
            </div>
          </div>

          {/* Right Side - Navigation (Desktop only) */}
          <div className="hidden lg:flex lg:flex-col lg:items-end lg:pt-4">
            <h2 className="font-bold text-xl mb-6">[NAVIGATION]</h2>
            <h3
              ref={(el) => (navLinksDesktopRef.current[0] = el)}
              onClick={() => navigate("/")}
              className="text-lg mb-1 cursor-pointer text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              {splitIntoLetters("Home")}
            </h3>
            <h3
              ref={(el) => (navLinksDesktopRef.current[1] = el)}
              onClick={() => navigate("/work")}
              className="text-lg mb-1 cursor-pointer text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              {splitIntoLetters("Work")}
            </h3>
            <h3
              ref={(el) => (navLinksDesktopRef.current[2] = el)}
              onClick={() => navigate("/results")}
              className="text-lg mb-1 cursor-pointer text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              {splitIntoLetters("Results")}
            </h3>
            <h3
              ref={(el) => (navLinksDesktopRef.current[3] = el)}
              onClick={() => navigate("/about")}
              className="text-lg cursor-pointer text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              {splitIntoLetters("About")}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
