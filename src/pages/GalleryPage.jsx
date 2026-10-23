import React, { useState } from 'react';
import { 
  Camera, Eye, X, Filter, Download, 
  CheckCircle2, Shield, ArrowRight
} from 'lucide-react';
import { galleryPhotos } from '../data/companyData';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null);

  const categories = ['All', 'Parade', 'Training', 'Deployment', 'Corporate', 'Female Force', 'Leadership'];

  const filtered = selectedCategory === 'All' 
    ? galleryPhotos 
    : galleryPhotos.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-amber-600" />
            <span>Real Operational Log</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Field Photo & Training Gallery
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real photography of our security force during parade formations, cadet physical training, supervisor inspections, and active retail deployments across Dhaka.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img 
                  src={photo.src} 
                  alt={photo.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 bg-amber-400 text-slate-950 rounded-full shadow-lg">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>

                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                  {photo.category}
                </span>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="text-slate-900 font-bold text-xs sm:text-sm truncate group-hover:text-amber-700 transition-colors">
                  {photo.title}
                </h4>
                <p className="text-slate-500 text-[11px] truncate">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Lightbox */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="bg-[#091e38] border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-900">
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base">{activePhoto.title}</h3>
                <p className="text-amber-400 text-xs">{activePhoto.caption}</p>
              </div>
              <button 
                onClick={() => setActivePhoto(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 flex-1 flex justify-center items-center bg-slate-950 overflow-auto">
              <img 
                src={activePhoto.src} 
                alt={activePhoto.title} 
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-xl"
              />
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-between items-center text-xs text-slate-400">
              <span className="font-mono text-amber-400">Category: {activePhoto.category}</span>
              <a 
                href={activePhoto.src} 
                download 
                className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 transition-colors"
              >
                Download Original Photo
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
