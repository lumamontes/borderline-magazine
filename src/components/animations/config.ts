/**
 * Centralized animation configuration following senior-level principles:
 * - Single source of truth for motion values
 * - Consistent easing and timing across all components
 * - Proper accessibility support
 */

export const ANIMATION_CONFIG = {
  // Global easing curve for all animations
  ease: [0.22, 1, 0.36, 1] as const,
  
  // Duration presets
  duration: {
    fast: 0.6,
    medium: 0.75,
    slow: 0.9,
  } as const,

  // Distance values for reveal animations
  distance: {
    subtle: 8,
    medium: 16,
    large: 24,
  } as const,

  // Stagger timing
  stagger: {
    tight: 0.05,
    medium: 0.1,
    loose: 0.15,
  } as const,

  // Viewport intersection margins - trigger earlier for better fade-in visibility
  viewport: {
    margin: '100px',
    once: true,
  } as const,

  // Typewriter settings
  typewriter: {
    speed: 50,
  } as const,

  // Path drawing
  pathDraw: {
    strokeWidth: 2,
    color: 'currentColor',
    duration: 1.5,
  } as const,

  // Cursor follow
  cursor: {
    smoothing: 0.15,
    imageSize: 192, // 48 * 4 (w-48)
  } as const,
} as const;

/**
 * Animation variants that can be reused across components
 */
export const MOTION_VARIANTS = {
  reveal: {
    hidden: (distance: number) => ({
      opacity: 0,
      y: distance,
    }),
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  
  pathDraw: {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 },
  },

  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATION_CONFIG.stagger.medium,
      },
    },
  },
} as const;