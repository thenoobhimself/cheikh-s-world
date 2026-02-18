import { useRef, useState, useEffect, ReactNode } from 'react';
import { WindowState } from '../types/os';
import { useWindowManager } from '../core/windowManager';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowProps {
  window: WindowState;
  children: ReactNode;
  isActive?: boolean;
}

export function Window({ window, children }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize
  } = useWindowManager();

  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Unified Start Handler (Mouse & Touch)
  const handleStartMove = (clientX: number, clientY: number) => {
    if (window.isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: clientX - window.position.x,
      y: clientY - window.position.y
    });
    focusWindow(window.id);
  };

  const handleStartResize = (clientX: number, clientY: number) => {
    if (window.isMaximized) return;
    setIsResizing(true);
    setResizeStart({
      x: clientX,
      y: clientY,
      width: window.size.width,
      height: window.size.height
    });
    focusWindow(window.id);
  };

  // Mouse Handlers
  const handleMouseDownTitle = (e: React.MouseEvent) => {
    handleStartMove(e.clientX, e.clientY);
  };

  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleStartResize(e.clientX, e.clientY);
  };

  // Touch Handlers
  const handleTouchStartTitle = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStartMove(touch.clientX, touch.clientY);
  };

  const handleTouchStartResize = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    handleStartResize(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (isDragging) {
        updateWindowPosition(window.id, {
          x: clientX - dragOffset.x,
          y: clientY - dragOffset.y
        });
      }

      if (isResizing) {
        const deltaX = clientX - resizeStart.x;
        const deltaY = clientY - resizeStart.y;

        updateWindowSize(window.id, {
          width: Math.max(300, resizeStart.width + deltaX),
          height: Math.max(200, resizeStart.height + deltaY)
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging || isResizing) {
        e.preventDefault(); // Prevent text selection/scrolling
        handleMove(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging || isResizing) {
        e.preventDefault(); // Prevent scrolling
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      // Add global listeners
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, isResizing, dragOffset, window.id, updateWindowPosition, resizeStart, updateWindowSize]);

  if (window.isMinimized) return null;

  const style: React.CSSProperties = {
    position: 'absolute',
    top: window.isMaximized ? 0 : window.position.y,
    left: window.isMaximized ? 0 : window.position.x,
    width: window.isMaximized ? '100vw' : window.size.width,
    height: window.isMaximized ? 'calc(100vh - 28px)' : window.size.height, // 28px taskbar
    maxWidth: '100vw',
    maxHeight: 'calc(100vh - 28px)',
    zIndex: window.zIndex,
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div
      ref={windowRef}
      className="retro-window"
      style={style}
      onMouseDown={() => focusWindow(window.id)}
      onTouchStart={() => focusWindow(window.id)}
    >
      <div
        className="retro-titlebar flex items-center justify-between"
        onMouseDown={handleMouseDownTitle}
        onTouchStart={handleTouchStartTitle}
      >
        <div className="flex items-center gap-2">
          {/* Optional Icon here */}
          <span className="truncate">{window.title}</span>
        </div>
        <div className="flex gap-1" onTouchStart={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(window.id);
            }}
            className="retro-button p-0 w-5 h-5 flex items-center justify-center bg-gray-300 active:bg-gray-400"
            aria-label="Minimize"
          >
            <Minus size={10} className="text-black" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(window.id);
            }}
            className="retro-button p-0 w-5 h-5 flex items-center justify-center bg-gray-300 active:bg-gray-400"
            aria-label="Maximize"
          >
            <Maximize2 size={10} className="text-black" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(window.id);
            }}
            className="retro-button p-0 w-5 h-5 flex items-center justify-center bg-gray-300 active:bg-gray-400 ml-1"
            aria-label="Close"
          >
            <X size={12} className="text-black" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white relative p-1">
        {children}
      </div>

      {!window.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5"
          onMouseDown={handleMouseDownResize}
          onTouchStart={handleTouchStartResize}
        >
          {/* Resize grip graphic could go here */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8H9V9H8V8Z" fill="#808080" />
            <path d="M8 6H9V7H8V6Z" fill="#808080" />
            <path d="M6 8H7V9H6V8Z" fill="#808080" />
            <path d="M8 4H9V5H8V4Z" fill="#808080" />
            <path d="M6 6H7V7H6V6Z" fill="#808080" />
            <path d="M4 8H5V9H4V8Z" fill="#808080" />
          </svg>
        </div>
      )}
    </div>
  );
}
