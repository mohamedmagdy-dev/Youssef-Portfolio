import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

export default function VideoModal({ videoUrl, orientation, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Disable scroll on body when modal is open
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" },
    );

    gsap.fromTo(
      contentRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const isPortrait = orientation === "portrait";

  const modalContent = (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[99999]"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className={`bg-black rounded-2xl overflow-hidden shadow-2xl w-[95%] transition-all duration-500 ${
          isPortrait ? "max-w-[400px]" : "max-w-[1000px]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-full"
          style={{ aspectRatio: isPortrait ? "9/16" : "16/9" }}
        >
          {/* Close button (X) at Top Right */}
          <button
            onClick={onClose}
            className="absolute -top-12 -right-4 md:-right-12 text-white/50 hover:text-white transition-colors p-2 z-[100000]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <iframe
            src={`${videoUrl.replace("vimeo.com", "player.vimeo.com/video")}?autoplay=1&muted=0`}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-white text-black font-bold hover:bg-gray-200 transition text-lg tracking-wider"
        >
          CLOSE
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
