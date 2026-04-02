import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import Navbar from "./Components/Navigation/Navbar";
import PageTransition from "./Components/Transitions/PageTransition";
import Loader from "./Components/Animations/Loader";
import Home from "./Pages/Home";
import Work from "./Pages/Work";
import About from "./Pages/About";
import Results from "./Pages/Results";
import VideoPage from "./Components/Work/VideoPage";
import Lenis from "lenis";

const AnimatedRoutes = ({ showLoader }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home showLoader={showLoader} />
            </PageTransition>
          }
        />
        <Route
          path="/work"
          element={
            <PageTransition>
              <Work />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/results"
          element={
            <PageTransition>
              <Results />
            </PageTransition>
          }
        />
        <Route
          path="/video/:id"
          element={
            <PageTransition>
              <VideoPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

gsap.registerPlugin(ScrollTrigger);
lenis.on("scroll", ScrollTrigger.update);

// Listen for the scroll event and log the event data
lenis.on("scroll", (e) => {});

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    // Hide loader after transition completes
    setTimeout(() => {
      setIsLoading(false);
    }, 800); // Match the scaling animation duration
  };

  // Check if loader has been seen before
  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");

    if (hasSeenLoader) {
      setIsLoading(false);
    }
  }, []);

  const markLoaderSeen = () => {
    sessionStorage.setItem("hasSeenLoader", "true");
  };

  return (
    <Router>
      <div className="bg-[#130e09] min-h-screen w-full relative">
        {/* Loader Layer */}
        {isLoading && (
          <div className="fixed inset-0 z-50">
            <Loader
              onComplete={handleLoaderComplete}
              onMarkSeen={markLoaderSeen}
            />
          </div>
        )}

        {/* Main Content Layer */}
        {!isLoading && (
          <>
            <Navbar />
            <AnimatedRoutes showLoader={isLoading} />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
