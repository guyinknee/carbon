import React from 'react';

const Header = ({ t, currentLang, setLang, onReset }) => {
  const assetBase = `${import.meta.env.BASE_URL}assets/`;

  return (
    <header className="bg-white shadow-sm w-full sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-24 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div 
          className="flex items-center gap-4 cursor-pointer"
          onClick={onReset}
        >
          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm">
            <img src={`${assetBase}kmg-logo.png`} alt="KMG Logo" className="h-12 sm:h-14 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
            <div className="h-12 sm:h-14 w-px bg-gray-200" aria-hidden="true"></div>
            <img src={`${assetBase}res-logo.png`} alt="RES Logo" className="h-12 sm:h-14 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-gray-900">
              {t.header.title}
            </h1>
            <p className="text-sm text-gray-500">KMG x RES</p>
          </div>
        </div>
        
        <div className="flex flex-row items-center gap-2 bg-gray-100 rounded-full p-1">
          {['kk', 'ru', 'en'].map(lang => (
            <button
              key={lang}
              onClick={() => setLang(lang)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                currentLang === lang 
                  ? 'bg-kmg-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
