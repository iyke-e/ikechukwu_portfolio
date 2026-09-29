"use client";

import { useEffect, useState, useRef } from "react";

export interface MousePosition {
  x: number; // raw x
  y: number; // raw y
  normalizedX: number; // -1 (left) to 1 (right)
  normalizedY: number; // -1 (bottom/down) to 1 (top/up)
  isHovered: boolean;
}

export function useMousePosition(elementRef?: React.RefObject<HTMLElement | null>): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isHovered: false,
  });

  const targetRef = useRef<{ x: number; y: number; normX: number; normY: number }>({
    x: 0,
    y: 0,
    normX: 0,
    normY: 0,
  });

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (event: MouseEvent) => {
      let x = event.clientX;
      let y = event.clientY;
      let normX = (x / window.innerWidth) * 2 - 1;
      let normY = -(y / window.innerHeight) * 2 + 1;

      if (elementRef && elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
        normX = (x / rect.width) * 2 - 1;
        normY = -(y / rect.height) * 2 + 1;
      }

      targetRef.current = { x, y, normX: Math.max(-1, Math.min(1, normX)), normY: Math.max(-1, Math.min(1, normY)) };
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        let x = touch.clientX;
        let y = touch.clientY;
        let normX = (x / window.innerWidth) * 2 - 1;
        let normY = -(y / window.innerHeight) * 2 + 1;

        if (elementRef && elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          x = touch.clientX - rect.left;
          y = touch.clientY - rect.top;
          normX = (x / rect.width) * 2 - 1;
          normY = -(y / rect.height) * 2 + 1;
        }

        targetRef.current = { x, y, normX: Math.max(-1, Math.min(1, normX)), normY: Math.max(-1, Math.min(1, normY)) };
      }
    };

    const targetElement = elementRef?.current || window;

    const smoothUpdate = () => {
      setPosition((prev) => {
        const factor = 0.12; // smooth lerp
        const nextNormX = prev.normalizedX + (targetRef.current.normX - prev.normalizedX) * factor;
        const nextNormY = prev.normalizedY + (targetRef.current.normY - prev.normalizedY) * factor;
        const nextX = prev.x + (targetRef.current.x - prev.x) * factor;
        const nextY = prev.y + (targetRef.current.y - prev.y) * factor;

        return {
          x: nextX,
          y: nextY,
          normalizedX: nextNormX,
          normalizedY: nextNormY,
          isHovered: true,
        };
      });

      animationFrameId = requestAnimationFrame(smoothUpdate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    animationFrameId = requestAnimationFrame(smoothUpdate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [elementRef]);

  return position;
}
