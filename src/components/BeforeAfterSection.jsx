import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

export default function BeforeAfterSection() {
  const [items, setItems] = useState([]);
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeItems = async () => {
      try {
        const q = query(
          collection(db, "beforeAfter"),
          orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(q);

        // Filter in JavaScript
        const allData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const homeItems = allData
          .filter((item) => item.showOnHome === true)
          .slice(0, 2);

        setItems(homeItems);
      } catch (err) {
        console.warn("BeforeAfter fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeItems();
  }, []);

  if (loading) return null;

  return (
    <section
      ref={sectionRef}
      className="before-after-section bg-[#1c1b19] py-32 px-6 md:px-12 overflow-hidden border-b border-[#ebe6dd]"
    >
      <h2 className="p-5 text-[#ebe6dd] pt-30 pb-30 text-center text-4xl md:text-6xl lg:text-9xl font-[Rubik_Wet_Paint] font-bold text-shadow-sm">
        <span>Before</span> <span className="text-[#e64d32]">&</span>{" "}
        <span>After</span>
      </h2>
      <div className="max-w-7xl mx-auto">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-16">
            {items.map((item) => (
              <div
                key={item.id}
                className="ba-card relative group bg-white/5 p-4 md:p-8 rounded-4xl border border-white/10 backdrop-blur-sm shadow-2xl"
              >
                <div
                  className={`flex flex-col pt-10 lg:flex-row justify-between gap-6 md:gap-10  items-stretch ${item.orientation === "portrait" ? "lg:h-[80vh] " : ""}`}
                >
                  {/* Before Side */}
                  <div
                    className="flex-1 relative overflow-hidden rounded-2xl shadow-xl bg-black "
                    style={{
                      aspectRatio:
                        item.orientation === "portrait" ? "9/16" : "16/9",
                    }}
                  >
                    <iframe
                      src={`${item.beforeVideoUrl.replace("vimeo.com", "player.vimeo.com/video")}?autoplay=0&muted=0`}
                      className="absolute inset-0 w-full h-full "
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                    ></iframe>

                    {/* Optional custom thumbnail overlay if you want to use the field */}
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10 pointer-events-none z-10">
                      Before
                    </div>
                  </div>

                  {/* After Side */}
                  <div
                    className="flex-1 relative overflow-hidden rounded-2xl shadow-xl bg-black"
                    style={{
                      aspectRatio:
                        item.orientation === "portrait" ? "9/16" : "16/9",
                    }}
                  >
                    <iframe
                      src={`${item.afterVideoUrl.replace("vimeo.com", "player.vimeo.com/video")}?autoplay=0&muted=0`}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                    ></iframe>
                    <div className="absolute top-4 right-4 bg-[#e64d32]/80 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10 pointer-events-none z-10">
                      After
                    </div>
                  </div>
                </div>

                <div className="mt-20 text-center">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-8 font-[Oswald] tracking-wide uppercase">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}

            <Link
              to="/before-after"
              className="see-all-btn block text-center  bg-[#ebe6dd] overflow-hidden relative text-[#1c1b19] ease-in-out duration-500 hover:pt-25  hover:pb-25 hover:w-[85%] rounded-lg w-[90%] max-sm:pl-8 max-sm:pr-8  max-sm:pt-20 max-sm:pb-20 pt-30 pb-30 pl-35 pr-35 mt-60 mb-60  ml-auto mr-auto cursor-pointer text-7xl md:text-[100px] lg:text-[140px] xl:text-[200px] font-[Oswald] "
            >
              <span className="text-1">SEE ALL</span>
            </Link>
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border-2 border-dashed border-white/10">
            <p className="text-3xl font-bold text-white/20 font-[Oswald] uppercase tracking-widest">
              There are no videos currently
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
