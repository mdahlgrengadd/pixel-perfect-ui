import React, { useState } from "react";

interface Tool {
  id: string;
  icon: React.ReactNode;
  title: string;
}

const createIcon = (paths: string) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d={paths} />
  </svg>
);

const tools: Tool[] = [
  { id: "move", icon: createIcon("M8 1l3 3h-2v4h4v-2l3 3-3 3v-2h-4v4h2l-3 3-3-3h2v-4h-4v2l-3-3 3-3v2h4v-4h-2z"), title: "Move Tool (V)" },
  { id: "marquee", icon: createIcon("M2 2h12v12h-12z M3 3v10h10v-10z"), title: "Rectangular Marquee Tool (M)" },
  { id: "lasso", icon: createIcon("M8 2c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6c0-1.5.5-2.8 1.4-3.9l1.4 1.1c-.5.8-.8 1.7-.8 2.8 0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5v-1z"), title: "Lasso Tool (L)" },
  { id: "magic-wand", icon: createIcon("M10.5 1l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1zM4 8l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z"), title: "Magic Wand Tool (W)" },
  { id: "crop", icon: createIcon("M4 2v2h-2v10h10v-2h2v-10h-10zM5 4h6v6h-6z"), title: "Crop Tool (C)" },
  { id: "eyedropper", icon: createIcon("M13 1l2 2-3 3-2-2zM9 5l2 2-7 7h-2v-2z"), title: "Eyedropper Tool (I)" },
  { id: "healing", icon: createIcon("M8 2l2 2-6 6-2-2zM3 11l2 2 1-1-2-2z"), title: "Spot Healing Brush Tool (J)" },
  { id: "brush", icon: createIcon("M12 2c1 0 2 1 2 2 0 1.5-3 4-5 6l-3 3c-1 1-2.5 1-3 .5s-.5-2 .5-3l3-3c2-2 4.5-5 5.5-5.5z"), title: "Brush Tool (B)" },
  { id: "clone", icon: createIcon("M6 2c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM10 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"), title: "Clone Stamp Tool (S)" },
  { id: "history", icon: createIcon("M8 1v2c-2.8 0-5 2.2-5 5h-2l3 3 3-3h-2c0-1.7 1.3-3 3-3v-2zM14 6l-3-3-3 3h2c0 1.7-1.3 3-3 3v2c2.8 0 5-2.2 5-5h2z"), title: "History Brush Tool (Y)" },
  { id: "eraser", icon: createIcon("M12 4l-4 4-4-4v8l4 4 4-4v-8z"), title: "Eraser Tool (E)" },
  { id: "gradient", icon: createIcon("M2 4h12v8h-12z"), title: "Gradient Tool (G)" },
  { id: "blur", icon: createIcon("M8 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM8 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"), title: "Blur Tool" },
  { id: "dodge", icon: createIcon("M8 2c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zM8 4v8"), title: "Dodge Tool (O)" },
  { id: "pen", icon: createIcon("M2 14l1-4 8-8 3 3-8 8z"), title: "Pen Tool (P)" },
  { id: "text", icon: createIcon("M4 3v2h3v9h2v-9h3v-2z"), title: "Horizontal Type Tool (T)" },
  { id: "path", icon: createIcon("M4 8c0-2.2 1.8-4 4-4s4 1.8 4 4M2 8h12"), title: "Path Selection Tool (A)" },
  { id: "shape", icon: createIcon("M3 3h10v10h-10z"), title: "Rectangle Tool (U)" },
  { id: "hand", icon: createIcon("M12 7v-2c0-.6-.4-1-1-1s-1 .4-1 1v-1c0-.6-.4-1-1-1s-1 .4-1 1v-1c0-.6-.4-1-1-1s-1 .4-1 1v5l-1-1c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l3 3c.4.4 1 .6 1.6.6h2.8c1.1 0 2-.9 2-2v-3z"), title: "Hand Tool (H)" },
  { id: "zoom", icon: createIcon("M7 3c-2.2 0-4 1.8-4 4s1.8 4 4 4c.9 0 1.7-.3 2.4-.8l2.4 2.4c.4.4 1 .4 1.4 0s.4-1 0-1.4l-2.4-2.4c.5-.7.8-1.5.8-2.4 0-2.2-1.8-4-4-4zM7 5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"), title: "Zoom Tool (Z)" },
];

export const ToolsPalette: React.FC = () => {
  const [activeTool, setActiveTool] = useState("marquee");

  return (
    <div className="w-tools-w bg-panel border-r border-border flex flex-col">
      {/* Tools grid */}
      <div className="flex-1 p-1">
        <div className="grid grid-cols-2 gap-[2px]">
          {tools.map((tool) => (
            <button
              key={tool.id}
              title={tool.title}
              onClick={() => setActiveTool(tool.id)}
              className={`w-tool-btn h-tool-btn flex items-center justify-center border transition-colors ${
                activeTool === tool.id
                  ? "bg-tool-active border-border-dark pressed"
                  : "bg-background border-border raised hover:bg-tool-hover"
              }`}
            >
              {tool.icon}
            </button>
          ))}
        </div>
      </div>
      
      {/* Bottom section: Color swatches and mode buttons */}
      <div className="p-2 border-t border-border-light">
        {/* Foreground/Background color swatches */}
        <div className="relative w-[38px] h-[38px] mb-2 ml-1">
          {/* Background swatch */}
          <div
            className="absolute bottom-0 right-0 w-[22px] h-[22px] border border-border bg-swatch-background"
          />
          {/* Foreground swatch */}
          <div
            className="absolute top-0 left-0 w-[22px] h-[22px] border border-border bg-swatch-foreground"
          />
          {/* Swap icon */}
          <button className="absolute top-0 right-1 text-2xs" title="Switch Foreground and Background Colors (X)">
            ↔
          </button>
          {/* Default icon */}
          <button className="absolute bottom-0 left-0 text-2xs" title="Default Foreground and Background Colors (D)">
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="0" y="4" width="4" height="4" fill="white" stroke="black" strokeWidth="0.5"/>
              <rect x="2" y="2" width="4" height="4" fill="black" stroke="black" strokeWidth="0.5"/>
            </svg>
          </button>
        </div>
        
        {/* Quick Mask / Screen mode buttons */}
        <div className="flex gap-[2px]">
          <button className="w-[22px] h-[22px] bg-background border border-border raised flex items-center justify-center" title="Edit in Standard Mode (Q)">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <rect x="2" y="2" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2"/>
            </svg>
          </button>
          <button className="w-[22px] h-[22px] bg-background border border-border raised flex items-center justify-center" title="Edit in Quick Mask Mode (Q)">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
