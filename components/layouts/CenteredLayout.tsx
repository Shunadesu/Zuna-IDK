'use client';

import { Scene } from '../../data/scenes';

interface CenteredLayoutProps {
  scene: Scene;
  onNext: () => void;
}

export default function CenteredLayout({ scene, onNext }: CenteredLayoutProps) {
  const isEndScene = scene.type === 'end';
  const hasNextScene = scene.next !== null;

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${scene.background})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-12 max-w-3xl mx-auto border border-white/20 shadow-2xl">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            {scene.title}
          </h1>
          
          <div className="w-24 h-1 bg-white mx-auto mb-8" />
          
          <p className="text-lg text-white/90 leading-relaxed mb-10">
            {scene.description}
          </p>
          
          <div className="flex justify-center gap-4">
            {isEndScene ? (
              <div className="space-y-4">
                <div className="text-xl text-white/80 mb-4">
                  🎉 Chúc mừng! Bạn đã hoàn thành cuộc phiêu lưu!
                </div>
                <button
                  onClick={onNext}
                  className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg"
                >
                  Xem lại cuộc phiêu lưu
                </button>
              </div>
            ) : (
              <button
                onClick={onNext}
                disabled={!hasNextScene}
                className={`px-10 py-4 rounded-full transition-all duration-300 font-semibold shadow-lg ${
                  hasNextScene 
                    ? 'bg-white text-gray-900 hover:bg-gray-100' 
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                {hasNextScene ? 'Khám phá tiếp' : 'Đã đến cuối'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 