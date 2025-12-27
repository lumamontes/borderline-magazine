'use client';

import { useEffect, useRef } from 'react';
import React from 'react';
import { useReducedMotion } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const DEFAULT_SPEED = 0.3;

export function ParallaxLayer({
  children,
  speed = DEFAULT_SPEED,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) {
      return;
    }

    const element = ref.current;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;

        if (elementTop + elementHeight < 0 || elementTop > windowHeight) {
          element.style.transform = 'translateY(0px)';
          return;
        }

        const scrollY = window.scrollY;
        const elementOffsetTop = element.offsetTop;
        const parallaxOffset = (scrollY - elementOffsetTop) * speed;

        element.style.transform = `translateY(${parallaxOffset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [speed, prefersReducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

