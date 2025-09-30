import { motion } from 'framer-motion'

interface UCLALogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animated?: boolean
}

export function UCLALogo({ size = 'md', className = '', animated = true }: UCLALogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const LogoComponent = animated ? motion.div : 'div'
  const animationProps = animated ? {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { 
      type: "spring", 
      stiffness: 260, 
      damping: 20,
      duration: 1.2 
    },
    whileHover: { 
      scale: 1.1, 
      rotate: 5,
      transition: { duration: 0.3 }
    }
  } : {}

  return (
    <LogoComponent
      className={`${sizeClasses[size]} ${className} ucla-logo-glow`}
      {...animationProps}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* UCLA Shield Background */}
        <defs>
          <linearGradient id="uclaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#003B5C" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        
        {/* Shield Shape */}
        <path
          d="M50 5 L85 20 L85 45 Q85 70 50 95 Q15 70 15 45 L15 20 Z"
          fill="url(#uclaGradient)"
          stroke="url(#goldGradient)"
          strokeWidth="2"
        />
        
        {/* UCLA Text */}
        <text
          x="50"
          y="35"
          textAnchor="middle"
          className="text-xs font-bold fill-white"
          style={{ fontSize: '8px' }}
        >
          UCLA
        </text>
        
        {/* Bear Silhouette */}
        <path
          d="M35 45 Q30 40 35 35 Q40 30 45 35 Q50 30 55 35 Q60 40 55 45 Q60 50 55 55 L50 60 L45 55 Q40 50 35 45 Z"
          fill="url(#goldGradient)"
        />
        
        {/* Decorative Stars */}
        <circle cx="25" cy="25" r="1.5" fill="url(#goldGradient)" opacity="0.8" />
        <circle cx="75" cy="25" r="1.5" fill="url(#goldGradient)" opacity="0.8" />
        <circle cx="25" cy="75" r="1.5" fill="url(#goldGradient)" opacity="0.8" />
        <circle cx="75" cy="75" r="1.5" fill="url(#goldGradient)" opacity="0.8" />
      </svg>
    </LogoComponent>
  )
}