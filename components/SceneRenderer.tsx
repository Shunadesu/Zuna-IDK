'use client';

import { useEffect } from 'react';
import { useSceneStore } from '../hooks/useSceneStore';
import { useControlsStore } from '../hooks/useControlsStore';
import { scenes } from '../data/scenes';
import AudioPlayer from './AudioPlayer';
import Navigation from './Navigation';
import SceneTransition from './SceneTransition';
import MapLegend from './MapLegend';
import PathVisualizer from './PathVisualizer';
import SceneEditor from './SceneEditor';
import ControlsToggle from './ControlsToggle';
import MiniMap from './MiniMap';

// Import layouts
import CenteredLayout from './layouts/CenteredLayout';
import GridLayout from './layouts/GridLayout';
import MinimalLayout from './layouts/MinimalLayout';
import RetroLayout from './layouts/RetroLayout';

const layoutComponents = {
  centered: CenteredLayout,
  grid: GridLayout,
  minimal: MinimalLayout,
  retro: RetroLayout,
};

export default function SceneRenderer() {
  const { currentSceneId, currentScene, nextScene, resetToStart } = useSceneStore();
  const { isVisible } = useControlsStore();

  useEffect(() => {
    if (currentScene) {
      // Set background image
      document.body.style.backgroundImage = `url(${currentScene.background})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
    }
  }, [currentScene]);

  if (!currentScene) {
    return <div>Scene not found</div>;
  }

  const LayoutComponent = layoutComponents[currentScene.layout as keyof typeof layoutComponents] || CenteredLayout;

  const handleNext = () => {
    if (currentScene.type === 'end') {
      // If it's an end scene, reset to start
      resetToStart();
    } else {
      // Otherwise, go to next scene
      nextScene();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: currentScene.color
        }}
      />

      {/* Scene content */}
      <div className="relative z-10">
        <LayoutComponent scene={currentScene} onNext={handleNext} />
      </div>

      {/* Controls Toggle Button - Always visible */}
      <ControlsToggle />

      {/* Audio Player - Always visible */}
      <AudioPlayer />

      {/* Conditional UI Components */}
      {isVisible && (
        <>
          {/* Navigation */}
          <Navigation />

          {/* Map Components */}
          <MiniMap />
          <MapLegend />
          <PathVisualizer />
          <SceneEditor />
        </>
      )}

      {/* Scene Transition - Always visible */}
      <SceneTransition />
    </div>
  );
} 