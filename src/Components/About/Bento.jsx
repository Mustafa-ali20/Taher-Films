import { Youtube, Zap } from "lucide-react";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";

const Bento = () => {
  return (
    <div className="min-h-screen p-4 md:p-18 lg:min-h-screen lg:flex lg:items-center lg:py-8 text-white">
      <div className="max-w-7xl mx-auto w-full lg:min-h-[calc(100vh-7rem)]">
        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-3 lg:grid-rows-[1fr_1fr_0.5fr] lg:h-full font-[villo]">
          {/* Image Box - Takes full height on left (2 rows) */}
          <div className="lg:row-span-2 bg-zinc-500 rounded-3xl flex items-center justify-center h-[500px] md:h-[600px] lg:h-auto overflow-hidden">
            <img
              src="/images/pfp.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Intro Box - Wide box spanning 2 columns */}
          <div className="lg:col-span-2 rounded-3xl py-3 lg:py-6 px-8 flex flex-col justify-center h-[300px] lg:h-auto bg-black/40 border border-zinc-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_32px_rgba(161,161,170,0.12)]">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold font-[villo] mb-2">
              I'm Taher Husain.
            </h1>
            <div className="flex items-center gap-1 text-xl md:text-3xl lg:text-2xl font-[villo] mb-5">
              <h2 className="text-xl lg:text-2xl">AKA</h2>
              <div className="words text-xl lg:text-2xl">
                <span className="word">Videographer</span>
                <span className="word">Video Editor</span>
                <span className="word">Content Strategist</span>
                <span className="word">Videographer</span>
              </div>
            </div>
            <p className="text-xs md:text-sm lg:hidden text-zinc-200">
              It started with a Canon Rebel T6 and a 12-year-old boy who
              wouldn't stop pressing record or clicking photos. Now? He's
              turning ideas into videos that get results. Hi, I'm Taher, a
              content marketer who works with founders and influencers tired of
              posting without results. Together, we build content people
              actually stop for and that the algorithm rewards. For me, it's the
              tiny details that turn good into addictive and generic into
              relatable.Somewhere along the way, I got comfortable in front of
              the camera too.Now I'm figuring out what happens when the creator
              becomes the face.
            </p>

            <p className="hidden lg:block text-xs md:text-base text-zinc-200">
              It started with a Canon Rebel T6 and a 12-year-old boy who
              wouldn't stop pressing record or clicking photos. Now? He's
              turning ideas into videos that get results. Hi, I'm Taher, a
              content marketer who works with founders and influencers tired of
              posting without results. Together, we build content people
              actually stop for and that the algorithm rewards. For me, it's the
              tiny details that turn good into addictive and generic into
              relatable. Somewhere along the way, I got comfortable in front of
              the camera too. Now I'm figuring out what happens when the creator
              becomes the face. When I'm not working? I'm watching shows,
              breaking down scenes, and stacking skills to pull them off myself
              one day. Guess that's what happens when you love what you do.
            </p>
          </div>

          {/* Skills Box with Wave Animation */}
          <div className="rounded-3xl h-[300px] lg:h-auto relative overflow-hidden shadow-[0_0_20px_rgba(127,29,29,0.4)] hover:shadow-[0_0_40px_rgba(185,28,28,0.5)] transition-all duration-300">
            <div className="relative z-10 backdrop-blur-sm bg-red-950/30 border-6 border-red-800/40 rounded-3xl p-8 flex flex-col h-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] ">
              <h2 className="text-5xl md:text-5xl font-bold mb-6 lg:mb-10 flex justify-between">
                <span>Skills.</span>{" "}
                <span>
                  {" "}
                  <Zap size={35} />
                </span>
              </h2>
              <ul className="space-y-1.5 text-base md:text-xl lg:space-y-0 text-zinc-200">
                <li>▪ Video Editing</li>
                <li>▪ Videographer</li>
                <li>▪ Scripting</li>
                <li>▪ Visual Storytelling</li>
                <li>▪ Content Strategy</li>
              </ul>
            </div>
            <div className="wave-background"></div>
          </div>

          {/* Achievements Box */}
          <div className="rounded-3xl p-8 flex flex-col h-[300px] lg:h-auto bg-black/40 border border-zinc-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_32px_rgba(161,161,170,0.12)]">
            <h2 className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold mb-6 lg:mb-10">
              Achievements.
            </h2>
            <ul className="space-y-1.5 text-base md:text-xl lg:space-y-0 text-zinc-200">
              <li>▪ 300+ Videos Created</li>
              <li>▪ 1500+ Hours Of Editing</li>
              <li>▪ 10M+ Views Online</li>
              <li>▪ Collaborated with Top Influencers</li>
              <li>▪ Collaborated with Top Brands</li>
            </ul>
          </div>

          {/* Gear Box with 2 Equal Boxes Inside */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 bg-transparent rounded-3xl h-[150px] lg:h-auto mb-1 md:mb-9 lg:mb-0">
            {/* Small & Medium Screens */}
            <div className="lg:hidden w-full grid grid-cols-2 gap-4">
              <div className="rounded-3xl flex flex-col py-4 px-4 md:px-8 md:pt-6 w-full bg-black/40 border border-zinc-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_32px_rgba(161,161,170,0.12)]">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Gear.</h2>
                <ul className="text-sm md:text-base text-zinc-200">
                  <li>▪ Sony FX3</li>
                  <li>▪ Sigma 24-70 2.8</li>
                  <li>▪ Sennheiser System</li>
                  <li>▪ Godox LED Panels</li>
                </ul>
              </div>

              <div className="rounded-3xl flex flex-col py-4 px-4 md:px-8 md:pt-6 w-full bg-black/40 border border-zinc-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_32px_rgba(161,161,170,0.12)]">
                <h2 className="text-3xl font-bold mb-2">Socials.</h2>
                <ul className="text-sm md:text-xl space-y-1 text-zinc-200">
                  <li>
                    <a
                      href="https://www.instagram.com/taherfilms/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ▪ Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/+96597522752"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ▪ WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@TaherFilmss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      ▪ Yotube
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Large Screens */}
            <div className="hidden lg:flex lg:flex-col rounded-3xl py-6 px-8 bg-black/40 border border-zinc-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_32px_rgba(161,161,170,0.12)]">
              <h2 className="text-5xl font-bold mb-8">Gear & Socials.</h2>
              <div className="flex justify-between">
                <ul className="text-base space-y-1 text-zinc-200">
                  <li>▪ CAMERA — Sony FX3</li>
                  <li>▪ Lense — Sigma 24-70 2.8</li>
                  <li>▪ Audio — Sennheiser System</li>
                  <li>▪ Lighting — Godox LED Panels</li>
                  <li>▪ Stabilization — DJI RS4 Gimbal</li>
                </ul>

                <ul className="flex flex-col items-start space-y-3 text-base">
                  <li>
                    <a
                      href="https://www.instagram.com/taherfilms/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram size={30} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/+96597522752"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp size={30} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@TaherFilmss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <AiOutlineYoutube size={32} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Collaborations Box - Wide box spanning 2 columns */}
          <div className="lg:col-span-2 rounded-3xl flex flex-col p-8 mt-4 md:mt-0 lg:px-7 lg:pt-8 lg:pb-6 h-[300px] lg:h-auto bg-black/40 border border-zinc-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_32px_rgba(161,161,170,0.12)]">
            <h2 className="text-4xl md:text-5xl font-bold mb-7">
              Collaborations.
            </h2>

            {/* Collaborators Names - Horizontal */}
            <div className="flex flex-wrap gap-4 md:gap-5 lg:gap-5 mb-8 justify-start lg:justify-start">
              <h3 className="text-base md:text-xl lg:text-xl font-medium text-zinc-100 flex">
                <div className="h-8 w-8 rounded-full hidden md:block mr-3 overflow-hidden">
                  <img
                    src="/images/testi/prosports.jpg"
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
                <span className="inline md:hidden">▪ &nbsp;</span>Pro Sports
              </h3>
              <h3 className="text-base md:text-xl lg:text-xl font-medium text-zinc-100 flex">
                <div className="h-8 w-8 rounded-full hidden md:block mr-3 overflow-hidden">
                  <img
                    src="/images/testi/amaron.jpg"
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
                <span className="inline md:hidden">▪ &nbsp;</span>Amaron
              </h3>
              <h3 className="text-base md:text-xl lg:text-xl font-medium text-zinc-100 flex">
                <div className="h-8 w-8 rounded-full hidden md:block mr-3 overflow-hidden">
                  <img
                    src="/images/testi/abdigial.jpg"
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
                <span className="inline md:hidden">▪ &nbsp;</span> AB Digital
              </h3>
              <h3 className="text-base md:text-xl lg:text-xl font-medium text-zinc-100 flex">
                <div className="h-8 w-8 rounded-full hidden md:block mr-3 overflow-hidden">
                  <img
                    src="/images/testi/mohammadi.jpg"
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
                <span className="inline md:hidden">▪ &nbsp;</span>Mohammadi
                Saree House
              </h3>
              <h3 className="text-base md:text-xl lg:text-xl font-medium text-zinc-100 flex">
                <div className="h-8 w-8 rounded-full hidden md:block mr-3 overflow-hidden">
                  <img
                    src="/images/testi/hussain HK.jpg"
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
                <span className="inline md:hidden">▪ &nbsp;</span> Hussain HK
              </h3>
              <h3 className="text-base md:text-xl lg:text-xl font-medium text-zinc-100 flex">
                <div className="h-8 w-8 rounded-full hidden md:block mr-3 overflow-hidden">
                  <img
                    src="/images/testi/AK.jpg"
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
                <span className="inline md:hidden">▪ &nbsp;</span> Abdul Kareem
              </h3>
              <h3 className="text-base md:text-xl lg:text-xl font-medium text-zinc-100 flex">
                <div className="h-8 w-8 rounded-full hidden md:block mr-3 overflow-hidden">
                  <img
                    src="/images/testi/anwar.jpg"
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
                <span className="inline md:hidden">▪ &nbsp; </span> Anwar Hakim
              </h3>
              <h3 className="text-base md:text-xl lg:text-xl font-medium text-zinc-100 flex">
                <div className="h-8 w-8 rounded-full hidden md:block mr-3 overflow-hidden">
                  <img
                    src="/images/testi/Abdu.jpg"
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
                <span className="inline md:hidden">▪ &nbsp;</span> Abdu Tayyib
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bento;
