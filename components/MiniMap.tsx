'use client';

import { useSceneStore } from '../hooks/useSceneStore';
import { useMapStore } from '../hooks/useMapStore';
import { scenes } from '../data/scenes';

export default function MiniMap() {
  const { currentSceneId, setCurrentScene, hasVisitedScene } = useSceneStore();
  const { isMiniMapVisible, isMiniMapExpanded, toggleMiniMapExpanded, mapOpacity } = useMapStore();

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

  const getSceneTypeIcon = (scene: any) => {
    switch (scene.type) {
      case 'start':
        return '⭐';
      case 'branch':
        return '🔄';
      case 'end':
        return '🏁';
      default:
        return '';
    }
  };

  const getSceneOpacity = (scene: any) => {
    if (currentSceneId === scene.id) return 'opacity-100';
    if (hasVisitedScene(scene.id)) return 'opacity-80';
    return 'opacity-40';
  };

  // Căn lại node cho cân đối, không tràn khung
  const mapStructure = {
    forest: { x: 50, y: 18, connections: ['ocean', 'city'] },
    ocean: { x: 22, y: 60, connections: ['space'] },
    city: { x: 78, y: 60, connections: ['space'] },
    space: { x: 50, y: 88, connections: [] }
  };

  if (!isMiniMapVisible) return null;

  return (
    <div className="fixed top-2 right-2 z-50">
      {/* Toggle Button */}
      <button
        onClick={toggleMiniMapExpanded}
        className="mb-2 bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-sm rounded-full p-2 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        title={isMiniMapExpanded ? "Thu nhỏ bản đồ" : "Mở rộng bản đồ"}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* MiniMap Container */}
     
    </div>
  );
} 