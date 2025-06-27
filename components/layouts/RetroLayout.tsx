'use client';

import { Scene } from '../../data/scenes';

interface RetroLayoutProps {
  scene: Scene;
  onNext: () => void;
}

export default function RetroLayout({ scene, onNext }: RetroLayoutProps) {
  const isEndScene = scene.type === 'end';
  const hasNextScene = scene.next !== null;

  return (
    <div className="min-h-screen relative font-mono">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${scene.background})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Retro Overlay Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.1) 2px,
            rgba(255,255,255,0.1) 4px
          )`
        }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Retro Border */}
          <div className="border-4 border-white/30 p-8 mb-8 relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-white/30" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/30" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white/30" />
            
            <h1 className="text-5xl font-bold text-white mb-6 tracking-wider uppercase">
              {scene.title}
            </h1>
            
            <div className="w-32 h-1 bg-white mx-auto mb-8" />
            
            <p className="text-lg text-white/90 leading-relaxed mb-8 font-light">
              {scene.description}
            </p>
          </div>
          
          {/* Retro Button */}
          <div className="relative">
            {isEndScene ? (
              <div className="space-y-6">
                <div className="text-2xl text-white/80 font-bold">
                  🏆 CHÚC MỪNG! HOÀN THÀNH CUỘC PHIÊU LƯU! 🏆
                </div>
                <button
                  onClick={onNext}
                  className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold uppercase tracking-wider border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">XEM LẠI CUỘC PHIÊU LƯU</span>
                  <div className="absolute inset-0 bg-yellow-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            ) : (
              <button
                onClick={onNext}
                disabled={!hasNextScene}
                className={`px-12 py-4 font-bold uppercase tracking-wider border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group ${
                  hasNextScene 
                    ? 'bg-white text-black' 
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                <span className="relative z-10">
                  {hasNextScene ? 'TIẾP TỤC CUỘC PHIÊU LƯU' : 'ĐÃ ĐẾN CUỐI'}
                </span>
                {hasNextScene && (
                  <div className="absolute inset-0 bg-yellow-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                )}
              </button>
            )}
          </div>
          
          {/* Retro Decorative Elements */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <div className="w-2 h-2 bg-white/50" />
            <div className="w-1 h-1 bg-white/30" />
            <div className="w-3 h-3 bg-white/70" />
            <div className="w-1 h-1 bg-white/30" />
            <div className="w-2 h-2 bg-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
} 