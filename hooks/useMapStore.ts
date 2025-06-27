import { create } from 'zustand';

interface MapStore {
  // Map visibility states
  isMiniMapVisible: boolean;
  isMapLegendVisible: boolean;
  isPathVisualizerVisible: boolean;
  isSceneEditorVisible: boolean;
  
  // Map interaction states
  isMiniMapExpanded: boolean;
  
  // Toggle functions
  toggleMiniMap: () => void;
  toggleMapLegend: () => void;
  togglePathVisualizer: () => void;
  toggleSceneEditor: () => void;
  toggleMiniMapExpanded: () => void;
  
  // Show/hide functions
  showAllMaps: () => void;
  hideAllMaps: () => void;
  
  // Map settings
  mapOpacity: number;
  setMapOpacity: (opacity: number) => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
  // Initial states
  isMiniMapVisible: true,
  isMapLegendVisible: false,
  isPathVisualizerVisible: false,
  isSceneEditorVisible: false,
  isMiniMapExpanded: false,
  mapOpacity: 0.8,
  
  // Toggle functions
  toggleMiniMap: () => set(state => ({ isMiniMapVisible: !state.isMiniMapVisible })),
  toggleMapLegend: () => set(state => ({ isMapLegendVisible: !state.isMapLegendVisible })),
  togglePathVisualizer: () => set(state => ({ isPathVisualizerVisible: !state.isPathVisualizerVisible })),
  toggleSceneEditor: () => set(state => ({ isSceneEditorVisible: !state.isSceneEditorVisible })),
  toggleMiniMapExpanded: () => set(state => ({ isMiniMapExpanded: !state.isMiniMapExpanded })),
  
  // Show/hide all
  showAllMaps: () => set({ 
    isMiniMapVisible: true, 
    isMapLegendVisible: true, 
    isPathVisualizerVisible: true 
  }),
  hideAllMaps: () => set({ 
    isMiniMapVisible: false, 
    isMapLegendVisible: false, 
    isPathVisualizerVisible: false 
  }),
  
  // Settings
  setMapOpacity: (opacity: number) => set({ mapOpacity: Math.max(0.1, Math.min(1, opacity)) })
})); 