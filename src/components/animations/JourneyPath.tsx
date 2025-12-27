'use client';

import { PathDraw } from './PathDraw';

interface JourneyPathProps {
  variant: 'vertical' | 'curved' | 'connector';
  className?: string;
  delay?: number;
}

const PATH_VARIANTS = {
  // Simple vertical connecting line
  vertical: {
    path: 'M 1 0 L 1 128',
    viewBox: '0 0 2 128',
  },
  
  // Subtle curved path for visual interest
  curved: {
    path: 'M 1 0 Q 20 64 1 128',
    viewBox: '0 0 40 128',
  },
  
  // Short connector between sections
  connector: {
    path: 'M 1 0 L 1 64',
    viewBox: '0 0 2 64',
  },
} as const;

export function JourneyPath({ variant, className, delay = 0.5 }: JourneyPathProps) {
  const config = PATH_VARIANTS[variant];
  
  return (
    <PathDraw
      path={config.path}
      viewBox={config.viewBox}
      delay={delay}
      className={className}
    />
  );
}