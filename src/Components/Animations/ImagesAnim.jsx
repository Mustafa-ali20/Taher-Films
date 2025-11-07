import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function ImagesAnim({ onComplete, onMarkSeen }) {
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Refs for individual divs
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null); // Center div (special)
  const div6Ref = useRef(null);
  const div7Ref = useRef(null);
  const div8Ref = useRef(null);
  const div9Ref = useRef(null);

  // Image refs
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const img4Ref = useRef(null);
  const img5Ref = useRef(null); // Center img (won't shuffle)
  const img6Ref = useRef(null);
  const img7Ref = useRef(null);
  const img8Ref = useRef(null);
  const img9Ref = useRef(null);

  const imageRefs = [
    img1Ref,
    img2Ref,
    img3Ref,
    img4Ref,
    img5Ref,
    img6Ref,
    img7Ref,
    img8Ref,
    img9Ref,
  ];

  const divRefs = [
    div1Ref,
    div2Ref,
    div3Ref,
    div4Ref,
    div5Ref,
    div6Ref,
    div7Ref,
    div8Ref,
    div9Ref,
  ];

  // Image sources (center will always be pfp.jpg)
  const imageSources = [
    "/images/loader/1.png",
    "/images/loader/work2.jpg",
    "/images/loader/2.png",
    "/images/loader/work4.jpg",
    "/images/pfp.jpg", // <-- fixed center image
    "/images/loader/work6.jpeg",
    "/images/loader/3.png",
    "/images/loader/work8.jpeg",
    "/images/loader/4.png",
  ];

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageSources.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };

    imageSources.forEach((src) => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      img.src = src;
    });
  }, []);

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!imagesLoaded || hasAnimated.current) return;

    hasAnimated.current = true;
    const tl = gsap.timeline();

    // Set initial state - hidden
    gsap.set(
      divRefs.map((ref) => ref.current),
      { clipPath: "inset(0% 0% 100% 0%)" }
    );

    // Set background black initially
    gsap.set(backgroundRef.current, { backgroundColor: "#000" });

    // Entry animation
    tl.to(
      divRefs.map((ref) => ref.current),
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
      }
    )

      // Image switching phase (excluding center div index 4)
      .add(() => {
        const switchInterval = setInterval(() => {
          // Get non-center image sources
          const switchingImageSources = imageSources.filter(
            (_, index) => index !== 4
          );

          const shuffledSources = [...switchingImageSources].sort(
            () => Math.random() - 0.5
          );

          // Update each image ref, skipping index 4 (center)
          imageRefs.forEach((ref, index) => {
            if (index !== 4 && ref.current) {
              // Map the non-center indices correctly
              const shuffleIndex = index < 4 ? index : index - 1;
              ref.current.src =
                shuffledSources[shuffleIndex % shuffledSources.length];
            }
          });
        }, 100);

        // Stop switching after 3s
        setTimeout(() => {
          clearInterval(switchInterval);
          startExitAnimation();
        }, 3000);
      }, "+=0.2");

    // Exit animation
    const startExitAnimation = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          // Mark that user has seen the loader
          if (onMarkSeen) onMarkSeen();
        },
      });

      // Now ALL divs exit with clip path animation (including center div)
      exitTl
        .to(
          divRefs.map((ref) => ref.current),
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.5,
            ease: "power3.in",
            stagger: 0.05,
          }
        )
        // Background color change happens after all divs exit
        .to(
          backgroundRef.current,
          {
            backgroundColor: "transparent",
            duration: 0.5,
            ease: "power2.out",
            onStart: () => {
              // Trigger content reveal when color transition starts
              if (onComplete) onComplete();
            },
          },
          "+=0.2"
        );
    };
  }, [imagesLoaded]); // Removed onComplete and onMarkSeen from dependencies

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 h-screen flex items-center justify-center p-4 z-10"
      style={{ opacity: imagesLoaded ? 1 : 0 }}
    >
      <div ref={containerRef} className="w-full max-w-2xl rounded-lg p-6">
        <div className="grid grid-cols-3 gap-4">
          {/* Row 1 */}
          <div ref={div1Ref} className="aspect-square overflow-hidden relative">
            <img
              ref={img1Ref}
              src="/images/loader/1.png"
              alt="Image 1"
              className="h-full w-full object-cover absolute inset-0"
            />
          </div>
          <div ref={div2Ref} className="aspect-square overflow-hidden relative">
            <img
              ref={img2Ref}
              src="/images/loader/work2.jpg"
              alt="Image 2"
              className="h-full w-full object-cover absolute inset-0"
            />
          </div>
          <div ref={div3Ref} className="aspect-square overflow-hidden relative">
            <img
              ref={img3Ref}
              src="/images/loader/2.png"
              alt="Image 3"
              className="h-full w-full object-cover absolute inset-0"
            />
          </div>

          {/* Row 2 */}
          <div ref={div4Ref} className="aspect-square overflow-hidden relative">
            <img
              ref={img4Ref}
              src="/images/loader/work4.jpg"
              alt="Image 4"
              className="h-full w-full object-cover absolute inset-0"
            />
          </div>
          <div
            ref={div5Ref}
            className="aspect-square overflow-hidden relative flex items-center justify-center"
          >
            <img
              ref={img5Ref}
              src="/images/pfp.jpg"
              alt="Center Image"
              className="h-full w-full object-cover absolute inset-0"
            />
          </div>
          <div ref={div6Ref} className="aspect-square overflow-hidden relative">
            <img
              ref={img6Ref}
              src="/images/loader/work6.jpeg"
              alt="Image 6"
              className="h-full w-full object-cover absolute inset-0"
            />
          </div>

          {/* Row 3 */}
          <div ref={div7Ref} className="aspect-square overflow-hidden relative">
            <img
              ref={img7Ref}
              src="/images/loader/3.png"
              alt="Image 7"
              className="h-full w-full object-cover absolute inset-0"
            />
          </div>
          <div ref={div8Ref} className="aspect-square overflow-hidden relative">
            <img
              ref={img8Ref}
              src="/images/loader/work8.jpeg"
              alt="Image 8"
              className="h-full w-full object-cover absolute inset-0"
            />
          </div>
          <div ref={div9Ref} className="aspect-square overflow-hidden relative">
            <img
              ref={img9Ref}
              src="/images/loader/4.png"
              alt="Image 9"
              className="h-full w-full object-cover absolute inset-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagesAnim;
