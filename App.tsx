import React, { useState, useMemo } from 'react';
import { NARRATIVE_DATA } from './constants';
import NarrativeLandscape from './components/NarrativeLandscape';
import TensionGraph from './components/TensionGraph';
import SentimentTrajectory from './components/SentimentTrajectory';
import ThemeFingerprints from './components/ThemeFingerprints';
import NotableQuotes from './components/NotableQuotes';
import ThemeBreakdown from './components/ThemeBreakdown';
import SourceList from './components/SourceList';
import NotebookLMMockup from './components/NotebookLMMockup';
import { Layout, GitGraph, FileText, Download, Search, RefreshCw, Code, ArrowUpRight } from 'lucide-react';
import { NarrativeSchema } from './types';

function App() {
  const [inputMode, setInputMode] = useState(false);
  const [inputValue, setInputValue] = useState(JSON.stringify(NARRATIVE_DATA, null, 2));
  const [reportData, setReportData] = useState<NarrativeSchema>(NARRATIVE_DATA);
  const [showSpecs, setShowSpecs] = useState(false);

  const handleAnalyze = () => {
    try {
        const parsed = JSON.parse(inputValue);
        if (!parsed.themes || !parsed.sentiment_overall) {
            alert("Invalid Narrative Schema V2.0: Missing themes or sentiment_overall.");
            return;
        }
        setReportData(parsed);
        setInputMode(false);
        setShowSpecs(false);
    } catch (e) {
        alert("Invalid JSON format.");
    }
  };

  // Generate Vega-Lite Spec (Simplified Mock)
  const generateVegaLiteSpec = () => {
    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "Narrative Landscape",
        "data": { "values": reportData.themes },
        "mark": "circle",
        "encoding": {
            "x": { "field": "sentiment.positive", "type": "quantitative", "title": "Positive Sentiment" },
            "y": { "field": "count", "type": "quantitative", "title": "Volume" },
            "size": { "field": "percentage", "type": "quantitative" },
            "color": { "field": "name", "type": "nominal" }
        }
    };
  };

  // Helper to find specific themes for the narrative
  const posTheme = reportData.themes.find(t => t.name.includes("Magic") || t.name.includes("Synthesis") || t.name.includes("Power")) || reportData.themes[0];
  const negTheme = reportData.themes.find(t => t.name.includes("Black Hole") || t.name.includes("Visual")) || reportData.themes[1];

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] selection:bg-stone-200 font-serif">
      
      {/* Editorial Header */}
      <header className="border-b border-stone-200 bg-white sticky top-0 z-50 opacity-95 backdrop-blur-sm font-sans">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setInputMode(false)}>
             <div className="w-8 h-8 bg-stone-900 text-white flex items-center justify-center font-serif italic font-bold text-lg">
                N
             </div>
             <h1 className="font-serif text-xl font-bold tracking-tight text-stone-900">Narrative Schema</h1>
          </div>
          <div className="text-xs font-medium text-stone-500 uppercase tracking-widest flex items-center gap-4">
             {!inputMode && (
                <button onClick={() => setInputMode(true)} className="flex items-center gap-1 hover:text-stone-900 transition-colors">
                    <Search size={14} /> New Analysis
                </button>
             )}
             <button onClick={() => setShowSpecs(!showSpecs)} className="flex items-center gap-1 hover:text-stone-900 transition-colors">
                <Code size={14} /> {showSpecs ? 'Hide Specs' : 'View Specs'}
             </button>
             <button className="flex items-center gap-1 hover:text-stone-900 transition-colors" onClick={() => {
                 const blob = new Blob([JSON.stringify(reportData, null, 2)], {type: "application/json"});
                 const url = URL.createObjectURL(blob);
                 const a = document.createElement('a');
                 a.href = url;
                 a.download = "narrative_schema_v2.json";
                 a.click();
             }}>
                <Download size={14} /> Export JSON
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        
        {inputMode ? (
            <div className="max-w-2xl mx-auto mt-10 font-sans">
                <h2 className="font-serif text-3xl mb-6">Generate Narrative Report</h2>
                <p className="mb-4 text-sm text-stone-600">Paste your Crowdlisten JSON extraction below.</p>
                <textarea 
                    className="w-full h-96 p-4 border border-stone-300 font-mono text-xs bg-white rounded-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="flex gap-4 mt-6">
                    <button 
                        onClick={handleAnalyze}
                        className="px-6 py-3 bg-stone-900 text-white font-sans text-sm font-medium rounded-sm hover:bg-stone-800 transition-colors flex items-center gap-2"
                    >
                        <RefreshCw size={16} /> Generate Visualization
                    </button>
                    <button 
                        onClick={() => setInputValue(JSON.stringify(NARRATIVE_DATA, null, 2))}
                        className="px-6 py-3 border border-stone-300 text-stone-600 font-sans text-sm font-medium rounded-sm hover:bg-stone-50 transition-colors"
                    >
                        Load Demo Data
                    </button>
                </div>
            </div>
        ) : (
            <>
                {/* Hero / Cover Section */}
                <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    
                    {/* 1. Research Question (Minimal Italic) */}
                    <div className="mb-6">
                        <p className="font-serif text-sm italic text-stone-500">
                            {reportData.meta.question}
                        </p>
                    </div>

                    {/* 2. Main Headline (H1 Punchline) */}
                    <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-10 text-stone-900 font-medium tracking-tight">
                        NotebookLM solves the beginning of the study workflow perfectly — but falls apart the moment students try to continue their work.
                    </h1>

                    {/* 3. Hero Block (Editorial Image + Insight Caption) */}
                    <div className="mb-16 relative group">
                        <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md relative border border-stone-200 bg-stone-100">
                            {/* Use the CSS Mockup for high fidelity product representation */}
                            <NotebookLMMockup />
                            
                            {/* Floating Insight Card Overlay */}
                            <div className="absolute bottom-8 left-6 right-6 md:left-10 md:right-auto md:w-[450px] bg-white/95 backdrop-blur-sm p-6 rounded shadow-lg border-l-4 border-red-500">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 font-sans">Key Insight</span>
                                    <ArrowUpRight size={16} className="text-stone-300" />
                                </div>
                                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 leading-tight">
                                    The "Black Hole" Effect
                                </h3>
                                <p className="font-sans text-xs text-stone-600 leading-relaxed">
                                    While users love the text processing, <strong className="text-stone-900">85% of feedback on visual context is negative</strong>. The tool strips all charts and diagrams from PDFs, essentially "lobotomizing" scientific papers.
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between items-start border-t border-stone-200 pt-3">
                            <p className="font-sans text-xs font-medium text-stone-500 uppercase tracking-wider">
                                Figure 1.0 — The Structural Gap
                            </p>
                            <p className="font-sans text-sm text-stone-600 font-medium leading-relaxed max-w-xl text-right">
                                NotebookLM is an AI-powered “second brain”, but users often treat it as a rapid-processing tool—one that promises depth, yet is mainly used for speed.
                            </p>
                        </div>
                    </div>

                    {/* 4. Strategic Narrative Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-serif text-lg leading-relaxed text-stone-800 border-t border-stone-200 pt-12">
                        
                        {/* THE HEADLINE */}
                        <div>
                            <h3 className="font-sans text-xs font-bold text-[#3B8C6E] uppercase tracking-widest mb-4">The Headline</h3>
                            <p className="text-base leading-7">
                                The community narrative is anchored by <strong>{posTheme.name}</strong>. Users treat the ingestion engine as a transformative utility that solves the "cold start" problem of research. The ability to upload diverse sources and get immediate, grounded answers serves as the primary hook, driving a <strong>{posTheme.sentiment.positive}% positive sentiment</strong> in core utility.
                            </p>
                        </div>

                        {/* THE FRICTION */}
                        <div>
                            <h3 className="font-sans text-xs font-bold text-[#BE3E3E] uppercase tracking-widest mb-4">The Friction</h3>
                            <p className="text-base leading-7">
                                However, the <strong>{negTheme.name}</strong> represents a critical failure point. By aggressively stripping charts, graphs, and schematics during PDF ingestion, the tool renders rich technical documents into bare text. This "lobotomy" of data makes the tool unusable for serious STEM work, creating a massive "daily execution fault line."
                            </p>
                        </div>

                        {/* THE TREND */}
                        <div>
                            <h3 className="font-sans text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">The Trend</h3>
                            <p className="text-base leading-7">
                                If this "visual blindness" and session volatility (no chat history) remain unaddressed, NotebookLM risks remaining a "nice-to-have" novelty rather than a daily driver. The trend suggests that without these fixes, power users will revert to Obsidian or Notion, leaving NotebookLM as merely a "fast processor" rather than a "central study hub."
                            </p>
                        </div>

                    </div>
                </section>

                {showSpecs && (
                    <section className="mb-12 bg-stone-900 text-stone-50 p-6 rounded overflow-hidden font-mono text-xs font-sans">
                        <h3 className="uppercase tracking-widest font-bold mb-4 text-stone-400">Vega-Lite Spec (Preview)</h3>
                        <pre className="overflow-x-auto">
                            {JSON.stringify(generateVegaLiteSpec(), null, 2)}
                        </pre>
                    </section>
                )}

                {/* Visualization 1: Landscape */}
                <section className="mb-20 mt-20 border-t border-stone-200 pt-12">
                    <div className="flex items-center gap-2 mb-4 text-stone-400 font-sans">
                        <Layout size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Semantic Map</span>
                    </div>
                    <NarrativeLandscape data={reportData.themes} />
                </section>

                <section className="mb-20">
                    <div className="flex items-center gap-2 mb-4 text-stone-400 font-sans">
                        <GitGraph size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Structural Conflict</span>
                    </div>
                    <TensionGraph data={reportData.themes} />
                </section>

                <section className="mb-20">
                    <div className="flex items-center gap-2 mb-4 text-stone-400 font-sans">
                        <ArrowUpRight size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Sentiment Trajectory</span>
                    </div>
                    <SentimentTrajectory currentSentiment={reportData.sentiment_overall} />
                </section>

                <NotableQuotes themes={reportData.themes} />

                {/* Visualization 4: Fingerprints */}
                <section className="mb-20">
                    <div className="flex items-center gap-2 mb-4 text-stone-400 font-sans">
                        <FileText size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Metric Deep Dive</span>
                    </div>
                    <ThemeFingerprints themes={reportData.themes} />
                </section>

                <ThemeBreakdown themes={reportData.themes} />

                <SourceList sources={reportData.sources || []} />
            </>
        )}

      </main>

      <footer className="border-t border-stone-200 py-12 bg-white text-center font-sans">
        <p className="font-serif text-stone-400 italic">Generated by Narrative Schema Engine</p>
      </footer>

    </div>
  );
}

export default App;