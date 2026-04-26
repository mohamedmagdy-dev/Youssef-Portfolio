// Styles
import "./styles/App.css";

// Components
import WebsiteLoader from "./components/WebsiteLoader";
import HeroSection from "./components/HeroSeciton";
import AboutSection from "./components/AboutSection";
import VideoShowRain from "./components/VideoShowRain";
import ShowWork from "./components/ShowWork";
import WhoAmI from "./components/WhoAmI";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AllWork from "./components/AllWork";
import BeforeAfterGallery from "./components/BeforeAfterGallery";
import BeforeAfterSection from "./components/BeforeAfterSection";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
// Gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

// React
import { useState, useRef, useEffect } from "react";

// React Router
import { Routes, Route, useLocation } from "react-router-dom";
export default function App() {
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);
  const smootherRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsLoaderComplete(false);
      smootherRef.current.paused(true);
    }
  }, [location.pathname]);

  useGSAP(() => {
    smootherRef.current = ScrollSmoother.create({
      smooth: 0.6,
      // effects: true,
      smoothTouch: 0.1, // Better mobile support
      normalizeScroll: { allowNestedScroll: true }, // Safer normalization
      ignoreMobileResize: true,
    });
    smootherRef.current.paused(true);
  });

  useEffect(() => {
    smootherRef.current.scrollTo(0, true);
  }, [isLoaderComplete]);

  function HomePage() {
    return (
      <>
        <HeroSection
          isLoaderComplete={isLoaderComplete}
          websiteSmoother={smootherRef}
        />
        <AboutSection />
        <VideoShowRain />
        <ShowWork />
        <BeforeAfterSection />
        <WhoAmI />
        <Skills />
        <Contact />
      </>
    );
  }

  return (
    <>
      {!isLoaderComplete && (
        <WebsiteLoader isLoaderComplete={setIsLoaderComplete} />
      )}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/all-work"
              element={
                <AllWork
                  setIsLoaderComplete={setIsLoaderComplete}
                  smootherRef={smootherRef}
                />
              }
            />
            <Route
              path="/before-after"
              element={
                <BeforeAfterGallery
                  setIsLoaderComplete={setIsLoaderComplete}
                  smootherRef={smootherRef}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={<Dashboard smootherRef={smootherRef} />}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}
