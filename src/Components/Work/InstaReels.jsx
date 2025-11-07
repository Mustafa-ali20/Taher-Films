

import React, { useState, useEffect } from "react";
import ReelCard from "./ReelCard";
import EmptyEllipse from "./EmptyEllipse";
import reelsData from "./data/ReelData";
import "./InstaReels.css";

const InstaReels = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1280);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Filter reels by category
  const foodReels = reelsData.filter((r) => r.category === "food");
  const storytellingReels = reelsData.filter(
    (r) => r.category === "storytelling"
  );
  const insightsReels = reelsData.filter((r) => r.category === "insights");

  // LARGE SCREEN LAYOUT (Desktop 1024px+)
  if (!isMobile && !isTablet) {
    return (
      <div className="insta-reels">
        <div className="insta-reels__header">
          <h1>
            Instagram <span>Reels</span>
          </h1>
        </div>
        <div className="insta-reels__container">
          {/* Storytelling Section - Row 1: 4 cards + ellipse at end */}
          <div className="insta-reels__grid insta-reels__grid--layer-1">
            {storytellingReels.map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
            <EmptyEllipse category="storytelling" caption="Every frame has a voice"/>
          </div>

          {/* Food Section - Row 2: ellipse at start + 4 cards */}
          <div className="insta-reels__grid insta-reels__grid--layer-2">
            <EmptyEllipse category="food" caption="Where taste meets the lens"/>
            {foodReels.map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
          </div>

          {/* Insights Section - Row 3: 4 cards + ellipse at end */}
          <div className="insta-reels__grid insta-reels__grid--layer-3">
            {insightsReels.map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
            <EmptyEllipse category="insights" caption="Explained visually, understood easily" />
          </div>
        </div>
      </div>
    );
  }

  // TABLET LAYOUT (768px - 1023px)
  if (isTablet) {
    return (
      <div className="insta-reels">
        <div className="insta-reels__header">
          <h1>
            Instagram <span>Reels</span>
          </h1>
        </div>
        <div className="insta-reels__container">
          {/* Storytelling - 3 per row */}
          <div className="insta-reels__grid">
            {storytellingReels.slice(0, 3).map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
          </div>

          {/* Food - 3 per row */}
          <div className="insta-reels__grid">
            {foodReels.slice(0, 3).map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
          </div>

          {/* Insights - 3 per row */}
          <div className="insta-reels__grid">
            {insightsReels.slice(0, 3).map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // MOBILE LAYOUT (<768px)
  return (
    <div className="insta-reels">
      <div className="insta-reels__header">
        <h1>
          Instagram <span>Reels</span>
        </h1>
      </div>
      <div className="insta-reels__container">
        {/* Storytelling - 2 per row */}
        <div className="insta-reels__grid">
          {storytellingReels.slice(0, 2).map((reel) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </div>

        {/* Food - 2 per row */}
        <div className="insta-reels__grid">
          {foodReels.slice(0, 2).map((reel) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </div>

        {/* Insights - 2 per row */}
        <div className="insta-reels__grid">
          {insightsReels.slice(0, 2).map((reel) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstaReels;