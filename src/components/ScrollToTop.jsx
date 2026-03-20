import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Immediate Native Reset (Brute Force)
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    
    // 2. Clear Visual Hash
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
    
    // 3. Managed Retry (The "Bulletproof" Part)
    // We try to force the scroll position a few times to catch any late-loading content or Lenis init
    let count = 0;
    const scrollInterval = setInterval(() => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
        // After forcing immediate, we can stop polling
        clearInterval(scrollInterval);
      } else {
        window.scrollTo(0, 0);
      }
      
      count++;
      if (count > 20) clearInterval(scrollInterval); // Stop after 1 second total
    }, 50);

    return () => clearInterval(scrollInterval);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
