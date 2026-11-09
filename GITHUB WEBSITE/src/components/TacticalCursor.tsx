import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

export const TacticalCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Positions
  const targetPos = useRef({ x: -100, y: -100 });
  const reticlePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const lastMoved = useRef(Date.now());
  const [isLocked, setIsLocked] = useState(false);

  const reticleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    setIsTouchDevice(checkTouch());

    // Mouse handlers for desktop
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      lastMoved.current = Date.now();
      setIsLocked(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Mobile tap effect handler
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: touch.clientX,
        y: touch.clientY,
        scale: 0.4,
        opacity: 0.9,
      };

      setParticles((prev) => [...prev.slice(-6), newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 550);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Animation loop for smooth lerp chasing dot and aim-lock
    let animId: number;
    const animate = () => {
      // Reticle snaps or lerps very quickly to mouse
      reticlePos.current.x += (targetPos.current.x - reticlePos.current.x) * 0.45;
      reticlePos.current.y += (targetPos.current.y - reticlePos.current.y) * 0.45;

      // Projectile dot trails behind with smoother, heavier lerp
      dotPos.current.x += (reticlePos.current.x - dotPos.current.x) * 0.22;
      dotPos.current.y += (reticlePos.current.y - dotPos.current.y) * 0.22;

      // Distance check for aim-lock
      const dx = dotPos.current.x - reticlePos.current.x;
      const dy = dotPos.current.y - reticlePos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 1.2 && Date.now() - lastMoved.current > 120) {
        setIsLocked(true);
      } else {
        setIsLocked(false);
      }

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${reticlePos.current.x}px, ${reticlePos.current.y}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <>
      {/* Mobile Touch Tap Particle Bursts */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: p.x,
            top: p.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Shockwave expanding ring */}
          <div className="w-12 h-12 rounded-full border border-red-500 animate-ping opacity-75" />
          {/* Central neon spark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500 shadow-[0_0_15px_#ff1e44] animate-pulse" />
        </div>
      ))}

      {/* Desktop Dual Chasing Reticle Cursor */}
      {!isTouchDevice && isVisible && (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
          {/* Outer Reticle Ring */}
          <div
            ref={reticleRef}
            className="absolute top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border border-red-500/80 flex items-center justify-center transition-opacity duration-150"
            style={{ willChange: 'transform' }}
          >
            {/* 4 Cardinal Tick Marks */}
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-red-400" />
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-red-400" />
            <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-red-400" />
            <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-red-400" />
            
            {/* Lock-on glow pulse when settled */}
            {isLocked && (
              <div className="w-full h-full rounded-full border-2 border-red-500 animate-ping opacity-40" />
            )}
          </div>

          {/* Trailing Glowing Projectile Laser Dot */}
          <div
            ref={dotRef}
            className="absolute top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_#ff1e44] flex items-center justify-center"
            style={{ willChange: 'transform' }}
          >
            <span className="w-1 h-1 rounded-full bg-white" />
          </div>
        </div>
      )}
    </>
  );
};
