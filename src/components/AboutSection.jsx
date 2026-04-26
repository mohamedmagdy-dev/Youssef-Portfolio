// Img
import youssefImg from "../assets/images/youssef.webp";
import aboutVideoText from "../assets/images/aboutVideoText.webp";

// video
import aboutVideo from "../assets/videos/aboutVideo.webm";

// Gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, SplitText);

export default function AboutSection() {
  const aboutVideoRef = useRef(null);
  const [hidePlayVideoBtn, setHidePlayVideoBtn] = useState(false);

  useGSAP(() => {
    Draggable.create(".draggableItem", {
      type: "x,y",
      inertia: true,
      bounds: ".aboutSection",
      zIndexBoost: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        start: "top center",
        trigger: ".aboutSectionOverlay",
      },
    });

    const splitWords = SplitText.create(".aboutSectionOverlay p", {
      type: "words",
    });

    tl.from(splitWords.words, {
      opacity: 0,
      y: 100,
      rotate: 3,
      stagger: 0.1,
    });

    tl.to(".aboutSection .aboutSectionOverlay img", {
      yoyo: true,
      repeat: -1,
      y: -100,
      ease: "power4.inOut",
    });

    gsap.to(".aboutSectionOverlay button", {
      y: 100,
      x: 100,
      rotate: 180,
      ease: "power4.inOut",
      duration: 1,
      yoyo: true,
      repeat: -1,
    });
  });

  function playVideo() {
    setHidePlayVideoBtn((val) => !val);
    if (aboutVideoRef.current.paused) {
      aboutVideoRef.current.play();
      aboutVideoRef.current.muted = false;
    } else {
      aboutVideoRef.current.pause();
      aboutVideoRef.current.muted = true;
    }
  }

  return (
    <>
      <div className="aboutSection bg-[#ebe6dd] ">
        <div className="aboutSectionContent  h-screen w-full relative">
          <p className="font-bold text-5xl lg:text-7xl xl:text-9xl font-[Bungee] text-center translate-y-20 text-[#232D3F]">
            Every cut tells a story
          </p>
          <p className=" font-bold text-4xl  lg:text-7xl xl:text-8xl 2xl:text-9xl font-[Bungee] flex lg:gap-80 max-lg:absolute max-lg:bottom-20 z-10 justify-evenly lg:translate-y-40 text-center w-full">
            <span>
              <span className="draggableItem bg-[#f05135] text-[#ebe6dd] inline-block mb-10 rotate-12">
                every
              </span>
              <br />
              <span className="draggableItem bg-[#f05135] inline-block -rotate-12 text-[#ebe6dd]">
                frame
              </span>
            </span>
            <span>
              <span className="draggableItem bg-[#f05135] text-[#ebe6dd] inline-block mb-10 -rotate-12">
                has
              </span>
              <br />
              <span className=" bg-[#f05135] text-[#ebe6dd]">meaning</span>
            </span>
          </p>
          <img
            src={youssefImg}
            alt="youssefImg"
            className="h-full lg:scale-[1.1] absolute top-[50%] object-contain left-[50%] -translate-[50%] select-none"
          />
        </div>

        <div className="aboutSectionOverlay relative bg-[#ebe6dd] min-h-screen w-full pb-20 pt-10">
          <div className="flex items-center flex-col p-10 lg:p-30 pb-0!">
            <span className="text-2xl font-semibold text-[#232D3F] inline-block mt-30">
              What I do
            </span>
            <p
              style={{ fontFamily: "Rubik Wet Paint" }}
              className=" text-2xl md:text-4xl lg:text-7xl text-center mb-30 mt-30"
            >
              CREATIVE VIDEO EDITOR SHAPING COMPELLING VISUALS THROUGH CLEAN
              CUTS,
              <span className="text-[#702113]">MOTION GRAPHICS</span>, AND
              CINEMATIC STORYTELLING
            </p>

            <img src={aboutVideoText} alt="aboutVideoText" loading="lazy" />
          </div>
          <div
            className="h-[80vh] relative cursor-pointer pr-5 pl-5"
            onClick={playVideo}
          >
            {!hidePlayVideoBtn && (
              <button className="absolute top-[50%] left-[50%] -translate-[50%] cursor-pointer rounded-full bg-[#ebe6dda6] w-20 h-20 flex items-center justify-center font-bold">
                Play
              </button>
            )}
            <video
              ref={aboutVideoRef}
              muted
              loop
              className="h-full rounded shadow-[10px_-5px_0_#232D3F,-10px_5px_0_#f06148] m-auto mt-10 object-cover"
            >
              <source src={aboutVideo} type="video/webm" />
            </video>
          </div>

          <div className="w-full h-50 lg:h-55 bg-linear-to-b from-[#f06148] to-transparent absolute top-0 left-0"></div>
        </div>
      </div>
    </>
  );
}
