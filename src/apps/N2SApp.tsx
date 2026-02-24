import { useState, useRef, useEffect, useCallback } from 'react';
import { Palette, Globe, ChevronRight, Play, Info, Instagram, Twitter, MessageSquare, X } from 'lucide-react';
import { clsx } from '../utils/retro-utils';

type View = 'world' | 'paint';

export default function N2SApp() {
  const [currentView, setCurrentView] = useState<View>('world');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] font-sans select-none overflow-hidden relative">
      {/* App Tab Bar */}
      <div className="flex bg-[#c0c0c0] p-1 gap-1 border-b border-gray-400">
        <button
          onClick={() => setCurrentView('world')}
          className={clsx(
            "px-4 py-1 flex items-center gap-2 text-xs font-bold transition-all",
            currentView === 'world' ? "retro-button pressed bg-white" : "retro-button"
          )}
        >
          <Globe size={14} /> N2S World
        </button>
        <button
          onClick={() => setCurrentView('paint')}
          className={clsx(
            "px-4 py-1 flex items-center gap-2 text-xs font-bold transition-all",
            currentView === 'paint' ? "retro-button pressed bg-white" : "retro-button"
          )}
        >
          <Palette size={14} /> Paint
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {currentView === 'world' ? (
          <N2SWorld onSelectVideo={setSelectedVideo} />
        ) : (
          <N2SPaint />
        )}
      </div>

      {/* Video Popup Modal (Windows 95 Style) */}
      {selectedVideo && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[1px]">
          <div className="retro-window w-full max-w-4xl shadow-2xl">
            <div className="retro-titlebar flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Play size={12} className="text-white" />
                <span>Media Player - {selectedVideo.split('/').pop()}</span>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="retro-button p-0 w-5 h-5 flex items-center justify-center bg-[#c0c0c0]"
              >
                <X size={14} />
              </button>
            </div>

            <div className="bg-black p-1 border-t-2 border-l-2 border-gray-600" style={{ boxShadow: 'inset -1px -1px 0 white' }}>
              <video
                src={selectedVideo}
                autoPlay
                controls
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            <div className="retro-statusbar mt-0 flex justify-between px-2 text-[10px]">
              <span>Ready</span>
              <span className="font-mono italic">N2S Archive</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function N2SWorld({ onSelectVideo }: { onSelectVideo: (url: string) => void }) {
  return (
    <div className="h-full bg-black text-white overflow-y-auto overflow-x-hidden scroll-smooth relative">
      {/* Hero Section */}
      <section className="relative h-auto aspect-video md:h-[500px] md:aspect-auto flex items-center justify-center overflow-hidden border-b-4 border-white/20 bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-contain md:object-cover opacity-60 md:scale-105"
        >
          <source src="/creations/drop_n2s.mp4#t=0.1" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>

        <div className="relative z-10 text-center px-4">
          <div className="inline-block px-3 py-1 bg-white text-black text-[10px] uppercase font-bold tracking-[0.3em] mb-4 animate-pulse">
            New Drop Available
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-2 italic">N2S</h1>
          <p className="text-sm md:text-lg tracking-[0.5em] text-white/70 uppercase">Night to Sunday</p>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="px-8 py-16 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 underline decoration-white/20 underline-offset-8">
              <Info size={24} className="text-white/40" /> THE MANIFESTO
            </h2>
            <p className="text-white/60 leading-relaxed text-lg italic">
              "We live for the transition. The ephemeral moments between Friday's chaos and Sunday's silence. N2S isn't just about clothes; it's about the culture of the nocturnal seeker."
            </p>
          </div>
          <div className="bg-white/5 p-6 border border-white/10 rounded-sm">
            <div className="flex justify-between items-end mb-4">
              <span className="text-4xl font-black opacity-10">01</span>
              <span className="text-[10px] font-mono text-white/30">EST. 2023</span>
            </div>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest leading-loose">
              Limited Edition / High Quality / Streetwise / Ethical / Raw / Authentic
            </p>
          </div>
        </div>
      </section>

      {/* Drop Showcase */}
      <section className="px-4 py-16 bg-gradient-to-b from-transparent to-white/5">
        <h2 className="text-center text-4xl font-black mb-12 tracking-widest uppercase">Latest Archives</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
          {/* Drop Item 1 */}
          <div className="group relative overflow-hidden bg-white/5 border border-white/10 aspect-video md:aspect-auto md:h-[500px]">
            <video
              muted
              loop
              playsInline
              preload="metadata"
              onMouseOver={e => e.currentTarget.play()}
              onMouseOut={e => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700"
            >
              <source src="/creations/souvenir_drop.mp4#t=0.1" type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-transparent to-transparent">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xs font-bold text-white/50 mb-2 block">DROP 002</span>
                <h3 className="text-2xl font-bold mb-4">"SOUVENIR" COLLECTION</h3>
                <button
                  onClick={() => onSelectVideo('/creations/souvenir_drop.mp4')}
                  className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white border border-white transition-colors flex items-center gap-2"
                >
                  EXPLORE ARCHIVE <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Drop Item 3 (New) */}
          <div className="group relative overflow-hidden bg-white/5 border border-white/10 aspect-video md:aspect-auto md:h-[500px]">
            <video
              muted
              loop
              playsInline
              preload="metadata"
              onMouseOver={e => e.currentTarget.play()}
              onMouseOut={e => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700"
            >
              <source src="/creations/trailer_souvenir.mp4#t=0.1" type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-transparent to-transparent">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xs font-bold text-white/50 mb-2 block">DROP 002-B</span>
                <h3 className="text-2xl font-bold mb-4 uppercase">SOUVENIR TRAILER</h3>
                <button
                  onClick={() => onSelectVideo('/creations/trailer_souvenir.mp4')}
                  className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white border border-white transition-colors flex items-center gap-2"
                >
                  WATCH TRAILER <Play size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Drop Item 2 */}
          <div className="group relative overflow-hidden bg-white/5 border border-white/10 aspect-video md:aspect-auto md:h-[500px]">
            <video
              muted
              loop
              playsInline
              preload="metadata"
              onMouseOver={e => e.currentTarget.play()}
              onMouseOut={e => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700"
            >
              <source src="/creations/trailer_2_n2s.mp4#t=2.0" type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-transparent to-transparent">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xs font-bold text-white/50 mb-2 block">DROP 003</span>
                <h3 className="text-2xl font-bold mb-4 uppercase">teaser thniti</h3>
                <button
                  onClick={() => onSelectVideo('/creations/trailer_2_n2s.mp4')}
                  className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white border border-white transition-colors flex items-center gap-2"
                >
                  WATCH TRAILER <Play size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Socials */}
      <footer className="py-20 border-t border-white/10 flex flex-col items-center gap-8 bg-black">
        <div className="flex gap-12">
          <Instagram size={28} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
          <Twitter size={28} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
          <MessageSquare size={28} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
        </div>
        <p className="text-white/20 text-[10px] font-mono tracking-[0.5em] uppercase">© 2024 N2S WORLD - ALL RIGHTS RESERVED - KEEP SEEKING</p>
      </footer>
    </div>
  );
}

function N2SPaint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<string>('pencil');
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // History for Undo
  const historyRef = useRef<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const startPosRef = useRef({ x: 0, y: 0 });
  const previewDataRef = useRef<ImageData | null>(null);

  // MS Paint Colors
  const colors = [
    '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080FF', '#004080', '#4000FF', '#804000',
    '#FFFFFF', '#C0C0C0', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFFF80', '#00FF80', '#80FFFF', '#8080FF', '#FF0080', '#FF8040'
  ];

  const tools = [
    { id: 'select-free', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixel-art scale-[1.4]"><path d="M8 1L10 6H15L11 9L12 14L8 11L4 14L5 9L1 6H6L8 1Z" stroke="black" strokeWidth="1" strokeDasharray="1 1" /></svg> },
    { id: 'select-rect', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixel-art scale-[1.4]"><rect x="2" y="2" width="12" height="12" stroke="black" strokeWidth="1" strokeDasharray="1 1" /></svg> },
    { id: 'eraser', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixel-art scale-[1.4]"><rect x="4" y="6" width="8" height="6" fill="white" stroke="black" /><path d="M4 6L12 6L10 4L6 4L4 6Z" fill="#ffef94" stroke="black" /></svg> },
    { id: 'fill', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixel-art scale-[1.4]"><path d="M12 2L8 6L10 8L14 4L12 2Z" fill="black" /><path d="M4 8L8 12L12 8L8 4L4 8Z" fill="#808080" stroke="black" /><path d="M4 8L2 10V14H6L8 12L4 8Z" fill="#c0c0c0" stroke="black" /></svg> },
    { id: 'pick', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixel-art scale-[1.4]"><path d="M12 2L14 4L6 12L4 12V10L12 2Z" fill="white" stroke="black" /><path d="M4 12L2 14" stroke="black" strokeWidth="2" /><rect x="10" y="4" width="2" height="2" fill="gray" /></svg> },
    { id: 'zoom', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixel-art scale-[1.4]"><circle cx="7" cy="7" r="5" stroke="black" strokeWidth="1" /><path d="M11 11L14 14" stroke="black" strokeWidth="2" /></svg> },
    { id: 'pencil', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixel-art scale-[1.4]"><path d="M12 2L14 4L6 12L2 14L4 10L12 2Z" fill="#ccc" stroke="black" /><path d="M2 14L4 12" stroke="black" strokeWidth="2" /></svg> },
    { id: 'brush', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixel-art scale-[1.4]"><path d="M4 12C4 10 6 4 10 4C14 4 14 10 14 12" stroke="black" fill="none" /><rect x="8" y="8" width="4" height="6" fill="#8b4513" stroke="black" /></svg> },
    { id: 'spray', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixel-art scale-[1.4]"><rect x="6" y="2" width="4" height="4" fill="black" stroke="black" /><rect x="5" y="6" width="6" height="8" fill="#c0c0c0" stroke="black" /><circle cx="8" cy="8" r="0.5" fill="black" /><circle cx="6.5" cy="9.5" r="0.5" fill="black" /><circle cx="9.5" cy="9.5" r="0.5" fill="black" /></svg> },
    { id: 'text', icon: <span className="text-base font-serif font-black">A</span> },
    { id: 'line', icon: <div className="w-[12px] h-[1px] bg-black rotate-[-45deg]"></div> },
    { id: 'curve', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixel-art scale-[1.4]"><path d="M2 12C2 12 4 4 8 8C12 12 14 4 14 4" stroke="black" strokeWidth="1" fill="none" /></svg> },
    { id: 'rect', icon: <div className="w-3 h-3 border border-black"></div> },
    { id: 'poly', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="pixel-art scale-[1.4]"><path d="M3 8L8 3L13 6L11 13L5 12L3 8Z" stroke="black" strokeWidth="1" fill="none" /></svg> },
    { id: 'circle', icon: <div className="w-3 h-3 border border-black rounded-full"></div> },
    { id: 'round-rect', icon: <div className="w-3 h-3 border border-black rounded-[2px]"></div> },
  ];

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();

    // If we've undone something, slice off the future
    const newHistory = historyRef.current.slice(0, historyIndex + 1);
    newHistory.push(dataUrl);

    // Limit history to 20 steps
    if (newHistory.length > 20) newHistory.shift();

    historyRef.current = newHistory;
    setHistoryIndex(newHistory.length - 1);
  }, [historyIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      // Initialize white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Save initial state
      saveToHistory();
    }
  }, []); // Only on mount

  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = historyRef.current[newIndex];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setHistoryIndex(newIndex);
    };
  }, [historyIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo]);

  const getPixelColor = (data: Uint8ClampedArray, x: number, y: number, width: number) => {
    const i = (y * width + x) * 4;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  };

  const setPixelColor = (data: Uint8ClampedArray, x: number, y: number, width: number, colorArr: number[]) => {
    const i = (y * width + x) * 4;
    data[i] = colorArr[0];
    data[i + 1] = colorArr[1];
    data[i + 2] = colorArr[2];
    data[i + 3] = colorArr[3];
  };

  const colorsMatch = (c1: number[], c2: number[]) => {
    return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2] && c1[3] === c2[3];
  };

  const hexToRGBA = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b, 255];
  };

  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const targetColor = getPixelColor(data, startX, startY, canvas.width);
    const fillRGBA = hexToRGBA(fillColor);

    if (colorsMatch(targetColor, fillRGBA)) return;

    const stack: [number, number][] = [[startX, startY]];
    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

      const currentColor = getPixelColor(data, x, y, canvas.width);
      if (colorsMatch(currentColor, targetColor)) {
        setPixelColor(data, x, y, canvas.width, fillRGBA);
        stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const spray = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = color;
    const radius = 10;
    const density = 20;

    for (let i = 0; i < density; i++) {
      const offset = Math.random() * radius;
      const angle = Math.random() * Math.PI * 2;
      const px = x + offset * Math.cos(angle);
      const py = y + offset * Math.sin(angle);
      ctx.fillRect(px, py, 1, 1);
    }
  };

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: Math.floor(clientX - rect.left),
      y: Math.floor(clientY - rect.top)
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      if (e.cancelable) e.preventDefault();
    }

    setIsDrawing(true);
    const pos = getPointerPos(e);
    startPosRef.current = pos;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save current state for preview
    previewDataRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (tool === 'fill') {
      floodFill(pos.x, pos.y, color);
      saveToHistory();
      setIsDrawing(false);
      return;
    }

    if (tool === 'spray') {
      spray(pos.x, pos.y);
      return;
    }

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = tool === 'eraser' ? 'white' : color;
    ctx.lineWidth = tool === 'brush' ? 12 : tool === 'eraser' ? 24 : 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPointerPos(e);
    setCoords(pos);

    if (!isDrawing) return;

    if ('touches' in e) {
      if (e.cancelable) e.preventDefault();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'spray') {
      spray(pos.x, pos.y);
      return;
    }

    if (tool === 'fill') return;

    // Handle Shapes with Preview
    if (['line', 'rect', 'circle', 'round-rect'].includes(tool)) {
      if (previewDataRef.current) {
        ctx.putImageData(previewDataRef.current, 0, 0);
      }

      const startX = startPosRef.current.x;
      const startY = startPosRef.current.y;
      const width = pos.x - startX;
      const height = pos.y - startY;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      if (tool === 'line') {
        ctx.moveTo(startX, startY);
        ctx.lineTo(pos.x, pos.y);
      } else if (tool === 'rect') {
        ctx.strokeRect(startX, startY, width, height);
      } else if (tool === 'circle') {
        const radius = Math.sqrt(width * width + height * height);
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
      } else if (tool === 'round-rect') {
        const r = 8;
        ctx.beginPath();
        ctx.roundRect(startX, startY, width, height, r);
        ctx.stroke();
        return;
      }
      ctx.stroke();
      return;
    }

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  }, [saveToHistory]);

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
      previewDataRef.current = null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] p-1 font-sans text-xs overflow-hidden">
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-0.5 border-b border-gray-400 shrink-0">
        <button className="hover:bg-blue-800 hover:text-white px-2"><u>F</u>ile</button>
        <div className="relative group">
          <button className="hover:bg-blue-800 hover:text-white px-2"><u>E</u>dit</button>
          <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-md z-[300] min-w-[120px]">
            <button onClick={undo} className="px-4 py-1 text-left hover:bg-blue-800 hover:text-white flex justify-between gap-4">
              <span>Undo</span>
              <span className="opacity-50 text-[10px]">Ctrl+Z</span>
            </button>
            <button onClick={clearCanvas} className="px-4 py-1 text-left hover:bg-blue-800 hover:text-white">
              Clear Canvas
            </button>
          </div>
        </div>
        <button className="hover:bg-blue-800 hover:text-white px-2"><u>V</u>iew</button>
        <button className="hover:bg-blue-800 hover:text-white px-2"><u>I</u>mage</button>
        <button className="hover:bg-blue-800 hover:text-white px-2"><u>O</u>ptions</button>
        <button className="hover:bg-blue-800 hover:text-white px-2"><u>H</u>elp</button>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex gap-1 items-stretch min-h-0 mt-1">
        <div className="flex flex-col gap-1 p-1 bg-[#c0c0c0] w-[56px] shrink-0 border-r border-gray-400">
          <div className="grid grid-cols-2 gap-[1px]">
            {tools.map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={clsx(
                  "w-[25px] h-[25px] flex items-center justify-center overflow-hidden",
                  tool === t.id ? "retro-button pressed active shadow-[inset_1px_1px_#808080]" : "retro-button"
                )}
              >
                {t.icon}
              </button>
            ))}
          </div>
          <div className="mt-1 flex-1 w-full bg-[#c0c0c0] border-t border-l border-gray-800 p-2" style={{ boxShadow: '1px 1px 0 white' }}>
            <div className="w-full h-full border border-gray-600 border-dashed opacity-40 flex flex-col items-center justify-center gap-2">
              <div className={clsx("w-8 h-[2px] bg-black", (tool === 'pencil' || tool === 'line') && "ring-1 ring-blue-500")} />
              <div className={clsx("w-8 h-[5px] bg-black", tool === 'brush' && "ring-1 ring-blue-500")} />
              <div className={clsx("w-8 h-[8px] bg-black", tool === 'eraser' && "ring-1 ring-blue-500")} />
            </div>
          </div>
        </div>

        <div className="flex-1 h-full bg-[#808080] p-1 overflow-hidden relative border-t-2 border-l-2 border-gray-600 shadow-[inset_-2px_-2px_0_white]">
          <div className="w-full h-full bg-white relative overflow-auto custom-scrollbar touch-none">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="cursor-crosshair block bg-white shrink-0 shadow-sm"
              style={{ minWidth: '100%', minHeight: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="flex gap-2 p-1 bg-[#c0c0c0] border-t border-gray-400 items-start shrink-0">
        <div className="relative w-8 h-8 shrink-0 border-t border-l border-gray-800 shadow-[1px_1px_0_white]">
          <div className="absolute top-0.5 left-0.5 w-[22px] h-[22px] bg-white border border-gray-400"></div>
          <div className="absolute bottom-1 right-1 w-[18px] h-[18px] border border-black" style={{ backgroundColor: color }}></div>
        </div>

        <div className="flex-1 grid grid-cols-[repeat(14,minmax(0,1fr))] grid-rows-2 gap-[1px] bg-gray-500 p-[1px] border-t border-l border-gray-800 border-r border-b border-white max-w-[224px]">
          {colors.map((c, i) => (
            <button
              key={i}
              onClick={() => setColor(c)}
              className="w-[15px] h-[15px] border border-white shadow-[1px_1px_0_black]"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="retro-statusbar mt-1 flex gap-1 h-5 shrink-0 overflow-hidden text-[10px]">
        <div className="flex-1 retro-sunken px-2 flex items-center">
          {isDrawing ? "Drawing..." : "For Help, click Help Topics on the Help Menu."}
        </div>
        <div className="w-24 retro-sunken px-2 flex items-center justify-center">
          <span className="font-bold flex items-center gap-1">
            <Palette size={10} /> {tool.toUpperCase()}
          </span>
        </div>
        <div className="w-28 retro-sunken px-2 flex items-center justify-start font-mono">
          <span className="opacity-50 mr-1">XY:</span> {coords.x}, {coords.y}
        </div>
      </div>
    </div>
  );
}
