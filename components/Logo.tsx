type LogoVariant = 'full' | 'compact' | 'icon' | 'stacked'
type LogoTheme = 'dark' | 'light'

interface LogoProps {
  variant?: LogoVariant
  theme?: LogoTheme
  className?: string
  size?: number
}

function BionicEyeIcon({ size = 48, color = '#C8281E', showLids = true }: { size?: number; color?: string; showLids?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Upper lid */}
      {showLids && (
        <path
          d="M15 50 C15 28, 35 12, 50 12 C65 12, 85 28, 85 50"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {/* Lower lid */}
      {showLids && (
        <path
          d="M15 50 C15 72, 35 88, 50 88 C65 88, 85 72, 85 50"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {/* Iris ring */}
      <circle
        cx="50"
        cy="50"
        r="20"
        stroke={color}
        strokeWidth="3"
        fill="none"
      />
      {/* Pupil */}
      <circle
        cx="50"
        cy="50"
        r="8"
        fill={color}
        className="pupil-pulse"
      />
      {/* Power stem (vertical line from top of iris up) */}
      <line
        x1="50"
        y1="30"
        x2="50"
        y2="18"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Q tail (curved tail extending from bottom-right of iris) */}
      <path
        d="M62 62 C68 68, 74 72, 82 74"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function Wordmark({ text = 'Stve', theme = 'dark' as LogoTheme, className = '' }) {
  const color = theme === 'dark' ? '#F0F0EC' : '#0A0A0E'
  return (
    <span
      className={`font-sans font-bold tracking-[-0.04em] ${className}`}
      style={{ color }}
    >
      {text}
    </span>
  )
}

export default function Logo({ variant = 'full', theme = 'dark', className = '', size }: LogoProps) {
  const iconColor = '#C8281E'
  const textColor = theme === 'dark' ? '#F0F0EC' : '#0A0A0E'

  switch (variant) {
    case 'full':
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          <BionicEyeIcon size={size || 40} color={iconColor} showLids={true} />
          <Wordmark text="Stve" theme={theme} className="text-2xl" />
        </div>
      )

    case 'compact':
      return (
        <div className={`flex items-center gap-1.5 ${className}`}>
          <BionicEyeIcon size={size || 32} color={iconColor} showLids={false} />
          <Wordmark text="Stve" theme={theme} className="text-xl" />
        </div>
      )

    case 'icon':
      return (
        <div className={className}>
          <BionicEyeIcon size={size || 32} color={iconColor} showLids={true} />
        </div>
      )

    case 'stacked':
      return (
        <div className={`flex flex-col items-center gap-1 ${className}`}>
          <BionicEyeIcon size={size || 56} color={iconColor} showLids={true} />
          <span
            className="font-mono text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: textColor }}
          >
            QSTVE
          </span>
        </div>
      )
  }
}
