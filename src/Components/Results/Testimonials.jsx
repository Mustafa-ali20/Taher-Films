import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const textRefs = useRef([]);
  const audioRefs = useRef([]);
  const playIconRefs = useRef([]);
  const playTextRefs = useRef([]);
  const waveformRefs = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(null);

  const testimonials = [
    {
      id: 1,
      image: "/images/testi/ak-results.jpg",
      name: "Abdul Kareem",
      title: "Indian Food Vlogger",
      text: "If you want to stand out and dominate your niche, Taher brings strategy and creative direction that actually works. My content reached millions, looked more polished, and growth became consistent.",
      rotation: "rotate-1",
      audio: null,
    },
    {
      id: 2,
      image: "/images/testi/hk.jpg",
      name: "Hussain Hakimuddin",
      title: "Indian Content Creator",
      text: "Taher is a very patient person who knows exactly what to do. His edits are clear, focused, and on point. He does an excellent job of creating edits that capture the audience's attention and make the content engaging, building a strong connection with viewers.",
      rotation: "-rotate-1",
      audio: "/audio/hk testi.mp3",
    },
    {
      id: 3,
      image: "/images/testi/Abdu.jpg",
      name: "Abdu Tayyib",
      title: "English Podcast Host",
      text: "If you want to scale without burning out, Taher handles everything so you can focus on creating. My videos went viral, quality skyrocketed, and growth became effortless.",
      rotation: "rotate-1",
      audio: "/audio/Abdu testimonial.mp3",
    },
    {
      id: 4,
      image: "/images/testi/abbas.jpg",
      name: "Abbas",
      title: "Marketing Manager at Pro Sports ",
      text: "It was great working with you. Your ideas and knowledge is very impressive. I got great response from that video I am surely doing more projects with you..",
      rotation: "-rotate-1",
      audio: null,
    },
    {
      id: 5,
      image: "/images/testi/anwar.jpg",
      name: "Anwar Hakim",
      title: "Founder Of SMB Designs",
      text: "My second video with Taher went viral, bringing great growth and engagement. He truly understands the algorithm, and working with him is always comfortable and professional.",
      rotation: "rotate-1",
      audio: "/audio/anwar testi.mp3",
    },
  ];

  useEffect(() => {
    textRefs.current.forEach((textElement) => {
      if (!textElement) return;

      const words = textElement.textContent.split(" ");
      textElement.innerHTML = words
        .map((word) => `<span class="word-span">${word}</span>`)
        .join(" ");

      const wordSpans = textElement.querySelectorAll(".word-span");

      gsap.set(wordSpans, { color: "#71717a" });

      gsap.to(wordSpans, {
        color: "#ffffff",
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textElement,
          start: "top 100%",
          end: "bottom 80%",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Blinking animation for play icon
  useEffect(() => {
    playIconRefs.current.forEach((icon, index) => {
      if (!icon || playingIndex === index) return;

      gsap.to(icon, {
        opacity: 0.4,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    return () => {
      playIconRefs.current.forEach((icon) => {
        if (icon) {
          gsap.killTweensOf(icon);
        }
      });
    };
  }, [playingIndex]);

  useEffect(() => {
    if (playingIndex !== null) {
      const waveformLines =
        waveformRefs.current[playingIndex]?.querySelectorAll(".wave-line");
      if (waveformLines) {
        waveformLines.forEach((line, i) => {
          gsap.to(line, {
            scaleY: 1.5,
            duration: 0.4,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: i * 0.1,
          });
        });
      }
    }

    return () => {
      waveformRefs.current.forEach((waveform) => {
        if (waveform) {
          const lines = waveform.querySelectorAll(".wave-line");
          lines.forEach((line) => {
            gsap.killTweensOf(line);
          });
        }
      });
    };
  }, [playingIndex]);

  const handleAudioToggle = (index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      audio.currentTime = 0;
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex].pause();
        audioRefs.current[playingIndex].currentTime = 0;
      }
      audio.currentTime = 0;
      audio.play();
      setPlayingIndex(index);
    }
  };

  useEffect(() => {
    audioRefs.current.forEach((audio, index) => {
      if (audio) {
        const handleEnded = () => setPlayingIndex(null);
        audio.addEventListener("ended", handleEnded);
      }
    });

    return () => {
      audioRefs.current.forEach((audio) => {
        if (audio) {
          const handleEnded = () => setPlayingIndex(null);
          audio.removeEventListener("ended", handleEnded);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-[335vh] md:min-h-[265vh] lg:min-h-[240vh] py-12 px-4 md:px-8 lg:px-16 flex items-center">
      <style>{`
        .word-span {
          display: inline;
          white-space: pre-wrap;
        }
      `}</style>
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white text-center mb-12 lg:mb-23 font-[villo]">
          Clients' <span className="font-[apple]">Testimonials.</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-18 md:gap-20 lg:gap-x-16 lg:gap-y-20">
          {testimonials.map((testimonial, index) => {
            const isCentered = (index + 1) % 3 === 0;

            return (
              <div
                key={testimonial.id}
                className={`flex flex-col items-center ${
                  isCentered ? "lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`bg-white p-1 pb-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 w-full max-w-[200px] mb-6 lg:hover:scale-105 ${testimonial.rotation}`}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden mb-1 bg-gray-200 relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    {testimonial.audio && (
                      <>
                        <audio
                          ref={(el) => (audioRefs.current[index] = el)}
                          src={testimonial.audio}
                        />
                        <button
                          onClick={() => handleAudioToggle(index)}
                          className="absolute bottom-2 right-2 min-w-[40px] h-10 bg-white/20 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center transition-all duration-300 overflow-hidden"
                          aria-label={
                            playingIndex === index
                              ? "Pause audio"
                              : "Play audio"
                          }
                        >
                          {playingIndex === index ? (
                            <div
                              ref={(el) => (waveformRefs.current[index] = el)}
                              className="flex items-center justify-center gap-0.5"
                            >
                              <div className="wave-line w-0.5 h-2 bg-white rounded-full"></div>
                              <div className="wave-line w-0.5 h-3 bg-white rounded-full"></div>
                              <div className="wave-line w-0.5 h-2 bg-white rounded-full"></div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center relative w-full h-full">
                              <Play
                                ref={(el) => (playIconRefs.current[index] = el)}
                                className="w-5 h-5 text-white transition-opacity duration-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                fill="white"
                              />
                            </div>
                          )}
                        </button>
                      </>
                    )}
                  </div>

                  <p className="font-bold text-base text-black text-left px-1 font-[villo]">
                    {testimonial.name}
                  </p>

                  <p className="text-xs text-gray-600 text-left px-1 font-[villo]">
                    {testimonial.title}
                  </p>
                </div>

                <p
                  ref={(el) => (textRefs.current[index] = el)}
                  className={`text-xl md:text-2xl lg:text-2xl lg:leading-7 text-center font-[apple-l] ${
                    isCentered
                      ? "max-w-[400px] lg:max-w-[400px]"
                      : "md:max-w-2/3 lg:max-w-2/3"
                  }`}
                >
                  "{testimonial.text}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
