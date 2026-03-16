import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import Questionnaire from './components/Questionnaire';
import ResultsScreen from './components/ResultsScreen';
import TransparencyPanel from './components/TransparencyPanel';
import { loadFactors } from './utils/calculator';
import { calculateTotal } from './utils/calculations';

function App() {
  const [lang, setLang] = useState('ru');
  const [translations, setTranslations] = useState(null);
  const [factorsLoaded, setFactorsLoaded] = useState(false);
  const [screen, setScreen] = useState('welcome'); // 'welcome', 'questions', 'results'
  const [mode, setMode] = useState('simple'); // 'simple' or 'advanced'
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showTransparency, setShowTransparency] = useState(false);

  useEffect(() => {
    // Load translations
    fetch(`${import.meta.env.BASE_URL}data/translations.json`)
      .then(res => res.json())
      .then(data => setTranslations(data))
      .catch(err => console.error("Failed to load translations", err));

    // Load factors
    loadFactors()
      .then(() => setFactorsLoaded(true))
      .catch(err => console.error("Failed to load factors", err));
  }, []);

  const handleStart = () => {
    setScreen('questions');
    window.scrollTo(0, 0);
  };

  const handleComplete = (finalAnswers) => {
    setAnswers(finalAnswers);
    const calculated = calculateTotal(finalAnswers);
    setResults(calculated);
    setScreen('results');
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setAnswers({});
    setResults(null);
    setScreen('welcome');
    window.scrollTo(0, 0);
  };

  if (!translations || !factorsLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-kmg-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header t={t} currentLang={lang} setLang={setLang} onReset={handleReset} />
      
      <main className="flex-grow w-full max-w-6xl mx-auto flex flex-col">
        {screen === 'welcome' && (
          <WelcomeScreen t={t} onStart={handleStart} mode={mode} setMode={setMode} />
        )}
        
        {screen === 'questions' && (
          <Questionnaire 
            t={t} 
            mode={mode} 
            initialAnswers={answers} 
            onComplete={handleComplete} 
            onBack={() => setScreen('welcome')} 
          />
        )}
        
        {screen === 'results' && (
          <ResultsScreen 
            t={t} 
            lang={lang} 
            results={results} 
            answers={answers} 
            onReset={handleReset} 
            onShowTransparency={() => setShowTransparency(true)}
          />
        )}
      </main>

      {showTransparency && results && (
        <TransparencyPanel 
          t={t} 
          transparencies={results.transparencies} 
          onClose={() => setShowTransparency(false)} 
        />
      )}
    </div>
  );
}

export default App;
