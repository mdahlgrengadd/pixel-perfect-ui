import React, { useState, useRef } from "react";

export const NavigatorPanelContent: React.FC = () => {
  const [zoom, setZoom] = useState(100);
  const [viewportPosition, setViewportPosition] = useState({ x: 50, y: 50 });
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const handleThumbnailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!thumbnailRef.current) return;
    const rect = thumbnailRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setViewportPosition({ x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) });
  };

  const viewportWidth = Math.max(10, 80 / (zoom / 100));
  const viewportHeight = Math.max(10, 60 / (zoom / 100));

  return (
    <div className="flex flex-col gap-2">
      {/* Thumbnail view */}
      <div
        ref={thumbnailRef}
        className="relative bg-workspace border border-border cursor-move aspect-[4/3]"
        onClick={handleThumbnailClick}
      >
        {/* Document thumbnail */}
        <div className="absolute inset-2 bg-document border border-border-dark" />
        
        {/* Viewport indicator (red rectangle) */}
        <div
          className="absolute border-2 border-red-500 pointer-events-none"
          style={{
            width: `${viewportWidth}%`,
            height: `${viewportHeight}%`,
            left: `${viewportPosition.x - viewportWidth / 2}%`,
            top: `${viewportPosition.y - viewportHeight / 2}%`,
          }}
        />
      </div>

      {/* Zoom controls */}
      <div className="flex items-center gap-2">
        <button
          className="w-5 h-5 bg-background border border-border raised text-xs hover:bg-tool-hover"
          onClick={() => setZoom(Math.max(10, zoom - 25))}
        >
          −
        </button>
        
        <div className="flex-1 h-2 bg-input border border-border inset-input relative">
          <input
            type="range"
            min="10"
            max="400"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="absolute top-0 left-0 h-full bg-accent"
            style={{ width: `${(zoom - 10) / 3.9}%` }}
          />
        </div>
        
        <button
          className="w-5 h-5 bg-background border border-border raised text-xs hover:bg-tool-hover"
          onClick={() => setZoom(Math.min(400, zoom + 25))}
        >
          +
        </button>
      </div>

      {/* Zoom percentage input */}
      <div className="flex items-center justify-center gap-1">
        <input
          type="text"
          value={`${zoom}%`}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val)) setZoom(Math.max(10, Math.min(400, val)));
          }}
          className="w-16 h-5 px-1 text-xs text-center bg-input border border-border inset-input"
        />
      </div>
    </div>
  );
};

// Keep legacy export for backwards compatibility
export const NavigatorPanel = NavigatorPanelContent;
