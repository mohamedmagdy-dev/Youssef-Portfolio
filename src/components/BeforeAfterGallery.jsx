import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

export default function BeforeAfterGallery({ setIsLoaderComplete, smootherRef }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (setIsLoaderComplete) setIsLoaderComplete(false);
    if (smootherRef?.current) smootherRef.current.paused(false);

    const fetchItems = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "beforeAfter"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(data);
      } catch (err) {
        console.warn("BeforeAfter gallery fetch failed (check Firebase Rules):", err);
        setItems([]);
      }
      setLoading(false);
    };

    fetchItems();
  }, [setIsLoaderComplete, smootherRef]);

  return (
    <div className="bg-[#ebe6dd] min-h-screen p-6 md:p-12 lg:p-20">
      {/* Header with Back Button */}
      <div className="max-w-7xl mx-auto flex flex-col  justify-between items-center mb-20 gap-8">
        <Link
          to="/"
          className="group flex items-center gap-3 bg-[#1c1b19] text-white px-6 py-3 rounded-full font-bold transition-all hover:pr-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:-translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          BACK TO HOME
        </Link>
        
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-[PiecesNfi] text-[#1c1b19] text-center md:text-right mt-20 mb-20">
          EVOLUTION
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-black/10 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 gap-20 max-w-7xl mx-auto ">
          {items.map((item) => (
            <div key={item.id} className="group  bg-[#1c1b19] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] border border-black/5 p-4 md:p-10">
              <div className={`flex flex-col lg:flex-row gap-6 md:gap-10 ${item.orientation === 'portrait' ? 'lg:max-w-4xl mx-auto' : ''}`}>
                {/* Before */}
                <div className="flex-1 space-y-4 ">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg"
                    style={{ aspectRatio: item.orientation === 'portrait' ? '9/16' : '16/9' }}>
                    <iframe
                      src={`${item.beforeVideoUrl.replace("vimeo.com", "player.vimeo.com/video")}?autoplay=0&muted=0`}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                    ></iframe>
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 pointer-events-none">
                      Before
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="flex-1 space-y-4">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg"
                    style={{ aspectRatio: item.orientation === 'portrait' ? '9/16' : '16/9' }}>
                    <iframe
                      src={`${item.afterVideoUrl.replace("vimeo.com", "player.vimeo.com/video")}?autoplay=0&muted=0`}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                    ></iframe>
                    <div className="absolute top-4 right-4 bg-[#e64d32] backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 pointer-events-none">
                      After
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-20 flex justify-between items-center px-4">
                <h3 className="text-2xl md:text-4xl font-bold font-[Oswald] text-[#ebe6dd] uppercase tracking-tight m-auto">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-black/10 max-w-2xl mx-auto">
          <p className="text-2xl font-bold text-black/20 font-[Oswald] uppercase">
            No transformations found yet.
          </p>
        </div>
      )}


    </div>
  );
}
