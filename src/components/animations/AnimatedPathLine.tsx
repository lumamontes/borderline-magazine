'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedPathLineProps {
  className?: string;
  triggerOnScroll?: boolean;
  scrollOffset?: number;
}

/**
 * Animated SVG path line component that draws from hero to mission section.
 * Features progressive drawing animation with dashed line style and X marker at the end.
 */
export function AnimatedPathLine({
  className = '',
  triggerOnScroll = true,
  scrollOffset = 100,
}: AnimatedPathLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [isAnimated, setIsAnimated] = useState(!triggerOnScroll);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  const [showXMarker, setShowXMarker] = useState(false);

  // Extract path data from trace.svg
  const pathData =
    'M0 14.7275C7.25851 15.9634 36.3583 23.4165 58.397 26.5812C74.9926 28.9643 101.444 29.7085 127.013 30.0174C139.602 30.1696 147.604 32.199 179.16 33.1354C205.637 33.921 253.412 33.4537 280.549 32.8357C322.528 31.8798 349.943 27.8358 375.611 26.2816C398.046 24.9231 420.95 24.1093 438.449 21.3004C455.682 18.5342 480.816 18.4915 506.747 15.6825C520.313 14.213 535.682 13.4916 555.396 11.619C567.82 10.4389 577.413 10.3643 618.377 9.42799C654.263 8.60771 720.851 9.10964 758.042 9.72761C813.005 10.6408 831.768 19.072 845.309 23.1356C865.309 29.1375 874.924 41.5434 881.525 48.4066C889.006 56.1849 891.766 67.1234 894.693 76.7955C899.562 92.8809 894.002 112.066 889.606 119.875C884.083 129.683 871.372 134.538 851.296 143.283C832.204 151.599 817.996 154.537 805.585 156.101C795.016 157.432 782.932 161.41 736.157 162.346C695.905 163.152 622.083 162.664 581.525 162.973C540.967 163.282 535.902 163.9 493.491 164.219C451.08 164.537 371.478 164.537 328.661 165.155C273.32 165.954 251.57 170.754 235.068 175.445C214.906 181.177 195.3 183.863 176.978 189.471C135.894 202.048 125.039 226.259 102.058 253.075C90.1174 267.007 86.2688 283.074 81.883 296.819C80.1424 302.274 80.4137 309.927 78.2318 320.199C75.8653 331.339 72.3658 361.537 73.0894 401.152C73.596 428.881 82.5847 441.011 89.5143 451.01C97.4638 462.482 108.154 473.482 116.191 481.291C125.958 490.781 143.153 503.406 157.472 510.017C175.184 518.193 217.448 528.986 247.019 535.306C260.643 538.218 278.455 538.424 332.192 541.861C367.674 544.13 430.73 541.57 464.972 540.943C513.113 540.061 533.533 537.825 550.715 536.571C572.097 535.009 590.549 525.99 616.831 520.354C628.525 517.846 650.393 515.972 693.341 512.872C719.711 510.97 755.104 506.066 776.266 503.837C803.139 501.007 825.825 499.137 871.306 495.083C900.046 492.521 940.667 492.882 974.932 494.109C1009.2 495.335 1035.97 498.425 1055.55 501.562C1087.01 506.6 1103.71 514.062 1113.56 520.597C1140.15 538.248 1170.22 557.75 1183.75 577.057C1195.61 593.982 1201.67 614.49 1204.99 634.171C1207.27 647.67 1211.21 659.489 1212.3 676.24C1214.45 709.008 1211.23 738.72 1208.31 753.991C1204.5 773.936 1197.37 798.569 1186.4 816.78C1173.06 838.95 1145.48 857.968 1112.32 884.138C1094.52 898.182 1081.12 902.967 1070.6 907.611C1047.08 917.987 1020.55 931.019 996.85 938.5C963.273 949.097 951.764 946.656 890.198 947.91C874.862 948.223 869.881 951.037 864.409 951.655C855.978 956.637 850.144 964.108 836.647 975.962C833.325 978.49 831.154 979.726 826.724 980.999';

  // X marker position (end of path)
  const xMarkerX = 826.724;
  const xMarkerY = 980.999;

  // Calculate path length and check for reduced motion
  useEffect(() => {
    // Check for reduced motion preference first
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;
    setHasReducedMotion(prefersReducedMotion);

    if (pathRef.current && containerRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
      // Set CSS custom property for animation
      containerRef.current.style.setProperty('--path-length', `${length}`);
      // Set initial stroke-dashoffset for animation
      if (prefersReducedMotion) {
        // For reduced motion, show path immediately
        pathRef.current.style.strokeDashoffset = '0';
        setShowXMarker(true);
      } else {
        pathRef.current.style.strokeDashoffset = `${length}`;
      }
    }

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setHasReducedMotion(e.matches);
      if (e.matches && pathRef.current) {
        pathRef.current.style.strokeDashoffset = '0';
        setShowXMarker(true);
      }
    };

    mediaQuery.addEventListener('change', handleReducedMotionChange);
    return () => mediaQuery.removeEventListener('change', handleReducedMotionChange);
  }, []);

  // Animate path drawing when triggered
  useEffect(() => {
    if (!isAnimated || !pathRef.current || pathLength === 0 || hasReducedMotion) return;

    const path = pathRef.current;
    const startTime = Date.now();
    const duration = 3500; // 3.5 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      // Animate opacity: 0 to 0.8, with fade in at 10%
      const opacityProgress = Math.min(progress / 0.1, 1);
      const opacity = hasReducedMotion ? 0.5 : opacityProgress * 0.8;
      
      // Animate stroke-dashoffset from pathLength to 0
      const offset = pathLength * (1 - easeOut);
      
      path.style.strokeDashoffset = `${offset}`;
      path.style.opacity = `${opacity}`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Start continuous dash movement after drawing completes
        path.style.animation = 'dashMove 1s linear infinite';
        // Show X marker after path drawing completes
        setTimeout(() => setShowXMarker(true), 100);
      }
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isAnimated, pathLength, hasReducedMotion]);

  // Scroll-triggered animation
  useEffect(() => {
    if (!triggerOnScroll || isAnimated) return;

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - scrollOffset;
        if (isVisible && !isAnimated) {
          setIsAnimated(true);
        }
      }
    };

    // Check initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerOnScroll, isAnimated, scrollOffset]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1222 990"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Main animated path */}
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke="url(#path-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="20 15"
          className={`path-line path-line-responsive ${hasReducedMotion ? 'reduced-motion' : ''}`}
          style={{
            opacity: hasReducedMotion ? 0.5 : undefined,
          }}
        />

        {/* X marker at the end */}
        <g
          className={`x-marker ${showXMarker ? 'x-visible' : ''} ${hasReducedMotion ? 'reduced-motion' : ''}`}
          transform={`translate(${xMarkerX}, ${xMarkerY})`}
        >
          <line
            x1="-10"
            y1="-10"
            x2="10"
            y2="10"
            stroke="url(#path-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="10"
            y1="-10"
            x2="-10"
            y2="10"
            stroke="url(#path-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

