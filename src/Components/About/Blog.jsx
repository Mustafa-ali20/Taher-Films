import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import "./Blog.scss";

const blogItems = [
  {
    id: 1,
    brand: "You didn’t fall in love with the algorithm.",
    name: "Slave to the Algorithm",
    side: "right",
    src: "https://res.cloudinary.com/du62cpjs7/video/upload/v1774971835/taherfilms3_gdtxcj.mp4",
  },
  {
    id: 2,
    brand: "Some things were planned, some just fell into place.",
    name: "Unique + Relatable",
    side: "left",
    src: "https://res.cloudinary.com/du62cpjs7/video/upload/v1774967040/taherfilms7_ziiwv8.mp4",
  },
  {
    id: 3,
    brand: "input lacks values so does the output.",
    name: "You Are What You Consume",
    side: "right",
    src: "https://res.cloudinary.com/du62cpjs7/video/upload/v1775147517/Video8_jtrkuq.mp4",
  },
  {
    id: 4,
    brand: "Efforts behind the scenes often go unnoticed.",
    name: "We Almost Ruined It",
    side: "left",
    src: "https://res.cloudinary.com/du62cpjs7/video/upload/v1774967022/taherfilms4_o7rkfa.mp4",
  },
  {
    id: 5,
    brand: "Audio is the unsung hero of storytelling.",
    name: "Why Audio Matters",
    side: "right",
    src: "https://res.cloudinary.com/du62cpjs7/video/upload/v1774967019/taherfilms2_caf0um.mp4",
  },
  {
    id: 6,
    brand: "Editing is just the art of guiding attention.",
    name: "Why We Overthink?",
    side: "left",
    src: "https://res.cloudinary.com/du62cpjs7/video/upload/v1774967012/taherfilms1_zzggqm.mp4",
  },
  {
    id: 7,
    brand: "The Ultimate Audio Experience with Sennheiser.",
    name: "Sennheiser Profile Wireless",
    side: "right",
    src: "https://res.cloudinary.com/du62cpjs7/video/upload/v1774967035/taherfilms5_ofnddk.mp4",
  },
  {
    id: 8,
    brand: "High end cameras aren't the only way to make good content.",
    name: "Choose Audience Preferences",
    side: "left",
    src: "https://res.cloudinary.com/du62cpjs7/video/upload/v1774967009/taherfilms8_kha2jp.mp4",
  },
];

function BlogItem({ item, activeIndex, isMobile, onMouseEnter, onMouseLeave }) {
  const videoRef = useRef(null);
  const itemRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const isActive = activeIndex === item.id;
  const isDimmed = activeIndex !== -1 && !isActive;

  // Autoplay muted on mount — on hover just unmute
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  // On hover: unmute. On leave: mute again.
  useEffect(() => {
  if (isMobile) return;
  const video = videoRef.current;
  if (!video) return;

  if (isActive) {
    video.currentTime = 0;  // restart on hover
    video.muted = false;
    video.play().catch(() => {});
    setMuted(false);
  } else {
    video.muted = true;
    setMuted(true);
  }
}, [isActive, isMobile]);

  // Tighter hover detection — only trigger when mouse is directly over the item element
  const handleMouseMove = (e) => {
    if (isMobile) return;
    const isOverContent =
      e.target.closest(".blog__video-wrap") ||
      e.target.closest(".blog__item-title");
    if (isOverContent) {
      onMouseEnter(item.id);
    } else {
      onMouseLeave();
    }
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

const handleMobileVideoClick = () => {
  if (!isMobile) return;
  const video = videoRef.current;
  if (!video) return;
  // restart + toggle mute
  video.currentTime = 0;
  video.muted = !video.muted;
  setMuted(video.muted);
  if (video.paused) video.play().catch(() => {});
};

  const videoBlock = (
    <div className="blog__video-wrap" onClick={handleMobileVideoClick}>
      <video
        ref={videoRef}
        src={item.src || undefined}
        loop
        muted
        playsInline
        preload="auto"
      />
      <button
        className="blog__mute-btn"
        aria-label="Toggle mute"
        onClick={handleMuteToggle}
      >
        {muted ? <VolumeX size={14} color="#f0ece3" /> : <Volume2 size={14} color="#f0ece3" />}
      </button>
    </div>
  );

  const titleBlock = (
    <div className="blog__item-title">
      <span className="blog__item-name">{item.name}</span>
      <span className="blog__item-brand">{item.brand}</span>
    </div>
  );

  // LEFT side: video on the far left, title closest to the center line
  // RIGHT side: title closest to the center line, video on the far right
  return (
    <div
      ref={itemRef}
      className={[
        "blog__item",
        `blog__item--${item.side}`,
        isActive ? "blog__item--active" : "",
        isDimmed ? "blog__item--dimmed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {item.side === "left" ? (
        <>
          {videoBlock}
          <div className="blog__item-gap" />
          {titleBlock}
        </>
      ) : (
        <>
          {titleBlock}
          <div className="blog__item-gap" />
          {videoBlock}
        </>
      )}
    </div>
  );
}

export default function Blog() {
  const headingRef = useRef(null);
  const [lineVisible, setLineVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (isMobile) {
        setLineVisible(false);
        return;
      }
      const heading = headingRef.current;
      if (!heading) return;
      const bottom = heading.getBoundingClientRect().bottom;
      setLineVisible(bottom <= 96);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  const handleMouseEnter = (id) => {
    if (!isMobile) setActiveIndex(id);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setActiveIndex(-1);
  };

  return (
    <div className="blog">
      {!isMobile && (
        <div
          className={`blog__center-line ${lineVisible ? "blog__center-line--visible" : ""}`}
        >
          <div className="blog__center-line-inner" />
        </div>
      )}

      <header className="blog__heading" ref={headingRef}>
        <span className="blog__heading-villo">Creative Journey</span>
      </header>

      <section className="blog__timeline">
        <div className="blog__items">
          {blogItems.map((item) => (
            <BlogItem
              key={item.id}
              item={item}
              activeIndex={activeIndex}
              isMobile={isMobile}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
