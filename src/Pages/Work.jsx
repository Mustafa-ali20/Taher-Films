import React from "react";
import WorkParallax from "../Components/Work";
import InstaReels from "../Components/Work/InstaReels";
import ContentMarketing from "../Components/Work/ContentMarketing";
import EventGallery from "../Components/Work/event";

function Work() {
  return (
    <div className="min-h-screen">
      <EventGallery />
      <InstaReels />
      <ContentMarketing />
      <WorkParallax />
    </div>
  );
}

export default Work;
