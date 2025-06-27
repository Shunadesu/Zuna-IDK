'use client';

import { Scene } from '../../data/scenes';

interface MinimalLayoutProps {
  scene: Scene;
  onNext: () => void;
}

export default function MinimalLayout({ scene, onNext }: MinimalLayoutProps) {
  const isEndScene = scene.type === 'end';
  const hasNextScene = scene.next !== null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${scene.background})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-6xl font-light text-white mb-8 tracking-wider">
          {scene.title}
        </h1>
        
        <p className="text-xl text-white/90 leading-relaxed mb-12 font-light">
          {scene.description}
        </p>
        
        {isEndScene ? (
          <div className="space-y-4">
            <div className="text-2xl text-white/80 mb-6">
              🎉 Chúc mừng! Bạn đã hoàn thành cuộc phiêu lưu!
            </div>
            <button
              onClick={onNext}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border border-white/30 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium tracking-wide"
            >
              Xem lại cuộc phiêu lưu
            </button>
          </div>
        ) : (
          <button
            onClick={onNext}
            disabled={!hasNextScene}
            className={`px-8 py-4 text-white border border-white/30 rounded-full transition-all duration-300 font-medium tracking-wide ${
              hasNextScene 
                ? 'bg-white/20 backdrop-blur-sm hover:bg-white/30' 
                : 'bg-gray-500/50 cursor-not-allowed'
            }`}
          >
            {hasNextScene ? 'Tiếp tục' : 'Đã đến cuối'}
          </button>
        )}
      </div>
    </div>
  );
} 