import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import VideoModal from "./VideoModal";
import { Link } from "react-router-dom";

export default function AllWork({ setIsLoaderComplete, smootherRef }) {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeOrientation, setActiveOrientation] = useState("landscape");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoaderComplete(false);
    smootherRef.current.paused(false);
    const fetchVideos = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "videos"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setVideos(data);
      setLoading(false);
    };

    fetchVideos();
  }, []);

  return (
    <div className="bg-[#ebe6dd] min-h-screen p-6 md:p-12 lg:p-20">
      <div className="max-w-350 mx-auto mb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#1c1b19] text-[#ebe6dd] px-6 py-3 rounded-full font-bold hover:bg-[#e64d32] transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          BACK TO HOME
        </Link>
      </div>

      <h2 className="text-7xl md:text-9xl lg:text-[180px] font-[PiecesNfi] text-center mb-30 tracking-tighter text-[#1c1b19] ">
        THE CUTS
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : videos.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 max-w-350 mx-auto">
          {videos.map((video, index) => (
            <div
              key={index}
              onClick={() => {
                setActiveVideo(video.videoUrl);
                setActiveOrientation(video.orientation || "landscape");
              }}
              className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] transition-all duration-700"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: video.orientation === "portrait" ? "9/16" : "16/9",
                }}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Overlay Decor */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 border border-white/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      className="w-8 h-8 md:w-10 md:h-10 ml-1"
                    >
                      <path d="M8 5.14v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white/60 text-xs font-mono uppercase tracking-[0.2em] mb-1 text-center">
                    {video.orientation || "Landscape"}
                  </p>
                  <h3 className="text-white text-xl md:text-2xl font-bold font-[Oswald] tracking-wide text-center">
                    {video.title}
                  </h3>
                </div>

                {/* Animated Border on Hover */}
                <div className="absolute inset-0 border-0 group-hover:border-8 border-white/10 transition-all duration-500 rounded-2xl pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl font-bold text-gray-400 mt-20">
          No work found yet.
        </p>
      )}

      {activeVideo && (
        <VideoModal
          videoUrl={activeVideo}
          orientation={activeOrientation}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
}
