import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


function Navbar() {
  const location = useLocation();
  const [kuwaitTime, setKuwaitTime] = useState("");

  // Update Kuwait time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const kuwaitTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kuwait",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      setKuwaitTime(kuwaitTime);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  const getLinkClass = (path) => {
    const baseClass = "text-white text-sm font-light tracking-wide transition-opacity";
    const activeClass = location.pathname === path ? " opacity-100 font-normal" : " hover:opacity-70 duration-400";
    return baseClass + activeClass;
  };

  const AnimatedLink = ({ to, children, className }) => (
    <Link to={to} className={className}>
      {children}
    </Link>
  );

  return (
    <div className="w-full flex justify-center pt-8 px-4 fixed top-0 left-0 z-1">
      <nav className="w-[85%] font-[nf] navbar-container">
        <div className="glass-navbar px-5 md:px-8 lg:px-8 py-3 md:py-5 lg:py-2 rounded-full backdrop-blur-xl">
          
          {/* Large screens - Full layout with time */}
          <div className="hidden lg:flex justify-between items-center gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-8">
              <span className="text-white text-sm font-light tracking-wide whitespace-nowrap">
                Kuwait <span className="tracking-tighter font-[inter]">//</span> {kuwaitTime}
              </span>
            </div>

            {/* Center Section */}
            <div className="text-center flex items-center gap-25 flex-shrink-0">
              <AnimatedLink to="/" className={getLinkClass("/")}>
                HOME
              </AnimatedLink>
              <h1 className="text-white text-lg font-light tracking-wider leading-tight font-[villo2]">
                TAHER
                <br />
                FILMS
              </h1>
              <AnimatedLink to="/work" className={getLinkClass("/work")}>
                WORK
              </AnimatedLink>
            </div>

            {/* Right Section */}
            <div className="flex gap-8">
              <div className="flex items-center gap-7">
                <AnimatedLink to="/results" className={getLinkClass("/results")}>
                  RESULTS
                </AnimatedLink>
                <AnimatedLink to="/about" className={getLinkClass("/about")}>
                  ABOUT
                </AnimatedLink>
              </div>
            </div>
          </div>

          {/* Medium screens - No time, keep center text, links on sides */}
          <div className="hidden md:flex lg:hidden justify-between items-center w-full">
            {/* Left: HOME & WORK */}
            <div className="flex items-center gap-7 md:gap-10">
              <AnimatedLink to="/" className={getLinkClass("/")}>
                HOME
              </AnimatedLink>
              <AnimatedLink to="/work" className={getLinkClass("/work")}>
                WORK
              </AnimatedLink>
            </div>

            {/* Center: TAHER FILMS */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-white text-lg font-light tracking-wider leading-tight font-[villo2] text-center">
                TAHER
                <br />
                FILMS
              </h1>
            </div>

            {/* Right: RESULTS & ABOUT */}
            <div className="flex items-center gap-7 md:gap-10">
              <AnimatedLink to="/results" className={getLinkClass("/results")}>
                RESULTS
              </AnimatedLink>
              <AnimatedLink to="/about" className={getLinkClass("/about")}>
                ABOUT
              </AnimatedLink>
            </div>
          </div>

          {/* Small screens - No time, no center text, evenly spaced links */}
          <div className="flex md:hidden justify-between items-center w-full px-2">
            <AnimatedLink to="/" className={getLinkClass("/")}>
              HOME
            </AnimatedLink>
            <AnimatedLink to="/work" className={getLinkClass("/work")}>
              WORK
            </AnimatedLink>
            <AnimatedLink to="/results" className={getLinkClass("/results")}>
              RESULTS
            </AnimatedLink>
            <AnimatedLink to="/about" className={getLinkClass("/about")}>
              ABOUT
            </AnimatedLink>
          </div>

        </div>
      </nav>
    </div>
  );
}

export default Navbar;