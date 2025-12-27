'use client';

import { AnimatedPathLine } from '../animations/AnimatedPathLine';

/**
 * Wrapper component that provides the animated path line overlay
 * spanning from hero section to mission section.
 * Positioned absolutely to overlay both sections without interfering with content.
 */
export function HeroMissionPath() {
  return (
    <div 
      className="absolute left-0 right-0 pointer-events-none" 
      style={{ 
        top: 0,
        height: '200vh', 
        zIndex: 1,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      <AnimatedPathLine triggerOnScroll={true} scrollOffset={100} />
    </div>
  );
}

