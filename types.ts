export interface Sentiment {
  positive: number;
  negative: number;
  neutral: number;
}

export interface Insight {
  insight: string;
  verbatim: string;
  whyValuable: string;
}

export interface Theme {
  name: string;
  count: number;
  percentage: number;
  sentiment: Sentiment;
  description?: string;
  insights?: Insight[];
  keyPhrases?: string[];
}

export interface Opinion {
  text: string;
  percentage: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface Source {
  url: string;
  title: string;
  snippet: string;
  publishedDate: string;
}

export interface NarrativeSchema {
  meta: {
    id?: string;
    question?: string;
    topic?: string;
    takeaway?: string;
    heroImageUrl?: string;
  };
  sentiment_overall: Sentiment;
  themes: Theme[];
  opinions?: Opinion[];
  sources?: Source[];
}

// Derived types for visualizations
export interface LandscapeNode extends Theme {
  x?: number;
  y?: number;
  r?: number;
  netSentiment?: number; // -100 to 100
  semanticComplexity?: number;
}

export interface TensionLink {
  source: string;
  target: string;
  value: number; // Conflict strength
}

export interface TimelineDataPoint {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
  annotation?: string;
}