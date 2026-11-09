import React, { useState } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { sound } from '../utils/audio';

interface Props {
  className?: string;
  variant?: 'navbar' | 'drawer' | 'hero';
}

export const PWAInstallButton: React.FC<Props> = ({ className = '', variant = 'navbar' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  // If already running standalone, hide
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    sound.playClick();
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Browser fallback note or alert
      setShowIOSModal(true);
    }
  };

  const getButtonStyles = () => {
    if (variant === 'hero') {
      return 'px-6 py-3.5 bg-gradient-to-r from-red-600 via-rose-500 to-[#ff1e44] text-white font-chakra font-black tracking-wider text-sm uppercase rounded-xl border border-red-400 shadow-[0_0_25px_rgba(255,30,68,0.5)] hover:shadow-[0_0_35px_rgba(255,30,68,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer';
    }
    if (variant === 'drawer') {
      return 'w-full py-3 px-4 bg-red-600/20 border border-red-500/40 text-red-400 hover:bg-red-600/30 rounded-xl font-chakra font-bold text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all';
    }
    return 'px-3.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 hover:text-white rounded-lg font-chakra font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,30,68,0.2)] hover:shadow-[0_0_20px_rgba(255,30,68,0.4)]';
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`${getButtonStyles()} ${className}`}
        title="Install SENSI MAKER on your device for offline esports training"
      >
        <Download className="w-3.5 h-3.5 animate-bounce" />
        <span>INSTALL APP</span>
      </button>

      {/* iOS & Browser Guided Installation Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-2xl bg-zinc-950 border border-red-500/40 p-6 shadow-[0_0_40px_rgba(255,30,68,0.3)]">
            <button
              onClick={() => {
                sound.playClick();
                setShowIOSModal(false);
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-500">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-chakra font-black text-lg text-white tracking-wide">INSTALL SENSI MAKER</h3>
                <p className="text-xs text-zinc-400 font-mono">STANDALONE PWA ACCESS</p>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              Run this esports lab with 120Hz smooth touch polling, zero browser URL bar distractions, and full offline caching:
            </p>

            <div className="space-y-3 bg-zinc-900/80 rounded-xl p-3 border border-zinc-800 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-zinc-800 text-red-400 shrink-0">
                  <Share className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white">Step 1:</span> Tap browser <strong className="text-red-400">Share</strong> (iOS) or browser <strong className="text-red-400">Settings ⋮</strong> (Android/PC).
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-zinc-800 text-red-400 shrink-0">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white">Step 2:</span> Select <strong className="text-red-400">Add to Home Screen</strong> or <strong className="text-red-400">Install App</strong>.
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setShowIOSModal(false);
              }}
              className="mt-5 w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-chakra font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-[0_0_20px_rgba(255,30,68,0.4)]"
            >
              GOT IT, READY TO DOMINATE
            </button>
          </div>
        </div>
      )}
    </>
  );
};
