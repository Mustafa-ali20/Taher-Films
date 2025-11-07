

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { text, curve, translate } from './anim';
import ScrollToTop from './ScrollToTop';

const routes = {
    "/": "• Home",
    "/work": "• Work", 
    "/about": "• About",
    "/results": "• Results"
};

const anim = (variants) => {
    return {
        variants,
        initial: "initial",
        animate: "enter",
        exit: "exit"
    }
};

const SVG = ({height, width, onEnterComplete}) => {
    const initialPath = `
        M0 300 
        Q${width/2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width/2} ${height + 600} 0 ${height + 300}
        L0 0
    `;
    
    const targetPath = `
        M0 300
        Q${width/2} 0 ${width} 300
        L${width} ${height}
        Q${width/2} ${height} 0 ${height}
        L0 0
    `;
    
    return (
        <motion.svg 
            className="fixed inset-0 w-full pointer-events-none z-20"
            style={{ height: `${height + 600}px` }}
            {...anim(translate)}
        >
            <motion.path 
                {...anim(curve(initialPath, targetPath))}
                onAnimationComplete={(definition) => {
                    // Call callback when enter animation completes
                    if (definition === "enter" && onEnterComplete) {
                        onEnterComplete();
                    }
                }}
                fill="white"
            />
        </motion.svg>
    );
};

export default function PageTransition({children, backgroundColor = "white"}) {
    const location = useLocation();
    const [dimensions, setDimensions] = useState({
        width: null,
        height: null
    });
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        function resize(){
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        resize();
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        }
    }, []);

    useEffect(() => {
        // Hide content immediately when route changes
        setShowContent(false);
    }, [location.pathname]);

    const handleEnterComplete = () => {
        // Show content only after entry animation completes
        setShowContent(true);
    };
    
    return (
        <>
        <ScrollToTop />
        <motion.div 
            className="relative w-full min-h-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0 }}
        >
            {/* Fixed transition container - always 100vh */}
            <div className="fixed inset-0 w-full h-screen overflow-hidden">
                {/* Background */}
                <div 
                    className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-0 delay-100"
                    style={{
                        backgroundColor: backgroundColor,
                        opacity: dimensions.width == null ? 1 : 0
                    }}
                />
            </div>
            
            {/* Route text - separate from container to ensure visibility */}
            <motion.p 
                className="fixed left-1/2 text-5xl text-center transform -translate-x-1/2 font-[nfb] z-50 pointer-events-none"
                style={{ 
                    top: '47.5%',
                    color: 'black'
                }}
                {...anim(text)}
            >
                {routes[location.pathname]}
            </motion.p>
            
            {/* SVG Animation with callback */}
            {dimensions.width != null && (
                <SVG 
                    {...dimensions} 
                    onEnterComplete={handleEnterComplete}
                />
            )}
            
            {/* Page content - controlled by entry animation completion */}
            <div 
                className="pt-18 relative z-0 transition-opacity duration-200"
                style={{ 
                    opacity: showContent ? 1 : 0,
                    pointerEvents: showContent ? 'auto' : 'none'
                }}
            >
                {children}
            </div>
        </motion.div>
        </>
    );
}