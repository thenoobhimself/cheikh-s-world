import { useState } from 'react';
import { Globe, Folder, Image as ImageIcon } from 'lucide-react';
import { clsx } from '../utils/retro-utils';
import ProjectsApp from './ProjectsApp';
import CreationsApp from './CreationsApp';

export default function UniverseApp() {
  const [activeTab, setActiveTab] = useState<'universe' | 'projects' | 'creations'>('universe');

  return (
    <div className="h-full flex flex-col bg-[var(--window-chrome-face)] font-sans select-none text-sm">
      {/* Top Navigation / Toolbar */}
      <div className="p-1 border-b border-[var(--window-chrome-shadow)] flex items-center justify-between mb-1">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('universe')}
            className={clsx(
              "px-3 py-1 flex items-center gap-2 border text-xs transition-all",
              activeTab === 'universe'
                ? "retro-sunken bg-white font-bold"
                : "retro-button"
            )}
          >
            <Globe size={14} /> Universe
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={clsx(
              "px-3 py-1 flex items-center gap-2 border text-xs transition-all",
              activeTab === 'projects'
                ? "retro-sunken bg-white font-bold"
                : "retro-button"
            )}
          >
            <Folder size={14} /> Projects
          </button>
          <button
            onClick={() => setActiveTab('creations')}
            className={clsx(
              "px-3 py-1 flex items-center gap-2 border text-xs transition-all",
              activeTab === 'creations'
                ? "retro-sunken bg-white font-bold"
                : "retro-button"
            )}
          >
            <ImageIcon size={14} /> Creations
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative p-1">
        {activeTab === 'universe' && (
          <div className="h-full relative overflow-y-auto overflow-x-hidden bg-[#000008] flex flex-col items-center justify-start p-4 md:p-8 retro-scrollbar">
            {/* Animated Starfield Background (Fixed) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40">
              <div className="absolute top-0 left-0 w-full h-full animate-[star-drift_60s_linear_infinite] opacity-50">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-white rounded-full"
                    style={{
                      width: Math.random() * 2 + 'px',
                      height: Math.random() * 2 + 'px',
                      top: Math.random() * 100 + '%',
                      left: Math.random() * 100 + '%',
                      boxShadow: Math.random() > 0.8 ? '0 0 4px #fff' : 'none'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Glowing Scanlines overlay (Fixed) */}
            <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-30"></div>

            {/* Hero Section */}
            <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 mt-8 md:mt-12 shrink-0 min-h-[500px]">
              {/* Left Side: Stats/Satellites */}
              <div className="flex flex-col gap-4 w-full md:w-48 order-2 md:order-1">
                <div className="retro-sunken bg-black/40 border-blue-900 p-2 text-[10px] font-mono text-blue-400">
                  <div className="text-blue-200 border-b border-blue-900 mb-1 pb-1 uppercase">Current_Sector</div>
                  <div className="flex justify-between items-center">
                    <span>SECTOR</span>
                    <span className="text-white">N2S-001</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>STATUS</span>
                    <span className="text-green-400">ACTIVE</span>
                  </div>
                </div>
                <div className="retro-sunken bg-black/40 border-blue-900 p-2 text-[10px] font-mono text-blue-400">
                  <div className="text-blue-200 border-b border-blue-900 mb-1 pb-1 uppercase">Vital_Signs</div>
                  <div className="w-full bg-blue-900/20 h-1.5 mt-1 border border-blue-900">
                    <div className="bg-blue-400 h-full w-[85%] animate-pulse"></div>
                  </div>
                  <div className="mt-1 flex justify-between">
                    <span>CPU_LOAD</span>
                    <span className="text-white">12%</span>
                  </div>
                </div>
              </div>

              {/* Center: Pilot Profile */}
              <div className="flex-1 flex flex-col items-center text-center order-1 md:order-2">
                <div className="relative mb-6">
                  <div className="absolute -inset-4 border-2 border-blue-900/30 rounded-full animate-[spin_10s_linear_infinite] border-dashed"></div>
                  <div className="w-40 h-40 md:w-56 md:h-56 relative bg-black border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] overflow-hidden">
                    <video
                      className="w-full h-full object-cover opacity-80"
                      src="/icons/universe_background.mp4"
                      autoPlay loop muted playsInline
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 bg-blue-600 text-[10px] font-black italic text-white tracking-widest uppercase">
                    PILOT_ID: 0X7A
                  </div>
                </div>

                <div className="space-y-4 max-w-lg">
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                    ADAM <span className="text-blue-500">cheikhrouhou</span>
                  </h1>
                  <p className="text-blue-200/70 text-sm md:text-base font-mono uppercase tracking-tight">
                    Interstellar Architect & Pixel Engineer
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 mt-8 pt-4">
                    <button onClick={() => setActiveTab('projects')} className="bg-blue-600 hover:bg-blue-500 border-2 border-blue-400 text-white px-6 py-2 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all active:translate-y-0.5 shadow-[0_4px_0_#1e40af] active:shadow-none">
                      <Folder size={14} /> INITIALIZE_WORK
                    </button>
                    <button onClick={() => setActiveTab('creations')} className="bg-transparent hover:bg-white/5 border-2 border-gray-700 text-gray-400 hover:text-white px-6 py-2 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all">
                      <ImageIcon size={14} /> ACCESS_GALLERY
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Log Feed */}
              <div className="flex flex-col gap-4 w-full md:w-48 order-3">
                <div className="retro-sunken bg-black/40 border-blue-900 p-2 text-[10px] font-mono text-blue-400 h-32 md:h-64 overflow-hidden relative">
                  <div className="text-blue-200 border-b border-blue-900 mb-2 pb-1">SYSTEM_LOGS</div>
                  <div className="space-y-1 opacity-60">
                    <div className="flex gap-2"><span>[00:12]</span> <span>BOOT</span></div>
                    <div className="flex gap-2"><span>[00:14]</span> <span className="text-green-500">CORE_UP</span></div>
                    <div className="flex gap-2"><span>[00:18]</span> <span>SCANNING</span></div>
                    <div className="flex gap-2"><span>[00:25]</span> <span className="text-yellow-500">INIT</span></div>
                    <div className="flex gap-2"><span>[00:35]</span> <span className="text-blue-300 animate-pulse">READY &gt;</span></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Footer Transmission */}
            <div className="relative z-10 py-12 text-center">
              <div className="text-[10px] font-mono text-gray-600 tracking-[1em] uppercase">End_Of_Transmission</div>
              <div className="mt-4 flex justify-center gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-blue-900 rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Background Grid Accent (Fixed) */}
            <div className="fixed inset-0 z-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="h-full bg-[var(--window-chrome-face)] retro-sunken p-0 border-0">
            <ProjectsApp />
          </div>
        )}

        {activeTab === 'creations' && (
          <div className="h-full bg-[var(--window-chrome-face)] retro-sunken p-0 border-0">
            <CreationsApp />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="retro-statusbar flex justify-between px-2">
        <span>Ready</span>
        <span className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          Online
        </span>
      </div>
    </div>
  );
}
