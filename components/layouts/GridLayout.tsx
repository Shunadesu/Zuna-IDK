'use client';

import { Scene } from '../../data/scenes';

interface GridLayoutProps {
  scene: Scene;
  onNext: () => void;
}

export default function GridLayout({ scene, onNext }: GridLayoutProps) {
  const isEndScene = scene.type === 'end';
  const hasNextScene = scene.next !== null;

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${scene.background})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Grid Layout */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Left Column */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h1 className="text-4xl font-bold text-white mb-4">
              {scene.title}
            </h1>
            <div className="w-16 h-1 bg-white rounded-full mb-6" />
            <p className="text-white/90 leading-relaxed">
              {scene.description}
            </p>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="flex flex-col justify-center items-center space-y-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
            <div className="text-6xl mb-4">
              {isEndScene ? '🏆' : '🌟'}
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              {isEndScene ? 'Hoàn thành cuộc phiêu lưu!' : 'Khám phá thế giới'}
            </h3>
            <p className="text-white/80 mb-6">
              {isEndScene 
                ? 'Chúc mừng! Bạn đã khám phá tất cả các cảnh.'
                : 'Mỗi cảnh là một cuộc phiêu lưu mới'
              }
            </p>
            {isEndScene ? (
              <button
                onClick={onNext}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full hover:from-purple-600 hover:to-pink-700 transition-all duration-300 font-medium"
              >
                Xem lại cuộc phiêu lưu
              </button>
            ) : (
              <button
                onClick={onNext}
                disabled={!hasNextScene}
                className={`px-8 py-3 rounded-full transition-all duration-300 font-medium ${
                  hasNextScene 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700' 
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                {hasNextScene ? 'Chuyển cảnh' : 'Đã đến cuối'}
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
              <div className="text-2xl mb-2">🎵</div>
              <p className="text-white/70 text-sm">Âm nhạc</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
              <div className="text-2xl mb-2">🎨</div>
              <p className="text-white/70 text-sm">Nghệ thuật</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 