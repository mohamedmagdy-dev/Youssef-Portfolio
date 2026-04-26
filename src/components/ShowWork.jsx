// Videos

// Work
import workVideo1 from "../assets/videos/showWorkVideo1.webm";
import workVideo2 from "../assets/videos/showWorkVideo2.webm";
import workVideo3 from "../assets/videos/showWorkVideo3.webm";

// Tl
import tlVideo1 from "../assets/videos/showWorkTl1.webm";
import tlVideo2 from "../assets/videos/showWorkTl2.webm";
import tlVideo3 from "../assets/videos/showWorkTl3.webm";

// videoOne Poster
import video1Poster from "../assets/images/videoPoster.webp";

// React
import { useRef, useState } from "react";

// Gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

// React Router
import { Link } from "react-router-dom";

export default function ShowWork() {
  const showVideoWorkEleRef = useRef(null);
  const showVideoTlEleRef = useRef(null);
  const [activeButton, setActiveButton] = useState(1);
  const buttons = [1, 2, 3];

  useGSAP(() => {
    gsap.from(".showWork h2 span", {
      duration: 1,
      opacity: 0,
      y: 30,
      x: -30,
      scrollTrigger: {
        trigger: ".showWork",
        start: "top center",
      },
    });
  });

  useGSAP(() => {
    const text1 = SplitText.create(".see-all-btn", { type: "chars" });

    gsap.to(text1.chars, {
      y: -20,
      x: 40,
      rotate: 3,
      stagger: 0.01,
      duration: 0.8,
      ease: "power2.out",
      yoyo: true,
      repeat: -1,
    });
  });

  function playSelectedVideo(videoIndex) {
    const workVideo = showVideoWorkEleRef.current;
    const tlVideo = showVideoTlEleRef.current;

    if (!workVideo || !tlVideo) return;

    // fade out
    gsap.to([workVideo, tlVideo], {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        let workSrc, tlSrc;

        switch (videoIndex) {
          case 1:
            workSrc = workVideo2;
            tlSrc = tlVideo2;
            break;
          case 2:
            workSrc = workVideo3;
            tlSrc = tlVideo3;
            break;
          case 3:
            workSrc = workVideo1;
            tlSrc = tlVideo1;
            break;
          default:
            return;
        }

        workVideo.src = workSrc;
        tlVideo.src = tlSrc;

        workVideo.load();
        tlVideo.load();

        workVideo.muted = true;
        tlVideo.muted = true;

        Promise.all([workVideo.play(), tlVideo.play()]).catch(() => {});

        // fade in
        gsap.to([workVideo, tlVideo], {
          opacity: 1,
          duration: 0.3,
        });

        setTimeout(() => {
          workVideo.muted = false;
          tlVideo.muted = false;
        }, 300);
      },
    });
  }
  function pauseVideo() {
    if (!showVideoWorkEleRef.current.paused) {
      showVideoWorkEleRef.current.pause();
      showVideoTlEleRef.current.pause();
    } else {
      showVideoWorkEleRef.current.play();
      showVideoTlEleRef.current.play();
    }
  }

  return (
    <div className="showWork bg-[#ebe6dd] pb-20 ">
      <h2 className="p-5 bg-[#ebe6dd] pt-30 pb-30 text-center text-4xl md:text-6xl lg:text-9xl font-[Rubik_Wet_Paint] font-bold text-shadow-sm">
        <span>VISUAL</span> <span>JOURNEYS</span>
      </h2>
      <div className=" w-full min-h-screen flex max-[900px]:flex-col justify-center items-center gap-10 p-10 ">
        <div className="showContent bg-white shadow-[8px_8px_0px_#1c1b19] rounded cursor-pointer">
          <video
            onClick={pauseVideo}
            ref={showVideoWorkEleRef}
            src={workVideo2}
            poster={video1Poster}
            loop
            className="rounded h-fit max-[430px]:w-full  max-sm:h-full max-[900px]:w-100 lg:w-150"
          ></video>
        </div>
        <div className="contentTl w-full flex flex-col gap-10 items-center">
          <div className="tl bg-white w-3/4 shadow-[8px_8px_0px_#1c1b19] rounded max-[900px]:hidden cursor-pointer">
            <video
              onClick={pauseVideo}
              ref={showVideoTlEleRef}
              src={tlVideo2}
              loop
              className="rounded max-w-full"
            ></video>
          </div>
          <div className="selectVideo w-full flex gap-10 md:h-25 justify-center max-md:flex-col">
            {buttons.map((button) => {
              return (
                <div
                  key={button}
                  className="bg-[#ebe6dd] shadow-[8px_8px_0px_#1c1b19] border-2 rounded cursor-pointer w-full h-25 md:w-45 flex justify-center items-center text-lg font-bold"
                  style={{
                    boxShadow:
                      activeButton == button ? `8px 8px 0px #e64d32` : "",
                  }}
                  onClick={() => {
                    playSelectedVideo(button);
                    setActiveButton(button);
                  }}
                >
                  Video {button}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Link
        to="/all-work"
        className="see-all-btn block text-center  text-[#ebe6dd] overflow-hidden relative bg-[#1c1b19] ease-in-out duration-500 hover:pt-25  hover:pb-25 hover:w-[85%] rounded-lg w-[90%] max-sm:pl-8 max-sm:pr-8  max-sm:pt-20 max-sm:pb-20 pt-30 pb-30 pl-35 pr-35 mt-60 mb-60  ml-auto mr-auto cursor-pointer text-7xl md:text-[100px] lg:text-[140px] xl:text-[200px] font-[Oswald] "
      >
        <span className="text-1">SEE ALL</span>
      </Link>

    </div>
  );
}
