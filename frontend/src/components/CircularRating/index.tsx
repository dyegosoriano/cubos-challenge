import React from 'react'

interface CircularRatingProps {
  strokeWidth?: number
  rating: number
  size?: number
}

export const CircularRating: React.FC<CircularRatingProps> = ({ rating, size = 60, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const strokeDashoffset = circumference - (rating / 100) * circumference
  const strokeDasharray = circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="rgba(0, 0, 0, 0.3)" strokeWidth={strokeWidth} />

        <circle
          className="transition-all duration-300 ease-in-out"
          strokeDashoffset={strokeDashoffset}
          strokeDasharray={strokeDasharray}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          stroke="#ffd700"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-yellow-400 font-bold text-sm">{rating}%</span>
      </div>
    </div>
  )
}
