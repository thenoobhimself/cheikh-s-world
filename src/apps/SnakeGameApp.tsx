import { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Point = { x: number; y: number };

export default function SnakeGameApp() {
    const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Point>({ x: 15, y: 15 });
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
    const [highScore, setHighScore] = useState(0);

    const GRID_SIZE = 20;
    const gameLoopRef = useRef<number | null>(null);
    const lastUpdateRef = useRef<number>(0);
    const directionRef = useRef<Direction>('RIGHT');

    const generateFood = useCallback((currentSnake: Point[]) => {
        let newFood: Point;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
            const hitSnake = currentSnake.some(p => p.x === newFood.x && p.y === newFood.y);
            if (!hitSnake) break;
        }
        setFood(newFood);
    }, []);

    const startGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        directionRef.current = 'RIGHT';
        setScore(0);
        setGameState('playing');
        generateFood([{ x: 10, y: 10 }]);
        lastUpdateRef.current = performance.now();
    };

    const moveSnake = useCallback(() => {
        setSnake(prevSnake => {
            const head = prevSnake[0];
            const newHead = { ...head };

            switch (directionRef.current) {
                case 'UP': newHead.y -= 1; break;
                case 'DOWN': newHead.y += 1; break;
                case 'LEFT': newHead.x -= 1; break;
                case 'RIGHT': newHead.x += 1; break;
            }

            // Wall collision
            if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
                setGameState('gameover');
                return prevSnake;
            }

            // Self collision
            if (prevSnake.some(p => p.x === newHead.x && p.y === newHead.y)) {
                setGameState('gameover');
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Food collision
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore(s => s + 10);
                generateFood(newSnake);
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [food, generateFood]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp': if (directionRef.current !== 'DOWN') directionRef.current = 'UP'; break;
                case 'ArrowDown': if (directionRef.current !== 'UP') directionRef.current = 'DOWN'; break;
                case 'ArrowLeft': if (directionRef.current !== 'RIGHT') directionRef.current = 'LEFT'; break;
                case 'ArrowRight': if (directionRef.current !== 'LEFT') directionRef.current = 'RIGHT'; break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const loop = useCallback((time: number) => {
        if (gameState !== 'playing') return;

        const speed = Math.max(80, 200 - Math.floor(score / 20) * 10);
        if (time - lastUpdateRef.current > speed) {
            moveSnake();
            lastUpdateRef.current = time;
        }
        gameLoopRef.current = requestAnimationFrame(loop);
    }, [gameState, moveSnake, score]);

    useEffect(() => {
        if (gameState === 'playing') {
            gameLoopRef.current = requestAnimationFrame(loop);
        }
        return () => {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        };
    }, [gameState, loop]);

    useEffect(() => {
        if (gameState === 'gameover' && score > highScore) {
            setHighScore(score);
        }
    }, [gameState, score, highScore]);

    return (
        <div className="h-full bg-black flex flex-col items-center justify-center font-mono p-4 select-none">
            <div className="bg-[#c0c0c0] p-1 border-2 border-white shadow-[8px_8px_0_rgba(0,0,0,0.5)] max-w-sm w-full">
                <div className="bg-gradient-to-r from-green-800 to-green-600 px-2 py-0.5 flex justify-between items-center text-white mb-2">
                    <span className="flex items-center gap-2 text-xs"><Gamepad2 size={12} /> SNAKE_95.EXE</span>
                    <span className="text-xs font-bold">SCORE: {score}</span>
                </div>

                <div className="relative aspect-square bg-[#8b9b8e] border-4 border-gray-600 grid grid-cols-20 grid-rows-20 overflow-hidden shadow-inner p-1">
                    {/* Grid Background */}
                    <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 pointer-events-none opacity-5">
                        {Array.from({ length: 400 }).map((_, i) => <div key={i} className="border-[0.1px] border-black" />)}
                    </div>

                    {/* Food */}
                    <div
                        className="absolute bg-red-600 rounded-full shadow-[0_0_5px_red] animate-pulse"
                        style={{
                            width: '5%', height: '5%',
                            left: `${food.x * 5}%`, top: `${food.y * 5}%`,
                            boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.5)'
                        }}
                    />

                    {/* Snake */}
                    {snake.map((p, i) => (
                        <div
                            key={i}
                            className={`absolute transition-all duration-75 ${i === 0 ? 'bg-black z-10' : 'bg-[#1a1a1a]'}`}
                            style={{
                                width: '5%', height: '5%',
                                left: `${p.x * 5}%`, top: `${p.y * 5}%`,
                                borderRadius: i === 0 ? '2px' : '0'
                            }}
                        >
                            {i === 0 && (
                                <div className="relative w-full h-full">
                                    <div className="absolute top-1 left-1 w-1 h-1 bg-white opacity-40 rounded-full" />
                                </div>
                            )}
                        </div>
                    ))}

                    {gameState === 'start' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[1px] z-20">
                            <h2 className="text-2xl font-black text-black mb-4">SNAKE</h2>
                            <button
                                className="retro-button px-6 py-2 bg-black text-white hover:bg-gray-800"
                                onClick={startGame}
                            >
                                START GAME
                            </button>
                        </div>
                    )}

                    {gameState === 'gameover' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20">
                            <h2 className="text-2xl font-black text-red-600 mb-2">CRASHED!</h2>
                            <p className="text-white text-xs mb-4">HIGH SCORE: {highScore}</p>
                            <button
                                className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 active:scale-95"
                                onClick={startGame}
                            >
                                <RefreshCw size={24} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Controls */}
                <div className="grid grid-cols-3 gap-1 mt-4 max-w-[150px] mx-auto md:hidden">
                    <div />
                    <button className="retro-button p-2 flex justify-center" onPointerDown={() => directionRef.current = 'UP'}><ArrowUp size={20} /></button>
                    <div />
                    <button className="retro-button p-2 flex justify-center" onPointerDown={() => directionRef.current = 'LEFT'}><ArrowLeft size={20} /></button>
                    <button className="retro-button p-2 flex justify-center" onPointerDown={() => directionRef.current = 'DOWN'}><ArrowDown size={20} /></button>
                    <button className="retro-button p-2 flex justify-center" onPointerDown={() => directionRef.current = 'RIGHT'}><ArrowRight size={20} /></button>
                </div>

                <div className="mt-2 text-[8px] text-gray-600 font-bold uppercase flex justify-between px-1">
                    <span>Arrows TO MOVE</span>
                    <span>BEST: {highScore}</span>
                </div>
            </div>
        </div>
    );
}
