import { useState, useEffect } from "react";
import { gsap } from "gsap";


export default function WebsiteLoader({ isLoaderComplete }) {
  const [progress, setProgress] = useState(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsPageLoaded(true);

    if (document.readyState === "complete") {
      setIsPageLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    let value = progress; // Start from current progress
    const interval = setInterval(() => {
      if (!isPageLoaded) {
        if (value < 90) {
          value += Math.random() * 2;
          if (value > 90) value = 90;
        }
      } else {
        value += Math.random() * 15 + 2; // Move faster but smoothly
      }

      if (value >= 100) {
        value = 100;
        clearInterval(interval);

        const tl = gsap.timeline({
          onComplete: () => isLoaderComplete(true),
        });

        tl.to(".loader-number", {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
        });

        tl.to(
          ".left-panel",
          {
            y: "-100%",
            duration: 0.9,
            ease: "power4.inOut",
          },
          "-=0.2",
        );

        tl.to(
          ".right-panel",
          {
            y: "100%",
            duration: 0.9,
            ease: "power4.inOut",
          },
          "-=0.8",
        );
      }

      setProgress(Math.floor(value));
    }, 40);

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleLoad);
    };
  }, [isPageLoaded]);

  return (
    <div className="fixed inset-0 z-9999 overflow-hidden w-full h-full">

      <div className="left-panel absolute top-0 left-0 w-1/2 h-full bg-black"></div>


      <div className="right-panel absolute top-0 right-0 w-1/2 h-full bg-black"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="loader-number text-[#ebe6dd] text-[80px] md:text-[120px] font-bold tracking-widest">
          {progress}%
        </h1>
      </div>
    </div>
  );
}
