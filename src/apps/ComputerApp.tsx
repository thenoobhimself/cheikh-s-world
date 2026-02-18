import { useState, useEffect } from 'react';
import { HardDrive, Cpu, Monitor, Zap, Settings, Disc, Server } from 'lucide-react';
import { clsx } from '../utils/retro-utils';

export default function ComputerApp() {
  const [activeTab, setActiveTab] = useState('general');
  const [cpuUsage, setCpuUsage] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const change = Math.random() * 20 - 10;
        return Math.min(100, Math.max(5, prev + change));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-[var(--window-chrome-face)] p-2 font-sans select-none flex flex-col items-center justify-center text-xs">
      <div className="retro-window w-full max-w-sm p-1 shadow-xl">
        <div className="retro-titlebar flex justify-between px-1 mb-1">
          <span className="flex items-center gap-1"><Settings size={12} /> System Properties</span>
          <button className="retro-button w-4 h-4 p-0 flex items-center justify-center text-[10px]">x</button>
        </div>

        <div className="p-2 pt-0 flex flex-col">
          <div className="flex pl-1 relative top-[1px]">
            {['General', 'Device Manager', 'Performance'].map(tab => (
              <button
                key={tab}
                className={clsx(
                  "px-3 py-1 text-xs rounded-t border-t border-l border-r border-white shadow-[-1px_0_0_gray] mr-0.5",
                  activeTab === tab.toLowerCase().replace(' ', '')
                    ? "bg-[var(--window-chrome-face)] relative z-10 -mb-[2px] pb-1.5 font-bold"
                    : "bg-gray-200 mt-0.5 text-gray-600 hover:bg-gray-100"
                )}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="retro-raised p-4 bg-[var(--window-chrome-face)] min-h-[320px] relative z-0 border-t-white">
            {activeTab === 'general' && (
              <div className="flex flex-col gap-6 pt-2 animate-fade-in">
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <Monitor size={48} className="text-blue-800 drop-shadow-md" />
                    <div className="w-16 h-1 bg-black/20 rounded-full"></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-bold mb-1">System:</h3>
                      <p className="ml-4">Cheikh OS</p>
                      <p className="ml-4">Professional Edition</p>
                      <p className="ml-4">Version 2026.1</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Registered to:</h3>
                      <p className="ml-4">User</p>
                      <p className="ml-4">Cheikh's World</p>
                      <p className="ml-4 text-[10px] text-gray-500">12345-OEM-0000001-00000</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Computer:</h3>
                      <p className="ml-4 flex items-center gap-1"><Cpu size={10} /> Creative Core Processor</p>
                      <p className="ml-4 flex items-center gap-1"><Server size={10} /> 64.0 MB RAM</p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-400 flex justify-center">
                  <button className="retro-button px-4 py-1">Support Information...</button>
                </div>
              </div>
            )}

            {activeTab === 'devicemanager' && (
              <div className="flex flex-col gap-2 h-full animate-fade-in">
                <div className="retro-groupbox p-2 flex-1 retro-sunken bg-white overflow-auto">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 font-bold"><Monitor size={12} /> Computer</div>
                    <div className="pl-4 flex flex-col gap-1">
                      <div className="flex items-center gap-1"><HardDrive size={12} /> Disk drives</div>
                      <div className="flex items-center gap-1"><Monitor size={12} /> Display adapters</div>
                      <div className="flex items-center gap-1"><Disc size={12} /> CD-ROM controllers</div>
                      <div className="flex items-center gap-1"><Server size={12} /> System devices</div>
                    </div>
                  </div>
                </div>
                <button className="retro-button px-4 py-1 self-end">Properties</button>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6 pt-2 animate-fade-in">
                <fieldset className="border border-gray-400 p-2 rounded-sm space-y-4">
                  <legend className="px-1 ml-1 text-gray-600">Performance Status</legend>
                  <div className="flex gap-2 items-center">
                    <span className="w-24">Memory:</span>
                    <div className="flex-1 retro-sunken bg-black h-4 relative p-[1px]">
                      <div className="h-full bg-green-500 w-[64%] shadow-[0_0_5px_rgba(0,255,0,0.5)]"></div>
                    </div>
                    <span className="w-8 text-right">64%</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="w-24">System Resources:</span>
                    <div className="flex-1 retro-sunken bg-black h-4 relative p-[1px]">
                      <div className="h-full bg-green-500 transition-all duration-300 shadow-[0_0_5px_rgba(0,255,0,0.5)]" style={{ width: `${cpuUsage}%` }}></div>
                    </div>
                    <span className="w-8 text-right">{Math.round(cpuUsage)}%</span>
                  </div>
                </fieldset>

                <fieldset className="border border-gray-400 p-2 rounded-sm space-y-2">
                  <legend className="px-1 ml-1 text-gray-600">Advanced Settings</legend>
                  <div className="flex justify-between items-center">
                    <span>File System:</span>
                    <span className="font-bold">32-bit</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Virtual Memory:</span>
                    <span className="font-bold">Enabled</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Disk Compression:</span>
                    <span className="font-bold">Not Installed</span>
                  </div>
                </fieldset>

                <button className="retro-button w-full py-1 font-bold">Virtual Memory...</button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button className="retro-button px-6 py-1 min-w-[70px]">OK</button>
            <button className="retro-button px-6 py-1 min-w-[70px]">Cancel</button>
            <button className="retro-button px-6 py-1 min-w-[70px]">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
