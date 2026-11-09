import React from 'react';
import { Sliders, Target, Layout, BookOpen, ChevronRight, Zap, Flame, ShieldAlert, Cpu } from 'lucide-react';
import { ThumbDragSimulator } from '../components/ThumbDragSimulator';
import { WEAPON_META_SPECS } from '../data/weapons';
import { sound } from '../utils/audio';
import { AppPage } from '../components/Navbar';

interface Props {
  onNavigate: (page: AppPage) => void;
}

export const HomePage: React.FC<Props> = ({ onNavigate }) => {
  const handleNav = (page: AppPage) => {
    sound.playClick();
    onNavigate(page);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-6 md:pt-12 overflow-hidden">
        {/* Ambient crimson and purple glow spots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          {/* Esports Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-red-500/40 text-red-400 mb-6 shadow-[0_0_20px_rgba(255,30,68,0.25)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-chakra font-bold text-xs uppercase tracking-widest text-zinc-200">
              COMPETITIVE ESPORTS CALIBRATION · FREE FIRE OB48 & EXPANDED 0–200 SCALE
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-chakra font-black italic text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95] drop-shadow-lg mb-6">
            DOMINATE EVERY FIREFIGHT <br />
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-[#ff1e44] bg-clip-text text-transparent">
              WITH ZERO RECOIL
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-300 leading-relaxed mb-8">
            The ultimate mathematical tuning lab for Free Fire mobile and PC emulator athletes.
            Compute exact drag sensitivities on the expanded 0–200 scale, safe Android DPI limits, custom HUDs, and train your muscle memory with real-time aim benchmarks.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => handleNav('sensi')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-300 text-zinc-950 font-chakra font-black tracking-wider text-sm uppercase rounded-2xl border border-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:shadow-[0_0_45px_rgba(250,204,21,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-zinc-950" />
              <span>CALCULATE MY SENSI</span>
            </button>

            <button
              onClick={() => handleNav('drills')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 text-zinc-950 font-chakra font-black tracking-wider text-sm uppercase rounded-2xl border border-cyan-300 shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:shadow-[0_0_45px_rgba(14,165,233,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Target className="w-4 h-4" />
              <span>START DRILLS BENCHMARK</span>
            </button>
          </div>

          {/* Fast Stat Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-3.5 backdrop-blur-md">
              <span className="font-chakra font-black text-2xl text-yellow-400 block">0–200</span>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Calibrated Scale
              </span>
            </div>

            <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-3.5 backdrop-blur-md">
              <span className="font-chakra font-black text-2xl text-cyan-400 block">50+</span>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Phones & Emulators
              </span>
            </div>

            <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-3.5 backdrop-blur-md">
              <span className="font-chakra font-black text-2xl text-emerald-400 block">100% Safe</span>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                DPI Thresholds
              </span>
            </div>

            <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-3.5 backdrop-blur-md">
              <span className="font-chakra font-black text-2xl text-red-400 block">19 DRILLS</span>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Interactive Tracker
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* THUMB DRAG VELOCITY SIMULATOR */}
      <section className="max-w-6xl mx-auto px-4">
        <ThumbDragSimulator />
      </section>

      {/* CORE ARCHITECTURE MODULE CARDS */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-chakra font-black text-2xl sm:text-3xl text-white tracking-wide uppercase">
              CORE TUNING SUITE
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Select an esports computational module to begin precision calibration
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Optimisation + Sensi */}
          <div
            onClick={() => handleNav('sensi')}
            className="group relative rounded-3xl bg-zinc-950/90 border border-yellow-500/30 p-7 backdrop-blur-xl hover:border-yellow-400 transition-all cursor-pointer shadow-[0_0_30px_rgba(250,204,21,0.08)] hover:shadow-[0_0_40px_rgba(250,204,21,0.25)] hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                <Sliders className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-mono text-[11px] font-bold uppercase">
                0–200 ENGINE
              </span>
            </div>

            <h3 className="font-chakra font-black text-2xl text-white group-hover:text-yellow-400 transition-colors uppercase tracking-wide mb-2">
              OPTIMISATION + SENSI
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Auto-calculate mathematical sensitivities across 50+ phone models & PC emulators. Includes safe smallest-width DPI threshold limits, RAM allocation, and fire button dimensions.
            </p>

            <div className="flex items-center text-xs font-chakra font-bold text-yellow-400 tracking-wider uppercase group-hover:translate-x-1 transition-transform">
              <span>CALIBRATE HARDWARE</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 2: Drills & Training */}
          <div
            onClick={() => handleNav('drills')}
            className="group relative rounded-3xl bg-zinc-950/90 border border-cyan-500/30 p-7 backdrop-blur-xl hover:border-cyan-400 transition-all cursor-pointer shadow-[0_0_30px_rgba(14,165,233,0.08)] hover:shadow-[0_0_40px_rgba(14,165,233,0.25)] hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] font-bold uppercase">
                19 DRILLS + LAB
              </span>
            </div>

            <h3 className="font-chakra font-black text-2xl text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wide mb-2">
              DRILLS & TRAINING FACILITY
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Daily esports practice routines with stopwatch and live in-app benchmarks: Random Target Dot Clicker (Gridshot) and Reflex Latency Benchmark with Tier grading.
            </p>

            <div className="flex items-center text-xs font-chakra font-bold text-cyan-400 tracking-wider uppercase group-hover:translate-x-1 transition-transform">
              <span>ENTER AIM FACILITY</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 3: Custom HUD & Keys */}
          <div
            onClick={() => handleNav('hud')}
            className="group relative rounded-3xl bg-zinc-950/90 border border-red-500/30 p-7 backdrop-blur-xl hover:border-red-400 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,30,68,0.08)] hover:shadow-[0_0_40px_rgba(255,30,68,0.25)] hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                <Layout className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px] font-bold uppercase">
                2, 3 & 4 FINGER
              </span>
            </div>

            <h3 className="font-chakra font-black text-2xl text-white group-hover:text-red-400 transition-colors uppercase tracking-wide mb-2">
              CUSTOM HUD & KEYMAPPINGS
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Interactive Virtual Phone Screen inspector revealing button percentages, coordinates, and finger assignments, plus PC keybinding matrices and tweaks codes.
            </p>

            <div className="flex items-center text-xs font-chakra font-bold text-red-400 tracking-wider uppercase group-hover:translate-x-1 transition-transform">
              <span>INSPECT HUD PRESETS</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 4: Free Guide */}
          <div
            onClick={() => handleNav('guides')}
            className="group relative rounded-3xl bg-zinc-950/90 border border-emerald-500/30 p-7 backdrop-blur-xl hover:border-emerald-400 transition-all cursor-pointer shadow-[0_0_30px_rgba(16,185,129,0.08)] hover:shadow-[0_0_40px_rgba(16,185,129,0.25)] hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold uppercase">
                8 MASTERCLASSES
              </span>
            </div>

            <h3 className="font-chakra font-black text-2xl text-white group-hover:text-emerald-400 transition-colors uppercase tracking-wide mb-2">
              FREE GUIDE & KNOWLEDGE LAB
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              In-depth tactical breakdowns: Straight & J-Curve drags, Android DPI safety calculator, zero-lag OS developer options, and tournament anti-stutter optimizations.
            </p>

            <div className="flex items-center text-xs font-chakra font-bold text-emerald-400 tracking-wider uppercase group-hover:translate-x-1 transition-transform">
              <span>READ MASTERCLASSES</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* WEAPON META DRAG SPECS TABLE */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl bg-zinc-950/90 border border-red-500/30 p-6 md:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-red-500" />
                <span className="font-mono text-xs uppercase text-red-400 tracking-wider font-bold">
                  OB48 WEAPON META
                </span>
              </div>
              <h3 className="font-chakra font-black text-2xl text-white uppercase tracking-wide">
                WEAPON META DRAG SPECS TABLE
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              OPTIMIZED FOR HEADSHOT HITBOX LOCK
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-mono uppercase tracking-wider">
                  <th className="pb-3 pr-4">Weapon</th>
                  <th className="pb-3 px-4">Category</th>
                  <th className="pb-3 px-4">Drag Style</th>
                  <th className="pb-3 px-4">Velocity</th>
                  <th className="pb-3 px-4">Button Size</th>
                  <th className="pb-3 px-4">Damage Profile</th>
                  <th className="pb-3 pl-4">Pro Coaching Tip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 font-mono">
                {WEAPON_META_SPECS.map((w) => (
                  <tr key={w.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-4 pr-4 font-chakra font-bold text-white text-sm">
                      {w.name}
                    </td>
                    <td className="py-4 px-4 text-zinc-400">{w.category}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30">
                        {w.dragStyle}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-yellow-400">{w.recommendedVelocity}</td>
                    <td className="py-4 px-4 text-white font-bold">{w.fireButtonSize}</td>
                    <td className="py-4 px-4 text-emerald-400">{w.headshotMultiplier}</td>
                    <td className="py-4 pl-4 text-zinc-400 font-jakarta leading-relaxed max-w-xs">
                      {w.proTip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
