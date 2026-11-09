import React, { useState, useEffect, useRef } from 'react';
import {
  Target,
  Zap,
  Play,
  Pause,
  RotateCcw,
  CheckSquare,
  Square,
  Flame,
  Award,
  Timer,
  Crosshair,
  TrendingUp,
  Clock,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DRILL_ROUTINES, DrillItem } from '../data/drillsData';
import { sound } from '../utils/audio';

interface FloatingFeedback {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

export const DrillsPage: React.FC = () => {
  // View mode switcher: 'benchmarks' vs 'routines'
  const [activeView, setActiveView] = useState<'benchmarks' | 'routines'>('benchmarks');
  const [benchmarkType, setBenchmarkType] = useState<'gridshot' | 'reflex'>('gridshot');

  // ==========================================
  // BENCHMARK 1: GRIDSHOT STATE
  // ==========================================
  const [sessionDuration, setSessionDuration] = useState<number>(20); // 15, 20, 30, 45s
  const [dotSizePx, setDotSizePx] = useState<number>(32); // 44, 32, 24px
  const [isGridshotActive, setIsGridshotActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [targetsHit, setTargetsHit] = useState<number>(0);
  const [misses, setMisses] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [lastLatencyMs, setLastLatencyMs] = useState<number>(0);
  const [averageLatency, setAverageLatency] = useState<number>(0);
  const [floatingTexts, setFloatingTexts] = useState<FloatingFeedback[]>([]);
  const [showGridReport, setShowGridReport] = useState<boolean>(false);

  // Target coordinates (% within range container)
  const [targetCoords, setTargetCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const targetSpawnTimeRef = useRef<number>(0);
  const rangeRef = useRef<HTMLDivElement>(null);
  const hitLatenciesRef = useRef<number[]>([]);

  // ==========================================
  // BENCHMARK 2: REFLEX TEST STATE
  // ==========================================
  const [reflexState, setReflexState] = useState<'idle' | 'waiting' | 'ready' | 'result' | 'early'>('idle');
  const [reactionTime, setReactionTime] = useState<number>(0);
  const [reflexHistory, setReflexHistory] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sensi_reflex_history');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const reflexTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reflexStartTimeRef = useRef<number>(0);

  // ==========================================
  // ROUTINES & CHECKLIST STATE
  // ==========================================
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'One Tap' | 'Esports' | 'Mixed'>('All');
  const [completedDrills, setCompletedDrills] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sensi_completed_drills');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // Routine live stopwatch
  const [activeDrillStopwatch, setActiveDrillStopwatch] = useState<DrillItem | null>(null);
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState<boolean>(false);

  // Save checklist
  const toggleDrillCompletion = (id: string) => {
    sound.playClick(900);
    const updated = { ...completedDrills, [id]: !completedDrills[id] };
    setCompletedDrills(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sensi_completed_drills', JSON.stringify(updated));
    }
    // Check if finished all
    const totalDone = Object.values(updated).filter(Boolean).length;
    if (totalDone === DRILL_ROUTINES.length) {
      sound.playVictoryFanfare();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const resetAllDrills = () => {
    sound.playClick(600);
    setCompletedDrills({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sensi_completed_drills');
    }
  };

  // Stopwatch effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchSeconds((prev) => {
          if (activeDrillStopwatch) {
            const target = activeDrillStopwatch.durationSeconds[difficulty];
            if (prev + 1 >= target) {
              sound.playTimerBeep(true);
              sound.playVictoryFanfare();
              setIsStopwatchRunning(false);
              return target;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning, activeDrillStopwatch, difficulty]);

  // ==========================================
  // GRIDSHOT LOGIC
  // ==========================================
  const spawnNewTarget = () => {
    // Generate new coordinates with padding (10% to 90%)
    const minPadding = 12;
    const maxPadding = 88;
    let nextX = minPadding + Math.random() * (maxPadding - minPadding);
    let nextY = minPadding + Math.random() * (maxPadding - minPadding);

    // Ensure minimum distance from previous position
    while (Math.hypot(nextX - targetCoords.x, nextY - targetCoords.y) < 25) {
      nextX = minPadding + Math.random() * (maxPadding - minPadding);
      nextY = minPadding + Math.random() * (maxPadding - minPadding);
    }

    setTargetCoords({ x: nextX, y: nextY });
    targetSpawnTimeRef.current = Date.now();
  };

  const startGridshot = () => {
    sound.playClick(800);
    setIsGridshotActive(true);
    setShowGridReport(false);
    setTimeLeft(sessionDuration);
    setTargetsHit(0);
    setMisses(0);
    setStreak(0);
    setMaxStreak(0);
    setScore(0);
    hitLatenciesRef.current = [];
    spawnNewTarget();
  };

  // Gridshot Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGridshotActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 4 && prev > 1) {
            sound.playTimerBeep(false);
          }
          if (prev <= 1) {
            // Drill complete
            sound.playTimerBeep(true);
            sound.playVictoryFanfare();
            setIsGridshotActive(false);
            setShowGridReport(true);
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGridshotActive, timeLeft]);

  // Handle clicking the target dot
  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isGridshotActive) return;

    const latency = Math.max(1, Date.now() - targetSpawnTimeRef.current);
    sound.playHeadshotPing();

    setTargetsHit((prev) => prev + 1);
    setStreak((prev) => {
      const next = prev + 1;
      if (next > maxStreak) setMaxStreak(next);
      return next;
    });

    const pts = Math.max(50, 250 - Math.floor(latency * 0.4)) + streak * 10;
    setScore((prev) => prev + pts);
    setLastLatencyMs(latency);

    hitLatenciesRef.current.push(latency);
    const avg = Math.round(
      hitLatenciesRef.current.reduce((a, b) => a + b, 0) / hitLatenciesRef.current.length
    );
    setAverageLatency(avg);

    // Floating text feedback
    if (rangeRef.current) {
      const rect = rangeRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const newFloating: FloatingFeedback = {
        id: Date.now() + Math.random(),
        text: `+${pts} (${latency}ms)`,
        x: clickX,
        y: clickY,
        color: '#10b981',
      };
      setFloatingTexts((prev) => [...prev.slice(-4), newFloating]);
      setTimeout(() => {
        setFloatingTexts((prev) => prev.filter((t) => t.id !== newFloating.id));
      }, 650);
    }

    spawnNewTarget();
  };

  // Handle clicking empty space (Miss)
  const handleRangeMiss = (e: React.MouseEvent) => {
    if (!isGridshotActive) return;
    sound.playMiss();
    setMisses((prev) => prev + 1);
    setStreak(0);

    if (rangeRef.current) {
      const rect = rangeRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const newFloating: FloatingFeedback = {
        id: Date.now() + Math.random(),
        text: 'MISS',
        x: clickX,
        y: clickY,
        color: '#ff1e44',
      };
      setFloatingTexts((prev) => [...prev.slice(-4), newFloating]);
      setTimeout(() => {
        setFloatingTexts((prev) => prev.filter((t) => t.id !== newFloating.id));
      }, 650);
    }
  };

  // ==========================================
  // REFLEX TEST LOGIC
  // ==========================================
  const startReflexTest = () => {
    sound.playClick(600);
    setReflexState('waiting');
    setReactionTime(0);

    const randomDelay = 1500 + Math.random() * 2500; // 1.5s to 4.0s
    if (reflexTimerRef.current) clearTimeout(reflexTimerRef.current);

    reflexTimerRef.current = setTimeout(() => {
      sound.playTimerBeep(true);
      setReflexState('ready');
      reflexStartTimeRef.current = Date.now();
    }, randomDelay);
  };

  const handleReflexClick = () => {
    if (reflexState === 'waiting') {
      // Early false start!
      if (reflexTimerRef.current) clearTimeout(reflexTimerRef.current);
      sound.playMiss();
      setReflexState('early');
    } else if (reflexState === 'ready') {
      // Valid reaction!
      const elapsed = Math.max(1, Date.now() - reflexStartTimeRef.current);
      sound.playHeadshotPing();
      setReactionTime(elapsed);
      setReflexState('result');

      const updatedHistory = [elapsed, ...reflexHistory.slice(0, 9)];
      setReflexHistory(updatedHistory);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sensi_reflex_history', JSON.stringify(updatedHistory));
      }
      if (elapsed < 200) {
        confetti({ particleCount: 50, spread: 50 });
      }
    }
  };

  const reflexAverage = reflexHistory.length
    ? Math.round(reflexHistory.reduce((a, b) => a + b, 0) / reflexHistory.length)
    : 0;

  // Gridshot tier calculation
  const getGridshotTier = () => {
    const accuracy = targetsHit + misses > 0 ? (targetsHit / (targetsHit + misses)) * 100 : 0;
    if (score >= 4500 && accuracy >= 90) {
      return {
        tier: 'S-TIER (PRO ESPORTS)',
        color: 'text-red-500',
        badgeBg: 'bg-red-500/20 border-red-500',
        advice: 'World-class flick precision. Your neural reaction latency and muscle memory are calibrated for Tier-1 tournament championships.',
      };
    }
    if (score >= 3000 && accuracy >= 80) {
      return {
        tier: 'A-TIER (TOURNAMENT READY)',
        color: 'text-yellow-400',
        badgeBg: 'bg-yellow-500/20 border-yellow-400',
        advice: 'Exceptional consistency. Work on shaving an extra 20ms off your first-shot flick timing to reach elite pro tier.',
      };
    }
    if (score >= 1800) {
      return {
        tier: 'B-TIER (COMPETITIVE RISING)',
        color: 'text-cyan-400',
        badgeBg: 'bg-cyan-500/20 border-cyan-400',
        advice: 'Solid hand-eye foundation. Focus on maintaining your crosshair at shoulder level to minimize drag travel distance.',
      };
    }
    return {
      tier: 'C-TIER (DRILL CADENCE)',
      color: 'text-zinc-400',
      badgeBg: 'bg-zinc-800 border-zinc-700',
      advice: 'Warm up daily for 15 minutes before scrims. Switch to Micro One-Tap target size to build strict flick precision.',
    };
  };

  // Filtered routines
  const filteredRoutines = DRILL_ROUTINES.filter(
    (d) => categoryFilter === 'All' || d.category === categoryFilter
  );

  const completedCount = Object.values(completedDrills).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / DRILL_ROUTINES.length) * 100);

  return (
    <div className="space-y-10 pb-20 max-w-6xl mx-auto px-4">
      {/* Page Title & Navigation Switcher */}
      <div className="text-center pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 font-mono text-[11px] uppercase tracking-wider mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>ESPORTS AIM LAB & NEURAL REACTION FACILITY</span>
        </div>
        <h1 className="font-chakra font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          DRILLS & TRAINING BENCHMARKS
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
          Train sub-200ms flick reaction times and follow pro workout routines to dominate competitive Free Fire lobbies.
        </p>

        {/* View Switcher: Interactive Benchmarks vs Structured Routines */}
        <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl">
          <button
            onClick={() => {
              sound.playClick();
              setActiveView('benchmarks');
            }}
            className={`px-6 py-3 rounded-xl font-chakra font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer ${
              activeView === 'benchmarks'
                ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 text-zinc-950 shadow-[0_0_25px_rgba(14,165,233,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>INTERACTIVE AIM BENCHMARKS</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveView('routines');
            }}
            className={`px-6 py-3 rounded-xl font-chakra font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer ${
              activeView === 'routines'
                ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 text-zinc-950 shadow-[0_0_25px_rgba(14,165,233,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>19 DAILY PRO ROUTINES</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 1: INTERACTIVE AIM BENCHMARKS                    */}
      {/* ======================================================== */}
      {activeView === 'benchmarks' && (
        <div className="space-y-6">
          {/* Benchmark Sub-Switcher: Gridshot vs Reflex */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setBenchmarkType('gridshot');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-chakra font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                benchmarkType === 'gridshot'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              1. RANDOM TARGET DOT CLICKER (GRIDSHOT)
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setBenchmarkType('reflex');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-chakra font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                benchmarkType === 'reflex'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              2. REFLEX & REACTION-TIME BENCHMARK
            </button>
          </div>

          {/* BENCHMARK 1: GRIDSHOT */}
          {benchmarkType === 'gridshot' && (
            <div className="space-y-6">
              {/* Configuration Bar */}
              <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-4 flex flex-wrap items-center justify-between gap-4">
                {/* Session Length */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase">SESSION:</span>
                  <div className="flex gap-1.5">
                    {[15, 20, 30, 45].map((sec) => (
                      <button
                        key={sec}
                        disabled={isGridshotActive}
                        onClick={() => {
                          sound.playClick();
                          setSessionDuration(sec);
                          setTimeLeft(sec);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition ${
                          sessionDuration === sec
                            ? 'bg-cyan-400 text-zinc-950 border-cyan-300'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        {sec}s
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dot Size */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase">DOT SIZE:</span>
                  <div className="flex gap-1.5">
                    {[
                      { size: 44, label: 'Standard (44px)' },
                      { size: 32, label: 'Precision (32px)' },
                      { size: 24, label: 'Micro (24px)' },
                    ].map((d) => (
                      <button
                        key={d.size}
                        disabled={isGridshotActive}
                        onClick={() => {
                          sound.playClick();
                          setDotSizePx(d.size);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition ${
                          dotSizePx === d.size
                            ? 'bg-cyan-400 text-zinc-950 border-cyan-300'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={startGridshot}
                  disabled={isGridshotActive}
                  className={`px-5 py-2 rounded-xl font-chakra font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer ${
                    isGridshotActive
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-600 via-rose-500 to-[#ff1e44] text-white border border-red-400 shadow-[0_0_20px_rgba(255,30,68,0.5)] hover:scale-105'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isGridshotActive ? 'DRILL IN PROGRESS' : 'START GRIDSHOT'}</span>
                </button>
              </div>

              {/* Live HUD Telemetry Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">TIME REMAINING</span>
                  <span className="font-chakra font-black text-2xl text-cyan-400">{timeLeft}s</span>
                </div>
                <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">TARGETS DESTROYED</span>
                  <span className="font-chakra font-black text-2xl text-emerald-400">{targetsHit}</span>
                </div>
                <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">LIVE ACCURACY</span>
                  <span className="font-chakra font-black text-2xl text-yellow-400">
                    {targetsHit + misses > 0
                      ? `${Math.round((targetsHit / (targetsHit + misses)) * 100)}%`
                      : '100%'}
                  </span>
                </div>
                <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">STREAK / MAX</span>
                  <span className="font-chakra font-black text-2xl text-orange-400">
                    🔥 {streak} / {maxStreak}
                  </span>
                </div>
                <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-3 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">TOTAL SCORE</span>
                  <span className="font-chakra font-black text-2xl text-red-500">{score}</span>
                </div>
              </div>

              {/* Interactive Tactical Shooting Range Container */}
              <div
                ref={rangeRef}
                onClick={handleRangeMiss}
                className={`relative w-full h-96 sm:h-[420px] rounded-3xl border-2 overflow-hidden select-none transition-all cursor-crosshair ${
                  isGridshotActive
                    ? 'bg-zinc-950 cyber-grid-dense border-cyan-500/50 shadow-[0_0_40px_rgba(14,165,233,0.15)]'
                    : 'bg-zinc-950/70 cyber-grid border-zinc-800 flex items-center justify-center'
                }`}
              >
                {/* Floating Damage Text */}
                {floatingTexts.map((f) => (
                  <div
                    key={f.id}
                    className="absolute font-chakra font-black text-sm pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-bounce drop-shadow-md z-30"
                    style={{ left: f.x, top: f.y, color: f.color }}
                  >
                    {f.text}
                  </div>
                ))}

                {/* Target Dot (Active when drill is running) */}
                {isGridshotActive && (
                  <div
                    onClick={handleTargetClick}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-transform active:scale-90 z-20 group"
                    style={{
                      left: `${targetCoords.x}%`,
                      top: `${targetCoords.y}%`,
                      width: `${dotSizePx}px`,
                      height: `${dotSizePx}px`,
                    }}
                  >
                    {/* Glowing neon-red target outer ring */}
                    <div className="w-full h-full rounded-full border-2 border-red-500 bg-red-600/30 shadow-[0_0_20px_#ff1e44] flex items-center justify-center animate-pulse">
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                    </div>
                  </div>
                )}

                {/* Idle Overlay when not active */}
                {!isGridshotActive && !showGridReport && (
                  <div className="text-center p-6 max-w-sm z-10">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                      <Crosshair className="w-8 h-8" />
                    </div>
                    <h3 className="font-chakra font-black text-xl text-white uppercase tracking-wider mb-1">
                      GRIDSHOT CYBER RANGE
                    </h3>
                    <p className="text-xs text-zinc-400 mb-5">
                      Flick and click the glowing target dot as quickly as possible. Misses reset your combo streak.
                    </p>
                    <button
                      onClick={startGridshot}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-500 to-[#ff1e44] text-white font-chakra font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(255,30,68,0.6)] hover:scale-105 transition cursor-pointer"
                    >
                      CLICK TO START
                    </button>
                  </div>
                )}

                {/* Post-Drill Performance Report Modal */}
                {showGridReport && (
                  <div className="absolute inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in">
                    <div className="max-w-md w-full text-center space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                        <Award className="w-4 h-4" />
                        <span>SESSION COMPLETE</span>
                      </div>

                      <div className="space-y-1">
                        <span className={`font-chakra font-black text-3xl sm:text-4xl block uppercase ${getGridshotTier().color}`}>
                          {getGridshotTier().tier}
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed max-w-xs mx-auto">
                          {getGridshotTier().advice}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-2 font-mono text-xs">
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px]">FINAL SCORE</span>
                          <span className="text-white font-bold text-base">{score}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px]">AVG FLICK</span>
                          <span className="text-emerald-400 font-bold text-base">{averageLatency}ms</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px]">ACCURACY</span>
                          <span className="text-yellow-400 font-bold text-base">
                            {targetsHit + misses > 0
                              ? `${Math.round((targetsHit / (targetsHit + misses)) * 100)}%`
                              : '100%'}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={startGridshot}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-zinc-950 font-chakra font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(14,165,233,0.5)] hover:scale-105 transition cursor-pointer"
                      >
                        PLAY AGAIN
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BENCHMARK 2: REFLEX TEST */}
          {benchmarkType === 'reflex' && (
            <div className="space-y-6">
              {/* Reflex Test Area */}
              <div
                onClick={handleReflexClick}
                className={`relative w-full h-80 sm:h-96 rounded-3xl border-2 flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer transition-colors duration-100 ${
                  reflexState === 'idle'
                    ? 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    : reflexState === 'waiting'
                    ? 'bg-amber-950/40 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
                    : reflexState === 'ready'
                    ? 'bg-red-600 border-red-400 shadow-[0_0_60px_#ff1e44]'
                    : reflexState === 'result'
                    ? 'bg-emerald-950/40 border-emerald-500'
                    : 'bg-rose-950/50 border-rose-500'
                }`}
              >
                {reflexState === 'idle' && (
                  <div>
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-400">
                      <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="font-chakra font-black text-2xl text-white uppercase tracking-wider mb-2">
                      REFLEX & REACTION SPEED BENCHMARK
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-5">
                      Click anywhere inside this box to begin. Wait until the box explodes into RED, then click as fast as humanly possible.
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startReflexTest();
                      }}
                      className="px-6 py-3 rounded-xl bg-cyan-400 text-zinc-950 font-chakra font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(14,165,233,0.5)] cursor-pointer"
                    >
                      START REFLEX TEST
                    </button>
                  </div>
                )}

                {reflexState === 'waiting' && (
                  <div className="space-y-2">
                    <span className="w-4 h-4 rounded-full bg-amber-400 mx-auto block animate-ping" />
                    <h3 className="font-chakra font-black text-3xl sm:text-4xl text-amber-300 uppercase tracking-wide">
                      WAIT FOR RED...
                    </h3>
                    <p className="text-xs font-mono text-amber-200">
                      DO NOT CLICK YET! False start will register an error.
                    </p>
                  </div>
                )}

                {reflexState === 'ready' && (
                  <div className="space-y-2">
                    <h3 className="font-chakra font-black text-5xl sm:text-6xl text-white uppercase tracking-wider animate-pulse">
                      CLICK NOW!
                    </h3>
                    <p className="text-sm font-mono text-white/90">
                      REGISTER REACTION TIMING!
                    </p>
                  </div>
                )}

                {reflexState === 'result' && (
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                      REACTION REGISTERED
                    </span>
                    <span className="font-chakra font-black text-5xl sm:text-7xl text-emerald-300 block drop-shadow-md">
                      {reactionTime} ms
                    </span>
                    <p className="text-xs text-zinc-300 font-mono">
                      {reactionTime < 190 && '🔥 PRO TIER: Instantaneous esports nervous system reflex.'}
                      {reactionTime >= 190 && reactionTime <= 240 && '⚡ TOURNAMENT READY: Well above human average.'}
                      {reactionTime > 240 && 'Target: Practice daily to drop sub-210ms.'}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startReflexTest();
                      }}
                      className="mt-3 px-5 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-chakra font-black text-xs uppercase tracking-wider cursor-pointer"
                    >
                      TRY AGAIN
                    </button>
                  </div>
                )}

                {reflexState === 'early' && (
                  <div className="space-y-3">
                    <h3 className="font-chakra font-black text-3xl text-rose-400 uppercase tracking-wide">
                      TOO EARLY! FALSE START
                    </h3>
                    <p className="text-xs text-zinc-300 font-mono">
                      You clicked before the screen flashed red.
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startReflexTest();
                      }}
                      className="mt-3 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-chakra font-black text-xs uppercase tracking-wider cursor-pointer"
                    >
                      TRY AGAIN
                    </button>
                  </div>
                )}
              </div>

              {/* Reflex History & Rolling Average */}
              <div className="rounded-2xl bg-zinc-950/80 border border-zinc-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span className="font-chakra font-bold text-sm text-white uppercase tracking-wider">
                      RECENT ATTEMPTS & ROLLING AVERAGE
                    </span>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">
                    AVERAGE: <strong className="text-cyan-400">{reflexAverage ? `${reflexAverage}ms` : '--'}</strong>
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {reflexHistory.length > 0 ? (
                    reflexHistory.map((ms, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border ${
                          ms < 200
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : ms < 250
                            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                        }`}
                      >
                        #{idx + 1}: {ms}ms
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-zinc-500 font-mono">
                      No attempts recorded yet. Run the benchmark to populate telemetry.
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 2: 19 STRUCTURED TRAINING WORKOUTS & CHECKLIST   */}
      {/* ======================================================== */}
      {activeView === 'routines' && (
        <div className="space-y-8">
          {/* Daily Tracker & Stopwatch Header Bar */}
          <div className="rounded-3xl bg-zinc-950/90 border border-cyan-500/30 p-6 md:p-8 backdrop-blur-xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Progress meter */}
              <div className="md:col-span-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                    DAILY WORKOUT COMPLETION
                  </span>
                  <span className="font-chakra font-black text-xl text-cyan-400">
                    {completedCount} / {DRILL_ROUTINES.length} ({progressPercent}%)
                  </span>
                </div>

                <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono text-zinc-500">
                    Saves automatically to local cache
                  </span>
                  <button
                    onClick={resetAllDrills}
                    className="text-[11px] font-mono text-zinc-400 hover:text-red-400 flex items-center gap-1 cursor-pointer transition"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Daily Progress</span>
                  </button>
                </div>
              </div>

              {/* Live Drill Stopwatch */}
              <div className="md:col-span-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5" />
                    ACTIVE DRILL STOPWATCH
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {activeDrillStopwatch ? activeDrillStopwatch.title : 'Select a drill below'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-chakra font-black text-3xl text-white">
                    {Math.floor(stopwatchSeconds / 60)}:
                    {(stopwatchSeconds % 60).toString().padStart(2, '0')}
                    <span className="text-xs font-mono text-zinc-500 ml-2">
                      {activeDrillStopwatch
                        ? `/ ${Math.floor(activeDrillStopwatch.durationSeconds[difficulty] / 60)}m`
                        : ''}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsStopwatchRunning(!isStopwatchRunning);
                      }}
                      disabled={!activeDrillStopwatch}
                      className={`px-3.5 py-1.5 rounded-xl font-chakra font-bold text-xs uppercase flex items-center gap-1.5 transition cursor-pointer ${
                        !activeDrillStopwatch
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          : isStopwatchRunning
                          ? 'bg-amber-500 text-zinc-950'
                          : 'bg-cyan-400 text-zinc-950 hover:bg-cyan-300'
                      }`}
                    >
                      {isStopwatchRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isStopwatchRunning ? 'PAUSE' : 'START'}</span>
                    </button>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsStopwatchRunning(false);
                        setStopwatchSeconds(0);
                      }}
                      className="p-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                      title="Reset Stopwatch"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category & Difficulty Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category */}
            <div className="flex gap-2">
              {(['All', 'One Tap', 'Esports', 'Mixed'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setCategoryFilter(cat);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-chakra font-bold uppercase tracking-wider border transition cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-cyan-400 text-zinc-950 border-cyan-300 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Difficulty Tier */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 uppercase">DIFFICULTY:</span>
              {(['beginner', 'intermediate', 'advanced'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => {
                    sound.playClick();
                    setDifficulty(tier);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold capitalize border transition cursor-pointer ${
                    difficulty === tier
                      ? 'bg-red-500/20 text-red-400 border-red-500/50'
                      : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:text-zinc-300'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Drill Routines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRoutines.map((drill) => {
              const isDone = !!completedDrills[drill.id];
              const isCurrentStopwatch = activeDrillStopwatch?.id === drill.id;

              return (
                <div
                  key={drill.id}
                  className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-80'
                      : isCurrentStopwatch
                      ? 'bg-cyan-950/20 border-cyan-400 shadow-[0_0_20px_rgba(14,165,233,0.2)]'
                      : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    {/* Top Row: Category & Target Reps */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-cyan-400 font-bold uppercase">
                        {drill.category}
                      </span>
                      <span className="text-[11px] font-mono text-yellow-400 font-bold">
                        {drill.repsOrTarget}
                      </span>
                    </div>

                    <h4
                      className={`font-chakra font-black text-base uppercase tracking-wide mb-1.5 ${
                        isDone ? 'line-through text-zinc-500' : 'text-white'
                      }`}
                    >
                      {drill.title}
                    </h4>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {drill.objective}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-900 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>Weapon: <strong className="text-zinc-200">{drill.weaponFocus}</strong></span>
                      <span>Duration: <strong className="text-white">{drill.durationSeconds[difficulty]}s</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleDrillCompletion(drill.id)}
                        className={`flex-1 py-2 px-3 rounded-xl font-chakra font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer ${
                          isDone
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {isDone ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                        <span>{isDone ? 'COMPLETED' : 'MARK DONE'}</span>
                      </button>

                      {/* Stopwatch Load Button */}
                      <button
                        onClick={() => {
                          sound.playClick();
                          setActiveDrillStopwatch(drill);
                          setStopwatchSeconds(0);
                          setIsStopwatchRunning(true);
                        }}
                        className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-cyan-400 border border-zinc-800 hover:border-cyan-500/40 transition cursor-pointer"
                        title="Load into Stopwatch"
                      >
                        <Timer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
