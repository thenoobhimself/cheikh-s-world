import { useState } from 'react';
import { Image as ImageIcon, ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, Filter, Download } from 'lucide-react';

export default function CreationsApp() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  const creations = [
    { type: 'video', title: 'Amsterdam vlog.mp4', url: '/creations/amsterdam_vlog.mp4', category: 'Vlog', date: '2023-05-15', folder: null },
    { type: 'video', title: 'Drop n2s.mp4', url: '/creations/drop_n2s.mp4', category: 'N2S Brand', date: '2023-06-10', folder: null },
    { type: 'video', title: 'Souvenir drop.mp4', url: '/creations/souvenir_drop.mp4', category: 'Event', date: '2023-08-20', folder: null },
    { type: 'video', title: 'grenoble.mp4', url: '/creations/grenoble.mp4', category: 'Travel', date: '2023-09-05', folder: null },
    { type: 'video', title: 'trailer 2 n2s.mp4', url: '/creations/trailer_2_n2s.mp4', category: 'Teaser', date: '2023-10-12', folder: null },
    { type: 'image', title: 'artwork.jpg', url: '/creations/artwork.jpg', category: 'Digital Art', date: '2024-02-16', folder: null },

    // kuluwak folder images
    { type: 'image', title: 'Affiche add insta.png', url: '/creations/kuluwak/affiche_add_insta.png', category: 'Kuluwak', date: '2024-01-10', folder: 'kuluwak' },
    { type: 'image', title: 'affiche plat familialle.png', url: '/creations/kuluwak/affiche_plat_familialle.png', category: 'Kuluwak', date: '2024-01-11', folder: 'kuluwak' },
    { type: 'image', title: 'affiche pour traiteur.png', url: '/creations/kuluwak/affiche_pour_traiteur.png', category: 'Kuluwak', date: '2024-01-12', folder: 'kuluwak' },
    { type: 'image', title: 'affiche recrutement chef.png', url: '/creations/kuluwak/affiche_recrutement_chef.png', category: 'Kuluwak', date: '2024-01-13', folder: 'kuluwak' },
    { type: 'image', title: 'affiche yessmine.png', url: '/creations/kuluwak/affiche_yessmine.png', category: 'Kuluwak', date: '2024-01-14', folder: 'kuluwak' },
    { type: 'image', title: 'multiposstt.png', url: '/creations/kuluwak/multiposstt.png', category: 'Kuluwak', date: '2024-01-15', folder: 'kuluwak' },
    { type: 'image', title: 'reseravation post.png', url: '/creations/kuluwak/reservation_post.png', category: 'Kuluwak', date: '2024-01-16', folder: 'kuluwak' },
    { type: 'image', title: 'reservation.png', url: '/creations/kuluwak/reservation.png', category: 'Kuluwak', date: '2024-01-17', folder: 'kuluwak' },
  ];

  const folders = ['kuluwak'];

  const displayedItems = currentFolder
    ? creations.filter(c => c.folder === currentFolder)
    : creations.filter(c => c.folder === null);

  const handleNext = () => {
    setSelectedItemIndex(prev => (prev !== null && prev < displayedItems.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setSelectedItemIndex(prev => (prev !== null && prev > 0 ? prev - 1 : displayedItems.length - 1));
  };

  const currentCreation = selectedItemIndex !== null ? displayedItems[selectedItemIndex] : null;

  return (
    <div className="h-full flex flex-col bg-[var(--window-chrome-face)] font-sans select-none text-sm">
      {/* Toolbar */}
      <div className="flex gap-1 p-1 border-b border-[var(--window-chrome-shadow)] mb-1">
        <div className="flex items-center gap-1 border-r border-[var(--window-chrome-shadow)] pr-2 mr-1">
          <button className="retro-button px-2 py-0.5 text-xs">File</button>
          <button className="retro-button px-2 py-0.5 text-xs">Edit</button>
          <button className="retro-button px-2 py-0.5 text-xs">View</button>
        </div>

        <button className="retro-button px-2 py-0.5 text-xs flex items-center gap-1">
          <ImageIcon size={12} /> Slideshow
        </button>
        <button className="retro-button px-2 py-0.5 text-xs flex items-center gap-1">
          <Filter size={12} /> Filter
        </button>
      </div>

      {/* Main Grid */}
      <div className="flex-1 overflow-auto p-4 bg-white retro-sunken m-1 rounded-sm">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
          {/* Back Button */}
          {currentFolder && (
            <div
              className="flex flex-col gap-1 cursor-pointer group"
              onClick={() => setCurrentFolder(null)}
            >
              <div className="aspect-square bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-500 shadow-[2px_2px_0_rgba(0,0,0,0.1)] group-hover:bg-blue-200 transition-colors">
                <ChevronLeft size={32} />
              </div>
              <span className="text-xs text-center font-bold">.. [Back]</span>
            </div>
          )}

          {/* Folders (only on root) */}
          {!currentFolder && folders.map(folderName => (
            <div
              key={folderName}
              className="flex flex-col gap-1 cursor-pointer group"
              onClick={() => setCurrentFolder(folderName)}
            >
              <div className="aspect-square flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Classic Win95 Folder SVG */}
                  <path d="M4 10H18L22 14H44V40H4V10Z" fill="#FFF8B0" stroke="black" strokeWidth="2" />
                  <path d="M4 14H44V40H4V14Z" fill="#FFD700" stroke="black" strokeWidth="2" />
                  <path d="M4 14H44" stroke="white" strokeWidth="2" />
                  <path d="M6 16H42V38H6V16Z" fill="#FFE040" opacity="0.5" />
                </svg>
              </div>
              <span className="text-xs text-center font-bold font-mono">{folderName}</span>
            </div>
          ))}

          {/* Items */}
          {displayedItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-1 cursor-pointer group"
              onClick={() => setSelectedItemIndex(idx)}
              title={item.title}
            >
              <div className="aspect-square bg-gray-200 border-2 border-[var(--window-chrome-shadow)] flex items-center justify-center relative shadow-[2px_2px_0_rgba(0,0,0,0.2)] group-hover:border-blue-500 transition-colors overflow-hidden">
                {item.type === 'video' ? (
                  <video
                    src={`${item.url}#t=0.1`}
                    className="w-full h-full object-cover pointer-events-none"
                    preload="metadata"
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={item.url}
                    className="w-full h-full object-cover pointer-events-none"
                    alt={item.title}
                  />
                )}
              </div>
              <span className="text-xs text-center truncate font-mono bg-white border border-transparent group-hover:bg-blue-600 group-hover:text-white group-hover:border-dotted group-hover:border-white px-1">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="retro-statusbar flex justify-between px-2">
        <span>{displayedItems.length + (currentFolder ? 1 : folders.length)} object(s)</span>
        <span className="font-mono text-[10px]">{currentFolder ? `C:\\CREATIONS\\${currentFolder.toUpperCase()}` : 'C:\\CREATIONS'}</span>
      </div>

      {/* Lightbox / Modal */}
      {selectedItemIndex !== null && currentCreation && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-[1px]">
          <div className="retro-window w-full h-full flex flex-col shadow-2xl m-1" style={{ maxWidth: 'calc(100% - 8px)', maxHeight: 'calc(100% - 8px)' }}>
            <div className="retro-titlebar flex justify-between items-center bg-gradient-to-r from-blue-800 to-blue-600">
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-white" />
                <span>{currentCreation.title} - {currentCreation.type === 'video' ? 'Video Player' : 'Image Viewer'}</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setSelectedItemIndex(null); }} className="retro-button p-0 w-5 h-5 flex items-center justify-center bg-red-500 border-red-700">
                <X size={12} className="text-white" />
              </button>
            </div>

            <div className="flex-1 bg-[#000000] flex items-center justify-center relative overflow-hidden retro-sunken border-0">
              {currentCreation.type === 'video' ? (
                <video
                  key={currentCreation.url}
                  src={currentCreation.url}
                  className="max-w-full max-h-full"
                  autoPlay
                  controls
                  loop
                />
              ) : (
                <img
                  src={currentCreation.url}
                  className="max-w-full max-h-full object-contain"
                  alt={currentCreation.title}
                />
              )}

              {/* Navigation Overlay */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-2 text-white/50 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all z-10"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-2 text-white/50 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all z-10"
              >
                <ChevronRight size={32} />
              </button>

              <div className="absolute bottom-2 left-2 text-white/70 text-xs font-mono bg-black/50 px-2 py-1 rounded">
                {currentCreation.type.toUpperCase()} | {currentCreation.category} | {currentCreation.date}
              </div>
            </div>

            <div className="p-2 bg-[var(--window-chrome-face)] flex justify-between items-center border-t-2 border-[var(--window-chrome-light)]">
              <div className="flex gap-2">
                <button className="retro-button px-3 py-1 flex gap-2 items-center text-xs"><ZoomIn size={12} /> Zoom</button>
                <button className="retro-button px-3 py-1 flex gap-2 items-center text-xs"><ZoomOut size={12} /> 1:1</button>
              </div>

              <div className="flex gap-2">
                <button className="retro-button px-3 py-1 flex gap-2 items-center text-xs"><Download size={12} /> Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
