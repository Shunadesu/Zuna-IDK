import { create } from 'zustand';

interface ControlsState {
  isVisible: boolean;
  toggleVisibility: () => void;
  hideControls: () => void;
  showControls: () => void;
}

export const useControlsStore = create<ControlsState>((set) => ({
  isVisible: false,
  toggleVisibility: () => set((state) => ({ isVisible: !state.isVisible })),
  hideControls: () => set({ isVisible: false }),
  showControls: () => set({ isVisible: true }),
})); 