import React from 'react';
import { Leaf, Settings2, Sparkles } from 'lucide-react';

const WelcomeScreen = ({ t, onStart, mode, setMode }) => {
  const assetBase = `${import.meta.env.BASE_URL}assets/`;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 bg-gradient-to-br from-kmg-50 to-white text-center">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-3xl w-full border border-gray-100 transform transition-all hover:scale-[1.01]">
        <div className="mb-10 inline-flex flex-col items-center gap-5 rounded-3xl border border-kmg-100 bg-gradient-to-r from-white via-kmg-50 to-white px-8 py-6 shadow-sm sm:flex-row">
          <img src={`${assetBase}kmg-logo.png`} alt="KMG Logo" className="h-24 sm:h-32 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
          <div className="hidden h-14 sm:h-16 w-px bg-kmg-100 sm:block" aria-hidden="true"></div>
          <img src={`${assetBase}res-logo.png`} alt="RES Logo" className="h-24 sm:h-32 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
        </div>

        <div className="mx-auto w-24 h-24 bg-kmg-100 text-kmg-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
          <Leaf size={48} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          {t.welcome.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          {t.welcome.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
          <button
            onClick={() => onStart()}
            className="w-full sm:w-auto px-12 py-5 bg-kmg-600 text-white text-2xl font-bold rounded-2xl hover:bg-kmg-700 active:bg-kmg-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-kmg-500 focus:ring-opacity-50"
          >
            {t.welcome.startBtn}
          </button>
        </div>

        <div className="inline-flex flex-col sm:flex-row bg-gray-50 rounded-2xl p-2 border border-gray-200">
          <button
            onClick={() => setMode('simple')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              mode === 'simple'
                ? 'bg-white text-gray-900 shadow-md border-gray-200'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Sparkles size={20} />
            {t.welcome.simpleMode}
          </button>
          <button
            onClick={() => setMode('advanced')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              mode === 'advanced'
                ? 'bg-white text-gray-900 shadow-md border-gray-200'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings2 size={20} />
            {t.welcome.advancedMode}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
