import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-zinc-900/95 border border-amber-500/40 px-3.5 py-2 text-xs text-zinc-200 shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-md animate-in slide-in-from-bottom duration-300">
      <div className="relative flex items-center justify-center">
        <WifiOff className="w-4 h-4 text-amber-400" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
      </div>
      <div>
        <span className="font-chakra font-bold text-amber-400 tracking-wide uppercase mr-1">OFFLINE MODE:</span>
        <span className="text-zinc-300">Drills & mathematical calculators remain fully cached.</span>
      </div>
    </div>
  );
};
