import { AppConfig, AppType } from '../types/os';

export const appRegistry: Record<AppType, AppConfig> = {
  profile: {
    id: 'profile',
    title: 'Profile',
    icon: '/icons/profil.png',
    defaultSize: { width: 500, height: 800 },
    defaultPosition: { x: 300, y: 50 }
  },
  universe: {
    id: 'universe',
    title: 'Universe',
    icon: '/icons/universe.png',
    defaultSize: { width: 700, height: 600 },
    defaultPosition: { x: 150, y: 100 }
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    icon: '💼',
    defaultSize: { width: 800, height: 600 },
    defaultPosition: { x: 120, y: 90 }
  },
  creations: {
    id: 'creations',
    title: 'Creations',
    icon: '🎨',
    defaultSize: { width: 750, height: 550 },
    defaultPosition: { x: 130, y: 110 }
  },
  n2s: {
    id: 'n2s',
    title: 'N2S',
    icon: '/icons/n2s.png',
    defaultSize: { width: 700, height: 600 },
    defaultPosition: { x: 140, y: 100 }
  },
  graveyard: {
    id: 'graveyard',
    title: 'Recycle Bin',
    icon: '/icons/recyclebin.png',
    defaultSize: { width: 650, height: 550 },
    defaultPosition: { x: 160, y: 120 }
  },
  games: {
    id: 'games',
    title: 'Games',
    icon: '/icons/game.png',
    defaultSize: { width: 700, height: 500 },
    defaultPosition: { x: 180, y: 120 }
  },
  instagram: {
    id: 'instagram',
    title: 'Instagram',
    icon: '/icons/instagram.png',
    defaultSize: { width: 600, height: 700 },
    defaultPosition: { x: 180, y: 100 }
  },
  computer: {
    id: 'computer',
    title: 'My Computer',
    icon: '/icons/pc.png',
    defaultSize: { width: 700, height: 500 },
    defaultPosition: { x: 140, y: 110 }
  },
  spotify: {
    id: 'spotify',
    title: 'Spotify',
    icon: '/icons/SPOTIFY.png',
    defaultSize: { width: 400, height: 750 },
    defaultPosition: { x: 300, y: 100 }
  },
  chatgpt: {
    id: 'chatgpt',
    title: 'ChatGPT',
    icon: '/icons/chat.png',
    defaultSize: { width: 400, height: 500 },
    defaultPosition: { x: 250, y: 150 }
  }
};

export const getAppConfig = (appType: AppType): AppConfig => {
  return appRegistry[appType];
};
