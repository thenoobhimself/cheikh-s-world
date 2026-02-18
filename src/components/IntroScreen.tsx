import { useState, useRef, useEffect } from 'react';
import './IntroScreen.css';

interface IntroScreenProps {
    onDone: () => void;
}

type Stage = 'poster' | 'playing' | 'exiting';

export function IntroScreen({ onDone }: IntroScreenProps) {
    const [stage, setStage] = useState<Stage>('poster');
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Preload the video as soon as the component mounts
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleCanPlay = () => setVideoReady(true);
        video.addEventListener('canplaythrough', handleCanPlay);
        // Also accept 'canplay' as a fallback
        video.addEventListener('canplay', handleCanPlay);

        // Force load
        video.load();

        return () => {
            video.removeEventListener('canplaythrough', handleCanPlay);
            video.removeEventListener('canplay', handleCanPlay);
        };
    }, []);

    const handleStart = () => {
        setStage('playing');
        const video = videoRef.current;
        if (!video) return;

        // Reset to start in case it was partially loaded
        video.currentTime = 0;

        // play() returns a Promise — always handle rejection
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch((err) => {
                console.warn('Video play failed:', err);
                // If autoplay is blocked (e.g. mobile with sound), try muted
                video.muted = true;
                video.play().catch((e) => {
                    console.error('Muted play also failed:', e);
                    // Fallback: skip video, go straight to boot
                    setStage('exiting');
                    setTimeout(onDone, 800);
                });
            });
        }
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

            {/* Video — always rendered so it preloads */}
            <video
                ref={videoRef}
                className="intro-video"
                src="/intro/video.mp4"
                playsInline
                muted={false}
                preload="auto"
                onEnded={handleVideoEnd}
            />

            {/* START button — only visible in poster stage */}
            {stage === 'poster' && (
                <div className="intro-start-wrapper">
                    <button
                        className={`intro-start-btn${videoReady ? ' intro-start-btn--ready' : ''}`}
                        onClick={handleStart}
                    >
                        <span className="intro-start-text">▶ START</span>
                        <span className="intro-start-pulse" />
                    </button>
                    <p className="intro-hint">
                        {videoReady ? 'PRESS ENTER OR CLICK TO BEGIN' : 'LOADING…'}
                    </p>
                </div>
            )}

            {/* Overlay for exit fade */}
            <div className="intro-exit-overlay" />
        </div>
    );
}
