'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import React from 'react';
import { useRef } from 'react';
import { ANIMATION_CONFIG, MOTION_VARIANTS } from './config';

interface StaggerProps {
  children: React.ReactNode[];
  delay?: number;
  staggerDelay?: keyof typeof ANIMATION_CONFIG.stagger;
  distance?: keyof typeof ANIMATION_CONFIG.distance;
  duration?: keyof typeof ANIMATION_CONFIG.duration;
  className?: string;
}

export function Stagger({
  children,
  delay = 0,
  staggerDelay = 'medium',
  distance = 'subtle',
  duration = 'medium',
  className,
}: StaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, ANIMATION_CONFIG.viewport);
  const prefersReducedMotion = useReducedMotion();

  const distanceValue = ANIMATION_CONFIG.distance[distance];
  const durationValue = ANIMATION_CONFIG.duration[duration];
  const staggerValue = ANIMATION_CONFIG.stagger[staggerDelay];

  const shouldAnimate = !prefersReducedMotion;

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          custom={distanceValue}
          initial={shouldAnimate ? 'hidden' : false}
          animate={shouldAnimate && isInView ? 'visible' : (shouldAnimate ? 'hidden' : false)}
          variants={MOTION_VARIANTS.reveal}
          transition={{
            duration: durationValue,
            delay: delay + index * staggerValue,
            ease: ANIMATION_CONFIG.ease,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

