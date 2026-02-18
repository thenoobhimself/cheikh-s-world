import { useState } from 'react';
import { Search, Filter, Trash2, FileText, Info } from 'lucide-react';

export default function GraveyardApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const ideas = [
    {
      title: 'Insta for Plants',
      cause: 'Zero User Interest',
      epitaph: 'Turned out plants prefer silence',
      date: '2023-11-20',
      category: 'Mobile App',
      size: '1.2 MB'
    },
    {
      title: 'App that rates your life decisions',
      cause: 'Hardware Failure',
      epitaph: 'Got lost in translation during development',
      date: '2022-09-01',
      category: 'Hardware',
      size: '2.5 MB'
    },
    {
      title: 'Tinder for Developers (ingenieurs a paris)',
      cause: 'Target Market Too Niche',
      epitaph: 'Everyone was too busy debugging to date',
      date: '2022-03-14',
      category: 'Mobile App',
      size: '890 KB'
    },
  ];

  const categories = ['All', ...Array.from(new Set(ideas.map(i => i.category)))];

  const filteredIdeas = ideas.filter(idea =>
    (filter === 'All' || idea.category === filter) &&
    idea.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] font-sans select-none text-xs cursor-default">
      {/* Title Bar / Menu Bar */}
      <div className="flex justify-between items-center bg-[#c0c0c0] text-black border-b border-gray-400 p-1">
        <div className="flex gap-1">
          <button className="px-2 py-0.5 retro-button">File</button>
          <button className="px-2 py-0.5 retro-button">Edit</button>
          <button className="px-2 py-0.5 retro-button">View</button>
          <button className="px-2 py-0.5 retro-button">Help</button>
        </div>
      </div>

      {/* Toolbar / Search Area */}
      <div className="p-2 border-b border-white flex gap-2 items-center">
        <div className="flex items-center gap-2 retro-sunken bg-white px-2 py-1 flex-1">
          <Search size={14} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search Recycle Bin..."
            className="w-full text-sm outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="retro-button px-2 py-1 flex items-center gap-2">
          <Filter size={14} />
          <select
            className="bg-transparent outline-none cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {/* Main Content - Explorer View */}
      <div className="flex-1 bg-white retro-sunken m-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#e0e0e0] sticky top-0 shadow-sm">
              <th className="p-2 border-r border-gray-400 font-normal w-1/2">
                <div className="flex items-center justify-between">
                  <span>Recycled ideas</span>
                  <div className="w-1 h-full bg-gray-400"></div>
                </div>
              </th>
              <th className="p-2 border-r border-gray-400 font-normal">Original Location</th>
              <th className="p-2 border-r border-gray-400 font-normal">Date Deleted</th>
              <th className="p-2 font-normal">Size</th>
            </tr>
          </thead>
          <tbody>
            {filteredIdeas.map((idea, i) => (
              <tr
                key={i}
                className="hover:bg-blue-800 hover:text-white group cursor-pointer"
                onClick={() => { }}
              >
                <td className="p-1 px-2 flex items-center gap-2">
                  <div className="relative">
                    <FileText size={16} className="text-gray-500 group-hover:text-blue-200" />
                    <div className="absolute -bottom-1 -right-1 bg-white border border-gray-400 p-[1px] group-hover:bg-blue-800">
                      <Trash2 size={8} className="text-red-600 group-hover:text-red-400" />
                    </div>
                  </div>
                  <span className="truncate">{idea.title}</span>
                </td>
                <td className="p-1 px-2 border-l border-transparent truncate text-gray-600 group-hover:text-blue-100">
                  C:\Projects\{idea.category}
                </td>
                <td className="p-1 px-2 border-l border-transparent text-gray-600 group-hover:text-blue-100 italic">
                  {idea.date}
                </td>
                <td className="p-1 px-2 border-l border-transparent text-gray-600 group-hover:text-blue-100 font-mono">
                  {idea.size || '12 KB'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredIdeas.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400 italic">
            <Trash2 size={48} className="mb-2 opacity-20" />
            <span>Recycle Bin is empty</span>
          </div>
        )}
      </div>

      {/* Details Area (Win95 Style) */}
      <div className="p-2 border-t border-gray-400 flex items-start gap-4">
        <div className="w-24 h-24 retro-sunken bg-white flex flex-col items-center justify-center p-2 text-center overflow-hidden">
          <svg width="48" height="48" viewBox="0 0 32 32" className="mb-2">
            <path d="M6 8h20v20c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8z" fill="#D4D4D4" stroke="black" strokeWidth="1.5" />
            <path d="M4 6h24v2H4V6z" fill="#A0A0A0" stroke="black" strokeWidth="1.5" />
            <path d="M11 4h10v2H11V4z" fill="#A0A0A0" stroke="black" strokeWidth="1.5" />
            {filteredIdeas.length > 0 && (
              <g transform="translate(8, 12)">
                <rect width="16" height="12" fill="#FFFFFF" stroke="black" strokeWidth="1" />
                <line x1="2" y1="4" x2="14" y2="4" stroke="gray" />
                <line x1="2" y1="8" x2="12" y2="8" stroke="gray" />
              </g>
            )}
          </svg>
          <span className="text-[10px] font-bold leading-tight uppercase">Corbeille</span>
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-sm font-bold border-b border-white pb-1">Recycle Bin Details</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
            <span className="text-gray-600">Items:</span>
            <span className="font-bold">{filteredIdeas.length}</span>
            <span className="text-gray-600">Total size:</span>
            <span className="font-bold">~5.4 MB</span>
            <span className="text-gray-600">Status:</span>
            <span className="font-bold text-blue-800">{filteredIdeas.length > 0 ? 'Full' : 'Empty'}</span>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              className="px-4 py-1 retro-button font-bold"
              onClick={() => { }}
            >
              Empty Bin
            </button>
            <button className="px-4 py-1 retro-button">Properties</button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="retro-statusbar flex justify-between px-2 bg-[#c0c0c0] border-t border-white">
        <span className="flex items-center gap-1"><Info size={10} /> {filteredIdeas.length} object(s) in Recycle Bin.</span>
        <span className="retro-sunken px-2 w-24 text-right">0 KB selected</span>
      </div>
    </div>
  );
}
