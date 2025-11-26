
import React from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Share, 
  Settings, 
  Plus, 
  FileText, 
  Mic, 
  Video, 
  LayoutGrid, 
  List, 
  HelpCircle, 
  Presentation, 
  Upload, 
  ArrowRight,
  PanelLeft,
  PanelRight,
  Sparkles,
  MessageSquarePlus,
  BarChart2
} from 'lucide-react';

const NotebookLMMockup: React.FC = () => {
  return (
    <div className="w-full bg-[#FAFAFA] text-[#1F1F1F] font-sans border border-stone-200 rounded-lg overflow-hidden shadow-sm select-none">
      {/* Header */}
      <header className="h-16 border-b border-stone-200 flex items-center justify-between px-4 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs">
            <div className="w-4 h-4 border-2 border-white rounded-full"></div>
          </div>
          <span className="text-lg font-normal text-stone-800">Untitled notebook</span>
        </div>
        
        <div className="flex items-center gap-2">
           {/* Desktop Actions */}
           <div className="hidden md:flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-stone-800 transition-colors">
                <Plus size={16} /> Create notebook
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-stone-100 text-stone-700 rounded-full text-sm font-medium hover:bg-stone-200 transition-colors">
                <BarChart2 size={16} /> Analytics
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-stone-100 text-stone-700 rounded-full text-sm font-medium hover:bg-stone-200 transition-colors">
                <Share size={16} /> Share
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-stone-100 text-stone-700 rounded-full text-sm font-medium hover:bg-stone-200 transition-colors">
                <Settings size={16} /> Settings
              </button>
           </div>
           
           <span className="text-[10px] font-bold text-stone-400 border border-stone-200 rounded px-1 ml-2">PRO</span>
           <button className="p-2 text-stone-600 hover:bg-stone-100 rounded-full">
             <LayoutGrid size={20} />
           </button>
           <div className="w-8 h-8 bg-[#007BFF] rounded-full flex items-center justify-center text-white font-medium text-sm">
             L
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex h-[600px] overflow-hidden">
        
        {/* Left Sidebar: Sources */}
        <div className="w-80 border-r border-stone-200 bg-white flex flex-col p-4 hidden lg:flex">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-normal text-stone-700">Sources</h3>
            <PanelLeft size={18} className="text-stone-400" />
          </div>

          <button className="w-full py-3 border border-stone-200 rounded-full flex items-center justify-center gap-2 text-stone-600 text-sm hover:bg-stone-50 transition-colors mb-6">
            <Plus size={16} /> Add sources
          </button>

          {/* Deep Research Promo */}
          <div className="bg-[#F0FDF4] p-3 rounded-lg flex items-start gap-3 mb-4">
             <div className="mt-1 text-emerald-600">
               <Search size={16} />
             </div>
             <p className="text-xs text-stone-800 leading-relaxed">
               <span className="text-blue-600 font-medium cursor-pointer">Try Deep Research</span> for an in-depth report and new sources!
             </p>
          </div>

          {/* Search Box */}
          <div className="border border-stone-200 rounded-2xl p-4 mb-auto">
             <div className="flex items-center gap-3 text-stone-400 mb-4">
                <Search size={18} />
                <span className="text-sm">Search the web for new sources</span>
             </div>
             
             <div className="flex gap-2 mt-8">
                <button className="flex items-center gap-1 px-3 py-1.5 border border-stone-200 rounded-full text-xs font-medium text-stone-700">
                   <div className="w-3 h-3 rounded-full border border-stone-400"></div> Web
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 border border-stone-200 rounded-full text-xs font-medium text-stone-700">
                   <Sparkles size={12} /> Fast Research
                </button>
                <div className="ml-auto w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <ArrowRight size={14} />
                </div>
             </div>
          </div>

          {/* Empty State Bottom */}
          <div className="mt-8 flex flex-col items-center text-center">
             <div className="text-stone-300 mb-3">
               <FileText size={32} />
             </div>
             <p className="text-sm font-medium text-stone-600 mb-1">Saved sources will appear here</p>
             <p className="text-xs text-stone-400 leading-relaxed max-w-[200px]">
               Click Add source above to add PDFs, websites, text, videos, or audio files. Or import a file directly from Google Drive.
             </p>
          </div>
        </div>

        {/* Center: Chat */}
        <div className="flex-1 bg-white flex flex-col relative">
           <div className="flex justify-between items-center p-4 border-b border-stone-100 lg:border-none">
             <span className="text-base text-stone-700">Chat</span>
             <Settings size={18} className="text-stone-400 rotate-90" />
           </div>

           <div className="flex-1 flex flex-col items-center justify-center pb-20">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-6">
                 <Upload size={20} />
              </div>
              <h2 className="text-2xl font-normal text-stone-800 mb-6">Add a source to get started</h2>
              <button className="px-6 py-2 border border-stone-200 rounded-full text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors">
                Upload a source
              </button>
           </div>

           {/* Input Area */}
           <div className="absolute bottom-6 left-6 right-6">
              <div className="border border-stone-200 rounded-full h-14 flex items-center px-6 bg-white shadow-sm">
                 <span className="text-stone-400 text-sm">Upload a source to get started</span>
                 <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-stone-400 mr-2">0 sources</span>
                    <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                       <ArrowRight size={16} />
                    </div>
                 </div>
              </div>
              <p className="text-[10px] text-center text-stone-400 mt-2">
                NotebookLM can be inaccurate; please double check its responses.
              </p>
           </div>
        </div>

        {/* Right Sidebar: Studio */}
        <div className="w-80 border-l border-stone-200 bg-white flex flex-col p-4 hidden xl:flex">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-normal text-stone-700">Studio</h3>
            <PanelRight size={18} className="text-stone-400" />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-auto">
             {[
               { icon: <Mic size={16} />, label: "Audio Overview" },
               { icon: <Video size={16} />, label: "Video Overview" },
               { icon: <LayoutGrid size={16} />, label: "Mind Map" },
               { icon: <Upload size={16} />, label: "Reports" },
               { icon: <List size={16} />, label: "Flashcards" },
               { icon: <HelpCircle size={16} />, label: "Quiz" },
               { icon: <BarChart2 size={16} />, label: "Infographic" },
               { icon: <Presentation size={16} />, label: "Slide Deck" },
             ].map((item, i) => (
               <div key={i} className="bg-stone-100 p-3 rounded-xl flex flex-col gap-2 hover:bg-stone-200 transition-colors cursor-pointer h-20 justify-center">
                  <span className="text-stone-500">{item.icon}</span>
                  <span className="text-xs font-medium text-stone-600">{item.label}</span>
               </div>
             ))}
          </div>

          <div className="mt-8 flex flex-col items-center text-center mb-12">
             <div className="text-stone-300 mb-3">
               <Sparkles size={24} />
             </div>
             <p className="text-sm font-medium text-stone-600 mb-1">Studio output will be saved here.</p>
             <p className="text-xs text-stone-400 leading-relaxed max-w-[220px]">
               After adding sources, click to add Audio Overview, Study Guide, Mind Map, and more!
             </p>
          </div>

          <button className="w-full py-3 bg-black text-white rounded-full flex items-center justify-center gap-2 text-sm font-medium hover:bg-stone-800 transition-colors">
            <MessageSquarePlus size={16} /> Add note
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotebookLMMockup;
