import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useParallax
 * Applies a vertical parallax effect to a target element on scroll.
 * Works with Lenis via ScrollTrigger's scroll proxy.
 *
 * @param {React.RefObject} ref - ref attached to the element to move
 * @param {number} speed - parallax intensity (0.1 = subtle, 0.3 = strong)
 */
const useParallax = (ref, speed = 0.15) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      yPercent: speed * 100 * -1,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest(".event-gallery__card"),
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, speed]);
};

export default useParallax;