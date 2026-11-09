import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Calculator,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Clock,
  ChevronRight,
  Flame,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { MASTERCLASSES, GuideMasterclass } from '../data/guidesData';
import { sound } from '../utils/audio';

export const GuidesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'All' | 'Sens & Aim' | 'Android' | 'PC Emulator' | 'Competitive'
  >('All');
  const [selectedMasterclass, setSelectedMasterclass] = useState<GuideMasterclass | null>(
    MASTERCLASSES[0]
  );

  // ==========================================
  // INTERACTIVE ANDROID DPI SAFETY CALCULATOR
  // ==========================================
  const [calcStockDpi, setCalcStockDpi] = useState<number>(392);
  const [calcTargetDpi, setCalcTargetDpi] = useState<number>(512);

  const dpiMultiplier = useMemo(() => {
    if (!calcStockDpi || calcStockDpi <= 0) return 1.0;
    return Number((calcTargetDpi / calcStockDpi).toFixed(2));
  }, [calcStockDpi, calcTargetDpi]);

  const dpiDelta = calcTargetDpi - calcStockDpi;

  const dpiRiskAssessment = useMemo(() => {
    if (calcTargetDpi > 720) {
      return {
        level: 'EXTREME RISK (CRITICAL)',
        badge: 'bg-red-500/20 text-red-400 border-red-500',
        color: 'text-red-500',
        summary:
          'DPI exceeds 720. High probability of crashing Android SystemUI into boot loop / recovery mode.',
        advice: 'DO NOT APPLY. Immediately lower target DPI below 600.',
      };
    }
    if (calcTargetDpi > 580 || dpiDelta > 180) {
      return {
        level: 'MODERATE RISK',
        badge: 'bg-amber-500/20 text-yellow-400 border-yellow-500',
        color: 'text-yellow-400',
        summary:
          'DPI is approaching the UI scaling threshold. UI icons and keyboard will appear significantly smaller.',
        advice: 'Safe for gaming sessions, but ensure your stock keyboard does not disappear.',
      };
    }
    return {
      level: '100% SAFE ESPORTS THRESHOLD',
      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500',
      color: 'text-emerald-400',
      summary:
        'Well within manufacturer safety bounds. Provides noticeable touch agility without endangering Android OS stability.',
      advice: 'Apply directly in Developer Options > Smallest Width.',
    };
  }, [calcTargetDpi, dpiDelta]);

  // Filtered masterclasses
  const filteredClasses = useMemo(() => {
    return MASTERCLASSES.filter((m) => {
      const matchCat = selectedCategory === 'All' || m.category === selectedCategory;
      const matchQuery =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto px-4">
      {/* Page Title */}
      <div className="text-center pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>ESPORTS KNOWLEDGE BASE & MASTERCLASSES</span>
        </div>
        <h1 className="font-chakra font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          FREE GUIDE & KNOWLEDGE LAB
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
          Tactical guides on drag mechanics, refresh rate physics, safe Android DPI limits, and tournament scrim optimizations.
        </p>
      </div>

      {/* ======================================================== */}
      {/* INTERACTIVE ANDROID DPI SAFETY & RISK CALCULATOR         */}
      {/* ======================================================== */}
      <section className="rounded-3xl bg-zinc-950/90 border border-emerald-500/30 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.15)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-900 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                INTERACTIVE COMPUTATIONAL TOOL
              </span>
              <h2 className="font-chakra font-black text-xl sm:text-2xl text-white uppercase tracking-wide">
                ANDROID DPI SAFETY & RISK CALCULATOR
              </h2>
            </div>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            PREVENTS RECOVERY MODE BOOT LOOPS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Inputs Column */}
          <div className="lg:col-span-6 space-y-4 font-mono text-xs">
            {/* Stock DPI */}
            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>STOCK FACTORY DPI (SMALLEST WIDTH):</span>
                <span className="text-white font-bold">{calcStockDpi} DPI</span>
              </div>
              <input
                type="range"
                min="320"
                max="520"
                value={calcStockDpi}
                onChange={(e) => setCalcStockDpi(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <span className="text-[10px] text-zinc-500 block">
                Found in your device developer options before modifying.
              </span>
            </div>

            {/* Target DPI */}
            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>TARGET OVERCLOCK DPI:</span>
                <span className="text-emerald-400 font-bold text-sm">{calcTargetDpi} DPI</span>
              </div>
              <input
                type="range"
                min="320"
                max="850"
                value={calcTargetDpi}
                onChange={(e) => setCalcTargetDpi(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>320 (Safe)</span>
                <span>500 (Pro Sweet Spot)</span>
                <span className="text-red-400">800+ (Extreme Danger)</span>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="pt-2">
              <span className="text-[10px] text-zinc-500 uppercase block mb-1.5">
                QUICK TARGET PRESETS:
              </span>
              <div className="flex gap-2">
                {[460, 500, 540, 600, 720].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      sound.playClick();
                      setCalcTargetDpi(val);
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                      calcTargetDpi === val
                        ? 'bg-emerald-400 text-zinc-950 border-emerald-300'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Gauge Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase">
                  RISK ASSESSMENT
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${dpiRiskAssessment.badge}`}
                >
                  {dpiRiskAssessment.level}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">SCALING MULTIPLIER</span>
                  <span className="font-chakra font-black text-2xl text-emerald-400">
                    {dpiMultiplier}x
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px]">OFFSET FROM STOCK</span>
                  <span
                    className={`font-chakra font-black text-2xl ${
                      dpiDelta > 180 ? 'text-red-400' : 'text-yellow-400'
                    }`}
                  >
                    +{dpiDelta} DPI
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs">
                <p className="text-zinc-300 font-jakarta leading-relaxed">
                  {dpiRiskAssessment.summary}
                </p>
                <p className="font-mono text-emerald-400 font-bold mt-1 text-[11px]">
                  RECOMMENDATION: {dpiRiskAssessment.advice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* MASTERCLASSES DIRECTORY                                   */}
      {/* ======================================================== */}
      <section className="space-y-6">
        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Sens & Aim', 'Android', 'PC Emulator', 'Competitive'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-chakra font-bold uppercase tracking-wider border transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-400 text-zinc-950 border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search masterclasses..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* Masterclass Split View: List on left, Reader on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Guide Cards List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredClasses.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedMasterclass(item);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedMasterclass?.id === item.id
                    ? 'bg-zinc-950 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                    : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                    {item.badge}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                    <Clock className="w-3 h-3" />
                    {item.readTimeMinutes} MIN
                  </span>
                </div>

                <h3 className="font-chakra font-bold text-base text-white uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Masterclass Reader View */}
          <div className="lg:col-span-7">
            {selectedMasterclass ? (
              <div className="rounded-3xl bg-zinc-950/90 border border-emerald-500/30 p-6 md:p-8 backdrop-blur-xl shadow-xl space-y-6">
                {/* Header */}
                <div className="border-b border-zinc-900 pb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                      {selectedMasterclass.category}
                    </span>
                    <span className="text-zinc-500 text-xs font-mono">
                      · {selectedMasterclass.readTimeMinutes} min read
                    </span>
                  </div>
                  <h2 className="font-chakra font-black text-2xl md:text-3xl text-white uppercase tracking-wide leading-tight">
                    {selectedMasterclass.title}
                  </h2>
                </div>

                {/* Content Sections */}
                <div className="space-y-6 text-sm text-zinc-300 leading-relaxed font-jakarta">
                  {selectedMasterclass.content.map((sec, idx) => (
                    <div key={idx} className="space-y-3">
                      <h4 className="font-chakra font-bold text-lg text-emerald-300 uppercase tracking-wide">
                        {sec.sectionHeading}
                      </h4>

                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="leading-relaxed">
                          {p}
                        </p>
                      ))}

                      {sec.bulletPoints && (
                        <ul className="space-y-2 bg-zinc-900/60 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300">
                          {sec.bulletPoints.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {sec.tacticalHighlight && (
                        <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/40 p-3.5 text-xs text-emerald-300 font-mono">
                          {sec.tacticalHighlight}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-12 text-center text-zinc-500 font-mono text-xs">
                Select a masterclass from the left directory to open the reader.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
