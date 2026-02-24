import { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, ArrowDown, ArrowUp } from 'lucide-react';

type GameState = 'start' | 'playing' | 'gameover';

interface Obstacle {
    id: number;
    x: number;
    type: 'cactus' | 'bird';
    variant: number;
    height?: number;
}

interface Cloud {
    id: number;
    x: number;
    y: number;
}

export default function DinoRunnerApp() {
    const [gameState, setGameState] = useState<GameState>('start');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [dinoY, setDinoY] = useState(0);
    const [isDucking, setIsDucking] = useState(false);
    const [nightMode, setNightMode] = useState(false);
    const [obstacles, setObstacles] = useState<Obstacle[]>([]);
    const [clouds, setClouds] = useState<Cloud[]>([]);
    const [groundOffset, setGroundOffset] = useState(0);

    const requestRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const obstacleTimerRef = useRef<number>(0);
    const cloudTimerRef = useRef<number>(0);
    const velocityRef = useRef<number>(0);
    const scoreRawRef = useRef<number>(0);
    const speedRef = useRef<number>(7);
    const dinoYRef = useRef<number>(0);
    const gameStateRef = useRef<GameState>('start');
    const isDuckingRef = useRef<boolean>(false);

    // Constants
    const JUMP_FORCE = 12.5;
    const GRAVITY = 0.7;
    const GROUND_Y = 0;
    const INITIAL_SPEED = 7.5;
    const MAX_SPEED = 20;

    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    useEffect(() => {
        isDuckingRef.current = isDucking;
    }, [isDucking]);

    const soundHelper = (freq: number, type: OscillatorType, length: number) => {
        try {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + length);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + length);
        } catch (e) { /* ignore */ }
    };

    const jump = useCallback(() => {
        if (gameStateRef.current === 'playing' && dinoYRef.current === 0 && !isDuckingRef.current) {
            velocityRef.current = JUMP_FORCE;
            soundHelper(250, 'square', 0.1);
        } else if (gameStateRef.current !== 'playing') {
            startGame();
        }
    }, []);

    const handleDuck = useCallback((ducking: boolean) => {
        if (gameStateRef.current === 'playing') {
            setIsDucking(ducking);
            if (ducking && dinoYRef.current > 0) {
                velocityRef.current -= 6; // Fast fall
            }
        }
    }, []);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                jump();
            } else if (e.code === 'ArrowDown') {
                e.preventDefault();
                handleDuck(true);
            }
        };
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'ArrowDown') {
                handleDuck(false);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, [jump, handleDuck]);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        scoreRawRef.current = 0;
        speedRef.current = INITIAL_SPEED;
        dinoYRef.current = 0;
        setDinoY(0);
        velocityRef.current = 0;
        setObstacles([]);
        setClouds([]);
        setNightMode(false);
        obstacleTimerRef.current = 0;
        cloudTimerRef.current = 0;
        lastTimeRef.current = performance.now();
        soundHelper(400, 'square', 0.1);
    };

    const gameLoop = useCallback((time: number) => {
        if (gameStateRef.current !== 'playing') return;

        if (!lastTimeRef.current) lastTimeRef.current = time;
        const delta = time - lastTimeRef.current;
        lastTimeRef.current = time;

        scoreRawRef.current += 1;
        if (scoreRawRef.current % 400 === 0 && speedRef.current < MAX_SPEED) {
            speedRef.current += 0.4;
            soundHelper(700, 'square', 0.05);
        }
        const currentScore = Math.floor(scoreRawRef.current / 5);

        if (currentScore > 0 && currentScore % 800 === 0 && scoreRawRef.current % 5 === 0) {
            setNightMode(n => !n);
        }

        if (dinoYRef.current > 0 || velocityRef.current !== 0) {
            velocityRef.current -= GRAVITY;
            dinoYRef.current += velocityRef.current;
            if (dinoYRef.current <= GROUND_Y) {
                dinoYRef.current = GROUND_Y;
                velocityRef.current = 0;
            }
        }

        setGroundOffset(prev => (prev + speedRef.current) % 100);
        cloudTimerRef.current += delta;
        if (cloudTimerRef.current > 3000) {
            setClouds(prev => [...prev.map(c => ({ ...c, x: c.x - (speedRef.current * 0.2) })).filter(c => c.x > -100), { id: Date.now(), x: 700, y: 30 + Math.random() * 60 }]);
            cloudTimerRef.current = 0;
        } else {
            setClouds(prev => prev.map(c => ({ ...c, x: c.x - (speedRef.current * 0.2) })).filter(c => c.x > -100));
        }

        obstacleTimerRef.current += delta;
        // Tighter spawn thresholds for more frequency
        const spawnThreshold = Math.max(500, 1200 - (speedRef.current * 40));
        setObstacles(prev => {
            let next = prev.map(o => ({ ...o, x: o.x - speedRef.current })).filter(o => o.x > -100);

            if (obstacleTimerRef.current > spawnThreshold && Math.random() > 0.45) {
                const isBird = currentScore > 350 && Math.random() > 0.75;
                next.push({
                    id: Date.now(),
                    x: 700,
                    type: isBird ? 'bird' : 'cactus',
                    variant: Math.floor(Math.random() * 3),
                    height: isBird ? [25, 65, 90][Math.floor(Math.random() * 3)] : 0
                });
                obstacleTimerRef.current = 0;
            }

            const dH = isDuckingRef.current ? 22 : 44;
            const dW = isDuckingRef.current ? 48 : 34;
            const dB = { x: 50, y: dinoYRef.current, w: dW, h: dH };

            for (const o of next) {
                let oB = o.type === 'cactus'
                    ? { x: o.x + 8, y: 0, w: o.variant === 0 ? 15 : 30, h: 36 }
                    : { x: o.x + 8, y: o.height || 20, w: 28, h: 20 };

                if (dB.x < oB.x + oB.w && dB.x + dB.w > oB.x && dB.y < oB.y + oB.h && dB.y + dB.h > oB.y) {
                    setGameState('gameover');
                    soundHelper(150, 'square', 0.2);
                    setHighScore(h => Math.max(h, currentScore));
                    return next;
                }
            }
            return next;
        });

        setScore(currentScore);
        setDinoY(dinoYRef.current);
        requestRef.current = requestAnimationFrame(gameLoop);
    }, []);

    useEffect(() => {
        if (gameState === 'playing') {
            requestRef.current = requestAnimationFrame(gameLoop);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [gameState, gameLoop]);

    return (
        <div className={`h-full flex flex-col items-center justify-center font-mono select-none transition-colors duration-700 ${nightMode ? 'bg-[#202124]' : 'bg-white'}`}>
            <div className={`w-full max-w-2xl px-4 relative ${nightMode ? 'text-gray-200' : 'text-[#535353]'}`}>
                <div className="flex justify-end gap-5 text-sm font-bold opacity-60 mb-2">
                    <span>HI {highScore.toString().padStart(5, '0')}</span>
                    <span>{score.toString().padStart(5, '0')}</span>
                </div>

                <div className={`w-full h-48 relative border-b-2 overflow-hidden touch-none ${nightMode ? 'border-gray-700' : 'border-gray-200'}`}
                    onPointerDown={(e) => {
                        // Check if it's not the UI buttons
                        if (!(e.target as HTMLElement).closest('button')) {
                            jump();
                        }
                    }}
                >
                    {clouds.map(c => (
                        <div key={c.id} className="absolute opacity-20" style={{ left: c.x, top: c.y }}>
                            <div className={`w-14 h-5 rounded-full ${nightMode ? 'bg-gray-400' : 'bg-gray-300'}`} />
                        </div>
                    ))}

                    <div className="absolute inset-x-0 bottom-0 h-1 overflow-hidden pointer-events-none opacity-20">
                        <div
                            className="w-[200%] h-full"
                            style={{
                                transform: `translateX(-${groundOffset}%)`,
                                backgroundImage: `linear-gradient(90deg, ${nightMode ? '#fff' : '#000'} 50%, transparent 50%)`,
                                backgroundSize: '40px 1px'
                            }}
                        />
                    </div>

                    <div
                        className={`absolute left-[50px] ${nightMode ? 'bg-gray-300' : 'bg-[#535353]'}`}
                        style={{
                            bottom: dinoY,
                            width: isDucking ? 48 : 34,
                            height: isDucking ? 24 : 44,
                            borderRadius: '2px'
                        }}
                    >
                        <div className={`absolute top-2 right-2 w-1.5 h-1.5 ${nightMode ? 'bg-black' : 'bg-white'}`} />
                        {gameState === 'playing' && dinoY === 0 && (
                            <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-1">
                                <div className={`w-2 h-2 ${nightMode ? 'bg-gray-400' : 'bg-gray-600'} animate-bounce`} style={{ animationDelay: '0s' }} />
                                <div className={`w-2 h-2 ${nightMode ? 'bg-gray-400' : 'bg-gray-600'} animate-bounce`} style={{ animationDelay: '0.1s' }} />
                            </div>
                        )}
                    </div>

                    {obstacles.map((o) => (
                        <div
                            key={o.id}
                            className={`absolute ${nightMode ? 'bg-gray-300' : 'bg-[#535353]'}`}
                            style={{
                                left: o.x,
                                bottom: o.type === 'cactus' ? 0 : o.height,
                                width: o.type === 'cactus' ? (o.variant === 0 ? 15 : 30) : 38,
                                height: o.type === 'cactus' ? (o.variant === 0 ? 30 : 40) : 22,
                                borderRadius: o.type === 'bird' ? '4px 100% 0 0' : '2px'
                            }}
                        >
                            {o.type === 'bird' && (
                                <div className="absolute -left-2 top-2 border-r-8 border-transparent border-t-8 border-t-inherit" style={{ borderTopColor: 'inherit' }} />
                            )}
                        </div>
                    ))}

                    {gameState === 'start' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5">
                            <div className={`text-4xl font-black mb-6 tracking-widest ${nightMode ? 'text-white' : 'text-gray-800'}`}>DINO RUNNER</div>
                            <button
                                className="bg-[#535353] text-white px-10 py-3 font-bold shadow-xl active:scale-95"
                                onClick={(e) => { e.stopPropagation(); startGame(); }}
                            >
                                TOUCH TO START
                            </button>
                        </div>
                    )}

                    {gameState === 'gameover' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-[2px]">
                            <div className="text-3xl font-black mb-2 text-red-500 italic">GAME OVER</div>
                            <button
                                className="bg-red-500 text-white p-4 rounded-full active:scale-95"
                                onClick={(e) => { e.stopPropagation(); startGame(); }}
                            >
                                <RefreshCw size={24} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Controls */}
                <div className="mt-8 flex justify-between items-center px-4 md:hidden">
                    <button
                        className="w-16 h-16 bg-gray-200/50 rounded-full flex items-center justify-center active:bg-gray-400"
                        onPointerDown={(e) => { e.stopPropagation(); jump(); }}
                    >
                        <ArrowUp size={32} />
                    </button>

                    <div className="text-[10px] font-bold opacity-30 uppercase text-center flex-1">
                        Swipe up or tap to jump <br /> hold down to duck
                    </div>

                    <button
                        className="w-16 h-16 bg-gray-200/50 rounded-full flex items-center justify-center active:bg-gray-400"
                        onPointerDown={(e) => { e.stopPropagation(); handleDuck(true); }}
                        onPointerUp={(e) => { e.stopPropagation(); handleDuck(false); }}
                        onPointerLeave={(e) => { e.stopPropagation(); handleDuck(false); }}
                    >
                        <ArrowDown size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
}
