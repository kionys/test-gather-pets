import { useEffect, useState } from "react";

const useScroll = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if the user has reached the bottom of the page
      const isAtBottom = windowHeight + currentScrollY >= documentHeight;

      // Only update the scroll direction if not at the bottom
      if (!isAtBottom) {
        if (currentScrollY === 0) {
          // When at the top, always show the header
          setIsScrollingUp(true);
        } else {
          setIsScrollingUp(currentScrollY < lastScrollY);
        }
        lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      }
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollY]);

  return { isScrollingUp };
};

export default useScroll;
