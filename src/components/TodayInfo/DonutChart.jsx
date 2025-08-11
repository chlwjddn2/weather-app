export default function SingleDonutChart({ value, max = 100, size = 70 }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(value / max, 1); // 0~1 사이 값

  // 채워진 길이
  const strokeDashoffset = circumference * (1 - percent);

  return (
    <svg width={size} height={size} viewBox="0 0 160 160">
      <circle
        cx="80"
        cy="80"
        r={radius}
        stroke="#D9F7E2"
        strokeWidth="15"
        fill="none"
      />

      <circle
        cx="80"
        cy="80"
        r={radius}
        stroke="#03C73C"
        strokeWidth="15"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
      />
      <text
        x="80"
        y="90"
        textAnchor="middle"
        fontSize="32"
        fill="#333"
        fontWeight="bold"
      >
        {value}
      </text>
    </svg>
  );
}