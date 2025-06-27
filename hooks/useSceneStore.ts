import { create } from 'zustand';
import { scenes, getSceneById, Scene, getStartScene } from '../data/scenes';

interface SceneStore {
  currentSceneId: string;
  currentScene: Scene | null;
  visitedScenes: string[];
  setCurrentScene: (sceneId: string) => void;
  nextScene: () => void;
  previousScene: () => void;
  resetToStart: () => void;
  hasVisitedScene: (sceneId: string) => boolean;
}

export const useSceneStore = create<SceneStore>((set, get) => ({
  currentSceneId: getStartScene().id,
  currentScene: getStartScene(),
  visitedScenes: [getStartScene().id],
  
  setCurrentScene: (sceneId: string) => {
    const scene = getSceneById(sceneId);
    if (scene) {
      const { visitedScenes } = get();
      const newVisitedScenes = visitedScenes.includes(sceneId) 
        ? visitedScenes 
        : [...visitedScenes, sceneId];
      
      set({ 
        currentSceneId: sceneId, 
        currentScene: scene,
        visitedScenes: newVisitedScenes
      });
    }
  },
  
  nextScene: () => {
    const { currentScene } = get();
    if (currentScene && currentScene.next) {
      const nextScene = getSceneById(currentScene.next);
      if (nextScene) {
        const { visitedScenes } = get();
        const newVisitedScenes = visitedScenes.includes(nextScene.id) 
          ? visitedScenes 
          : [...visitedScenes, nextScene.id];
        
        set({ 
          currentSceneId: nextScene.id, 
          currentScene: nextScene,
          visitedScenes: newVisitedScenes
        });
      }
    }
  },
  
  previousScene: () => {
    const { currentSceneId, visitedScenes } = get();
    const currentIndex = visitedScenes.indexOf(currentSceneId);
    if (currentIndex > 0) {
      const previousSceneId = visitedScenes[currentIndex - 1];
      const previousScene = getSceneById(previousSceneId);
      if (previousScene) {
        set({ 
          currentSceneId: previousSceneId, 
          currentScene: previousScene 
        });
      }
    }
  },

  resetToStart: () => {
    const startScene = getStartScene();
    set({ 
      currentSceneId: startScene.id, 
      currentScene: startScene,
      visitedScenes: [startScene.id]
    });
  },

  hasVisitedScene: (sceneId: string) => {
    const { visitedScenes } = get();
    return visitedScenes.includes(sceneId);
  }
})); 