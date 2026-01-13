import React from "react";

// Simple tool icons as SVG paths
const ToolIcon: React.FC<{ d: string }> = ({ d }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d={d} />
  </svg>
);

export const ToolOptionsBar: React.FC = () => {
  return (
    <div className="h-options-h bg-panel border-b border-border flex items-center px-2 gap-2">
      {/* Tool-specific options placeholder */}
      <div className="flex items-center gap-1">
        <button className="w-[22px] h-[22px] bg-background border border-border flex items-center justify-center raised">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="2" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </button>
        <button className="w-[22px] h-[22px] bg-background border border-border flex items-center justify-center raised">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <ellipse cx="7" cy="7" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </button>
      </div>
      
      <div className="w-px h-5 bg-border-light mx-1" />
      
      {/* Feather input */}
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">Feather:</span>
        <input
          type="text"
          defaultValue="0 px"
          className="w-[50px] h-[18px] px-1 text-xs bg-input border border-border inset-input"
        />
      </div>
      
      <div className="w-px h-5 bg-border-light mx-1" />
      
      {/* Anti-alias checkbox */}
      <label className="flex items-center gap-1 text-xs">
        <input type="checkbox" defaultChecked className="w-3 h-3" />
        Anti-alias
      </label>
      
      <div className="w-px h-5 bg-border-light mx-1" />
      
      {/* Style dropdown */}
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">Style:</span>
        <select className="h-[18px] px-1 text-xs bg-input border border-border inset-input">
          <option>Normal</option>
          <option>Fixed Ratio</option>
          <option>Fixed Size</option>
        </select>
      </div>
      
      <div className="w-px h-5 bg-border-light mx-1" />
      
      {/* Width/Height inputs */}
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">Width:</span>
        <input
          type="text"
          className="w-[40px] h-[18px] px-1 text-xs bg-input border border-border inset-input"
        />
      </div>
      
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground">Height:</span>
        <input
          type="text"
          className="w-[40px] h-[18px] px-1 text-xs bg-input border border-border inset-input"
        />
      </div>
    </div>
  );
};
