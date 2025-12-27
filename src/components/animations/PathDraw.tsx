'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ANIMATION_CONFIG, MOTION_VARIANTS } from './config';

interface PathDrawProps {
  path: string;
  className?: string;
  strokeWidth?: number;
  strokeColor?: string;
  duration?: number;
  delay?: number;
  viewBox?: string;
}

export function PathDraw({
  path,
  className,
  strokeWidth = ANIMATION_CONFIG.pathDraw.strokeWidth,
  strokeColor = ANIMATION_CONFIG.pathDraw.color,
  duration = ANIMATION_CONFIG.pathDraw.duration,
  delay = 0,
  viewBox = '0 0 2 128',
}: PathDrawProps) {
  const ref = useRef<SVGPathElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = !prefersReducedMotion;

  return (
    <svg
      className={className}
      viewBox={viewBox}
      preserveAspectRatio="none"
      style={{ overflow: 'visible', width: '100%', height: '100%' }}
    >
      <motion.path
        ref={ref}
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldAnimate ? 'hidden' : false}
        animate={shouldAnimate && isInView ? 'visible' : (shouldAnimate ? 'hidden' : false)}
        variants={MOTION_VARIANTS.pathDraw}
        transition={{
          duration,
          delay,
          ease: ANIMATION_CONFIG.ease,
        }}
      />
    </svg>
  );
}

