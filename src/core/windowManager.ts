import { create } from 'zustand';
import { WindowState, AppType } from '../types/os';
import { getAppConfig } from './appRegistry';

interface WindowManagerState {
  windows: WindowState[];
  highestZIndex: number;
  openWindow: (appType: AppType) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

export const useWindowManager = create<WindowManagerState>((set, get) => ({
  windows: [],
  highestZIndex: 100,

  openWindow: (appType: AppType) => {
    const appConfig = getAppConfig(appType);

    if (appConfig.isExternal && appConfig.externalUrl) {
      window.open(appConfig.externalUrl, '_blank');
      return;
    }

    const existingWindow = get().windows.find(w => w.appType === appType);

    if (existingWindow) {
      get().focusWindow(existingWindow.id);
      if (existingWindow.isMinimized) {
        get().minimizeWindow(existingWindow.id);
      }
      return;
    }

    // Calculate initial position and size
    const isMobile = window.innerWidth < 768;

    let initialSize = appConfig.defaultSize;
    let initialPosition = appConfig.defaultPosition;

    if (isMobile) {
      const width = Math.min(window.innerWidth * 0.95, appConfig.defaultSize.width);
      const height = Math.min(window.innerHeight * 0.8, appConfig.defaultSize.height);

      initialSize = {
        width,
        height
      };

      initialPosition = {
        x: (window.innerWidth - width) / 2,
        y: (window.innerHeight - height) / 2 - 20 // Slightly above center
      };
    }

    const newWindow: WindowState = {
      id: `window-${Date.now()}-${Math.random()}`,
      appType,
      title: appConfig.title,
      isMinimized: false,
      isMaximized: false,
      position: initialPosition,
      size: initialSize,
      zIndex: get().highestZIndex + 1
    };

    set(state => ({
      windows: [...state.windows, newWindow],
      highestZIndex: state.highestZIndex + 1
    }));
  },

  closeWindow: (id: string) => {
    set(state => ({
      windows: state.windows.filter(w => w.id !== id)
    }));
  },

  minimizeWindow: (id: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      )
    }));
  },

  maximizeWindow: (id: string) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    }));
  },

  focusWindow: (id: string) => {
    const currentHighest = get().highestZIndex;
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: currentHighest + 1 } : w
      ),
      highestZIndex: currentHighest + 1
    }));
  },

  updateWindowPosition: (id: string, position: { x: number; y: number }) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, position } : w
      )
    }));
  },

  updateWindowSize: (id: string, size: { width: number; height: number }) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, size } : w
      )
    }));
  }
}));
