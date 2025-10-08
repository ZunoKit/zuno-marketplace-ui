import { useState, useEffect } from "react";

/**
 * Custom hook to detect scroll position
 * @param threshold - The scroll position threshold (default: 10px)
 * @returns boolean indicating if scrolled past threshold
 */
export function useScroll(threshold: number = 10) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Check initial scroll position
    handleScroll();

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isScrolled;
}

/**
 * Custom hook to get current scroll position
 * @returns current scroll Y position
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Check initial scroll position
    handleScroll();

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}

/**
 * Custom hook to detect scroll direction
 * @returns "up" | "down" | null
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
}
