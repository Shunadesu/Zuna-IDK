'use client';

import { useSceneStore } from '../hooks/useSceneStore';
import { scenes } from '../data/scenes';

export default function Navigation() {
  const { currentScene, nextScene, previousScene, resetToStart, visitedScenes } = useSceneStore();
  
  if (!currentScene) return null;

  const totalScenes = scenes.length;
  const visitedCount = visitedScenes.length;
  const isEndScene = currentScene.type === 'end';
  const hasNextScene = currentScene.next !== null;

  return (
    <div className="fixed top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white z-50">
      {/* Scene Info */}
      <div className="text-center mb-4">
        <div className="text-sm text-white/70 mb-1">Cảnh hiện tại</div>
        <div className="text-lg font-bold">{currentScene.title}</div>
        <div className="text-xs text-white/60">
          {visitedCount} / {totalScenes} cảnh đã khám phá
        </div>
        <div className="text-xs text-white/50 capitalize mt-1">
          {currentScene.type === 'start' && '⭐ Điểm bắt đầu'}
          {currentScene.type === 'branch' && '🔄 Điểm rẽ'}
          {currentScene.type === 'end' && '🏁 Điểm kết thúc'}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={previousScene}
          className="flex-1 bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-all duration-300 group"
          title="Cảnh trước"
        >
          <svg className="w-5 h-5 mx-auto group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        <button
          onClick={nextScene}
          disabled={!hasNextScene}
          className={`flex-1 rounded-lg p-2 transition-all duration-300 group ${
            hasNextScene 
              ? 'bg-white/20 hover:bg-white/30' 
              : 'bg-gray-500/30 cursor-not-allowed'
          }`}
          title={hasNextScene ? "Cảnh tiếp theo" : "Đã đến cuối"}
        >
          <svg className="w-5 h-5 mx-auto group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetToStart}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg p-2 transition-all duration-300 group mb-3"
        title="Bắt đầu lại từ đầu"
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Bắt đầu lại</span>
        </div>
      </button>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(visitedCount / totalScenes) * 100}%` }}
          />
        </div>
        <div className="text-xs text-white/60 mt-1 text-center">
          Tiến độ khám phá: {Math.round((visitedCount / totalScenes) * 100)}%
        </div>
      </div>

      {/* Scene Type Indicator */}
      <div className="text-center">
        <div className="text-xs text-white/60 mb-1">Layout</div>
        <div className="text-sm font-medium capitalize bg-white/10 rounded px-2 py-1">
          {currentScene.layout}
        </div>
      </div>

      {/* End Scene Message */}
      {isEndScene && (
        <div className="mt-3 p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
          <div className="text-xs text-center text-white/90">
            🎉 Chúc mừng! Bạn đã hoàn thành cuộc phiêu lưu!
          </div>
        </div>
      )}
    </div>
  );
} 