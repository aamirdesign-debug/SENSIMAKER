import React, { useState, useRef } from 'react';
import { RotateCcw, Crosshair, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const ThumbDragSimulator: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);
  const [currentDisplacement, setCurrentDisplacement] = useState<number>(0);
  const [lastResult, setLastResult] = useState<{
    type: 'body' | 'headshot' | 'overdrag' | null;
    damage: number | string;
    distance: number;
    velocityMs: number;
  }>({
    type: null,
    damage: '',
    distance: 0,
    velocityMs: 0,
  });

  const startTimeRef = useRef<number>(0);
  const padRef = useRef<HTMLDivElement>(null);

  const startDrag = (clientY: number) => {
    sound.playClick(600);
    setIsDragging(true);
    setStartY(clientY);
    setCurrentDisplacement(0);
    startTimeRef.current = Date.now();
  };

  const onDragMove = (clientY: number) => {
    if (!isDragging || startY === null) return;
    // Upward drag is negative clientY delta, so displacement = startY - clientY
    const delta = Math.max(0, startY - clientY);
    setCurrentDisplacement(Math.round(delta));
  };

  const endDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const elapsed = Math.max(1, Date.now() - startTimeRef.current);
    const dist = currentDisplacement;

    if (dist < 45) {
      // Body Hit (Yellow 54 damage lock)
      sound.playHitTick();
      setLastResult({
        type: 'body',
        damage: 54,
        distance: dist,
        velocityMs: elapsed,
      });
    } else if (dist <= 125) {
      // Perfect Drag Headshot (Red 495 critical)
      sound.playHeadshotPing();
      setLastResult({
        type: 'headshot',
        damage: 495,
        distance: dist,
        velocityMs: elapsed,
      });
    } else {
      // Over-drag miss (> 125px)
      sound.playMiss();
      setLastResult({
        type: 'overdrag',
        damage: 'OVER-DRAG (MISS)',
        distance: dist,
        velocityMs: elapsed,
      });
    }

    setStartY(null);
  };

  const resetSimulator = () => {
    sound.playClick(700);
    setCurrentDisplacement(0);
    setLastResult({ type: null, damage: '', distance: 0, velocityMs: 0 });
    setStartY(null);
  };

  return (
    <div className="relative rounded-3xl bg-zinc-950/90 border border-red-500/30 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(255,30,68,0.15)] overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[10px] font-bold uppercase tracking-widest">
              HARDWARE SENSOR BENCHMARK
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              TOUCH POLLING ACTIVE
            </span>
          </div>
          <h3 className="font-chakra font-black text-2xl text-white tracking-wide">
            THUMB DRAG HEADSHOT VELOCITY SIMULATOR
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Test your upward flick distance on this live touch pad. Calibrate thumb muscle memory for the 45px–125px golden zone.
          </p>
        </div>

        <button
          onClick={resetSimulator}
          className="self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET SENSOR</span>
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive Sensor Touch Pad */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            ref={padRef}
            onMouseDown={(e) => startDrag(e.clientY)}
            onMouseMove={(e) => onDragMove(e.clientY)}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={(e) => {
              if (e.touches[0]) startDrag(e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              if (e.touches[0]) onDragMove(e.touches[0].clientY);
            }}
            onTouchEnd={endDrag}
            className={`relative w-full h-72 sm:h-80 rounded-2xl border-2 transition-all select-none cursor-grab active:cursor-grabbing flex flex-col items-center justify-between p-5 overflow-hidden ${
              isDragging
                ? 'bg-red-950/20 border-red-500 shadow-[0_0_35px_rgba(255,30,68,0.3)]'
                : 'bg-zinc-900/60 border-zinc-800 hover:border-red-500/40 hover:bg-zinc-900/80'
            }`}
          >
            {/* Range Threshold Visual Guides */}
            <div className="absolute inset-x-6 top-8 bottom-8 flex flex-col justify-between pointer-events-none opacity-25">
              <div className="border-b border-dashed border-red-500 text-[10px] font-mono text-red-400 text-right">
                &gt;125px OVER-DRAG THRESHOLD
              </div>
              <div className="border-b border-dashed border-emerald-400 text-[10px] font-mono text-emerald-400 text-right">
                45px–125px CRITICAL HEADSHOT ZONE
              </div>
              <div className="border-b border-dashed border-yellow-400 text-[10px] font-mono text-yellow-400 text-right">
                &lt;45px BODY HIT THRESHOLD
              </div>
            </div>

            {/* Target Reticle at top */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                  lastResult.type === 'headshot'
                    ? 'border-red-500 bg-red-500/20 scale-110 shadow-[0_0_20px_#ff1e44]'
                    : lastResult.type === 'body'
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-zinc-700 bg-zinc-900/80'
                }`}
              >
                <Crosshair
                  className={`w-6 h-6 ${
                    lastResult.type === 'headshot'
                      ? 'text-red-400'
                      : lastResult.type === 'body'
                      ? 'text-yellow-400'
                      : 'text-zinc-500'
                  }`}
                />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 mt-1 uppercase tracking-wider">
                ENEMY HELMET TARGET
              </span>
            </div>

            {/* Live Drag Vector Arrow & Displacement */}
            <div className="relative flex flex-col items-center my-auto z-10">
              {isDragging ? (
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-chakra font-black text-red-400 tracking-wider animate-pulse">
                    ↑ {currentDisplacement} px
                  </div>
                  <span className="text-[11px] font-mono text-zinc-300">
                    {currentDisplacement < 45 && 'LOWER (BODY HIT ZONE)'}
                    {currentDisplacement >= 45 && currentDisplacement <= 125 && 'PERFECT DRAG VELOCITY! RELEASE!'}
                    {currentDisplacement > 125 && 'WARNING: OVER-DRAG MISS'}
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-2">
                    <span className="w-4 h-4 rounded-full bg-red-500 animate-ping" />
                  </div>
                  <p className="font-chakra font-bold text-sm text-white uppercase tracking-wider">
                    TOUCH & FLICK UPWARD
                  </p>
                  <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                    Click/tap here and swipe straight up
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Fire Button Trigger Area */}
            <div className="z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border-2 border-red-500/40 bg-zinc-950 flex items-center justify-center shadow-lg">
                <span className="w-6 h-6 rounded-full bg-red-500/80 flex items-center justify-center text-[10px] font-black text-white font-mono">
                  FF
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase mt-1">
                FIRE BUTTON START
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry & Damage Result Display */}
        <div className="lg:col-span-5 space-y-4">
          {/* Result Card */}
          <div
            className={`rounded-2xl p-5 border transition-all ${
              lastResult.type === 'headshot'
                ? 'bg-red-950/40 border-red-500 shadow-[0_0_30px_rgba(255,30,68,0.3)]'
                : lastResult.type === 'body'
                ? 'bg-yellow-950/30 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]'
                : lastResult.type === 'overdrag'
                ? 'bg-zinc-900/60 border-zinc-700'
                : 'bg-zinc-900/40 border-zinc-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                DISPLACEMENT RESULT
              </span>
              {lastResult.type === 'headshot' && (
                <span className="px-2 py-0.5 rounded-full bg-red-500 text-white font-chakra font-black text-[10px] tracking-wider uppercase animate-bounce">
                  CRITICAL HEADSHOT
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              {lastResult.type ? (
                <>
                  <span
                    className={`font-chakra font-black text-4xl sm:text-5xl tracking-tight ${
                      lastResult.type === 'headshot'
                        ? 'text-red-500 drop-shadow-[0_0_15px_#ff1e44]'
                        : lastResult.type === 'body'
                        ? 'text-yellow-400'
                        : 'text-zinc-400'
                    }`}
                  >
                    {lastResult.damage}
                  </span>
                  {lastResult.type !== 'overdrag' && (
                    <span className="font-mono text-xs text-zinc-400">DMG</span>
                  )}
                </>
              ) : (
                <span className="font-chakra font-bold text-2xl text-zinc-500 tracking-wide">
                  READY FOR FLICK
                </span>
              )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-zinc-800/80 text-xs font-mono">
              <div>
                <span className="text-zinc-500 block">DRAG DISTANCE:</span>
                <span className="font-bold text-white text-sm">
                  {lastResult.distance ? `${lastResult.distance} px` : '--'}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">FLICK VELOCITY:</span>
                <span className="font-bold text-white text-sm">
                  {lastResult.velocityMs ? `${lastResult.velocityMs} ms` : '--'}
                </span>
              </div>
            </div>
          </div>

          {/* Golden Rules Breakdown */}
          <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-4 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-chakra font-bold text-white text-sm">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span>THE 3 ES-PORTS FLICK RULES</span>
            </div>

            <div className="space-y-2 text-zinc-400">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 mt-1 shrink-0" />
                <p>
                  <strong className="text-yellow-400 font-mono">&lt; 45px (Body Lock):</strong> Flick too short. Auto-aim locks onto chest, dealing only 54 damage.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0" />
                <p>
                  <strong className="text-red-400 font-mono">45px – 125px (Pure Headshot):</strong> Perfect drag velocity. Crosshair cleanly snaps to head for 495 lethal damage.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-500 mt-1 shrink-0" />
                <p>
                  <strong className="text-zinc-300 font-mono">&gt; 125px (Over-Drag):</strong> Violent upward pull shoots over helmet into empty air.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
