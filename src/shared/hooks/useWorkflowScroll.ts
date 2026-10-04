// src/shared/hooks/useWorkflowScroll.ts

import { useRef, useState, useEffect, useCallback } from "react";

export const useWorkflowScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScrollPosition();
    el.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      el.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const scroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;

    // Find the first child card to accurately measure its width + gap
    const firstCard = el.firstElementChild as HTMLElement;
    if (!firstCard) return;

    // Card width + the gap between cards (approx 24px for gap-6)
    const cardWidth = firstCard.offsetWidth + 24; 

    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft: () => scroll("left"),
    scrollRight: () => scroll("right"),
  };
};