import { appRegistry } from '../core/appRegistry';
import { AppType } from '../types/os';
import { useWindowManager } from '../core/windowManager';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onShutdown: () => void;
}

export function StartMenu({ isOpen, onClose, onShutdown }: StartMenuProps) {
    const { openWindow } = useWindowManager();

    if (!isOpen) return null;

    const handleAppClick = (appType: AppType) => {
        console.log('Opening app:', appType);
        openWindow(appType);
        // Close menu after a small delay to ensure window opens first
        setTimeout(() => onClose(), 0);
    };

    const menuApps: AppType[] = [
        'profile',
        'universe',
        'projects',
        'creations',
        'n2s',
        'graveyard',
        'dino',
        'instagram',
        'computer',
        'spotify',
        'chatgpt'
    ];

    return (
        <div
            className="absolute bottom-[28px] left-0 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-r-[#808080] border-b-[#808080] shadow-[2px_2px_0_rgba(0,0,0,0.4)] overflow-y-auto max-h-[calc(100dvh-40px)]"
            style={{ zIndex: 1001, width: '250px' }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Windows 95 Banner */}
            <div className="flex">
                <div
                    className="w-6 flex items-end pb-2 px-1"
                    style={{
                        background: 'linear-gradient(to top, #000084, #1084d0)',
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)'
                    }}
                >
                    <span className="text-white font-bold text-lg tracking-wider">
                        Windows <span className="font-normal">95</span>
                    </span>
                </div>

                {/* Menu Items */}
                <div className="flex-1 py-1">
                    {menuApps.map((appType) => {
                        const config = appRegistry[appType];
                        if (!config) return null;

                        return (
                            <div
                                key={appType}
                                className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#000084] hover:text-white cursor-pointer group"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAppClick(appType);
                                }}
                            >
                                <div className="w-8 h-8 flex items-center justify-center">
                                    {config.icon.startsWith('/') || config.icon.startsWith('http') ? (
                                        <img
                                            src={config.icon}
                                            alt={config.title}
                                            className="w-8 h-8 object-contain pixel-art"
                                        />
                                    ) : (
                                        <span className="text-2xl">{config.icon}</span>
                                    )}
                                </div>
                                <span className="text-sm font-sans">{config.title}</span>
                            </div>
                        );
                    })}

                    {/* Separator */}
                    <div className="mx-2 my-1 h-[2px] bg-[#808080] border-b border-white" />

                    {/* Shut Down */}
                    <div
                        className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#000084] hover:text-white cursor-pointer"
                        onClick={() => { onClose(); onShutdown(); }}
                    >
                        <div className="w-8 h-8 flex items-center justify-center">
                            <img src="/icons/shutdown.png" alt="Shut Down" className="w-8 h-8 object-contain pixel-art" />
                        </div>
                        <span className="text-sm font-sans">Shut Down...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
