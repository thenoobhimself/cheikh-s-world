import { MapPin, Phone, Mail, Music, Code, Gamepad, Instagram } from 'lucide-react';

export default function ProfileApp() {
    return (
        <div className="h-full bg-[#f0f0f0] font-mono text-[#003366] p-4 overflow-auto select-none relative">
            {/* Main Container border/shadow effect */}
            <div className="border-4 border-[#003366] h-full relative shadow-[8px_8px_0_rgba(0,0,0,0.2)] bg-white flex flex-col">

                {/* Header */}
                <div className="border-b-4 border-[#003366] p-2 flex items-center justify-between bg-white relative">
                    <div className="flex gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#ff4d4d] border-2 border-[#003366]"></div>
                        <div className="w-4 h-4 rounded-full bg-[#ffcc00] border-2 border-[#003366]"></div>
                        <div className="w-4 h-4 rounded-full bg-[#33cc33] border-2 border-[#003366]"></div>
                    </div>
                    <h1 className="text-2xl font-black tracking-widest uppercase">MY RESUME</h1>
                    <div className="w-16"></div> {/* Spacer for balance */}
                </div>

                {/* Content Grid - Now vertically stacked on all devices */}
                <div className="flex-1 flex flex-col gap-6 p-4 md:p-6 overflow-auto">

                    {/* Section - About Me (Always first) */}
                    <div className="flex flex-col relative w-full order-1">

                        {/* About Me Card */}
                        <div className="bg-[#3b82f6] border-4 border-[#003366] rounded-2xl p-4 md:p-6 text-white shadow-[6px_6px_0_#003366] mb-6 md:mb-8 relative z-10 transform -rotate-1">
                            {/* Traffic Lights */}
                            <div className="flex gap-2 mb-4 md:mb-0 md:absolute md:top-4 md:left-4">
                                <div className="w-3 h-3 rounded-full bg-[#ff4d4d] border border-black"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffcc00] border border-black"></div>
                                <div className="w-3 h-3 rounded-full bg-[#33cc33] border border-black"></div>
                            </div>

                            <div className="text-center font-black text-lg md:text-xl mb-4 bg-white text-[#003366] inline-block px-4 py-1 mx-auto border-2 border-[#003366] transform -skew-x-12 w-fit block">
                                WWW.ABOUT.ME
                            </div>

                            <div className="flex flex-col gap-4 items-center text-center md:flex-row md:items-start md:text-left">
                                {/* Profile Picture - First on mobile */}
                                <div className="w-20 h-26 md:w-32 md:h-32 bg-white border-4 border-[#003366] rounded-full overflow-hidden flex-shrink-0 relative order-1 md:order-2">
                                    <img
                                        src="/icons/avataar.jpg"
                                        alt="Cheikh"
                                        className="w-full h-full object-cover"
                                        style={{ objectPosition: '00% center' }}
                                    />
                                </div>

                                <div className="flex-1 order-2 md:order-1">
                                    <h2 className="text-2xl md:text-3xl font-black uppercase leading-none mb-3">CHEIKH<br />WORLD</h2>
                                    <div className="space-y-2 text-xs font-bold flex flex-col items-center md:items-start">
                                        <div className="flex items-center gap-2"><Phone size={12} /> (555)-012-3456</div>
                                        <div className="flex items-center gap-2"><Mail size={12} /> cheikh@world.dev</div>
                                        <div className="flex items-center gap-2"><MapPin size={12} /> Creative Universe</div>
                                    </div>

                                    <p className="mt-4 text-xs md:text-sm leading-relaxed font-semibold">
                                        Creative Developer and Designer with a passion for building immersive digital experiences.
                                        Specializing in retro aesthetics, interactive UI, and storytelling through code.
                                        Building the future by honoring the past.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio Links Section */}
                        <div className="flex-1 flex flex-col justify-end">
                            <div className="flex flex-col items-center md:flex-row md:items-end md:justify-end gap-4 md:gap-6 pb-4 md:pb-6 md:pr-6">
                                {/* Text */}
                                <div className="text-center md:text-right md:mb-4">
                                    <h3 className="font-black text-xl md:text-2xl leading-none tracking-tighter text-[#003366]">
                                        PORTFOLIO<br />HERE
                                    </h3>
                                </div>

                                {/* Pill Stack */}
                                <div className="flex flex-col items-center md:items-end gap-2 md:gap-3 w-full md:w-auto">
                                    <div className="bg-white border-4 border-[#003366] px-4 md:px-6 py-2 rounded-full font-black text-xs md:text-sm shadow-[4px_4px_0_#003366] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#003366] transition-all cursor-pointer w-full md:w-auto text-center">
                                        GRAPHIC DESIGN
                                    </div>
                                    <div className="bg-white border-4 border-[#003366] px-4 md:px-6 py-2 rounded-full font-black text-xs md:text-sm shadow-[4px_4px_0_#003366] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#003366] transition-all cursor-pointer w-full md:w-auto text-center">
                                        BRANDING
                                    </div>
                                    <div className="bg-white border-4 border-[#003366] px-4 md:px-6 py-2 rounded-full font-black text-xs md:text-sm shadow-[4px_4px_0_#003366] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#003366] transition-all cursor-pointer w-full md:w-auto text-center">
                                        DEVELOPMENT
                                    </div>
                                    <div className="bg-white border-4 border-[#003366] px-4 md:px-6 py-2 rounded-full font-black text-xs md:text-sm shadow-[4px_4px_0_#003366] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#003366] transition-all cursor-pointer w-full md:w-auto text-center">
                                        Full Stack
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Section - Personal Info (Always second) */}
                    <div className="space-y-6 md:space-y-8 flex flex-col order-2">
                        {/* Socials */}
                        <div className="space-y-2 text-sm font-bold">
                            <div className="flex items-center gap-2">
                                <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white p-1 rounded border-2 border-[#003366]">
                                    <Instagram size={16} />
                                </div>
                                <span>@cheikh_world</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-black text-white p-1 rounded border-2 border-[#003366]">
                                    <span className="font-bold text-xs px-[2px]">Be</span>
                                </div>
                                <span>cheikh-dev</span>
                            </div>
                        </div>

                        {/* Languages */}
                        <div>
                            <h2 className="text-lg md:text-xl font-black uppercase mb-2 border-b-2 border-[#003366] inline-block">LANGUAGES</h2>
                            <div className="space-y-2 font-bold text-sm md:text-base">
                                <div className="flex justify-between items-center">
                                    <span>French</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-3 h-3 bg-[#003366]"></div>)}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>English</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-3 h-3 ${i > 4 ? 'border-2 border-[#003366]' : 'bg-[#003366]'}`}></div>)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Likings */}
                        <div>
                            <h2 className="text-lg md:text-xl font-black uppercase mb-2 border-b-2 border-[#003366] inline-block">Likings</h2>
                            <ul className="space-y-1 font-bold text-base md:text-lg">
                                <li className="flex items-center gap-2">- Music <Music size={18} /></li>
                                <li className="flex items-center gap-2">- Coding <Code size={18} /></li>
                                <li className="flex items-center gap-2">- Gaming <Gamepad size={18} /></li>
                            </ul>
                        </div>

                        {/* Education */}
                        <div>
                            <h2 className="text-lg md:text-xl font-black uppercase mb-4 border-b-2 border-[#003366] inline-block">EDUCATION</h2>
                            <div className="relative border-l-4 border-[#003366] ml-2 pl-4 md:pl-6 space-y-4 md:space-y-6 py-2">
                                <div className="relative">
                                    <div className="absolute -left-[26px] md:-left-[34px] w-3 h-3 md:w-4 md:h-4 bg-white border-4 border-[#003366] rounded-full"></div>
                                    <div className="font-bold text-xs md:text-sm">2026</div>
                                    <div className="font-black text-sm md:text-base">SELF TAUGHT</div>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[26px] md:-left-[34px] w-3 h-3 md:w-4 md:h-4 bg-white border-4 border-[#003366] rounded-full"></div>
                                    <div className="font-bold text-xs md:text-sm">2023</div>
                                    <div className="font-black text-sm md:text-base">UNIVERSITY</div>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[26px] md:-left-[34px] w-3 h-3 md:w-4 md:h-4 bg-white border-4 border-[#003366] rounded-full"></div>
                                    <div className="font-bold text-xs md:text-sm">2021</div>
                                    <div className="font-black text-sm md:text-base">HIGH SCHOOL</div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Visual */}
                        <div>
                            <h2 className="text-lg md:text-xl font-black uppercase mb-2 border-b-2 border-[#003366] inline-block">SKILLS</h2>
                            <div className="flex gap-2 flex-wrap">
                                {['Ai', 'Ae', 'Ps', 'Pr', 'Lr'].map(sw => (
                                    <div key={sw} className="w-8 h-8 bg-[#202020] text-white flex items-center justify-center font-bold text-xs border-2 border-[#003366] rounded">
                                        {sw}
                                    </div>
                                ))}
                                <div className="w-8 h-8 bg-[#007acc] text-white flex items-center justify-center font-bold text-xs border-2 border-[#003366] rounded">
                                    TS
                                </div>
                            </div>
                        </div>

                        {/* Worked As */}
                        <div>
                            <h2 className="text-lg md:text-xl font-black uppercase mb-2 border-b-2 border-[#003366] inline-block">WORKED AS</h2>
                            <div className="text-xs md:text-sm font-bold space-y-1">
                                <p>FREELANCE DESIGNER - 4+ YEARS</p>
                                <p>FULL STACK DEV - 3+ YEARS</p>
                                <p>VIDEO EDITOR - 2 YEARS</p>
                                <p>CREATIVE DIRECTOR - 1+ YEAR</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
