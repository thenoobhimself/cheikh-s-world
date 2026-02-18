import { useState, useRef, useEffect } from 'react';
import './IntroScreen.css';

interface IntroScreenProps {
    onDone: () => void;
}

type Stage = 'poster' | 'playing' | 'exiting';

export function IntroScreen({ onDone }: IntroScreenProps) {
    const [stage, setStage] = useState<Stage>('poster');
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleStart = () => {
        setStage('playing');
        // Small delay so the CSS transition starts before video plays
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play();
            }
        }, 50);
    };

    const handleVideoEnd = () => {
        setStage('exiting');
        setTimeout(onDone, 1000);
    };

    // Keyboard shortcut: Enter or Space to start
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (stage === 'poster' && (e.key === 'Enter' || e.key === ' ')) {
                handleStart();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [stage]);

    return (
        <div className={`intro-screen intro-screen--${stage}`}>
            {/* Static poster image */}
            <img
                className="intro-poster"
                src="/intro/lastfr.png"
                alt="Cheikh's Universe"
                draggable={false}
            />

            {/* Video — rendered always but hidden until playing */}
            <video
                ref={videoRef}
                className="intro-video"
                src="/intro/video.mp4"
                playsInline
                onEnded={handleVideoEnd}
            />

            {/* START button — only visible in poster stage */}
            {stage === 'poster' && (
                <div className="intro-start-wrapper">
                    <button className="intro-start-btn" onClick={handleStart}>
                        <span className="intro-start-text">▶ START</span>
                        <span className="intro-start-pulse" />
                    </button>
                    <p className="intro-hint">PRESS ENTER OR CLICK TO BEGIN</p>
                </div>
            )}

            {/* Overlay for exit fade */}
            <div className="intro-exit-overlay" />
        </div>
    );
}
