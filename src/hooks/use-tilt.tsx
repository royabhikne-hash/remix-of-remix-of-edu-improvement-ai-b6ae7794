import { useRef, useCallback, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

interface TiltStyle {
  transform: string;
  transition: string;
}

export const useTilt = (maxTilt = 15) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [style, setStyle] = useState<TiltStyle>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    transition: "transform 0.1s ease-out",
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxTilt;
      const rotateY = (x - 0.5) * maxTilt;
      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
        transition: "transform 0.1s ease-out",
      });
    },
    [maxTilt, reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.4s ease-out",
    });
  }, []);

  return { ref, style, handleMouseMove, handleMouseLeave };
};
