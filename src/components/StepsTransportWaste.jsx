import React from 'react';
import { Stepper, SegmentedControl, ExactInput } from './ui/controls';

export const PublicTransportStep = ({ t, mode, answers, onChange }) => {
  const freqOpts = Object.entries(t.questions.public_transport.freq).map(([val, label]) => ({ value: val, label }));

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.questions.public_transport.title}</h2>
      
      <div>
        <p className="text-xl text-gray-700 mb-4 font-medium">{t.questions.public_transport.q1}</p>
        <SegmentedControl
          options={freqOpts}
          value={answers.pt_freq || 'never'}
          onChange={(val) => onChange('pt_freq', val)}
        />
      </div>

      {answers.pt_freq !== 'never' && (
        <div className="space-y-6 animate-in fade-in pt-6 border-t border-gray-100">
          <p className="text-xl text-gray-700 mb-2 font-medium">{t.questions.public_transport.q2}</p>
          {mode === 'simple' ? (
            <input 
              type="range" 
              min={0} 
              max={100} 
              step={5}
              value={answers.pt_distance || 0}
              onChange={(e) => onChange('pt_distance', Number(e.target.value))}
              className="w-full max-w-xl h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-kmg-600 focus:outline-none focus:ring-2 focus:ring-kmg-300"
            />
          ) : (
            <ExactInput
              value={answers.pt_distance}
              onChange={(val) => onChange('pt_distance', val)}
              placeholder="км"
            />
          )}
          <div className="text-3xl font-bold text-kmg-700 mt-2">
            {answers.pt_distance || 0} <span className="text-lg text-gray-500 font-normal">км</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const FlightsStep = ({ t, mode, answers, onChange }) => {
  const cabinOpts = Object.entries(t.questions.flights.cabin).map(([val, label]) => ({ value: val, label }));
  
  const currentFlights = answers.flights || { domestic: 0, short_haul: 0, long_haul: 0 };
  const updateFlight = (type, val) => {
    onChange('flights', { ...currentFlights, [type]: val });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.questions.flights.title}</h2>
      <p className="text-xl text-gray-700 mb-8 font-medium">{t.questions.flights.q1}</p>
      
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <span className="text-xl font-medium text-gray-800">{t.questions.flights.domestic}</span>
          <Stepper
            value={currentFlights.domestic}
            onChange={(val) => updateFlight('domestic', val)}
            max={50}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <span className="text-xl font-medium text-gray-800">{t.questions.flights.short_haul}</span>
          <Stepper
            value={currentFlights.short_haul}
            onChange={(val) => updateFlight('short_haul', val)}
            max={20}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <span className="text-xl font-medium text-gray-800">{t.questions.flights.long_haul}</span>
          <Stepper
            value={currentFlights.long_haul}
            onChange={(val) => updateFlight('long_haul', val)}
            max={20}
          />
        </div>
      </div>

      {(currentFlights.domestic > 0 || currentFlights.short_haul > 0 || currentFlights.long_haul > 0) && (
        <div className="pt-8 border-t border-gray-100 animate-in fade-in">
          <p className="text-xl text-gray-700 mb-4 font-medium">Класс обслуживания</p>
          <SegmentedControl
            options={cabinOpts}
            value={answers.flight_class || 'economy'}
            onChange={(val) => onChange('flight_class', val)}
          />
        </div>
      )}
    </div>
  );
};

export const WasteStep = ({ t, mode, answers, onChange }) => {
  const recycleOpts = Object.entries(t.questions.waste.freq).map(([val, label]) => ({ value: val, label }));

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.questions.waste.title}</h2>
      
      <div>
        <p className="text-xl text-gray-700 mb-6 font-medium">{t.questions.waste.q1}</p>
        {mode === 'simple' ? (
          <Stepper
            value={answers.waste_bags || 0}
            onChange={(val) => onChange('waste_bags', val)}
            max={20}
          />
        ) : (
          <ExactInput
            value={answers.waste_bags}
            onChange={(val) => onChange('waste_bags', val)}
            placeholder="пакетов/нед."
          />
        )}
      </div>

      <div className="pt-8 border-t border-gray-100">
        <p className="text-xl text-gray-700 mb-6 font-medium">{t.questions.waste.q2}</p>
        <SegmentedControl
          options={recycleOpts}
          value={answers.waste_recycle || 'never'}
          onChange={(val) => onChange('waste_recycle', val)}
        />
      </div>
    </div>
  );
};
