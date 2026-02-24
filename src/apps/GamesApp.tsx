import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import CatchSquareApp from './CatchSquareApp';
import DinoRunnerApp from './DinoRunnerApp';
import SnakeGameApp from './SnakeGameApp';

type GameType = 'hub' | 'catchsquare' | 'dinorun' | 'snake';

export default function GamesApp() {
    const [currentGame, setCurrentGame] = useState<GameType>('hub');

    const games = [
        {
            id: 'catchsquare' as GameType,
            title: 'Catch Square',
            icon: '/icons/game.png',
            color: 'from-blue-500 to-purple-600'
        },
        {
            id: 'dinorun' as GameType,
            title: 'Dino Runner',
            icon: '🦖',
            color: 'from-green-500 to-emerald-700'
        },
        {
            id: 'snake' as GameType,
            title: 'Retro Snake',
            icon: '🐍',
            color: 'from-yellow-500 to-orange-700'
        }
    ];

    if (currentGame !== 'hub') {
        return (
            <div className="h-full flex flex-col bg-[#c0c0c0]">
                <div className="bg-[#c0c0c0] p-1 flex items-center justify-between border-b-2 border-white shadow-[0_1px_0_#808080]">
                    <button
                        onClick={() => setCurrentGame('hub')}
                        className="retro-button flex items-center gap-2 px-3 py-1 text-sm active:translate-y-[1px]"
                    >
                        <ArrowLeft size={14} /> BACK
                    </button>
                    <div className="flex-1 text-center">
                        <span className="text-black text-xs font-bold uppercase tracking-tight">
                            {games.find(g => g.id === currentGame)?.title}
                        </span>
                    </div>
                </div>
                <div className="flex-1 overflow-hidden bg-black p-2">
                    <div className="h-full border-2 border-gray-600 shadow-[inset_-1px_-1px_0_white,inset_1px_1px_0_#000]">
                        {currentGame === 'catchsquare' && <CatchSquareApp />}
                        {currentGame === 'dinorun' && <DinoRunnerApp />}
                        {currentGame === 'snake' && <SnakeGameApp />}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-[#c0c0c0] flex flex-col font-sans p-4 overflow-y-auto custom-scrollbar text-black">
            <div className="mb-6 p-4 bg-[#808080] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-r-[#404040] border-b-[#404040] shadow-inner">
                <div className="flex items-center justify-center gap-3">
                    <img src="/icons/game.png" alt="Games" className="w-12 h-12 pixel-art" />
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                            SELECT GAME
                        </h1>
                        <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">
                            Total Modules: {games.length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full pb-8">
                {games.map((game) => (
                    <button
                        key={game.id}
                        onClick={() => setCurrentGame(game.id)}
                        className="group relative bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-r-[#808080] border-b-[#808080] active:border-r-white active:border-b-white active:border-t-[#808080] active:border-l-[#808080] p-6 text-center transition-all hover:bg-[#d0d0d0]"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                            <div className="w-20 h-20 bg-[#808080] border-t-2 border-l-2 border-[#404040] border-r-2 border-b-2 border-white flex items-center justify-center text-5xl shadow-inner group-hover:bg-[#909090]">
                                {typeof game.icon === 'string' && game.icon.startsWith('/') ? (
                                    <img src={game.icon} alt={game.title} className="w-12 h-12 object-contain pixel-art" />
                                ) : (
                                    game.icon
                                )}
                            </div>

                            <h3 className="text-xl font-bold leading-none">{game.title}</h3>

                            <div className="mt-2 w-full">
                                <span className="inline-block w-full text-sm font-bold border-2 border-[#808080] px-4 py-2 bg-[#c0c0c0] group-hover:bg-[#000080] group-hover:text-white group-active:translate-y-[1px] shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#808080]">
                                    LAUNCH GAME
                                </span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-auto border-t border-gray-500 pt-4 flex justify-between items-center text-[10px] text-gray-600 font-bold uppercase">
                <div className="flex gap-4">
                    <span>OS: WIN 95</span>
                    <span>STATUS: ONLINE</span>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    READY
                </div>
            </div>
        </div>
    );
}
