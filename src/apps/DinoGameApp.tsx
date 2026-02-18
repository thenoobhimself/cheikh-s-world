import { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, Gamepad2 } from 'lucide-react';

export default function DinoGameApp() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [target, setTarget] = useState({ x: 200, y: 150 });
  const [timeLeft, setTimeLeft] = useState(30);

  const containerRef = useRef<HTMLDivElement>(null);

  const generateTarget = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setTarget({
        x: Math.floor(Math.random() * (width - 40)),
        y: Math.floor(Math.random() * (height - 40))
      });
    }
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState('playing');
    setPosition({ x: 50, y: 50 });
    generateTarget();
  };

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setGameState('gameover');
            if (score > highScore) setHighScore(score);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, score, highScore]);

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 20;
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();

      setPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        switch (e.key) {
          case 'ArrowUp': newY = Math.max(0, prev.y - speed); break;
          case 'ArrowDown': newY = Math.min(height - 24, prev.y + speed); break;
          case 'ArrowLeft': newX = Math.max(0, prev.x - speed); break;
          case 'ArrowRight': newX = Math.min(width - 24, prev.x + speed); break;
        }
        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Collision Detection
  useEffect(() => {
    if (gameState !== 'playing') return;

    const dx = position.x - target.x;
    const dy = position.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 30) {
      setScore(s => s + 100);
      generateTarget();
      // Optional: Play beep sound here if audio was set up
    }
  }, [position, target, gameState, generateTarget]);

  return (
    <div className="h-full bg-black flex flex-col items-center justify-center font-mono select-none p-4">
      <div className="retro-window bg-[#c0c0c0] p-1 shadow-[10px_10px_0_rgba(0,0,0,0.5)] max-w-md w-full border-2 border-white">
        <div className="retro-titlebar flex justify-between px-1 bg-gradient-to-r from-blue-800 to-blue-600 mb-1">
          <span className="flex items-center gap-2"><Gamepad2 size={12} /> CATCH_SQUARE.EXE</span>
        </div>

        <div className="p-4 flex flex-col gap-4 bg-[#c0c0c0]">
          <div className="flex justify-between retro-sunken bg-black p-2 text-[#33ff33] font-bold font-mono text-xl border-4 border-gray-600">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400">SCORE</span>
              <span>{score.toString().padStart(6, '0')}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-gray-400">TIME</span>
              <span className={timeLeft < 10 ? "text-red-500 animate-pulse" : ""}>{timeLeft}</span>
            </div>
          </div>

          <div
            ref={containerRef}
            className="w-full h-64 bg-black relative border-4 border-gray-600 overflow-hidden shadow-inner cursor-crosshair"
            style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            onClick={(e) => {
              if (gameState !== 'playing' || !containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left - 12; // Center the 24px square
              const y = e.clientY - rect.top - 12;

              // Keep within bounds
              const newX = Math.max(0, Math.min(rect.width - 24, x));
              const newY = Math.max(0, Math.min(rect.height - 24, y));

              setPosition({ x: newX, y: newY });
            }}
          >
            {gameState === 'start' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/80 z-20">
                <h1 className="text-3xl font-black mb-4 text-yellow-400 animate-pulse tracking-widest drop-shadow-[2px_2px_0_#ff0000]">INSERT COIN</h1>
                <div className="flex flex-col gap-2 mb-4 text-xs text-center text-gray-400">
                  <p>ARROWS OR TOUCH TO MOVE</p>
                  <p>CATCH THE RED SQUARE</p>
                </div>
                <button className="retro-button px-6 py-2 font-bold text-lg active:scale-95 transition-transform" onClick={startGame}>START GAME</button>
              </div>
            )}

            {gameState === 'gameover' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/90 z-20">
                <h1 className="text-4xl font-black mb-2 text-red-500 animate-bounce">GAME OVER</h1>
                <div className="bg-gray-800 p-4 border-2 border-white mb-4 text-center">
                  <p className="text-gray-400 text-xs">FINAL SCORE</p>
                  <p className="text-2xl text-[#33ff33] font-bold mb-2">{score}</p>
                  {score >= highScore && score > 0 && <p className="text-yellow-400 text-xs animate-pulse">NEW HIGH SCORE!</p>}
                </div>
                <button className="retro-button px-6 py-2 font-bold flex items-center gap-2" onClick={startGame}>
                  <RefreshCw size={16} /> TRY AGAIN
                </button>
              </div>
            )}

            {gameState === 'playing' && (
              <>
                {/* Player */}
                <div
                  className="absolute w-6 h-6 bg-blue-500 border-2 border-white transition-all duration-75 ease-linear shadow-[0_0_10px_blue]"
                  style={{ left: position.x, top: position.y }}
                ></div>
                {/* Target */}
                <div
                  className="absolute w-6 h-6 bg-red-500 border-2 border-yellow-400 animate-bounce shadow-[0_0_10px_red]"
                  style={{ left: target.x, top: target.y }}
                ></div>
              </>
            )}

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10"></div>
          </div>

          <div className="bg-[#c0c0c0] flex justify-between items-center text-xs font-bold px-1 border-t border-gray-400 pt-1">
            <span>HI-SCORE: {highScore}</span>
            <span>CREDITS: 0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
