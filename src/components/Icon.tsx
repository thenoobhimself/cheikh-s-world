import { AppType } from '../types/os'; // Ensure this type is correct
import { useWindowManager } from '../core/windowManager'; // Ensure this hook is correct

interface IconProps {
  appType: AppType;
  icon: string;
  label: string;
  selected?: boolean;
  onSelect?: () => void;
}

export function Icon({ appType, icon, label, selected, onSelect }: IconProps) {
  const { openWindow } = useWindowManager();


  return (
    <div
      className={`flex flex-col items-center gap-2 p-1 w-24 md:w-28 cursor-pointer select-none ${selected ? 'desktop-icon-selected' : 'hover:bg-white/10'
        }`}
      onClick={(e) => {
        e.stopPropagation();
        openWindow(appType);
        if (onSelect) onSelect();
      }}
    >
      <div className="text-4xl md:text-5xl mb-1 pixel-art filter drop-shadow-md">
        {icon.startsWith('/') || icon.startsWith('http') ? (
          <img src={icon} alt={label} className="w-10 h-10 md:w-14 md:h-14 object-contain pixel-art" />
        ) : (
          icon
        )}
      </div>
      <span
        className={`text-xs px-1 text-center ${selected ? 'bg-[var(--retro-blue-dark)] text-white' : 'text-white text-outline'
          }`}
        style={{ fontFamily: 'var(--font-system)' }}
      >
        {label}
      </span>
    </div>
  );
}
