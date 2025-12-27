interface MountainsProps {
  className?: string;
  fillColor?: string;
}

export function Mountains({ className, fillColor = 'currentColor' }: MountainsProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
    >
      <g fill={fillColor} opacity="0.15">
        {/* Mountain range */}
        <path d="M 0 300 L 80 200 L 120 220 L 160 150 L 200 180 L 240 120 L 280 160 L 320 100 L 360 140 L 400 80 L 400 300 Z" />
        <path d="M 50 300 L 100 180 L 140 200 L 180 130 L 220 160 L 260 100 L 300 140 L 350 80 L 400 60 L 400 300 Z" />
      </g>
    </svg>
  );
}

