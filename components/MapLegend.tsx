'use client';

import { useSceneStore } from '../hooks/useSceneStore';
import { useMapStore } from '../hooks/useMapStore';
import { scenes } from '../data/scenes';

export default function MapLegend() {
  const { currentSceneId, hasVisitedScene } = useSceneStore();
  const { isMapLegendVisible, mapOpacity } = useMapStore();

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
        return 'border-green-500';
      case 'ocean':
        return 'border-blue-500';
      case 'city':
        return 'border-pink-500';
      case 'space':
        return 'border-purple-500';
      default:
        return 'border-gray-500';
    }
  };

  const getPathDescription = (fromScene: any, toScene: any) => {
    const pathDescriptions: { [key: string]: string } = {
      'forest-ocean': 'Con đường ven biển',
      'forest-city': 'Con đường đô thị',
      'ocean-space': 'Con đường vũ trụ',
      'city-space': 'Con đường không gian'
    };
    
    const pathKey = `${fromScene.id}-${toScene.id}`;
    return pathDescriptions[pathKey] || 'Con đường bí ẩn';
  };

  if (!isMapLegendVisible) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 backdrop-blur-sm rounded-lg p-4 text-white z-40 max-w-xs"
      style={{ 
        backgroundColor: `rgba(0, 0, 0, ${mapOpacity})`
      }}
    >
      <div className="text-sm font-medium mb-3 text-center">Thông tin bản đồ</div>
      
      {/* Current Path */}
      <div className="mb-4">
        <div className="text-xs text-white/70 mb-2">Đường đi hiện tại:</div>
        <div className="space-y-2">
          {scenes.map((scene, index) => {
            if (!hasVisitedScene(scene.id)) return null;
            
            const nextScene = scenes.find(s => s.id === scene.next);
            const isCurrent = currentSceneId === scene.id;
            
            return (
              <div key={scene.id} className="flex items-center gap-2">
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs
                  ${getSceneColor(scene.id)}
                  ${isCurrent ? 'bg-white/20' : 'bg-white/10'}
                `}>
                  {getSceneIcon(scene.id)}
                </div>
                <div className="flex-1 text-xs">
                  <div className={`font-medium ${isCurrent ? 'text-white' : 'text-white/80'}`}>
                    {scene.title}
                  </div>
                  {nextScene && (
                    <div className="text-white/60 text-xs">
                      → {getPathDescription(scene, nextScene)}
                    </div>
                  )}
                </div>
                {isCurrent && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Paths */}
      <div className="mb-4">
        <div className="text-xs text-white/70 mb-2">Đường đi có thể:</div>
        <div className="space-y-1">
          {scenes.map((scene) => {
            if (scene.type === 'end') return null;
            
            const availableConnections = scene.connections || [];
            if (availableConnections.length === 0) return null;

            return (
              <div key={scene.id} className="text-xs text-white/80">
                <span className="font-medium">{scene.title}:</span>
                <div className="ml-2 space-y-1">
                  {availableConnections.map((connectionId) => {
                    const targetScene = scenes.find(s => s.id === connectionId);
                    if (!targetScene) return null;
                    
                    return (
                      <div key={connectionId} className="flex items-center gap-1">
                        <span>→</span>
                        <span>{getSceneIcon(connectionId)}</span>
                        <span>{targetScene.title}</span>
                        {hasVisitedScene(connectionId) && (
                          <span className="text-green-400">✓</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="text-xs text-white/60 text-center border-t border-white/20 pt-2">
        <div>Đã khám phá: {scenes.filter(s => hasVisitedScene(s.id)).length}/{scenes.length}</div>
        <div>Tiến độ: {Math.round((scenes.filter(s => hasVisitedScene(s.id)).length / scenes.length) * 100)}%</div>
      </div>
    </div>
  );
} 