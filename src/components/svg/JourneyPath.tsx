interface JourneyPathProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export function JourneyPath({
  className,
  strokeColor = 'currentColor',
  strokeWidth = 2,
}: JourneyPathProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 800"
      preserveAspectRatio="none"
      style={{ overflow: 'visible' }}
    >
      <path
        d="M 50 0 Q 30 100 50 200 T 50 400 T 50 600 T 50 800"
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

