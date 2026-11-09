import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Sliders, Target, Layout, BookOpen, Zap } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { PWAInstallButton } from './PWAInstallButton';
import { sound } from '../utils/audio';

export type AppPage = 'home' | 'sensi' | 'drills' | 'hud' | 'guides';

interface Props {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export const Navbar: React.FC<Props> = ({ currentPage, onNavigate }) => {
  const [isMuted, setIsMuted] = useState(() => sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleNavClick = (page: AppPage) => {
    sound.playClick();
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  // Explicit distinct esports accent classes for each route
  const getNavClass = (page: AppPage) => {
    const base = 'px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-chakra transition-all flex items-center gap-1.5 cursor-pointer border ';

    if (page === 'sensi') {
      return currentPage === 'sensi'
        ? `${base} bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-300 text-zinc-950 font-black border-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.6)]`
        : `${base} text-yellow-400 border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20 hover:border-yellow-400`;
    }

    if (page === 'drills') {
      return currentPage === 'drills'
        ? `${base} bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 text-zinc-950 font-black border-cyan-300 shadow-[0_0_25px_rgba(14,165,233,0.6)]`
        : `${base} text-cyan-400 border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400`;
    }

    if (page === 'hud') {
      return currentPage === 'hud'
        ? `${base} bg-gradient-to-r from-red-600 via-rose-500 to-[#ff1e44] text-white font-black border-red-400 shadow-[0_0_25px_rgba(255,30,68,0.7)]`
        : `${base} text-red-400 border-red-500/50 bg-red-500/10 hover:bg-red-500/20 hover:border-red-400`;
    }

    if (page === 'guides') {
      return currentPage === 'guides'
        ? `${base} bg-gradient-to-r from-emerald-600 via-green-500 to-lime-400 text-zinc-950 font-black border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.7)]`
        : `${base} text-emerald-400 border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400`;
    }

    return '';
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#07030e]/90 backdrop-blur-xl border-b border-red-500/20 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group flex items-center"
            title="SENSI MAKER Hub"
          >
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('sensi')}
              className={getNavClass('sensi')}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>OPTIMISATION + SENSI</span>
            </button>

            <button
              onClick={() => handleNavClick('drills')}
              className={getNavClass('drills')}
            >
              <Target className="w-3.5 h-3.5" />
              <span>DRILLS</span>
            </button>

            <button
              onClick={() => handleNavClick('hud')}
              className={getNavClass('hud')}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>CUSTOM HUD & KEYS</span>
            </button>

            <button
              onClick={() => handleNavClick('guides')}
              className={getNavClass('guides')}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>FREE GUIDE</span>
            </button>
          </nav>

          {/* Header Quick Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Tactical Audio Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isMuted
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                  : 'bg-red-500/10 border-red-500/40 text-red-400 hover:text-white shadow-[0_0_12px_rgba(255,30,68,0.25)]'
              }`}
              title={isMuted ? 'Unmute tactical audio' : 'Mute tactical audio'}
              aria-label="Sound Toggle"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* PWA Install Button */}
            <div className="hidden sm:block">
              <PWAInstallButton variant="navbar" />
            </div>

            {/* Fast CTA */}
            <button
              onClick={() => handleNavClick('sensi')}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-600 via-rose-500 to-[#ff1e44] text-white font-chakra font-black tracking-wider text-xs uppercase rounded-xl border border-red-400 shadow-[0_0_20px_rgba(255,30,68,0.5)] hover:shadow-[0_0_30px_rgba(255,30,68,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>CALCULATE SENSI</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-zinc-950 border-l border-red-500/30 p-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <BrandLogo size="sm" />
                <button
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="space-y-2.5">
                <button
                  onClick={() => handleNavClick('sensi')}
                  className={`w-full py-3 px-4 ${getNavClass('sensi')} justify-start`}
                >
                  <Sliders className="w-4 h-4 shrink-0" />
                  <span>OPTIMISATION + SENSI</span>
                </button>

                <button
                  onClick={() => handleNavClick('drills')}
                  className={`w-full py-3 px-4 ${getNavClass('drills')} justify-start`}
                >
                  <Target className="w-4 h-4 shrink-0" />
                  <span>DRILLS</span>
                </button>

                <button
                  onClick={() => handleNavClick('hud')}
                  className={`w-full py-3 px-4 ${getNavClass('hud')} justify-start`}
                >
                  <Layout className="w-4 h-4 shrink-0" />
                  <span>CUSTOM HUD & KEYS</span>
                </button>

                <button
                  onClick={() => handleNavClick('guides')}
                  className={`w-full py-3 px-4 ${getNavClass('guides')} justify-start`}
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>FREE GUIDE</span>
                </button>
              </div>

              {/* Mobile Install App Button */}
              <div className="pt-2">
                <PWAInstallButton variant="drawer" />
              </div>
            </div>

            {/* Mobile Footer Status */}
            <div className="border-t border-zinc-900 pt-4 text-center">
              <div className="text-[11px] font-mono text-zinc-500">
                OB48 ESPORTS LAB · 0–200 SCALE
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
