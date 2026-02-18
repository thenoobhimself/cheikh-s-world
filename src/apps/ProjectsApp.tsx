import { useState } from 'react';
import { Folder, FileCode, Play, Terminal, Database, Globe, ChevronRight, ChevronDown, Monitor, Cpu } from 'lucide-react';
import { clsx } from '../utils/retro-utils';

interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
  status: 'active' | 'completed' | 'archived';
  version: string;
}

const projects: Project[] = [
  {
    id: 'project-alpha',
    name: 'Project Alpha',
    type: 'Web Application',
    description: 'A revolutionary web application that transforms user experiences through innovative design patterns.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    status: 'completed',
    version: '1.0.4'
  },
  {
    id: 'project-beta',
    name: 'Project Beta',
    type: 'Portfolio',
    description: 'Creative portfolio platform with immersive 3D interactions and smooth animations.',
    tech: ['Three.js', 'WebGL', 'GSAP'],
    status: 'active',
    version: '0.9.2'
  },
  {
    id: 'project-gamma',
    name: 'Project Gamma',
    type: 'Dashboard',
    description: 'Enterprise dashboard with real-time analytics and beautiful data visualizations.',
    tech: ['Next.js', 'D3.js', 'PostgreSQL'],
    status: 'completed',
    version: '2.1.0'
  }
];

export default function ProjectsApp() {
  const [selectedId, setSelectedId] = useState<string | null>('project-alpha');
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSidebar, setShowSidebar] = useState(false);

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <div className="h-full flex flex-col bg-[var(--window-chrome-face)] font-sans text-sm">
      {/* Toolbar */}
      <div className="flex gap-1 p-1 border-b border-[var(--window-chrome-shadow)] overflow-x-auto whitespace-nowrap retro-scrollbar">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className={clsx(
            "retro-button text-xs flex md:hidden items-center gap-1 px-3",
            showSidebar && "pressed"
          )}
        >
          <Monitor size={14} /> View
        </button>
        <button className="retro-button text-xs flex items-center gap-1 px-3">
          <Folder size={14} /> File
        </button>
        <button className="retro-button text-xs flex items-center gap-1 px-3">
          <Play size={14} /> Run
        </button>
        <button className="retro-button text-xs flex items-center gap-1 px-3">
          <Terminal size={14} /> Terminal
        </button>
        <div className="flex-1 min-w-[10px]"></div>
        <button className="retro-button text-xs px-2">Help</button>
      </div>

      <div className="flex-1 flex overflow-hidden p-1">
        {/* Sidebar (Project Explorer) */}
        <div className={clsx(
          "flex-col gap-1 mr-1 transition-all duration-300",
          "md:flex md:w-1/3 md:min-w-[150px] md:max-w-[250px]",
          showSidebar ? "flex absolute inset-0 z-50 bg-[var(--window-chrome-face)] p-1 m-0 w-full max-w-none" : "hidden"
        )}>
          <div className="retro-raised px-1 py-0.5 text-xs font-bold bg-blue-800 text-white flex justify-between items-center">
            <span>Solution Explorer</span>
            {showSidebar && (
              <button onClick={() => setShowSidebar(false)} className="md:hidden retro-button p-0 px-1 border-white text-white">X</button>
            )}
          </div>
          <div className="flex-1 retro-sunken bg-white overflow-auto p-1">
            <div className="flex items-center gap-1 cursor-pointer hover:bg-blue-100" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              <Monitor size={14} className="text-blue-600" />
              <span className="font-bold">My_Projects</span>
            </div>

            {expanded && (
              <div className="pl-4 mt-1 flex flex-col gap-1">
                {projects.map(project => (
                  <div
                    key={project.id}
                    className={clsx(
                      "flex items-center gap-1 cursor-pointer px-1 border border-transparent",
                      selectedId === project.id ? "bg-blue-600 text-white border-dotted border-white" : "hover:bg-gray-100"
                    )}
                    onClick={() => {
                      setSelectedId(project.id);
                      if (window.innerWidth < 768) setShowSidebar(false);
                    }}
                  >
                    {selectedId === project.id ? <Folder size={14} className="text-yellow-300" /> : <Folder size={14} className="text-yellow-500 fill-yellow-500" />}
                    <span className="truncate">{project.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content (Editor/Details) */}
        <div className="flex-1 flex flex-col gap-1">
          {selectedProject ? (
            <>
              <div className="flex">
                {['overview', 'tech_stack', 'output'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      "px-3 py-1 text-xs border-t border-l border-r border-[var(--window-chrome-shadow)] mr-1 rounded-t-sm",
                      activeTab === tab ? "bg-white font-bold relative -mb-[1px] z-10" : "bg-[var(--window-chrome-face)] hover:bg-gray-200"
                    )}
                  >
                    {tab.replace('_', ' ').toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="flex-1 retro-sunken bg-white p-4 overflow-auto font-mono">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold border-b-2 border-black mb-2">{selectedProject.name}</h2>
                      <div className="flex gap-4 text-xs text-gray-500 mb-4">
                        <span>v{selectedProject.version}</span>
                        <span>Status: {selectedProject.status.toUpperCase()}</span>
                        <span>Type: {selectedProject.type}</span>
                      </div>
                      <p className="text-base leading-relaxed">{selectedProject.description}</p>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-2">
                      <button className="retro-button flex items-center gap-2 px-2 py-1 text-xs md:text-sm">
                        <Play size={14} className="text-green-600" />
                        Launch Application
                      </button>
                      <button className="retro-button flex items-center gap-2 px-2 py-1 text-xs md:text-sm">
                        <Globe size={14} className="text-blue-600" />
                        View Source
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'tech_stack' && (
                  <div className="space-y-4">
                    <h3 className="font-bold underline">System Requirements & Libraries</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedProject.tech.map(t => (
                        <li key={t} className="flex items-center gap-2">
                          <Cpu size={14} />
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-2 bg-yellow-100 border border-yellow-500 text-yellow-900 text-xs">
                      Warning: Some dependencies may be deprecated in future versions.
                    </div>
                  </div>
                )}

                {activeTab === 'output' && (
                  <div className="bg-black text-white p-2 h-full font-mono text-xs overflow-auto">
                    <p className="text-green-400">&gt; Initializing {selectedProject.id}...</p>
                    <p className="text-green-400">&gt; Loading assets...</p>
                    <p className="text-green-400">&gt; compiled successfully.</p>
                    <p className="text-gray-500">Ready.</p>
                    <p className="animate-pulse">_</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 retro-sunken bg-gray-100 flex items-center justify-center text-gray-500">
              Select a project from the Solution Explorer
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="retro-statusbar flex justify-between">
        <span>{selectedProject ? selectedProject.id : 'Ready'}</span>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
}
