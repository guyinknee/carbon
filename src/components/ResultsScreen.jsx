import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { RotateCcw, Info, Lightbulb } from 'lucide-react';

const COLORS = ['#22c55e', '#14b8a6', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const ResultsScreen = ({ t, lang, results, answers, onReset, onShowTransparency }) => {
  const [unit, setUnit] = useState('kg'); // 'kg' or 't'
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/recommendations.json`)
      .then(res => res.json())
      .then(data => setRecommendations(data))
      .catch(err => console.error("Failed to load recommendations", err));
  }, []);

  if (!results) return null;

  const getDisplayValue = (val) => {
    return unit === 'kg' ? Math.round(val) : (val / 1000).toFixed(2);
  };

  const chartDataRaw = [
    { name: t.questions.electricity.title, value: results.breakdown.electricity, id: 'electricity' },
    { name: t.questions.heating.title, value: results.breakdown.heating, id: 'heating' },
    { name: t.questions.car.title, value: results.breakdown.car, id: 'car' },
    { name: t.questions.public_transport.title, value: results.breakdown.public_transport, id: 'public_transport' },
    { name: t.questions.flights.title, value: results.breakdown.flights, id: 'flights' },
    { name: t.questions.waste.title, value: results.breakdown.waste, id: 'waste' }
  ];

  const chartData = chartDataRaw.filter(d => d.value > 0).sort((a, b) => b.value - a.value);

  const highestCategory = chartData.length > 0 ? chartData[0] : null;
  const highestId = highestCategory?.id;
  
  let recsToDisplay = [];
  if (recommendations && highestId && recommendations[highestId]) {
    recsToDisplay = recommendations[highestId][lang] || recommendations[highestId]['en'];
  }

  return (
    <div className="flex flex-col flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-kmg-400 to-kmg-600"></div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">{t.results.title}</h2>
        
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            <button
              onClick={() => setUnit('kg')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${unit === 'kg' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              {t.results.kg}
            </button>
            <button
              onClick={() => setUnit('t')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${unit === 't' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              {t.results.t}
            </button>
          </div>
        </div>

        <div className="text-6xl md:text-8xl font-black text-kmg-600 mb-2 tracking-tighter">
          {Number(getDisplayValue(results.total)).toLocaleString(lang)}
        </div>
        <div className="text-xl text-gray-500 font-medium mb-10">
          {unit === 'kg' ? t.results.kg : t.results.t}
        </div>

        {highestCategory && (
          <div className="inline-block bg-orange-50 text-orange-800 px-6 py-3 rounded-2xl font-medium border border-orange-100 mb-10">
            {t.results.highest.replace('{category}', highestCategory.name.toLowerCase())}
          </div>
        )}

        <div className="h-[300px] w-full max-w-2xl mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value) => [`${getDisplayValue(value)} ${unit === 'kg' ? 'kg' : 't'}`, '']}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
              <Lightbulb size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{t.results.recommendations}</h3>
          </div>
          <ul className="space-y-4">
            {recsToDisplay.map((rec, idx) => (
              <li key={idx} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-700 font-medium text-lg">
                <span className="text-kmg-500 font-bold mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
            {recsToDisplay.length === 0 && (
              <li className="text-gray-500 italic px-4 py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                No recommendations available for this category.
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <button
            onClick={onShowTransparency}
            className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all shadow-sm hover:shadow-md group"
          >
            <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all">
              <Info size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.results.transparencyBtn}</h3>
            <p className="text-gray-500 text-sm max-w-sm px-4">{t.results.disclaimer}</p>
          </button>

          <button
            onClick={onReset}
            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white rounded-3xl p-6 flex flex-col items-center justify-center text-center transition-all shadow-md active:scale-[0.98]"
          >
            <RotateCcw size={28} className="mb-3" />
            <span className="text-xl font-bold">{t.buttons.startOver}</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ResultsScreen;
