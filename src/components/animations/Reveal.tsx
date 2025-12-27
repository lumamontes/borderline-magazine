'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import React from 'react';
import { ANIMATION_CONFIG, MOTION_VARIANTS } from './config';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  distance?: keyof typeof ANIMATION_CONFIG.distance;
  duration?: keyof typeof ANIMATION_CONFIG.duration;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  distance = 'medium',
  duration = 'medium',
  className,
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, ANIMATION_CONFIG.viewport);
  const prefersReducedMotion = useReducedMotion();

  const distanceValue = ANIMATION_CONFIG.distance[distance];
  const durationValue = ANIMATION_CONFIG.duration[duration];

  // Ensure animations work properly with reduced motion
  const shouldAnimate = !prefersReducedMotion;
  
  return (
    <motion.div
      ref={ref}
      custom={distanceValue}
      initial={shouldAnimate ? 'hidden' : false}
      animate={shouldAnimate && isInView ? 'visible' : shouldAnimate ? 'hidden' : false}
      variants={MOTION_VARIANTS.reveal}
      transition={{
        duration: durationValue,
        delay,
        ease: ANIMATION_CONFIG.ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

