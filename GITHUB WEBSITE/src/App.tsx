import React, { useState, useEffect } from 'react';
import { Navbar, AppPage } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { SensiPage } from './pages/SensiPage';
import { DrillsPage } from './pages/DrillsPage';
import { HudPage } from './pages/HudPage';
import { GuidesPage } from './pages/GuidesPage';
import { TacticalCursor } from './components/TacticalCursor';
import { OfflineIndicator } from './components/OfflineIndicator';
import { BrandLogo } from './components/BrandLogo';
import { PWAInstallButton } from './components/PWAInstallButton';
import { ShieldCheck, Heart } from 'lucide-react';
import { sound } from './utils/audio';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: AppPage) => {
    sound.playClick();
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#07030e] text-zinc-100 flex flex-col font-jakarta relative selection:bg-red-500/30 selection:text-white">
      {/* Dual Chasing Reticle Cursor for Desktop & Touch physics for Mobile */}
      <TacticalCursor />

      {/* Offline Status Indicator */}
      <OfflineIndicator />

      {/* Frosted Esports Navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'sensi' && <SensiPage />}
        {currentPage === 'drills' && <DrillsPage />}
        {currentPage === 'hud' && <HudPage />}
        {currentPage === 'guides' && <GuidesPage />}
      </main>

      {/* Global Esports Footer */}
      <footer className="border-t border-red-500/20 bg-zinc-950/90 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
          {/* Logo & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <div
              onClick={() => handleNavigate('home')}
              className="cursor-pointer inline-block"
            >
              <BrandLogo size="md" />
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Esports-grade computational tuning lab & aim training facility for Free Fire mobile and PC emulator athletes. Official 0–200 expanded drag algorithm.
            </p>
          </div>

          {/* Quick Route Links */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-chakra font-bold uppercase tracking-wider">
            <button
              onClick={() => handleNavigate('sensi')}
              className="text-yellow-400 hover:text-yellow-300 transition cursor-pointer"
            >
              Optimisation + Sensi
            </button>
            <button
              onClick={() => handleNavigate('drills')}
              className="text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
            >
              Drills & Lab
            </button>
            <button
              onClick={() => handleNavigate('hud')}
              className="text-red-400 hover:text-red-300 transition cursor-pointer"
            >
              Custom HUD
            </button>
            <button
              onClick={() => handleNavigate('guides')}
              className="text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
            >
              Free Guide
            </button>
          </div>

          {/* Install & Safe Disclaimer */}
          <div className="md:col-span-3 flex flex-col md:items-end gap-3">
            <PWAInstallButton variant="hero" />
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Anti-Ban · Math & Physics Only</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-2">
          <span>© {new Date().getFullYear()} SENSI MAKER ESPORTS LAB. ALL RIGHTS RESERVED.</span>
          <span className="flex items-center gap-1">
            BUILT FOR ESPORTS COMPETITORS WORLDWIDE
          </span>
        </div>
      </footer>
    </div>
  );
}
