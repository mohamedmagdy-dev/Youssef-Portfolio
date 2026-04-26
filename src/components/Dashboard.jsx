import { useState, useEffect, useRef } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ smootherRef }) {
  const [activeTab, setActiveTab] = useState("videos"); // "videos" or "beforeAfter"
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(""); // Used for main videos
  const [beforeThumbnail, setBeforeThumbnail] = useState(""); // Used for BeforeAfter
  const [afterThumbnail, setAfterThumbnail] = useState("");   // Used for BeforeAfter
  const [vimeoUrl, setVimeoUrl] = useState(""); // Used for main videos
  const [beforeVideoUrl, setBeforeVideoUrl] = useState(""); // Used for BeforeAfter
  const [afterVideoUrl, setAfterVideoUrl] = useState("");   // Used for BeforeAfter
  const [showOnHome, setShowOnHome] = useState(false);       // Used for BeforeAfter
  const [orientation, setOrientation] = useState("landscape");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const formRef = useRef(null);

  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // Protect Dashboard
  useEffect(() => {
    if (smootherRef?.current) {
      smootherRef.current.paused(false);
    }
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login");
    });
    return () => unsub();
  }, [navigate, smootherRef]);

  // Fetch data based on active tab
  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, activeTab));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(data);
    } catch (err) {
      console.error(err);
      showStatus("error", "Failed to fetch data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // Reset form when tab changes
    setEditingId(null);
    setTitle("");
    setThumbnail("");
    setBeforeThumbnail("");
    setAfterThumbnail("");
    setVimeoUrl("");
    setBeforeVideoUrl("");
    setAfterVideoUrl("");
    setShowOnHome(false);
    setOrientation("landscape");
  }, [activeTab]);

  const showStatus = (type, message) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: "", message: "" }), 3000);
  };

  const isValidVimeo = (url) => /^https?:\/\/(www\.)?vimeo\.com\/\d+/.test(url);

  const handleSave = async () => {
    // Basic Title validation
    if (!title.trim()) {
      showStatus("error", "Please enter a title");
      return;
    }

    if (activeTab === "videos") {
      // Validation for Main Videos
      if (!thumbnail.trim() || !vimeoUrl.trim()) {
        showStatus("error", "Please fill all required fields (Thumbnail & Vimeo URL)");
        return;
      }
      if (!isValidVimeo(vimeoUrl)) {
        showStatus("error", "Invalid Vimeo URL");
        return;
      }
    } else {
      // Validation for Before & After
      if (!beforeThumbnail.trim() || !afterThumbnail.trim() || !beforeVideoUrl.trim() || !afterVideoUrl.trim()) {
        showStatus("error", "Please fill all fields for both Before and After versions");
        return;
      }
      if (!isValidVimeo(beforeVideoUrl) || !isValidVimeo(afterVideoUrl)) {
        showStatus("error", "Both Vimeo URLs must be valid");
        return;
      }
    }

    setLoading(true);

    try {
      const data = {
        title,
        orientation,
        updatedAt: serverTimestamp(),
      };

      if (activeTab === "videos") {
        data.videoUrl = vimeoUrl;
        data.thumbnail = thumbnail;
      } else {
        data.beforeVideoUrl = beforeVideoUrl;
        data.afterVideoUrl = afterVideoUrl;
        data.beforeThumbnail = beforeThumbnail;
        data.afterThumbnail = afterThumbnail;
        data.showOnHome = showOnHome;
      }

      if (editingId) {
        await updateDoc(doc(db, activeTab, editingId), data);
        showStatus("success", "Updated successfully!");
      } else {
        data.createdAt = serverTimestamp();
        await addDoc(collection(db, activeTab), data);
        showStatus("success", "Added successfully!");
      }

      setEditingId(null);
      setTitle("");
      setThumbnail("");
      setBeforeThumbnail("");
      setAfterThumbnail("");
      setVimeoUrl("");
      setBeforeVideoUrl("");
      setAfterVideoUrl("");
      setShowOnHome(false);
      setOrientation("landscape");
      fetchData();
    } catch (err) {
      console.error(err);
      showStatus("error", "Failed to save");
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteDoc(doc(db, activeTab, id));
      showStatus("success", "Deleted!");
      fetchData();
    } catch (err) {
      console.error(err);
      showStatus("error", "Failed to delete");
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setOrientation(item.orientation || "landscape");
    
    if (activeTab === "videos") {
      setVimeoUrl(item.videoUrl || "");
      setThumbnail(item.thumbnail || "");
    } else {
      setBeforeVideoUrl(item.beforeVideoUrl || "");
      setAfterVideoUrl(item.afterVideoUrl || "");
      setBeforeThumbnail(item.beforeThumbnail || "");
      setAfterThumbnail(item.afterThumbnail || "");
      setShowOnHome(item.showOnHome || false);
    }

    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSignOut = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="p-10 bg-[#ebe6dd] min-h-screen">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-10 max-md:flex-col gap-5">
        <h1 className="text-5xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition border border-black/10"
          >
            Go to Site
          </button>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition shadow-lg"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-xl mx-auto flex gap-2 mb-10 bg-black/5 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("videos")}
          className={`flex-1 py-3 rounded-lg font-bold transition ${
            activeTab === "videos" ? "bg-black text-white" : "text-black/60 hover:bg-black/5"
          }`}
        >
          Main Videos
        </button>
        <button
          onClick={() => setActiveTab("beforeAfter")}
          className={`flex-1 py-3 rounded-lg font-bold transition ${
            activeTab === "beforeAfter" ? "bg-black text-white" : "text-black/60 hover:bg-black/5"
          }`}
        >
          Before & After
        </button>
      </div>

      {/* Form */}
      <div
        ref={formRef}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-xl mx-auto border border-gray-200 mb-16 relative"
      >
        {status.message && (
          <div
            className={`absolute -top-12 left-0 right-0 p-3 rounded-lg text-center font-bold transition-all shadow-md ${
              status.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {status.message}
          </div>
        )}
        <h2 className="text-3xl font-bold mb-6">
          {editingId ? "Edit Entry" : activeTab === "videos" ? "Add Main Video" : "Add Before & After"}
        </h2>

        <label className="block mb-6">
          <span className="font-bold text-lg">Title</span>
          <input
            type="text"
            className="w-full p-3 border rounded-lg mt-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Work Title"
          />
        </label>

        {activeTab === "videos" ? (
          <label className="block mb-6">
            <span className="font-bold text-lg">Thumbnail URL</span>
            <input
              type="text"
              className="w-full p-3 border rounded-lg mt-2"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="https://..."
            />
          </label>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <label className="block">
              <span className="font-bold text-lg">Before Thumbnail</span>
              <input
                type="text"
                className="w-full p-3 border rounded-lg mt-2"
                value={beforeThumbnail}
                onChange={(e) => setBeforeThumbnail(e.target.value)}
                placeholder="https://..."
              />
            </label>
            <label className="block">
              <span className="font-bold text-lg">After Thumbnail</span>
              <input
                type="text"
                className="w-full p-3 border rounded-lg mt-2"
                value={afterThumbnail}
                onChange={(e) => setAfterThumbnail(e.target.value)}
                placeholder="https://..."
              />
            </label>
          </div>
        )}

        {activeTab === "videos" ? (
          <label className="block mb-6">
            <span className="font-bold text-lg">Vimeo URL</span>
            <input
              type="text"
              className="w-full p-3 border rounded-lg mt-2"
              value={vimeoUrl}
              onChange={(e) => setVimeoUrl(e.target.value)}
              placeholder="https://vimeo.com/..."
            />
          </label>
        ) : (
          <>
            <label className="block mb-6">
              <span className="font-bold text-lg">Before Video (Vimeo)</span>
              <input
                type="text"
                className="w-full p-3 border rounded-lg mt-2"
                value={beforeVideoUrl}
                onChange={(e) => setBeforeVideoUrl(e.target.value)}
                placeholder="https://vimeo.com/..."
              />
            </label>
            <label className="block mb-6">
              <span className="font-bold text-lg">After Video (Vimeo)</span>
              <input
                type="text"
                className="w-full p-3 border rounded-lg mt-2"
                value={afterVideoUrl}
                onChange={(e) => setAfterVideoUrl(e.target.value)}
                placeholder="https://vimeo.com/..."
              />
            </label>
            <label className="flex items-center gap-3 mb-6 cursor-pointer bg-black/5 p-4 rounded-lg">
              <input
                type="checkbox"
                className="w-5 h-5 accent-black"
                checked={showOnHome}
                onChange={(e) => setShowOnHome(e.target.checked)}
              />
              <span className="font-bold text-lg">Show on Homepage</span>
            </label>
          </>
        )}

        <label className="block mb-6">
          <span className="font-bold text-lg">Orientation</span>
          <select
            className="w-full p-3 border rounded-lg mt-2 cursor-pointer"
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
          >
            <option value="landscape">Landscape (Width)</option>
            <option value="portrait">Portrait (Height)</option>
          </select>
        </label>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg mt-5 hover:bg-gray-800 transition disabled:bg-gray-400"
        >
          {loading ? "Saving..." : editingId ? "Save Changes" : "Add Entry"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setThumbnail("");
              setBeforeThumbnail("");
              setAfterThumbnail("");
              setVimeoUrl("");
              setBeforeVideoUrl("");
              setAfterVideoUrl("");
              setShowOnHome(false);
              setOrientation("landscape");
            }}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg mt-3 hover:bg-gray-300 transition"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* List */}
      <h2 className="text-4xl font-bold mb-6 text-center">
        {activeTab === "videos" ? "All Main Videos" : "All Before & After"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto pb-20">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
            <div
              className="w-full overflow-hidden rounded-xl bg-gray-100 relative"
              style={{
                aspectRatio: item.orientation === "portrait" ? "9/16" : "16/9",
                maxHeight: "400px",
              }}
            >
              <img
                src={activeTab === "videos" ? item.thumbnail : item.beforeThumbnail}
                className="w-full h-full object-cover"
                alt={item.title}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x600?text=Invalid+Thumbnail";
                }}
              />
              {activeTab === "beforeAfter" && (
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                  Before & After
                </div>
              )}
            </div>

            <div className="mt-5 flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${
                  item.orientation === "portrait" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {item.orientation || "landscape"}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{item.title}</h3>
              {activeTab === "videos" ? (
                <p className="text-gray-500 text-sm mt-1 truncate">{item.videoUrl}</p>
              ) : (
                <div className="mt-1 space-y-1">
                  <p className="text-gray-400 text-[10px] truncate">Before: {item.beforeVideoUrl}</p>
                  <p className="text-gray-400 text-[10px] truncate">After: {item.afterVideoUrl}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => startEdit(item)}
                className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
