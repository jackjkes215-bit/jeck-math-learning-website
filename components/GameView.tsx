
import React, { useState } from 'react';
import { Game } from '../types';

interface GameViewProps {
  game: Game;
  onClose: () => void;
}

const GameView: React.FC<GameViewProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) {
      if (!isFullscreen) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col">
      {/* Game Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div>
            <h2 className="text-xl font-bold text-white leading-none">{game.title}</h2>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">{game.category} MODE</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFullscreen}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-700 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 3 6 6"/><path d="m9 21-6-6"/><path d="M21 3v6h-6"/><path d="M3 21v-6h6"/></svg>
            Fullscreen
          </button>
          <button 
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all"
          >
            Exit Game
          </button>
        </div>
      </div>

      {/* Game Container */}
      <div className="flex-1 bg-black relative">
        <iframe
          id="game-iframe"
          src={game.url}
          className="w-full h-full border-none"
          title={game.title}
          allowFullScreen
          allow="autoplay; fullscreen; keyboard"
        />
        
        {/* Subtle overlay for styling */}
        <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5"></div>
      </div>
      
      {/* Game Footer / Info bar */}
      <div className="bg-slate-900 border-t border-slate-800 px-6 py-3 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex gap-6">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Server Status: Online</span>
          <span className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg> Secure Connection</span>
        </div>
        <div>
          Copyright &copy; 2024 Nexus Arcade Hub. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default GameView;
