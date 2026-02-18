import { useState } from 'react';
import { Play, Pause, Shuffle, Repeat, Heart, MoreHorizontal, ArrowDownCircle, Share, Plus, ChevronLeft, MonitorSpeaker } from 'lucide-react';
import { clsx } from '../utils/retro-utils';
import { spotifyPlaylist } from '../data/spotifyPlaylist';

export default function SpotifyApp() {
    const [isPlaying, setIsPlaying] = useState(true);

    const songs = [...spotifyPlaylist].reverse().map((song) => ({
        ...song,
        downloaded: true,
        nowPlaying: song.title === "PRESSURE" && song.artist === "Rilès"
    }));

    const currentTrack = songs.find(s => s.nowPlaying) || songs[0];

    return (
        <div className="h-full bg-black text-white font-mono flex flex-col select-none overflow-hidden relative">
            {/* Background Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#224f7a] via-black to-black opacity-80 pointer-events-none"></div>

            <div className="relative h-full flex flex-col z-10">
                {/* Header / Nav */}
                <div className="p-4 flex items-center">
                    <ChevronLeft size={24} />
                </div>

                {/* Content Scroll Area */}
                <div className="flex-1 overflow-auto pb-24 scrollbar-hide">
                    <div className="px-4">
                        {/* Playlist Image */}
                        <div className="aspect-square w-48 mx-auto mb-6 bg-gray-800 shadow-[4px_4px_0_#404040] border-2 border-white relative overflow-hidden group">
                            <img
                                src="/icons/playlist.png"
                                alt="Playlist Cover"
                                className="w-full h-full object-cover pixel-art"
                            />
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-bold mb-2 tracking-tighter">CHEiKH❄️</h1>

                        {/* User Info */}
                        <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
                            <div className="flex -space-x-2">
                                <div className="w-5 h-5 rounded-full bg-gray-600 border border-black"></div>
                                <div className="w-5 h-5 rounded-full bg-gray-500 border border-black"></div>
                                <div className="w-5 h-5 rounded-full bg-gray-400 border border-black"></div>
                            </div>
                            <span className="font-bold text-white">Adam +2 autres</span>
                        </div>

                        <div className="text-[10px] text-gray-400 mb-4 flex gap-1">
                            <span>🌐 18 sauvegardes</span>
                            <span>•</span>
                            <span>460 titres • 25 h 47 m</span>
                        </div>

                        {/* Controls Row */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 border border-white rounded flex items-center justify-center">
                                    <div className="w-6 h-6 bg-red-900/50"></div>
                                </div>
                                <ArrowDownCircle size={24} className="text-[#1ed760]" />
                                <Share size={24} className="text-gray-400" />
                                <MoreHorizontal size={24} className="text-gray-400" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Shuffle size={24} className="text-[#1ed760]" />
                                <button
                                    className="w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center shadow-[2px_2px_0_#006400] active:translate-y-1 active:shadow-none transition-all"
                                    onClick={() => setIsPlaying(!isPlaying)}
                                >
                                    {isPlaying ? <Pause fill="black" size={20} /> : <Play fill="black" className="ml-1" size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2 mb-4 overflow-x-auto text-xs pb-2 scrollbar-hide">
                            <button className="bg-[#333] px-3 py-1 rounded-full border border-transparent hover:border-white whitespace-nowrap">+ Ajouter</button>
                            <button className="bg-[#333] px-3 py-1 rounded-full border border-transparent hover:border-white whitespace-nowrap flex items-center gap-1"><span className="rotate-90">⎇</span> Mixer</button>
                            <button className="bg-[#333] px-3 py-1 rounded-full border border-transparent hover:border-white whitespace-nowrap">Modifier</button>
                            <button className="bg-[#333] px-3 py-1 rounded-full border border-transparent hover:border-white whitespace-nowrap">Trier</button>
                        </div>

                        {/* Song List */}
                        <div className="space-y-4">
                            {songs.map((song, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-800 flex items-center justify-center text-xs border border-gray-600">
                                            {song.nowPlaying ? '💿' : '🎵'}
                                        </div>
                                        <div>
                                            <div className={clsx("font-bold text-sm", song.nowPlaying ? "text-[#1ed760]" : "text-white")}>
                                                {song.title}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                                {song.downloaded && <ArrowDownCircle size={10} className="text-[#1ed760]" />}
                                                {song.explicit && <span className="bg-gray-600 text-black px-[2px] rounded-[1px] font-bold text-[8px]">E</span>}
                                                <span>{song.artist}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <MoreHorizontal size={16} className="text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Now Playing Bar */}
                <div className="absolute bottom-2 left-2 right-2 bg-[#303030] rounded p-2 flex items-center justify-between border border-gray-600 shadow-lg font-sans z-20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-700 rounded-sm border border-gray-500 flex items-center justify-center text-[10px]">💿</div>
                        <div>
                            <div className="text-xs font-bold text-white leading-tight">{currentTrack.title}</div>
                            <div className="text-[10px] text-gray-400 flex items-center gap-1">
                                {currentTrack.explicit && <span className="bg-gray-600 text-black px-[2px] rounded-[1px] font-bold text-[7px] leading-none">E</span>}
                                {currentTrack.artist}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pr-2">
                        <MonitorSpeaker size={18} className="text-gray-400" />
                        <Play fill="white" size={18} />
                    </div>
                    {/* Progress Bar overlay at bottom of this card */}
                    <div className="absolute bottom-0 left-1 right-1 h-[2px] bg-gray-600 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-white"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
