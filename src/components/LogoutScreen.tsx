import { useRef, useEffect } from 'react';
import './LogoutScreen.css';

interface LogoutScreenProps {
    onDone: () => void;
}

export function LogoutScreen({ onDone }: LogoutScreenProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.play();
    }, []);

    const handleEnded = () => {
        onDone();
    };

    return (
        <div className="logout-screen">
            <video
                ref={videoRef}
                className="logout-video"
                src="/intro/reversed.mp4"
                playsInline
                onEnded={handleEnded}
            />
        </div>
    );
}
