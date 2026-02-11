
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import GameCard from './components/GameCard';
import GameView from './components/GameView';
import { GAMES } from './data/games';
import { Game, Category } from './types';

const CATEGORIES: Category[] = ['All', 'Action', 'Puzzle', 'Retro', 'Sports', 'Arcade'];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Filter games based on category and search query
  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // Features a highlighted "Featured" game
  const featuredGame = useMemo(() => GAMES[0], []);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedGame(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header 
        onSearch={setSearchQuery} 
        onHomeClick={() => {
          setActiveCategory('All');
          setSelectedGame(null);
        }} 
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {!selectedGame ? (
          <>
            {/* Featured Section */}
            {!searchQuery && activeCategory === 'All' && (
              <section className="mb-12">
                <div className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-slate-900 border border-slate-800 group cursor-pointer" onClick={() => setSelectedGame(featuredGame)}>
                  <img 
                    src={featuredGame.thumbnail} 
                    alt="Featured Game"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-center p-8 md:p-12">
                    <span className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest shadow-lg shadow-indigo-600/20">
                      Featured Pick
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                      Explore the <br/><span className="text-indigo-500">Nexus Classic:</span> {featuredGame.title}
                    </h2>
                    <p className="text-slate-300 text-lg max-w-lg mb-8 line-clamp-2">
                      {featuredGame.description} Rediscover why this game defined a genre and continues to challenge players worldwide.
                    </p>
                    <div className="flex gap-4">
                      <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="m7 4 12 8-12 8V4z"/></svg>
                        Play Now
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Category Filter */}
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onClick={setSelectedGame} 
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">No games found</h3>
                  <p className="text-slate-500 mt-2">Try adjusting your search or category filters.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <GameView 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-extrabold tracking-tight text-white uppercase italic">
              Nexus<span className="text-indigo-500">Arcade</span>
            </h1>
            <p className="text-slate-500 text-sm max-w-xs">
              The ultimate destination for premium, unblocked browser gaming experience.
            </p>
          </div>
          <div className="flex gap-10 text-slate-500 text-sm font-semibold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 text-center text-slate-600 text-xs">
          &copy; {new Date().getFullYear()} Nexus Arcade. Not affiliated with game creators. For educational purposes.
        </div>
      </footer>
    </div>
  );
};

export default App;
