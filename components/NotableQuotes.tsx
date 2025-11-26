import React from 'react';
import { Theme } from '../types';
import { Quote } from 'lucide-react';

interface NotableQuotesProps {
  themes: Theme[];
}

const NotableQuotes: React.FC<NotableQuotesProps> = ({ themes }) => {
  // Flatten all insights that have verbatim text
  const allQuotes = themes.flatMap(t => 
    (t.insights || [])
      .filter(i => i.verbatim)
      .map(i => ({ ...i, themeName: t.name }))
  );

  // Select a few high-impact quotes (e.g., first 3 distinct ones)
  const displayedQuotes = allQuotes.slice(0, 4);

  if (displayedQuotes.length === 0) return null;

  return (
    <div className="w-full mt-16 mb-12">
      <div className="flex items-center gap-2 mb-6 text-stone-400 font-sans border-b border-stone-200 pb-2">
        <Quote size={16} />
        <span className="text-xs font-bold uppercase tracking-widest">Notable Verbatims</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedQuotes.map((quote, idx) => (
          <div key={idx} className="bg-white border border-stone-100 p-6 rounded-sm shadow-sm relative">
            <Quote className="absolute top-4 left-4 text-stone-100 w-8 h-8 rotate-180" />
            <blockquote className="relative z-10">
              <p className="font-serif text-lg leading-relaxed text-stone-800 mb-4">
                “{quote.verbatim}”
              </p>
              <footer className="font-sans">
                <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
                  Context
                </div>
                <cite className="text-xs text-stone-600 not-italic block border-l-2 border-stone-300 pl-2">
                  {quote.insight}
                </cite>
              </footer>
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotableQuotes;