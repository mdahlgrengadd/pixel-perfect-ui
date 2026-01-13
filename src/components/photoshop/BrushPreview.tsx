import React from "react";

interface BrushPreviewProps {
  visible: boolean;
  x: number;
  y: number;
  size: number;
  hardness: number;
}

export const BrushPreview: React.FC<BrushPreviewProps> = ({
  visible,
  x,
  y,
  size,
  hardness,
}) => {
  if (!visible) return null;

  // Calculate gradient for hardness preview
  const softEdge = Math.max(0, 100 - hardness);
  const gradient = `radial-gradient(circle, 
    rgba(255,255,255,0.8) ${hardness}%, 
    rgba(255,255,255,0.3) ${100 - softEdge / 2}%, 
    transparent 100%
  )`;

  return (
    <div
      className="fixed pointer-events-none z-40"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
      }}
    >
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full border border-white/60"
        style={{
          boxShadow: "0 0 0 1px rgba(0,0,0,0.6)",
        }}
      />
      {/* Hardness preview */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: gradient,
          opacity: 0.5,
        }}
      />
      {/* Center crosshair */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1px] h-2 bg-white/60" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-[1px] bg-white/60" />
      </div>
    </div>
  );
};

// Panel for adjusting brush settings with live preview
interface BrushSettingsPanelProps {
  size: number;
  hardness: number;
  onSizeChange: (size: number) => void;
  onHardnessChange: (hardness: number) => void;
  onClose: () => void;
}

export const BrushSettingsPanel: React.FC<BrushSettingsPanelProps> = ({
  size,
  hardness,
  onSizeChange,
  onHardnessChange,
  onClose,
}) => {
  return (
    <div className="fixed bg-panel border border-border shadow-lg z-50 p-3 rounded-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium">Brush Size & Hardness</span>
        <button
          onClick={onClose}
          className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
      </div>

      {/* Preview circle */}
      <div className="w-32 h-32 bg-workspace border border-border rounded flex items-center justify-center mb-3">
        <div
          className="rounded-full border border-white/60"
          style={{
            width: Math.min(size, 120),
            height: Math.min(size, 120),
            background: `radial-gradient(circle, 
              rgba(255,255,255,0.8) ${hardness}%, 
              rgba(255,255,255,0.3) ${100 - (100 - hardness) / 2}%, 
              transparent 100%
            )`,
            boxShadow: "0 0 0 1px rgba(0,0,0,0.4)",
          }}
        />
      </div>

      {/* Size slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Size:</span>
          <span className="text-xs">{size} px</span>
        </div>
        <input
          type="range"
          min="1"
          max="500"
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="w-full h-2"
        />
      </div>

      {/* Hardness slider */}
      <div className="space-y-2 mt-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Hardness:</span>
          <span className="text-xs">{hardness}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={hardness}
          onChange={(e) => onHardnessChange(Number(e.target.value))}
          className="w-full h-2"
        />
      </div>
    </div>
  );
};
