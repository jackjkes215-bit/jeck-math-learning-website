
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all cursor-pointer transform hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="bg-slate-900/80 backdrop-blur-md text-xs font-bold px-2 py-1 rounded-md text-slate-100 uppercase tracking-wider border border-slate-700">
            {game.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            {game.rating}
          </div>
        </div>
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>
      
      <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors pointer-events-none"></div>
    </div>
  );
};

export default GameCard;
