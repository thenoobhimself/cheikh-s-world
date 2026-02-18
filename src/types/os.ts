export type AppType =
  | 'profile'
  | 'universe'
  | 'projects'
  | 'creations'
  | 'n2s'
  | 'graveyard'
  | 'dino'
  | 'instagram'
  | 'computer'
  | 'spotify'
  | 'chatgpt';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  appType: AppType;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  position: Position;
  size: Size;
  zIndex: number;
}

export interface AppConfig {
  id: AppType;
  title: string;
  icon: string;
  defaultSize: Size;
  defaultPosition: Position;
  isExternal?: boolean;
  externalUrl?: string;
}
