import React from 'react';
import { X, CheckCircle, Info, FileSearch } from 'lucide-react';

const TransparencyPanel = ({ t, transparencies, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
              <FileSearch size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t.transparency.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-3 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 bg-white">
          <div className="space-y-6">
            {transparencies && transparencies.length > 0 ? (
              transparencies.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 bg-gray-100 px-4 py-1.5 rounded-lg inline-block">
                      {item.category}
                    </h3>
                    <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                      <CheckCircle size={16} />
                      {item.confidence}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-base">
                    <div className="md:col-span-2">
                      <span className="block text-gray-500 text-sm font-medium mb-1">{t.transparency.formula}</span>
                      <code className="block bg-gray-50 p-4 rounded-xl text-gray-800 font-mono text-sm border border-gray-100 whitespace-pre-wrap">
                        {item.formula}
                      </code>
                    </div>
                    
                    <div>
                      <span className="block text-gray-500 text-sm font-medium mb-1">{t.transparency.coefficient}</span>
                      <div className="font-semibold text-gray-900 text-lg">{item.coefficient}</div>
                    </div>

                    <div>
                      <span className="block text-gray-500 text-sm font-medium mb-1">{t.transparency.source}</span>
                      <div className="flex items-center gap-2 text-gray-900">
                        <span className="font-semibold">{item.source}</span>
                        <span className="text-gray-500 text-sm">({item.year})</span>
                        <span className="text-gray-400 text-sm mx-1">•</span>
                        <span className="text-gray-600 text-sm">{item.geography}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 flex flex-col items-center">
                <Info size={48} className="mb-4 text-gray-300" />
                <p className="text-xl">No calculation data available.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
          >
            {t.transparency.close}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TransparencyPanel;
