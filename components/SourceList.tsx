import React from 'react';
import { Source } from '../types';
import { ExternalLink } from 'lucide-react';

interface SourceListProps {
  sources: Source[];
}

const SourceList: React.FC<SourceListProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="w-full mt-16 pt-12 border-t-2 border-stone-900">
      <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-900 mb-8">Primary Sources</h3>
      <div className="grid grid-cols-1 gap-4">
        {sources.map((source, idx) => (
          <div key={idx} className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 py-2 border-b border-stone-100 hover:bg-stone-50 transition-colors px-2">
            <span className="font-mono text-xs text-stone-400 shrink-0 w-24">{source.publishedDate}</span>
            <a href={source.url} target="_blank" rel="noreferrer" className="flex-1 font-serif text-stone-800 group-hover:text-blue-700 transition-colors flex items-center gap-2">
              {source.title}
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-400" />
            </a>
            <span className="hidden sm:block text-xs text-stone-400 truncate max-w-xs font-sans">
              {new URL(source.url).hostname.replace('www.', '')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceList;