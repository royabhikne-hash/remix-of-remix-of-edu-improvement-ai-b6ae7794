import { useEffect, useState } from "react";
import { useIsMobile } from "./use-mobile";

/**
 * Hook to determine if animations should be reduced
 * Returns true on mobile devices OR if user prefers reduced motion
 */
export function useReducedMotion() {
  const isMobile = useIsMobile();
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Reduce motion on mobile for performance
  return isMobile || prefersReduced;
}
