import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  lightText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  lightText = false,
}) => {
  const iconDimensions = {
    sm: { w: 32, h: 32, stroke: 2 },
    md: { w: 42, h: 42, stroke: 2.5 },
    lg: { w: 54, h: 54, stroke: 3 },
    xl: { w: 72, h: 72, stroke: 3.5 },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 3D/Isometric Aesthetic Shopping Bag with Smile & Spark Rays */}
      <div
        className="relative flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
        style={{ width: iconDimensions.w, height: iconDimensions.h }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            {/* Bag Front Gradient */}
            <linearGradient id="bagFrontGrad" x1="20" y1="25" x2="85" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>

            {/* Bag Side / Depth Gradient */}
            <linearGradient id="bagSideGrad" x1="65" y1="30" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>

            {/* Handle Gradient */}
            <linearGradient id="handleGrad" x1="30" y1="10" x2="60" y2="35" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Spark Glow */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#3B82F6" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Spark Rays (top right) */}
          <path
            d="M 76 22 L 87 14"
            stroke="#2563EB"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 80 34 L 92 35"
            stroke="#2563EB"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Handle Loop */}
          <path
            d="M 38 34 C 38 17 56 17 56 34"
            stroke="#0F172A"
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Isometric Bag Side Depth */}
          <path
            d="M 68 32 L 78 40 L 74 85 L 63 88 Z"
            fill="url(#bagSideGrad)"
          />

          {/* Bag Main Face */}
          <path
            d="M 28 32 L 68 32 C 70 32 71.5 33.5 71 35.5 L 63 86 C 62.5 88 60.5 89.5 58 89.5 L 20 88 C 17.5 88 15.5 86 16 84 L 25 35 C 25.5 33.2 26.5 32 28 32 Z"
            fill="url(#bagFrontGrad)"
          />

          {/* Left Eyelet */}
          <circle cx="37" cy="38" r="4.5" fill="#F8FAFC" />
          <circle cx="37" cy="38" r="2.2" fill="#0F172A" />

          {/* Right Eyelet */}
          <circle cx="57" cy="38" r="4.5" fill="#F8FAFC" />
          <circle cx="57" cy="38" r="2.2" fill="#0F172A" />

          {/* Curved Smile Arc on Bag */}
          <path
            d="M 28 62 C 38 74 53 73 63 52"
            stroke="#FFFFFF"
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Subtle Bag Highlight on top edge */}
          <path
            d="M 28 34 L 66 34"
            stroke="#93C5FD"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-black tracking-tight font-outfit ${
              size === 'sm'
                ? 'text-base'
                : size === 'md'
                ? 'text-xl'
                : size === 'lg'
                ? 'text-2xl'
                : 'text-3xl'
            } ${lightText ? 'text-white' : 'text-slate-900'}`}
            style={{ letterSpacing: '-0.03em' }}
          >
            everyday
          </span>
          <span
            className={`font-bold tracking-normal font-outfit text-blue-600 ${
              size === 'sm'
                ? 'text-[11px] tracking-wide'
                : size === 'md'
                ? 'text-xs tracking-wider'
                : size === 'lg'
                ? 'text-sm tracking-wider'
                : 'text-base tracking-widest'
            }`}
          >
            shopping
          </span>
        </div>
      )}
    </div>
  );
};
