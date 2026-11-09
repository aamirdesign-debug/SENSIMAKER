import React from 'react';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<Props> = ({ size = 'md', showText = true, className = '' }) => {
  const getEmblemSize = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-16 h-16';
      default:
        return 'w-11 h-11';
    }
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Bespoke Vector Emblem */}
      <div className={`relative ${getEmblemSize()} shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,30,68,0.6)]">
          {/* Outer sniper reticle with dashed tactical track */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#ff1e44"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="#0f0517"
            stroke="#ff1e44"
            strokeWidth="2.5"
            opacity="0.9"
          />

          {/* 4 Cardinal Tick Marks */}
          <line x1="50" y1="2" x2="50" y2="12" stroke="#ff1e44" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="88" x2="50" y2="98" stroke="#ff1e44" strokeWidth="3" strokeLinecap="round" />
          <line x1="2" y1="50" x2="12" y2="50" stroke="#ff1e44" strokeWidth="3" strokeLinecap="round" />
          <line x1="88" y1="50" x2="98" y2="50" stroke="#ff1e44" strokeWidth="3" strokeLinecap="round" />

          {/* Three Horizontal Equalizer / Calibration Tracks */}
          {/* Top Track */}
          <line x1="26" y1="36" x2="74" y2="36" stroke="#ff1e44" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <circle cx="62" cy="36" r="3.5" fill="#ffffff" />
          <circle cx="62" cy="36" r="1.5" fill="#ff1e44" />

          {/* Center Track */}
          <line x1="22" y1="50" x2="78" y2="50" stroke="#ff1e44" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

          {/* Bottom Track */}
          <line x1="26" y1="64" x2="74" y2="64" stroke="#ff1e44" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <circle cx="38" cy="64" r="3.5" fill="#ffffff" />
          <circle cx="38" cy="64" r="1.5" fill="#ff1e44" />

          {/* Central Laser Dot */}
          <circle cx="50" cy="50" r="6" fill="#ff1e44" />
          <circle cx="50" cy="50" r="2.5" fill="#ffffff" />
        </svg>

        {/* Live Pulsing Beacon Glow */}
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500/40 animate-ping pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-chakra font-black tracking-wider text-white text-lg md:text-xl">
              SENSI<span className="text-[#ff1e44] ml-1">MAKER</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
              PRO
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase mt-0.5">
            Esports Tuning Lab
          </span>
        </div>
      )}
    </div>
  );
};
