'use client';

import { useSceneStore } from '../hooks/useSceneStore';
import { useMapStore } from '../hooks/useMapStore';
import { scenes } from '../data/scenes';

export default function PathVisualizer() {
  const { currentSceneId, hasVisitedScene, visitedScenes } = useSceneStore();
  const { isPathVisualizerVisible, mapOpacity } = useMapStore();

  const getSceneIcon = (sceneId: string) => {
    switch (sceneId) {
      case 'forest':
        return '🌲';
      case 'ocean':
        return '🌊';
      case 'city':
        return '🏙️';
      case 'space':
        return '🚀';
      default:
        return '📍';
    }
  };

  const getSceneColor = (sceneId: string) => {
    switch (sceneId) {
      case 'forest':
        return 'from-emerald-400 to-emerald-600';
      case 'ocean':
        return 'from-blue-400 to-blue-600';
      case 'city':
        return 'from-pink-400 to-pink-600';
      case 'space':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getCurrentPath = () => {
    const currentIndex = visitedScenes.indexOf(currentSceneId);
    if (currentIndex === -1) return [];
    
    return visitedScenes.slice(0, currentIndex + 1);
  };

  if (!isPathVisualizerVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* PathVisualizer Container */}
      <div 
        className="backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
        style={{ 
          backgroundColor: `rgba(15, 23, 42, ${mapOpacity})`,
          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)'
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm p-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-base">🛤️</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-xs">Đường đi</h3>
              <p className="text-white/60 text-xs">
                {visitedScenes.length}/{scenes.length} cảnh đã khám phá
              </p>
            </div>
          </div>
        </div>

        {/* Path Content */}
        <div className="p-3">
          {/* Compact Path Visualization */}
          <div className="relative w-48 h-32 mb-3">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" 
                  refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="rgba(59, 130, 246, 0.8)" />
                </marker>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Connection lines */}
              <line x1="50" y1="22" x2="22" y2="62" stroke="url(#lineGradient)" strokeWidth="1.5" markerEnd="url(#arrowhead)" filter="url(#glow)" />
              <line x1="50" y1="22" x2="78" y2="62" stroke="url(#lineGradient)" strokeWidth="1.5" markerEnd="url(#arrowhead)" filter="url(#glow)" />
              <line x1="22" y1="62" x2="50" y2="88" stroke="url(#lineGradient)" strokeWidth="1.5" markerEnd="url(#arrowhead)" filter="url(#glow)" />
              <line x1="78" y1="62" x2="50" y2="88" stroke="url(#lineGradient)" strokeWidth="1.5" markerEnd="url(#arrowhead)" filter="url(#glow)" />
            </svg>

            {/* Scene Nodes */}
            {scenes.map((scene) => {
              let x, y;
              switch (scene.id) {
                case 'forest':
                  x = 50; y = 22;
                  break;
                case 'ocean':
                  x = 22; y = 62;
                  break;
                case 'city':
                  x = 78; y = 62;
                  break;
                case 'space':
                  x = 50; y = 88;
                  break;
                default:
                  x = 50; y = 22;
              }

              const isCurrent = currentSceneId === scene.id;
              const isVisited = hasVisitedScene(scene.id);

              return (
                <div
                  key={scene.id}
                  className={`
                    absolute transform -translate-x-1/2 -translate-y-1/2
                    w-8 h-8 rounded-lg border flex items-center justify-center
                    transition-all duration-300
                    ${isCurrent 
                      ? `bg-gradient-to-br ${getSceneColor(scene.id)} border-white shadow-lg ring-2 ring-white/30` 
                      : isVisited 
                        ? 'bg-white/20 border-white/50' 
                        : 'bg-white/10 border-white/30'
                    }
                  `}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  title={`${scene.title} (${scene.type})`}
                >
                  <div className="text-sm">{getSceneIcon(scene.id)}</div>
                  {isCurrent && (
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full animate-ping shadow-lg" />
                  )}
                  {isVisited && currentSceneId !== scene.id && (
                    <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-green-400 rounded-full shadow-lg" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Path Information */}
          <div className="text-xs space-y-2">
            <div className="bg-white/5 rounded-lg p-2 border border-white/10">
              <div className="text-white/70 mb-1">Đường đi hiện tại:</div>
              <div className="font-medium text-white">
                {getCurrentPath().map((sceneId, index) => {
                  const scene = scenes.find(s => s.id === sceneId);
                  return (
                    <span key={sceneId}>
                      {scene?.title}
                      {index < getCurrentPath().length - 1 && <span className="mx-1">→</span>}
                    </span>
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-white/60">
              <span>Tiến độ:</span>
              <span className="text-white font-medium">
                {Math.round((visitedScenes.length / scenes.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 