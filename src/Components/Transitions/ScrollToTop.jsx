// ScrollToTop.jsx - UPDATED VERSION
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        // INSTANT scroll reset - happens immediately when route changes
        // This ensures the page is already at top BEFORE transition shows it
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return null;
};

export default ScrollToTop;