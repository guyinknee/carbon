import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Stepper = ({ value, onChange, min = 0, max = 10, step = 1, label }) => (
  <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl w-max border border-gray-200">
    <button 
      onClick={() => onChange(Math.max(min, value - step))}
      disabled={value <= min}
      className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors"
    >
      -
    </button>
    <div className="flex flex-col items-center min-w-[3rem]">
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      {label && <span className="text-xs text-gray-500 font-medium">{label}</span>}
    </div>
    <button 
      onClick={() => onChange(Math.min(max, value + step))}
      disabled={value >= max}
      className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors"
    >
      +
    </button>
  </div>
);

export const SegmentedControl = ({ options, value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={cn(
          "px-6 py-4 rounded-2xl text-lg font-medium transition-all shadow-sm border",
          value === opt.value
            ? "bg-kmg-600 text-white border-kmg-600 ring-2 ring-kmg-200 ring-offset-1"
            : "bg-white text-gray-700 border-gray-200 hover:border-kmg-300 hover:bg-kmg-50"
        )}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

export const Slider = ({ value, onChange, min, max, step = 1, label, unit }) => (
  <div className="w-full max-w-xl">
    <div className="flex justify-between items-end mb-4">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-3xl font-bold text-kmg-700">
        {value} <span className="text-lg font-normal text-gray-500">{unit}</span>
      </span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-kmg-600 focus:outline-none focus:ring-2 focus:ring-kmg-300"
    />
    <div className="flex justify-between text-sm text-gray-400 mt-2 font-medium">
      <span>{min}</span>
      <span>{max}</span>
    </div>
  </div>
);

export const ExactInput = ({ value, onChange, placeholder, min = 0 }) => (
  <input
    type="number"
    min={min}
    value={value || ''}
    onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)}
    placeholder={placeholder}
    className="w-full max-w-md px-6 py-4 text-xl border-2 border-gray-200 rounded-2xl focus:border-kmg-500 focus:ring-2 focus:ring-kmg-200 outline-none transition-all shadow-sm"
  />
);
