import { useState, useEffect } from 'react';
import { Icon } from './Icon';
import { Window } from './Window';
import { StartMenu } from './StartMenu';
import { useWindowManager } from '../core/windowManager';
import { appRegistry } from '../core/appRegistry';
import { AppType } from '../types/os';
import { formatDate } from '../utils/retro-utils';

import ProfileApp from '../apps/ProfileApp';
import UniverseApp from '../apps/UniverseApp';
import ProjectsApp from '../apps/ProjectsApp';
import CreationsApp from '../apps/CreationsApp';
import N2SApp from '../apps/N2SApp';
import GraveyardApp from '../apps/GraveyardApp';
import GamesApp from '../apps/GamesApp';
import InstagramApp from '../apps/InstagramApp';
import ComputerApp from '../apps/ComputerApp';
import SpotifyApp from '../apps/SpotifyApp';
import ChatGPTApp from '../apps/ChatGPTApp';

const desktopApps: AppType[] = [
  'profile',
  'universe',
  'n2s',
  'graveyard',
  'games',
  'instagram',
  'computer',
  'spotify',
  'chatgpt'
];

export function Desktop({ onShutdown }: { onShutdown: () => void }) {
  const { windows } = useWindowManager();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedIcon, setSelectedIcon] = useState<AppType | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBackgroundClick = () => {
    setSelectedIcon(null);
    setStartMenuOpen(false);
  }

  const renderAppContent = (appType: AppType) => {
    switch (appType) {
      case 'profile': return <ProfileApp />;
      case 'universe': return <UniverseApp />;
      case 'projects': return <ProjectsApp />;
      case 'creations': return <CreationsApp />;
      case 'n2s': return <N2SApp />;
      case 'graveyard': return <GraveyardApp />;
      case 'games': return <GamesApp />;
      case 'instagram': return <InstagramApp />;
      case 'computer': return <ComputerApp />;
      case 'spotify': return <SpotifyApp />;
      case 'chatgpt': return <ChatGPTApp />;
      default: return <div className="p-8">App not found</div>;
    }
  };

  return (
    <div
      className="w-full h-full overflow-hidden relative font-sans select-none"
      style={{ backgroundColor: 'var(--retro-desktop-teal)' }}
      onClick={handleBackgroundClick}
    >

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
        backgroundSize: '2px 2px',
        backgroundPosition: '0 0, 1px 1px',
        opacity: 0.05
      }} />

      <div
        className="absolute top-4 left-4 right-4 bottom-10 grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] auto-rows-min md:grid-flow-col md:grid-rows-[repeat(auto-fill,130px)] md:auto-cols-max md:right-auto md:bottom-auto gap-4 content-start"
      >
        {desktopApps.map((appType) => {
          const config = appRegistry[appType];
          if (!config) return null;
          return (
            <Icon
              key={appType}
              appType={appType}
              icon={config.icon}
              label={config.title}
              selected={selectedIcon === appType}
              onSelect={() => setSelectedIcon(appType)}
            />
          );
        })}
      </div>

      {windows.map(window => (
        <Window key={window.id} window={window}>
          {renderAppContent(window.appType)}
        </Window>
      ))}

      <div
        className="retro-taskbar absolute bottom-0 left-0 right-0 h-[28px] flex items-center px-1 border-t-2 border-white bg-[#c0c0c0] shadow-[inset_0_-2px_0_#808080]"
        style={{ zIndex: 1000 }}
      >
        <button
          className={`retro-button font-bold flex items-center gap-1.5 px-2 py-0.5 h-[22px] mr-2 ${startMenuOpen ? 'pressed' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setStartMenuOpen(!startMenuOpen);
          }}
        >
          <img src="/icons/windows-95.png" alt="Start" className="w-[16px] h-[16px] pixel-art" /> Start
        </button>

        <div className="border border-gray-400 h-full mx-1"></div>

        {/* Taskbar items for open windows could go here */}

        <div className="ml-auto retro-sunken px-2 py-0.5 flex items-center justify-center h-[22px] min-w-[80px] bg-white">
          <span className="text-xs font-mono">{formatDate(currentTime)}</span>
        </div>
      </div>

      {/* Start Menu */}
      <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} onShutdown={onShutdown} />
    </div>
  );
}
