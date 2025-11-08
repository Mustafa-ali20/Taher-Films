import { useTransform, useScroll, motion } from "framer-motion";
import { useRef } from "react";

const Card = ({
  i,
  title,
  description,
  src,
  link,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex flex-col items-center justify-center sticky top-0"
    >
      {/* Mobile & Tablet Layout */}
      <motion.div
        className="lg:hidden flex flex-col relative h-[500px] w-[90vw] max-w-[350px] md:max-w-[650px] md:h-[700px] rounded-[25px] origin-top overflow-hidden"
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      >
        {/* Semi-opaque background layer */}
        <div 
          className="absolute inset-0 rounded-[25px]" 
          style={{ backgroundColor: color, opacity: 0.3 }}
        />
        
        {/* Glassmorphism layer */}
        <div 
          className="absolute inset-0 rounded-[25px] backdrop-blur-md border border-white/30 shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${color}99, ${color}66)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
          <h2 className="text-center m-0 text-xl md:text-2xl font-bold text-white drop-shadow-lg">
            {title}
          </h2>

          <div className="flex flex-col mt-6 md:mt-8 flex-1 justify-between">
            <div className="relative w-full h-42 md:h-80 rounded-[20px] mb-5 overflow-hidden flex-shrink-0 shadow-lg">
              <motion.div className="w-full h-full" style={{ scale: imageScale }}>
                <img
                  src={src}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <div className="w-full flex-1 flex flex-col justify-between">
              <p className="text-sm md:text-xl font-medium first-letter:text-xl md:first-letter:text-3xl mb-4 flex-1 text-white drop-shadow-md">
                {description}
              </p>
              <span className="flex items-center gap-1 mt-auto">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base underline cursor-pointer hover:opacity-70 transition-opacity text-white drop-shadow-md font-semibold"
                >
                   Watch Now
                </a>
                <svg
                  width="22"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Large Screen Layout */}
      <motion.div
        className="hidden lg:flex flex-col relative h-[500px] w-[1000px] rounded-[25px] origin-top overflow-hidden"
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      >
        {/* Semi-opaque background layer */}
        <div 
          className="absolute inset-0 rounded-[25px]" 
          style={{ backgroundColor: color, opacity: 0.3 }}
        />
        
        {/* Glassmorphism layer */}
        <div 
          className="absolute inset-0 rounded-[25px] backdrop-blur-md border border-white/30 shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${color}99, ${color}66)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-12 h-full flex flex-col">
          <h2 className="text-center m-0 text-[28px] font-bold text-white drop-shadow-lg font-[nfb]">{title}</h2>
          <div className="flex h-full mt-12 gap-12">
            <div className="w-2/4 relative top-[10%]">
              <p className="text-xl first-letter:text-[28px] font-medium text-white drop-shadow-md font-[villo]">
                {description}
              </p>
              <span className="flex items-center gap-1 mt-4">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs underline cursor-pointer hover:opacity-70 transition-opacity text-white drop-shadow-md font-semibold font-[nf]"
                >
                  Watch Now
                </a>
                <svg
                  width="22"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
            <div className="relative w-3/5 h-full rounded-[25px] overflow-hidden shadow-lg">
              <motion.div className="w-full h-full" style={{ scale: imageScale }}>
                <img
                  src={src}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;