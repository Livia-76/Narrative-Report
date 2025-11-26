import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Theme } from '../types';
import { COLORS } from '../constants';

interface ThemeFingerprintsProps {
  themes: Theme[];
}

const ThemeFingerprints: React.FC<ThemeFingerprintsProps> = ({ themes }) => {
  
  // Helper to normalize data for the radar
  const normalize = (theme: Theme) => {
    // 0-100 scales
    const sentimentBalance = theme.sentiment.positive; 
    const negativity = theme.sentiment.negative;
    const attention = (theme.percentage / 30) * 100; // Normalized against an expected max of 30%
    const controversy = Math.min(theme.sentiment.positive, theme.sentiment.negative) * 2; // High if both pos and neg are present
    const semanticUniqueness = Math.random() * 40 + 60; // Mock metric for uniqueness

    return [
      { subject: 'Positivity', A: sentimentBalance, fullMark: 100 },
      { subject: 'Attention', A: Math.min(attention, 100), fullMark: 100 },
      { subject: 'Controversy', A: controversy, fullMark: 100 },
      { subject: 'Negativity', A: negativity, fullMark: 100 },
      { subject: 'Uniqueness', A: semanticUniqueness, fullMark: 100 },
    ];
  };

  return (
    <div className="w-full mt-12">
      <h3 className="font-serif text-2xl text-editorial-text mb-6">Theme Fingerprints</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {themes.map((theme, idx) => {
           const isPositive = theme.sentiment.positive > theme.sentiment.negative;
           const color = isPositive ? COLORS.positive : COLORS.negative;
           
           return (
            <div key={idx} className="flex flex-col items-center bg-white p-4 border border-stone-100 shadow-sm rounded-sm hover:shadow-md transition-shadow">
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={normalize(theme)}>
                        <PolarGrid stroke="#e5e5e5" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fontFamily: 'Inter', fill: '#78716C' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name={theme.name}
                            dataKey="A"
                            stroke={color}
                            fill={color}
                            fillOpacity={0.4}
                        />
                    </RadarChart>
                    </ResponsiveContainer>
                </div>
                <h4 className="font-serif text-center mt-2 text-sm font-semibold text-stone-800 leading-tight h-10 flex items-center">{theme.name}</h4>
                <div className="flex gap-2 mt-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                        {Math.max(theme.sentiment.positive, theme.sentiment.negative)}% {isPositive ? 'Pos' : 'Neg'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                        {theme.percentage}% Vol
                    </span>
                </div>
            </div>
           )
        })}
      </div>
    </div>
  );
};

export default ThemeFingerprints;
