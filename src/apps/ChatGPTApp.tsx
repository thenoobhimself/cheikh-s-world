import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function ChatGPTApp() {
    const [popups, setPopups] = useState([{ id: 1, x: 0, y: 0 }]);

    const addPopup = () => {
        const nextId = popups.length + 1;
        // Cascade effect that wraps around to stay on screen
        const maxSteps = 8;
        const stepSize = 15;
        const currentStep = (popups.length % maxSteps);

        // Calculate offset to keep it relatively centered
        const offset = (currentStep * stepSize) - ((maxSteps * stepSize) / 2);

        setPopups([...popups, { id: nextId, x: offset, y: offset }]);
    };

    const closePopup = (id: number) => {
        if (popups.length === 1) {
            // If it's the last one, maybe reset or just keep one to keep the troll alive
            addPopup();
        }
        setPopups(popups.filter(p => p.id !== id));
    };

    return (
        <div className="h-full bg-[#3A6EA5] flex flex-col items-center justify-center p-4 font-sans select-none overflow-hidden relative">
            {/* Background Bliss approximation */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#245ED4] via-[#6193FF] to-[#245ED4] opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#4cc64c] to-transparent opacity-30 pointer-events-none"></div>

            <style>
                {`
                    @keyframes xp-marquee {
                        0% { left: -20%; }
                        100% { left: 100%; }
                    }
                    .xp-popup-shadow {
                        box-shadow: 8px 8px 20px rgba(0,0,0,0.4);
                    }
                `}
            </style>

            {/* Render all popups */}
            <div className="relative w-full h-full flex items-center justify-center">
                {popups.map((popup) => (
                    <div
                        key={popup.id}
                        className="absolute bg-[#ECE9D8] rounded-t-[8px] xp-popup-shadow overflow-hidden border-t border-x border-white z-10 w-full max-w-[320px]"
                        style={{
                            transform: `translate(${popup.x}px, ${popup.y}px)`,
                            zIndex: 100 + popup.id
                        }}
                    >
                        {/* XP Title Bar (Luna Theme) */}
                        <div className="bg-gradient-to-b from-[#0058e6] via-[#3a93ff] 10% via-[#288eff] 40% via-[#1173ff] 90% to-[#1173ff] px-2 py-1 flex items-center justify-between text-white h-[28px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <img src="/icons/chat.png" alt="chat" className="w-full h-full pixel-art" />
                                </div>
                                <span className="text-[11px] font-bold tracking-tight truncate max-w-[150px]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
                                    System Error - Popup #{popup.id}
                                </span>
                            </div>
                            <div className="flex gap-[3px] pr-[1px]">
                                <button
                                    onClick={() => closePopup(popup.id)}
                                    className="w-[21px] h-[21px] bg-gradient-to-b from-[#E71F00] to-[#BC1B00] border border-[rgba(0,0,0,0.3)] rounded-[3px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center text-white hover:brightness-110 active:brightness-90 transition-all"
                                >
                                    <X size={15} strokeWidth={4} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col items-center">
                            <div className="flex items-center gap-4 mb-4 w-full px-2">
                                <AlertTriangle size={32} className="text-[#F1A23A] shrink-0" />
                                <div className="text-[12px] text-black font-semibold leading-tight">
                                    {popup.id % 2 === 0
                                        ? "Unauthorized access to AI models detected."
                                        : "Are you sure you want to find ChatGPT?"}
                                </div>
                            </div>

                            <div className="flex gap-2 w-full justify-end pr-2">
                                <button
                                    onClick={addPopup}
                                    className="min-w-[75px] h-[23px] bg-gradient-to-b from-[#F2F2F2] via-[#E4E1D1] 40% via-[#D6D3BD] 50% to-[#C0BDB0] border border-[#7C7C7C] rounded-[3px] text-[11px] font-medium text-black shadow-[inset_0_1px_0_white] active:shadow-inner hover:border-[#F2A43B]"
                                >
                                    OK
                                </button>
                                <button
                                    onClick={addPopup}
                                    className="min-w-[75px] h-[23px] bg-gradient-to-b from-[#F2F2F2] via-[#E4E1D1] 40% via-[#D6D3BD] 50% to-[#C0BDB0] border border-[#7C7C7C] rounded-[3px] text-[11px] font-medium text-black shadow-[inset_0_1px_0_white] active:shadow-inner hover:border-[#F2A43B]"
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Taskbar Proxy */}
            <div className="absolute bottom-4 px-4 py-1 bg-black/20 rounded-full border border-white/10 backdrop-blur-sm z-0">
                <p className="text-[10px] text-white/80 font-mono tracking-tighter">
                    GPT-XP PROFESSIONAL • POPUP_LOOP_INSTALLED
                </p>
            </div>
        </div>
    );
}
