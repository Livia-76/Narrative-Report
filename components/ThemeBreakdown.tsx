import React from 'react';
import { Theme } from '../types';
import { COLORS } from '../constants';

interface ThemeBreakdownProps {
  themes: Theme[];
}

const ThemeBreakdown: React.FC<ThemeBreakdownProps> = ({ themes }) => {
  return (
    <div className="w-full mt-20">
      <h3 className="font-serif text-3xl text-stone-900 mb-8">Detailed Theme Analysis</h3>
      
      <div className="space-y-12">
        {themes.map((theme, idx) => {
          const netSentiment = theme.sentiment.positive - theme.sentiment.negative;
          const isPositive = netSentiment > 0;
          
          return (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-stone-200 pt-8">
              {/* Sidebar: Stats */}
              <div className="md:col-span-3">
                <h4 className="font-serif text-xl font-bold text-stone-900 mb-2">{theme.name}</h4>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {isPositive ? 'Positive Driver' : 'Friction Point'}
                  </span>
                  <span className="text-xs text-stone-500 font-mono">
                    {theme.percentage}% Vol
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-widest text-stone-400">Key Phrases</div>
                  <div className="flex flex-wrap gap-1">
                    {theme.keyPhrases?.map((phrase, pIdx) => (
                      <span key={pIdx} className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded-sm border border-stone-200">
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content: Description & Insights */}
              <div className="md:col-span-9 space-y-6">
                <p className="font-serif text-lg text-stone-700 leading-relaxed">
                  {theme.description}
                </p>

                {theme.insights && theme.insights.length > 0 && (
                  <div className="bg-stone-50 p-6 rounded-sm border border-stone-100">
                    <h5 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">Key Strategic Insights</h5>
                    <ul className="space-y-4">
                      {theme.insights.map((insight, iIdx) => (
                        <li key={iIdx} className="flex gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-stone-900 mb-1">{insight.insight}</p>
                            <p className="text-xs text-stone-500 leading-relaxed italic">"{insight.whyValuable}"</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeBreakdown;