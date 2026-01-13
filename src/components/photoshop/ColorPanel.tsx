import React, { useState } from "react";
import { Panel } from "./Panel";

interface SliderRowProps {
  label: string;
  color: string;
  value: number;
  onChange: (v: number) => void;
}

const SliderRow: React.FC<SliderRowProps> = ({ label, color, value, onChange }) => (
  <div className="flex items-center gap-2 mb-1">
    <span className="w-3 text-xs">{label}</span>
    <div className="flex-1 h-3 bg-input border border-border inset-input relative">
      <div
        className="absolute top-0 left-0 h-full"
        style={{
          width: `${(value / 255) * 100}%`,
          background: color === "R" ? "#ff0000" : color === "G" ? "#00ff00" : "#0000ff",
          opacity: 0.3,
        }}
      />
      <input
        type="range"
        min="0"
        max="255"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div
        className="absolute top-0 w-2 h-full bg-background border border-border"
        style={{ left: `calc(${(value / 255) * 100}% - 4px)` }}
      />
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      className="w-[32px] h-[16px] px-1 text-xs bg-input border border-border inset-input text-right"
    />
  </div>
);

export const ColorPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("color");
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  const tabs = [
    { id: "color", label: "Color" },
    { id: "swatches", label: "Swatches" },
    { id: "styles", label: "Styles" },
  ];

  return (
    <Panel tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} title="Color">
      {activeTab === "color" && (
        <div>
          {/* Color sliders */}
          <SliderRow label="R" color="R" value={rgb.r} onChange={(v) => setRgb({ ...rgb, r: v })} />
          <SliderRow label="G" color="G" value={rgb.g} onChange={(v) => setRgb({ ...rgb, g: v })} />
          <SliderRow label="B" color="B" value={rgb.b} onChange={(v) => setRgb({ ...rgb, b: v })} />
          
          {/* Color ramp */}
          <div className="mt-2 h-3 border border-border" style={{
            background: "linear-gradient(to right, #000, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #fff)"
          }} />
        </div>
      )}
      {activeTab === "swatches" && (
        <div className="grid grid-cols-12 gap-px">
          {Array.from({ length: 48 }, (_, i) => (
            <div
              key={i}
              className="w-3 h-3 border border-border cursor-pointer hover:border-foreground"
              style={{
                backgroundColor: `hsl(${(i * 7.5) % 360}, ${50 + (i % 3) * 20}%, ${30 + (i % 4) * 15}%)`,
              }}
            />
          ))}
        </div>
      )}
      {activeTab === "styles" && (
        <div className="text-xs text-muted-foreground text-center py-2">
          No styles defined
        </div>
      )}
    </Panel>
  );
};
