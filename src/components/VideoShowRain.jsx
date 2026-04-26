// Gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Img
import videoBorder from "../assets/images/videosBorder.webp";

// Videos
import VideoRain1 from "../assets/videos/videoRain1.webm";
import VideoRain2 from "../assets/videos/videoRain2.webm";
import VideoRain3 from "../assets/videos/videoRain3.webm";
import VideoRain4 from "../assets/videos/videoRain4.webm";
import VideoRain5 from "../assets/videos/videoRain5.webm";
import { useRef } from "react";

export default function VideoShowRain() {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRef4 = useRef(null);
  const videoRef5 = useRef(null);
  useGSAP(() => {
    const videoRainTl = gsap.timeline({
      ease: "none",
      scrollTrigger: {
        trigger: ".videoShowRain",
        start: "top top",
        scrub: true,
        pin: ".videoShowRain .content",
        invalidateOnRefresh: true,
        anticipatePin: 1,
        end: "bottom bottom",
        onEnter: () => {
          videoRef1.current.play();
          videoRef2.current.play();
          videoRef3.current.play();
          videoRef4.current.play();
          videoRef5.current.play();
        },
        onLeave: () => {
          videoRef1.current.pause();
          videoRef2.current.pause();
          videoRef3.current.pause();
          videoRef4.current.pause();
          videoRef5.current.pause();
        },

        onLeaveBack: () => {
          videoRef1.current.pause();
          videoRef2.current.pause();
          videoRef3.current.pause();
          videoRef4.current.pause();
          videoRef5.current.pause();
        },

        onEnterBack: () => {
          videoRef1.current.play();
          videoRef2.current.play();
          videoRef3.current.play();
          videoRef4.current.play();
          videoRef5.current.play();
        },
      },
    });
  });

  return (
    <div className="videoShowRain min-h-screen bg-[#1c1b19] flex flex-col">
      <div className="content translate-y-[30vh] h-screen w-full flex flex-col justify-center items-center z-10 text-[#ebe6dd] font-bold text-center font-[Rubik_Wet_Paint] tracking-widest">
        <span>
          WHAT AM I <span className="text-[#e64d32]">DOING</span>?
        </span>

        <h2 className="title-1 text-6xl md:text-9xl mt-10 mb-10 ">EDIT</h2>
        <p className="text-xl disc-1">
          VISUAL STORYTELLING THROUGH CLEAN EDITS AND CINEMATIC FLOW
        </p>
      </div>
      <div className="p-10 pb-20 gap-120 flex flex-col">
        <div className="w-full md:w-80 relative self-end">
          <video src={VideoRain1} muted autoPlay loop ref={videoRef1}></video>
          <img
            src={videoBorder}
            alt="VideoBorder"
            className="absolute top-0 h-full"
          />
        </div>
        <div className="w-full md:w-80 relative self-start">
          <video src={VideoRain2} muted autoPlay loop ref={videoRef2}></video>

          <img
            src={videoBorder}
            alt="VideoBorder"
            className="absolute top-0  h-full"
          />
        </div>
        <div className="w-full md:w-80 relative self-end">
          <video src={VideoRain5} muted autoPlay loop ref={videoRef3}></video>

          <img
            src={videoBorder}
            alt="VideoBorder"
            loading="lazy"
            className="absolute top-0  h-full"
          />
        </div>
        <div className="w-full md:w-80 relative self-start">
          <video src={VideoRain4} muted autoPlay loop ref={videoRef4}></video>

          <img
            src={videoBorder}
            alt="VideoBorder"
            className="absolute top-0  h-full"
          />
        </div>
        <div className="w-full md:w-80 relative self-end">
          <video src={VideoRain3} muted autoPlay loop ref={videoRef5}></video>

          <img
            src={videoBorder}
            alt="VideoBorder"
            className="absolute top-0  h-full"
          />
        </div>
      </div>
    </div>
  );
}
