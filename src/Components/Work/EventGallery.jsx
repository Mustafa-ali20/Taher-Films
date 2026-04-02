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
    video: "https://res.cloudinary.com/du62cpjs7/video/upload/v1774966844/event1_enuni5.mp4",
    thumbnail: "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Content%20Marketing/roadrush.png?updatedAt=1774954413452",
    description: "An electrifying concert event video for Road Rush, capturing the high-energy performances, vibrant crowd, and dynamic stage presence. The video showcases the essence of the event, highlighting the unforgettable experience and the connection between the artists and their fans.",
  },
  {
    id: 2,
    title: "Amaron",
    subtitle: "Brand Event",
    video: "https://res.cloudinary.com/du62cpjs7/video/upload/v1774966833/event2_c1hxro.mp4",
    thumbnail: "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Content%20Marketing/amaron.png?updatedAt=1774954413358",
    description: "A dynamic brand event video for Amaron, showcasing the energy and excitement of the launch. The video captures the vibrant atmosphere, engaging activities, and enthusiastic crowd, highlighting Amaron's commitment to innovation and customer engagement.",
  },
  {
    id: 3,
    title: "Kazakhstan",
    subtitle: "Travel Diary",
    video: "https://res.cloudinary.com/du62cpjs7/video/upload/v1775137110/Kazakasthan_1_heip4l.mp4",
    thumbnail: "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Content%20Marketing/WhatsApp%20Image%202026-04-01%20at%2016.00.14.jpeg",
    description: "A captivating travel diary video from Kazakhstan, showcasing the breathtaking landscapes, rich culture, and unforgettable experiences. The video takes you on a journey through the heart of the country, highlighting its natural beauty and vibrant local life.",
  },
   {
    id: 4,
    title: "Sigma BF",
    subtitle: "Brand Collaboration",
    video: "https://res.cloudinary.com/du62cpjs7/video/upload/v1775049458/Sigma_BF_yfdixd.mp4",
    thumbnail: "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Content%20Marketing/Sigma.png",
    description: "A compelling brand collaboration video for Sigma BF, demonstrating the seamless integration of both brands. The video highlights the innovative approach and shared vision, creating a powerful narrative that resonates with the target audience.",
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
    gsap.to(wrapperRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
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
        isFullWidth
          ? "event-gallery__card--full"
          : "event-gallery__card--half"
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