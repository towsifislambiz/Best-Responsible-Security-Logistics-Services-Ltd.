import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, ZoomIn, ZoomOut, RotateCw, Sliders, Check, 
  X, Image as ImageIcon, Sparkles, RefreshCw, Zap
} from 'lucide-react';
import { optimizeImage } from '../../utils/imageOptimizer';

export default function PhotoCropper({ onSave, onCancel, existingImage = null }) {
  const [imageSrc, setImageSrc] = useState(existingImage);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [optimizing, setOptimizing] = useState(false);
  const [optimizeStats, setOptimizeStats] = useState(null);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageObjRef = useRef(null);

  // Handle file select with automatic WebP optimization
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setOptimizing(true);
      try {
        const optimized = await optimizeImage(file, { maxWidth: 1200, maxHeight: 1200, quality: 0.82 });
        setImageSrc(optimized.dataUrl);
        setOptimizeStats(optimized);
      } catch (err) {
        console.warn('Auto optimization fallback:', err);
        const reader = new FileReader();
        reader.onload = (event) => setImageSrc(event.target.result);
        reader.readAsDataURL(file);
      } finally {
        setOptimizing(false);
        setZoom(1);
        setRotation(0);
        setPan({ x: 0, y: 0 });
      }
    }
  };

  // Load image object whenever imageSrc changes
  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imageObjRef.current = img;
        drawCanvas();
      };
      img.src = imageSrc;
    }
  }, [imageSrc]);

  // Redraw canvas whenever adjustments change
  useEffect(() => {
    if (imageObjRef.current) {
      drawCanvas();
    }
  }, [zoom, rotation, brightness, contrast, pan]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageObjRef.current) return;
    const ctx = canvas.getContext('2d');
    const img = imageObjRef.current;

    const size = 320;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Apply brightness and contrast filters
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

    ctx.save();
    ctx.translate(size / 2 + pan.x, size / 2 + pan.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    // Calculate aspect ratio scale to cover canvas
    const scale = Math.max(size / img.width, size / img.height);
    const w = img.width * scale;
    const h = img.height * scale;

    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.restore();
  };

  // Mouse pan handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Save the cropped image as ultra-compact WebP
  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let croppedDataUrl = canvas.toDataURL('image/webp', 0.82);
    if (!croppedDataUrl.startsWith('data:image/webp')) {
      croppedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
    }
    if (onSave) {
      onSave(croppedDataUrl);
    }
  };

  return (
    <div className="bg-[#091e38] border border-amber-500/30 rounded-2xl p-6 shadow-2xl max-w-lg mx-auto text-slate-200">
      <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-white font-bold text-base">Guard Photo Cropper & Editor</h3>
        </div>
        {onCancel && (
          <button onClick={onCancel} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Upload Zone */}
      {!imageSrc ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-amber-500/40 hover:border-amber-400 rounded-xl p-8 text-center cursor-pointer bg-slate-900/50 hover:bg-slate-900/80 transition-all space-y-3"
        >
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Click or Drag & Drop Guard Photo</p>
            <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WebP (Square badge size recommended)</p>
          </div>
          <input 
            ref={fileInputRef} 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Canvas Preview with Drag Pan */}
          <div className="flex flex-col items-center">
            <div 
              className="relative w-80 h-80 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl cursor-move bg-slate-950 flex items-center justify-center select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <canvas ref={canvasRef} className="w-full h-full object-cover" />
              
              {/* Badge Overlay Guidelines */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl pointer-events-none"></div>
              <div className="absolute bottom-2 left-2 bg-slate-950/80 text-[10px] text-amber-400 px-2 py-0.5 rounded font-mono pointer-events-none">
                Drag to reposition face
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-amber-400 hover:text-amber-300 underline"
              >
                Change Photo
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setRotation(0);
                  setPan({ x: 0, y: 0 });
                  setBrightness(100);
                  setContrast(100);
                }}
                className="text-xs text-slate-400 hover:text-white"
              >
                Reset Adjustments
              </button>
              <input 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </div>
          </div>

          {/* Editing Controls */}
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-3 text-xs">
            {/* Zoom Slider */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="flex items-center"><ZoomIn className="w-3.5 h-3.5 mr-1 text-amber-400" /> Zoom Scale:</span>
                <span className="font-mono text-amber-400">{zoom.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Rotation & Brightness in 2 Cols */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 block mb-1">Brightness: {brightness}%</label>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Contrast: {contrast}%</label>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Rotate Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] flex items-center space-x-1"
              >
                <RotateCw className="w-3 h-3 text-amber-400" />
                <span>Rotate 90°</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={handleExport}
              className="flex-1 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center shadow-lg hover:from-amber-300 hover:to-amber-400 transition-all"
            >
              <Check className="w-4 h-4 mr-1.5" />
              Apply & Save Photo
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
