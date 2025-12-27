'use client';

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ANIMATION_CONFIG } from './config';

interface CursorFollowState {
  x: number;
  y: number;
  isVisible: boolean;
  image: string | null;
}

interface UseCursorFollowReturn {
  cursorState: CursorFollowState;
  setHoveredImage: (image: string | null) => void;
  CursorImage: () => JSX.Element | null;
}

export function useCursorFollow(smoothing: number = ANIMATION_CONFIG.cursor.smoothing): UseCursorFollowReturn {
  const [cursorState, setCursorState] = useState<CursorFollowState>({
    x: 0,
    y: 0,
    isVisible: false,
    image: null,
  });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const setHoveredImage = (image: string | null) => {
    setCursorState((prev) => ({
      ...prev,
      image,
      isVisible: image !== null,
    }));
    // Reset image loading state when image changes
    if (image) {
      setImageLoaded(false);
      setImageError(false);
      // Preload the image
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
      img.src = image;
    } else {
      setImageLoaded(false);
      setImageError(false);
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
      setCursorState((prev) => {
        if (!prev.isVisible) {
          return prev;
        }

        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;

        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          return prev;
        }

        return {
          ...prev,
          x: prev.x + dx * smoothing,
          y: prev.y + dy * smoothing,
        };
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [smoothing, prefersReducedMotion, targetPos]);

  const CursorImage = () => {
    if (!cursorState.isVisible || !cursorState.image || prefersReducedMotion) {
      return null;
    }

    return (
      <div
        className="fixed pointer-events-none z-50 transition-opacity duration-500"
        style={{
          left: `${cursorState.x}px`,
          top: `${cursorState.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: cursorState.isVisible && imageLoaded ? 1 : 0,
        }}
      >
        <div className="relative">
          {/* Subtle shadow/border */}
          <div className="absolute inset-0 bg-zinc-900/10 dark:bg-zinc-100/10 rounded-sm blur-md -z-10" aria-hidden="true" />
          {imageError ? (
            <div 
              className="bg-zinc-200 dark:bg-zinc-800 rounded-sm flex items-center justify-center"
              style={{ 
                width: `${ANIMATION_CONFIG.cursor.imageSize}px`,
                height: `${ANIMATION_CONFIG.cursor.imageSize}px`
              }}
            >
              <span className="text-zinc-400 dark:text-zinc-600 text-xs">Image</span>
            </div>
          ) : (
            <>
              {!imageLoaded && (
                <div 
                  className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 rounded-sm animate-pulse"
                  style={{ 
                    width: `${ANIMATION_CONFIG.cursor.imageSize}px`,
                    height: `${ANIMATION_CONFIG.cursor.imageSize}px`
                  }}
                  aria-hidden="true"
                />
              )}
              <img
                src={cursorState.image}
                alt=""
                className={`object-cover rounded-sm transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  maxWidth: 'none',
                  width: `${ANIMATION_CONFIG.cursor.imageSize}px`,
                  height: `${ANIMATION_CONFIG.cursor.imageSize}px`
                }}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          )}
        </div>
      </div>
    );
  };

  return { cursorState, setHoveredImage, CursorImage };
}

