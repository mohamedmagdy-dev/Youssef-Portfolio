// Gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
);


// Video
import HeroSectionVideo from "../assets/videos/Herosectionvideo.webm";

// React
import { useRef } from "react";

export default function HeroSection({ isLoaderComplete, websiteSmoother }) {
  const contentRevelElement = useRef(null);
  useGSAP(
    () => {
      if (isLoaderComplete) {
        let windowHeight = window.innerHeight;
        const contentRevelTl = gsap.timeline();

        gsap.set(contentRevelElement.current, {
          opacity: 1,
        });

        contentRevelTl.from(contentRevelElement.current, {
          delay: 0.5,
          opacity: 1,
          duration: 2.3,
          y: windowHeight - contentRevelElement.current.offsetHeight / 2,
          ease: "expo.out",
        });

        contentRevelTl.to(contentRevelElement.current, {
          duration: 1.2,
          width: "100%",
          height: "100%",
          borderRadius: 0,
          ease: "power4.inOut",
        });

        contentRevelTl.to(
          ".heroSection video",
          {
            duration: 1.2,
            scale: 1,
            ease: "power4.inOut",
            onComplete: () => {
              websiteSmoother.current.paused(false);
              ScrollTrigger.refresh();
            },
          },
          "<",
        );
        contentRevelTl.to(".heroSection .elementContainer", {
          background: "transparent",
        });
      }
    },
    { dependencies: [isLoaderComplete] },
  );

  return (
    <div className="heroSection relative w-full h-screen overflow-hidden">
      <div className="size-full ">
        <video
          className="size-full object-cover aspect-video scale-[1.4]"
          src={HeroSectionVideo}
          preload="metadata"
          autoPlay
          muted
          loop
          
        >
        </video>
      </div>
      <div className="elementContainer size-full absolute inset-0 bg-white mix-blend-lighten">
        <div
          ref={contentRevelElement}
          className="element absolute opacity-0 w-50 h-70 lg:w-100 bg-black top-[50%] left-[50%] -translate-[50%] rounded-lg"
        ></div>
      </div>
    </div>
  );
}
