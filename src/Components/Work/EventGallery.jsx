import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import useParallax from "./useParallax";
import "./EventGallery.scss";

const eventsData = [
  {
    id: 1,
    title: "Road Rush",
    subtitle: "Concert Event",
    video:
      "https://res.cloudinary.com/dg9nicwim/video/upload/q_auto/f_auto/v1777901684/event1_xje9ke.mp4",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Content%20Marketing/roadrush.png?updatedAt=1774954413452",
    description:
      "An electrifying concert event video for Road Rush, capturing the high-energy performances by Sean Paul and Badar Al Shuaibi. The video showcases the essence of the event, highlighting the unforgettable stage experience and the connection between the artists and their fans.",
  },
  {
    id: 2,
    title: "Top 5",
    subtitle: "Brand Event",
    video:
      "https://res.cloudinary.com/dg9nicwim/video/upload/q_auto/f_auto/v1777980849/TOP_5_Website_export_3_zzqg1y.mp4",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Content%20Marketing/Screenshot%202026-05-05%20at%203.20.33%E2%80%AFPM.png",
    description:
      "We captured the intensity of one of Kuwait’s top 5 boxing gyms, showcasing real training and raw dedication. From powerful drills to focused coaching moments, every frame highlights their passion and discipline. Edited to deliver a cinematic feel that reflects the gym’s energy and commitment to shaping fighters..",
  },
  {
    id: 3,
    title: "Kazakhstan",
    subtitle: "Travel Diary",
    video:
      "https://res.cloudinary.com/dg9nicwim/video/upload/q_auto/f_auto/v1777901308/kazakhstan_rxzf5y.mp4",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Content%20Marketing/WhatsApp%20Image%202026-04-01%20at%2016.00.14.jpeg",
    description:
      "Shot across six days in Kazakhstan. No storyline. No narration plan. Just friends and freezing air. Somewhere between nowhere end everything.",
  },
  {
    id: 4,
    title: "Sigma BF",
    subtitle: "Brand Collaboration",
    video:
      "https://res.cloudinary.com/dg9nicwim/video/upload/q_auto/f_auto/v1777901592/SigmaBF_vfccjk.mp4",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Content%20Marketing/Sigma.png",
    description:
      "I’ve used a lot of cameras. Most of them made me feel like I was working for them. This one just let me shoot. Pick it up, hit record, done. No rig. No overthinking. And somewhere in that simplicity, I remembered why I started doing this in the first place. Made this one in collaboration with AAB World.",
  },
];

const EventCard = ({ event, isFullWidth }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const bgRef = useRef(null);

  useParallax(bgRef, 0.15);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    gsap.to(wrapperRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
    video.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    gsap.to(wrapperRef.current, {
      scale: 0,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        video.pause();
        video.currentTime = 0;
      },
    });
  };

  const handleClick = () => {
    gsap.to(cardRef.current, {
      opacity: 0,
      scale: 0.97,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        navigate(`/video/${event.id}`, { state: { event } });
      },
    });
  };

  return (
    <div
      ref={cardRef}
      className={`event-gallery__card ${
        isFullWidth ? "event-gallery__card--full" : "event-gallery__card--half"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img
        ref={bgRef}
        className="event-gallery__card__bg"
        src={event.thumbnail}
        alt={event.title}
      />

      <div className="event-gallery__card__overlay" />

      <div ref={wrapperRef} className="event-gallery__card__video-wrapper">
        <video
          ref={videoRef}
          className="event-gallery__card__video"
          src={event.video}
          muted
          loop
          playsInline
          preload="none"
        />
      </div>

      <div className="event-gallery__card__meta">
        <span className="event-gallery__card__title">{event.title}</span>
        <span className="event-gallery__card__subtitle">{event.subtitle}</span>
      </div>

      <div className="event-gallery__card__play-hint">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
};

const EventGallery = () => {
  return (
    <section className="event-gallery">
      <div className="event-gallery__heading">
        <span className="word-event">Curated</span>
        <span className="word-gallery">Experiences</span>
      </div>

      <div className="event-gallery__grid">
        <EventCard event={eventsData[0]} isFullWidth={false} />
        <EventCard event={eventsData[1]} isFullWidth={false} />
        <EventCard event={eventsData[2]} isFullWidth={false} />
        <EventCard event={eventsData[3]} isFullWidth={false} />
      </div>
    </section>
  );
};

export default EventGallery;
