import React, { useState } from 'react';
import { 
  FileText, Star, Eye, Download, X, Award, CheckCircle2, 
  Building, ExternalLink
} from 'lucide-react';
import { clientRecommendationLetters } from '../data/companyData';

export default function RecommendationsPage() {
  const [activeLetter, setActiveLetter] = useState(null);

  return (
    <div className="bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 text-amber-600" />
            <span>Client Satisfaction Letters</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Client Appreciation & Recommendation Letters
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Scanned original certificates and appreciation letters received from Bangladesh's prominent industrial groups, commending BRSLSL for zero-theft records and outstanding guard discipline.
          </p>
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientRecommendationLetters.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image Thumbnail */}
                <div 
                  onClick={() => setActiveLetter(item)}
                  className="relative h-72 bg-slate-100 overflow-hidden cursor-pointer border-b border-slate-200"
                >
                  <img 
                    src={item.image} 
                    alt={item.client}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center shadow-lg">
                      <Eye className="w-4 h-4 mr-1.5" />
                      Inspect Original Letter
                    </span>
                  </div>

                  <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    Official Commendation
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {item.client}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed italic">
                    "{item.text}"
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Verified Corporate Client
                </span>
                <button
                  onClick={() => setActiveLetter(item)}
                  className="text-amber-800 hover:text-amber-900 font-bold flex items-center"
                >
                  <span>View Letter</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLetter && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLetter(null)}
        >
          <div 
            className="bg-[#091e38] border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900">
              <div>
                <h3 className="text-white font-bold text-base">{activeLetter.client}</h3>
                <p className="text-amber-400 text-xs">Original Client Recommendation Letter</p>
              </div>
              <button 
                onClick={() => setActiveLetter(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 flex justify-center bg-slate-950">
              <img 
                src={activeLetter.image} 
                alt={activeLetter.client} 
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-xl"
              />
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-between items-center text-xs text-slate-400">
              <span>{activeLetter.text}</span>
              <a 
                href={activeLetter.image} 
                download 
                className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center hover:bg-amber-300 transition-colors"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download Scan
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
