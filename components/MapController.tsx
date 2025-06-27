'use client';

import { useMapStore } from '../hooks/useMapStore';

export default function MapController() {
  const {
    isMiniMapVisible,
    isMapLegendVisible,
    isPathVisualizerVisible,
    isSceneEditorVisible,
    toggleMiniMap,
    toggleMapLegend,
    togglePathVisualizer,
    toggleSceneEditor,
    showAllMaps,
    hideAllMaps,
    mapOpacity,
    setMapOpacity
  } = useMapStore();

  return (
    <div className="fixed top-4 left-4 z-50">
      {/* Main Toggle Button */}
      <div className="mb-2">
        <button
          onClick={showAllMaps}
          className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-all duration-300 mr-2"
          title="Hiện tất cả bản đồ"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        
        <button
          onClick={hideAllMaps}
          className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-all duration-300"
          title="Ẩn tất cả bản đồ"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Individual Map Controls */}
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
        <div className="text-sm font-medium mb-3 text-center">Điều khiển bản đồ</div>
        
        <div className="space-y-2">
          {/* MiniMap Toggle */}
          <button
            onClick={toggleMiniMap}
            className={`w-full flex items-center justify-between p-2 rounded transition-all duration-300 ${
              isMiniMapVisible 
                ? 'bg-white/20 text-white' 
                : 'bg-white/10 text-white/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>🗺️</span>
              <span className="text-xs">Bản đồ nhỏ</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${isMiniMapVisible ? 'bg-green-400' : 'bg-gray-400'}`} />
          </button>

          {/* Map Legend Toggle */}
          <button
            onClick={toggleMapLegend}
            className={`w-full flex items-center justify-between p-2 rounded transition-all duration-300 ${
              isMapLegendVisible 
                ? 'bg-white/20 text-white' 
                : 'bg-white/10 text-white/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>📋</span>
              <span className="text-xs">Thông tin bản đồ</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${isMapLegendVisible ? 'bg-green-400' : 'bg-gray-400'}`} />
          </button>

          {/* Path Visualizer Toggle */}
          <button
            onClick={togglePathVisualizer}
            className={`w-full flex items-center justify-between p-2 rounded transition-all duration-300 ${
              isPathVisualizerVisible 
                ? 'bg-white/20 text-white' 
                : 'bg-white/10 text-white/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>🛤️</span>
              <span className="text-xs">Đường đi</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${isPathVisualizerVisible ? 'bg-green-400' : 'bg-gray-400'}`} />
          </button>

          {/* Scene Editor Toggle */}
          <button
            onClick={toggleSceneEditor}
            className={`w-full flex items-center justify-between p-2 rounded transition-all duration-300 ${
              isSceneEditorVisible 
                ? 'bg-white/20 text-white' 
                : 'bg-white/10 text-white/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>✏️</span>
              <span className="text-xs">Chỉnh sửa cảnh</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${isSceneEditorVisible ? 'bg-green-400' : 'bg-gray-400'}`} />
          </button>
        </div>

        {/* Opacity Control */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="text-xs text-white/70 mb-2">Độ trong suốt</div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={mapOpacity}
            onChange={(e) => setMapOpacity(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-xs text-white/60 text-center mt-1">
            {Math.round(mapOpacity * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
} 