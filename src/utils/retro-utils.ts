export const formatDate = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatFullDate = (date: Date): string => {
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

export const playSound = (soundName: string) => {
    // Placeholder for sound implementation
    console.log(`Playing sound: ${soundName}`);
    // In a real implementation:
    // const audio = new Audio(`/assets/sounds/${soundName}.mp3`);
    // audio.play().catch(e => console.error(e));
};

export const getRandomPosition = (containerWidth: number, containerHeight: number, elementWidth: number, elementHeight: number) => {
    const x = Math.floor(Math.random() * (containerWidth - elementWidth));
    const y = Math.floor(Math.random() * (containerHeight - elementHeight));
    return { x, y };
};

export const clsx = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ');
};
