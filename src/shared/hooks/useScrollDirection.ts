import { useState, useEffect } from "react";

// This is the disappearing navbar hook when scrolled down tied up to the navbar component
export function useScrollDirection(): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;

      // If scrolling down and past 80px (to avoid hiding immediately at the top)
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        // Scrolling up or at the very top
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return isVisible;
}