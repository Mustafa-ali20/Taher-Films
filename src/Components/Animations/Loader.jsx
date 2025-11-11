import React from "react";
import ImagesAnim from "./ImagesAnim";
import TextAnim from "./TextAnim";

function Loader({ onComplete, onMarkSeen }) {
  return (
    <div className="relative w-full h-full">
      {/* Background Text Animation */}
      <div className="absolute inset-0 z-20">
        <TextAnim />
      </div>
      
      {/* Foreground Images Animation */}
      <div className="absolute inset-0 z-10">
        <ImagesAnim 
          onComplete={onComplete}
          onMarkSeen={onMarkSeen}
        />
      </div>
    </div>
  );
}

export default Loader;