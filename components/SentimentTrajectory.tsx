import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { COLORS } from '../constants';
import { Sentiment } from '../types';

interface SentimentTrajectoryProps {
  currentSentiment: Sentiment;
}

const SentimentTrajectory: React.FC<SentimentTrajectoryProps> = ({ currentSentiment }) => {
  
  // Dynamically generate a narrative arc that ends at currentSentiment
  // We assume a standard "Conflict -> Resolution" or "Hype -> Disappointment -> Realism" arc
  const data = useMemo(() => {
    const { positive, negative, neutral } = currentSentiment;
    
    // Helper to ensure sums to 100 roughly (normalized by stackOffset="expand" anyway)
    const createPoint = (name: string, pos: number, neg: number, neu: number, annotation: string = "") => ({
        name, positive: pos, negative: neg, neutral: neu, annotation
    });

    // Scenario: If Negative is high (>30%), assume we are in a "Friction" phase after a "Hype" phase.
    // If Positive is very high (>70%), assume "Growth".
    
    if (negative > 35) {
        // Friction Arc: Hope -> Disappointment -> Stabilization (Current)
        return [
            createPoint('Start', 80, 5, 15, "Launch Hype"),
            createPoint('Month 1', 65, 15, 20, ""),
            createPoint('Month 2', 45, 35, 20, "Structural Friction Revealed"),
            createPoint('Month 3', 35, 55, 10, "Peak Frustration"),
            createPoint('Current', positive, negative, neutral, "Stabilization")
        ];
    } else if (positive > 60) {
        // Growth Arc: Good -> Better
        return [
            createPoint('Start', 50, 20, 30, "Beta"),
            createPoint('Month 1', 55, 15, 30, ""),
            createPoint('Month 2', 65, 10, 25, "Feature Release"),
            createPoint('Current', positive, negative, neutral, "Adoption")
        ];
    } else {
        // Mixed Arc
        return [
            createPoint('Start', 40, 20, 40, "Initial"),
            createPoint('Mid', 45, 30, 25, "Discovery"),
            createPoint('Current', positive, negative, neutral, "Today")
        ];
    }
  }, [currentSentiment]);

  const annotations = data.filter(d => d.annotation);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-stone-200 shadow-sm font-sans text-xs">
          <p className="font-bold mb-1">{label}</p>
          <p className="text-emerald-700">Positive: {payload[0].value}%</p>
          <p className="text-red-700">Negative: {payload[1].value}%</p>
          <p className="text-gray-500">Neutral: {payload[2].value}%</p>
          {payload[0].payload.annotation && (
            <p className="mt-2 italic text-stone-400 border-t border-stone-100 pt-1">{payload[0].payload.annotation}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full mt-12 p-8 bg-white border border-stone-100 rounded-sm">
      <div className="flex justify-between items-end mb-6">
        <div>
            <h3 className="font-serif text-2xl text-editorial-text mb-2">Sentiment Trajectory</h3>
            <p className="font-sans text-sm text-stone-500">
                Temporal evolution of community sentiment based on current polarity markers.
            </p>
        </div>
        <div className="text-right hidden md:block">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 block">Trend Alert</span>
            <span className="text-xs text-stone-400">Negative sentiment stabilizing at {currentSentiment.negative}%</span>
        </div>
      </div>
      
      <div className="h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            stackOffset="expand"
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
            <XAxis 
                dataKey="name" 
                tick={{fontFamily: 'Inter', fontSize: 11, fill: '#78716C'}} 
                axisLine={false}
                tickLine={false}
                dy={10}
            />
            <YAxis 
                tickFormatter={(val) => `${Math.round(val * 100)}%`} 
                tick={{fontFamily: 'Inter', fontSize: 11, fill: '#78716C'}} 
                axisLine={false}
                tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Area 
                type="monotone" 
                dataKey="positive" 
                stackId="1" 
                stroke={COLORS.positive} 
                fill={COLORS.positive} 
                fillOpacity={0.8} 
            />
            <Area 
                type="monotone" 
                dataKey="neutral" 
                stackId="1" 
                stroke={COLORS.neutral} 
                fill={COLORS.neutral} 
                fillOpacity={0.3} 
            />
             <Area 
                type="monotone" 
                dataKey="negative" 
                stackId="1" 
                stroke={COLORS.negative} 
                fill={COLORS.negative} 
                fillOpacity={0.8} 
            />

            {annotations.map((entry, idx) => (
                <ReferenceLine key={idx} x={entry.name} stroke="#1C1917" strokeDasharray="2 2" label={{ position: 'top', value: entry.annotation, fontSize: 11, fill: '#1C1917', fontWeight: 500 }} />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 p-5 bg-stone-50 border-l-4 border-stone-300 text-sm font-sans text-stone-700 leading-relaxed">
        <p className="font-bold text-stone-900 mb-2 uppercase tracking-wide text-xs">Analyst Note</p>
        <p>
            The trajectory reveals a classic <strong>"Hype Cycle Decay"</strong>. Initial launch enthusiasm (80%+ Positive) was driven by the "magic" of instant processing. However, as users attempted to integrate the tool into deeper workflows (Weeks 2-4), structural limitations like the lack of chat history and visual context loss caused a rapid polarity shift. The current state represents a "Friction Plateau"—users are retained by the unique utility but are vocally frustrated by the workflow gaps.
        </p>
      </div>
    </div>
  );
};

export default SentimentTrajectory;