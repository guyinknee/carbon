import React from 'react';
import { Stepper, SegmentedControl, ExactInput, cn } from './ui/controls';

export const ElectricityStep = ({ t, mode, answers, onChange }) => {
  const electricityMap = {
    very_low: 50,
    low: 150,
    medium: 300,
    high: 500,
    very_high: 800
  };

  const currentSelection = Object.entries(electricityMap).find(
    ([_, val]) => val === answers.electricity_kWh
  )?.[0];

  const handleSimpleSelect = (key) => {
    onChange('electricity_kWh', electricityMap[key]);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.questions.electricity.title}</h2>
        <p className="text-xl text-gray-700 mb-8 font-medium">{t.questions.electricity.q1}</p>
        
        {mode === 'simple' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(t.questions.electricity.options).map((key) => (
              <button
                key={key}
                onClick={() => handleSimpleSelect(key)}
                className={cn(
                  "p-6 text-left rounded-2xl transition-all shadow-sm border",
                  currentSelection === key
                    ? "bg-kmg-600 text-white border-kmg-600 ring-2 ring-kmg-200 ring-offset-2"
                    : "bg-white text-gray-700 border-gray-200 hover:border-kmg-300 hover:bg-kmg-50"
                )}
              >
                <span className="block text-lg font-bold mb-2">{t.questions.electricity.options[key].split(' (')[0]}</span>
                <span className={cn(
                  "text-sm font-medium",
                  currentSelection === key ? "text-kmg-100" : "text-gray-500"
                )}>
                  {t.questions.electricity.options[key].match(/\((.*?)\)/)?.[1]}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <ExactInput
              value={answers.electricity_kWh}
              onChange={(val) => onChange('electricity_kWh', val)}
              placeholder={t.questions.electricity.exactLabel}
            />
          </div>
        )}
      </div>

      <div className="pt-8 border-t border-gray-100">
        <p className="text-xl text-gray-700 mb-6 font-medium">{t.questions.electricity.q2}</p>
        <Stepper
          value={answers.household_size || 1}
          onChange={(val) => onChange('household_size', val)}
          min={1}
          max={10}
        />
      </div>
    </div>
  );
};

export const HeatingStep = ({ t, mode, answers, onChange }) => {
  const options = Object.entries(t.questions.heating.options).map(([val, label]) => ({ value: val, label }));
  
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.questions.heating.title}</h2>
        <p className="text-xl text-gray-700 mb-8 font-medium">{t.questions.heating.q1}</p>
        
        <SegmentedControl
          options={options}
          value={answers.heating_type || 'not_sure'}
          onChange={(val) => onChange('heating_type', val)}
        />
      </div>

      {mode === 'advanced' && answers.heating_type === 'natural_gas' && (
        <div className="pt-8 border-t border-gray-100 animate-in fade-in">
          <p className="text-xl text-gray-700 mb-6 font-medium">Расход газа (м³/мес)</p>
          <ExactInput
            value={answers.heating_gas_m3}
            onChange={(val) => onChange('heating_gas_m3', val)}
            placeholder="м³/мес"
          />
        </div>
      )}

      {mode === 'advanced' && answers.heating_type === 'district' && (
        <div className="pt-8 border-t border-gray-100 animate-in fade-in">
          <p className="text-xl text-gray-700 mb-6 font-medium">Тепловая энергия (Гкал/мес)</p>
          <ExactInput
            value={answers.heating_district_gcal}
            onChange={(val) => onChange('heating_district_gcal', val)}
            placeholder="Гкал/мес"
          />
        </div>
      )}
    </div>
  );
};

export const CarStep = ({ t, mode, answers, onChange }) => {
  const usageOpts = [
    { value: 'yes', label: t.questions.car.yes },
    { value: 'no', label: t.questions.car.no }
  ];

  const fuelOpts = Object.entries(t.questions.car.fuel).map(([val, label]) => ({ value: val, label }));
  const peopleOpts = Object.entries(t.questions.car.people).map(([val, label]) => ({ value: parseInt(val), label }));

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.questions.car.title}</h2>
      
      <div>
        <p className="text-xl text-gray-700 mb-4 font-medium">{t.questions.car.q1}</p>
        <SegmentedControl
          options={usageOpts}
          value={answers.car_usage || 'no'}
          onChange={(val) => onChange('car_usage', val)}
        />
      </div>

      {answers.car_usage === 'yes' && (
        <div className="space-y-10 animate-in fade-in pt-6">
          <div>
            <p className="text-xl text-gray-700 mb-4 font-medium">{t.questions.car.q2}</p>
            <SegmentedControl
              options={fuelOpts}
              value={answers.car_fuel || 'gasoline'}
              onChange={(val) => onChange('car_fuel', val)}
            />
          </div>

          <div>
            <p className="text-xl text-gray-700 mb-6 font-medium">{t.questions.car.q3}</p>
            {mode === 'simple' ? (
              <input 
                type="range" 
                min={0} 
                max={1000} 
                step={50}
                value={answers.car_km_week || 0}
                onChange={(e) => onChange('car_km_week', Number(e.target.value))}
                className="w-full max-w-xl h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-kmg-600 focus:outline-none focus:ring-2 focus:ring-kmg-300"
              />
            ) : (
              <ExactInput
                value={answers.car_km_week}
                onChange={(val) => onChange('car_km_week', val)}
                placeholder="км"
              />
            )}
            <div className="text-3xl font-bold text-kmg-700 mt-4">
              {answers.car_km_week || 0} <span className="text-lg text-gray-500 font-normal">км</span>
            </div>
          </div>

          <div>
            <p className="text-xl text-gray-700 mb-4 font-medium">{t.questions.car.q4}</p>
            <SegmentedControl
              options={peopleOpts}
              value={answers.car_people || 1}
              onChange={(val) => onChange('car_people', val)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
