import cameraIcon from "../assets/images/photo-camera-icon.webp";
import coffeeIcon from "../assets/images/coffee-cup-icon.webp";
import videoEditingIcon from "../assets/images/video-editing-icon.webp";

// Gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function WhoAmI() {
  useGSAP(() => {
    const whoAmITl = gsap.timeline({
      scrollTrigger: {
        trigger: ".whoAmI",
        start: "top bottom",
        scrub: 1,
        end: "bottom bottom",
        ease: "power4.inOut"
      },
    });
    whoAmITl.from(".whoAmI .box", {
      delay:0.4,
      stagger: 0.1,
      ease: "power4",
      duration: 1,
      rotate: 0,
      opacity: 0,
    });
    whoAmITl.from(
      ".whoAmI .box-line",
      {
        duration: 1,
        ease: "power4",
        height: 0,
      },
      "<",
    );
  });
  return (
    <div className="whoAmI text-[#ebe6dd] bg-[#1c1b19] min-h-screen p-10 pt-20 md:p-20 border-b border-[#ebe6dd]  flex items-center gap-25 max-xl:flex-col justify-between">
      <div className="flex gap-20 items-center max-xl:flex-col w-full justify-evenly ">
        <div className="max-xl:text-center">
          <h2 className="font-[Shotengai] text-[180px] leading-50 max-xl:hidden ">
            WHO <br /> IS <br /> JOO?
          </h2>
          {/* Small Screen Text */}
          <h2 className="font-[Shotengai] leading-30 hidden max-xl:block text-9xl max-sm:text-8xl">
            WHO IS JOO?
          </h2>
          <p className="font-bold font-[Oswald] text-2xl mt-5">
            VISUAL STORYELLER & VIDEO EDITOR
          </p>
        </div>
        <div className="max-xl:text-center">
          <h3 className="text-7xl max-xl:text-6xl font-bold font-[Shotengai] mb-10 max-sm:text-5xl">
            WEAVING EMOTIONS <br /> INTO EVERY FRAME
          </h3>
          <div className=" font-[Oswald] text-xl max-sm:text-sm">
            <p className="mb-5">
              I’m a video editor specializing in creating dynamic and visually
              engaging content using Adobe Premiere Pro and After Effects. I
              focus on crafting smooth cuts, clean transitions, and impactful
              motion graphics that bring every project to life. With a strong
              attention to detail, I aim to transform raw footage into a
              polished visual experience that captures the viewer’s attention
              from the very first frame
            </p>

            <p className="">
              My goal is to deliver professional videos that reflect the
              message, style, and identity behind each project. I combine
              creative editing, color work, and sound design to produce videos
              that feel cohesive and memorable. Whether it’s social media
              content, promotional videos, or brand storytelling, I’m committed
              to delivering high‑quality results that leave a lasting
              impression.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-20 relative z-10 max-xl:flex-row flex-wrap justify-center">
        <div className="box shadow-[-10px_10px_0px_#eb4823] w-45 p-3 border-2 bg-white rotate-4 text-[#1c1b19]">
          <div className="border-2 bg-[#ebe6dd] p-3 flex justify-center items-center ">
            <img src={cameraIcon} className="w-23 " alt="cameraIcon" />
          </div>
          <h4 className="font-[Oswald] font-bold text-xl text-center mt-2">
            CAPTURING THE <br /> MOMENT
          </h4>
        </div>

        <div className="box shadow-[-10px_10px_0px_#eb4823] w-45 p-3 border-2 bg-white -rotate-4 text-[#1c1b19]">
          <div className="border-2 bg-[#ebe6dd] p-3 flex justify-center items-center ">
            <img src={coffeeIcon} className="w-23 " alt="coffeeIcon" />
          </div>
          <h4 className="font-[Oswald] font-bold text-xl text-center mt-2">
            Coffee &Edits
          </h4>
        </div>

        <div className="box shadow-[-10px_10px_0px_#eb4823] w-45 p-3 border-2 bg-white rotate-4 text-[#1c1b19]">
          <div className="border-2 bg-[#ebe6dd] p-3 flex justify-center items-center ">
            <img
              src={videoEditingIcon}
              className="w-23 "
              alt="videoEditingIcon"
            />
          </div>
          <h4 className="font-[Oswald] font-bold text-xl text-center mt-2">
            Timeline Master
          </h4>
        </div>

        <div className="box-line hidden xl:block w-1  h-[calc(100%+80px)] absolute bg-[#ebe6dd] -top-21 left-1/2 -z-10 "></div>
      </div>
    </div>
  );
}
