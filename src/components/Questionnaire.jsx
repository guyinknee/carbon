import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Stepper, SegmentedControl, Slider, ExactInput } from './ui/controls';
import { ElectricityStep, HeatingStep, CarStep } from './StepsHomeCar';
import { PublicTransportStep, FlightsStep, WasteStep } from './StepsTransportWaste';

const Questionnaire = ({ t, mode, initialAnswers, onComplete, onBack }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers || {});

  const totalSteps = 6; // Electricity, Heating, Car, Transport, Flights, Waste

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      onBack();
    }
  };

  const updateAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <ElectricityStep t={t} mode={mode} answers={answers} onChange={updateAnswer} />;
      case 1:
        return <HeatingStep t={t} mode={mode} answers={answers} onChange={updateAnswer} />;
      case 2:
        return <CarStep t={t} mode={mode} answers={answers} onChange={updateAnswer} />;
      case 3:
        return <PublicTransportStep t={t} mode={mode} answers={answers} onChange={updateAnswer} />;
      case 4:
        return <FlightsStep t={t} mode={mode} answers={answers} onChange={updateAnswer} />;
      case 5:
        return <WasteStep t={t} mode={mode} answers={answers} onChange={updateAnswer} />;
      default:
        return <div className="text-center text-gray-500 py-20 text-2xl animate-pulse">Раздел в разработке...</div>;
    }
  };

  return (
    <div className="flex flex-col flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
          <span>Шаг {step + 1} из {totalSteps}</span>
          <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-kmg-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-10 flex-grow flex flex-col min-h-[500px]">
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full">
            {renderStep()}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} />
            {t.buttons.back}
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-4 bg-kmg-600 text-white font-bold rounded-xl hover:bg-kmg-700 active:bg-kmg-800 transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-kmg-500 focus:ring-opacity-50"
          >
            {step === totalSteps - 1 ? t.buttons.finish : t.buttons.next}
            {step === totalSteps - 1 ? <Check size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
