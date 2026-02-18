import { useState } from 'react';
import { Grid, List, MapPin, UserSquare, Home, Search, PlusSquare, Heart, User, ChevronDown } from 'lucide-react';
import { clsx } from '../utils/retro-utils';

export default function InstagramApp() {
  const [activeTab, setActiveTab] = useState<'grid' | 'list' | 'map' | 'tagged'>('grid');

  const posts = [
    { id: 1, image: '/icons/6.png', caption: 'Post 6', likes: 110 },
    { id: 2, image: '/icons/5.png', caption: 'Post 5', likes: 95 },
    { id: 3, image: '/icons/4.png', caption: 'Post 4', likes: 150 },
    { id: 4, image: '/icons/3.png', caption: 'Post 3', likes: 200 },
    { id: 5, image: '/icons/2.png', caption: 'Post 2', likes: 85 },
    { id: 6, image: '/icons/1.png', caption: 'Post 1', likes: 120 },
  ];

  return (
    <div className="h-full flex flex-col bg-[var(--window-chrome-face)] font-sans select-none text-sm">

      {/* Profile Header */}
      <div className="p-3 border-b border-[var(--window-chrome-shadow)]">
        <div className="flex gap-4 items-center mb-3">
          {/* Avatar */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-[var(--window-chrome-shadow)] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)] overflow-hidden">
            <img src="/icons/avataar.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>

          {/* Stats */}
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="font-bold text-base md:text-lg leading-tight">Adam cheikhrouhou</h2>
            <div className="flex justify-between px-2 text-[10px] md:text-xs">
              <div className="flex flex-col items-center">
                <span className="font-bold text-sm md:text-base">6</span>
                <span>publications</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-sm md:text-base">583</span>
                <span>followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-sm md:text-base">953</span>
                <span>suivi(e)s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-3 px-1">
          <p className="text-[#00376b] font-bold text-xs mb-1">@n2s_tn</p>
          <div className="flex items-center gap-1 text-[#00376b] text-[10px] md:text-xs">
            <span className="truncate flex-1">vsco.co/cheikhrouhou et 1 autre lien</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 mb-4">
          <button className="retro-button flex-1 font-bold py-1 text-xs">Modifier</button>
          <button className="retro-button flex-1 font-bold py-1 text-xs">Partager le profil</button>
          <button className="retro-button px-1 py-1"><ChevronDown size={12} /></button>
        </div>


      </div>

      {/* Middle Tab Bar */}
      <div className="flex border-b border-gray-400">
        <button
          onClick={() => setActiveTab('grid')}
          className={clsx("flex-1 retro-button py-1 flex justify-center", activeTab === 'grid' && "active bg-gray-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]")}
        >
          <Grid size={16} />
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={clsx("flex-1 retro-button py-1 flex justify-center", activeTab === 'list' && "active bg-gray-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]")}
        >
          <List size={16} />
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={clsx("flex-1 retro-button py-1 flex justify-center", activeTab === 'map' && "active bg-gray-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]")}
        >
          <MapPin size={16} />
        </button>
        <button
          onClick={() => setActiveTab('tagged')}
          className={clsx("flex-1 retro-button py-1 flex justify-center", activeTab === 'tagged' && "active bg-gray-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]")}
        >
          <UserSquare size={16} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 retro-sunken bg-white m-1 overflow-y-auto p-1">
        {activeTab === 'grid' && (
          <div className="grid grid-cols-3 gap-0.5 md:gap-1">
            {posts.map(post => (
              <div key={post.id} className="aspect-square bg-gray-100 border border-gray-200 relative group cursor-pointer overflow-hidden">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] md:text-xs font-bold">
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1"><Heart size={12} fill="white" /> {post.likes}</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Fillers to look like a full grid if needed */}
            {[...Array(3)].map((_, i) => (
              <div key={`filler-${i}`} className="aspect-square bg-gray-50 border border-gray-100"></div>
            ))}
          </div>
        )}
        {activeTab === 'list' && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <List size={32} className="mb-2" />
            <span>List View</span>
          </div>
        )}
        {activeTab === 'map' && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MapPin size={32} className="mb-2" />
            <span>Map View</span>
          </div>
        )}
        {activeTab === 'tagged' && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <UserSquare size={32} className="mb-2" />
            <span>No Tagged Photos</span>
          </div>
        )}
      </div>

      {/* Bottom Toolbar */}
      <div className="border-t border-[var(--window-chrome-shadow)] p-1 flex justify-between bg-[var(--window-chrome-face)]">
        <button className="retro-button flex-1 py-1 flex justify-center"><Home size={20} /></button>
        <button className="retro-button flex-1 py-1 flex justify-center"><Search size={20} /></button>
        <button className="retro-button flex-1 py-1 flex justify-center"><PlusSquare size={20} /></button>
        <button className="retro-button flex-1 py-1 flex justify-center"><Heart size={20} /></button>
        <button className="retro-button flex-1 py-1 flex justify-center active bg-gray-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"><User size={20} /></button>
      </div>
    </div>
  );
}
