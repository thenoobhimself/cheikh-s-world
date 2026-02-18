import { useState, useEffect, useRef } from 'react';
import './BootScreen.css';

interface BootScreenProps {
    onEnter: () => void;
    onLogout: () => void;
}

const BOOT_LINES = [
    'CHEIKH OS v2.6 — BIOS INIT...',
    'RAM CHECK............... OK',
    'DISK CHECK.............. OK',
    'LOADING UNIVERSE KERNEL......',
    '',
    '> WELCOME TO CHEIKH\'S UNIVERSE',
    '',
];

export function BootScreen({ onEnter, onLogout }: BootScreenProps) {
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);
    const [exiting, setExiting] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Typewriter effect for boot lines
    useEffect(() => {
        let lineIndex = 0;
        const showNextLine = () => {
            if (lineIndex < BOOT_LINES.length) {
                setVisibleLines(prev => [...prev, BOOT_LINES[lineIndex]]);
                lineIndex++;
                const delay = BOOT_LINES[lineIndex - 1] === '' ? 100 : 350;
                setTimeout(showNextLine, delay);
            } else {
                setTimeout(() => setShowMenu(true), 400);
            }
        };
        const initial = setTimeout(showNextLine, 600);
        return () => clearTimeout(initial);
    }, []);

    // Blinking cursor
    useEffect(() => {
        const interval = setInterval(() => setCursorVisible(v => !v), 530);
        return () => clearInterval(interval);
    }, []);

    // Focus input when menu appears (Desktop only)
    useEffect(() => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (showMenu && !isTouch) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [showMenu]);

    const handleChoice = (choice: number) => {
        if (selectedOption !== null) return;
        setSelectedOption(choice);
        setInputValue(String(choice));

        if (choice === 1) {
            setTimeout(() => {
                setExiting(true);
                setTimeout(onEnter, 900);
            }, 600);
        } else {
            // Logout — play reversed video
            setTimeout(() => {
                setExiting(true);
                setTimeout(onLogout, 900);
            }, 600);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const val = parseInt(inputValue.trim());
            if (val === 1 || val === 2) handleChoice(val);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^12]/g, '').slice(0, 1);
        setInputValue(val);
        if (val === '1' || val === '2') {
            handleChoice(parseInt(val));
        }
    };

    const handleContainerClick = () => {
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (!isTouch) {
            inputRef.current?.focus();
        }
    };

    return (
        <div className={`boot-screen${exiting ? ' boot-screen--exit' : ''}`} onClick={handleContainerClick}>
            <div className="boot-scanlines" />
            <div className="boot-vignette" />

            <div className="boot-terminal">
                {/* Boot log lines */}
                <div className="boot-log">
                    {visibleLines.map((line, i) => (
                        <div key={i} className="boot-line">
                            {line}
                        </div>
                    ))}
                </div>

                {/* Menu */}
                {showMenu && (
                    <div className={`boot-menu${showMenu ? ' boot-menu--visible' : ''}`}>
                        <div className="boot-menu-title">GAME MENU —</div>
                        <div className="boot-menu-divider" />
                        <div className="boot-menu-subtitle">. SELECT OPTION:</div>

                        <button
                            className={`boot-menu-option${selectedOption === 1 ? ' boot-menu-option--selected' : ''}`}
                            onClick={() => handleChoice(1)}
                        >
                            1. ENTER CHEIKH'S UNIVERSE
                        </button>

                        <button
                            className={`boot-menu-option${selectedOption === 2 ? ' boot-menu-option--selected' : ''}`}
                            onClick={() => handleChoice(2)}
                        >
                            2. LOGOUT
                        </button>

                        <div className="boot-input-row">
                            <span className="boot-input-label">ENTER CHOICE:</span>
                            <span className="boot-input-display">
                                {selectedOption !== null ? selectedOption : (inputValue || '')}
                                {selectedOption === null && <span className={`boot-cursor${cursorVisible ? ' boot-cursor--visible' : ''}`}>_</span>}
                            </span>
                            <input
                                ref={inputRef}
                                className="boot-hidden-input"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                maxLength={1}
                                inputMode="none"
                            />
                        </div>

                        {selectedOption === 1 && (
                            <div className="boot-confirm-msg">LOADING UNIVERSE... PLEASE WAIT</div>
                        )}
                        {selectedOption === 2 && (
                            <div className="boot-confirm-msg">LOGGING OUT... GOODBYE.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
