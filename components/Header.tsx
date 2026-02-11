
import React from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onHomeClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div 
          onClick={onHomeClick}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <rect width="20" height="12" x="2" y="6" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/>
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white italic uppercase">
            Nexus<span className="text-indigo-500">Arcade</span>
          </h1>
        </div>

        <div className="relative w-full md:w-96 group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          <input
            type="text"
            placeholder="Search games..."
            className="w-full bg-slate-800 text-slate-100 pl-10 pr-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-500"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Trending</a>
          <a href="#" className="hover:text-white transition-colors">New Releases</a>
          <a href="#" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors">Discord</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
