import React, { useState } from "react";
import { ToolIcons } from "./ToolIcons";

interface Tool {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtools?: Tool[];
}

const tools: Tool[] = [
  { 
    id: "move", 
    icon: ToolIcons.move, 
    title: "Move Tool (V)",
  },
  { 
    id: "marquee", 
    icon: ToolIcons.marqueeRect, 
    title: "Rectangular Marquee Tool (M)",
    subtools: [
      { id: "marquee-rect", icon: ToolIcons.marqueeRect, title: "Rectangular Marquee Tool (M)" },
      { id: "marquee-ellipse", icon: ToolIcons.marqueeEllipse, title: "Elliptical Marquee Tool (M)" },
    ]
  },
  { 
    id: "lasso", 
    icon: ToolIcons.lasso, 
    title: "Lasso Tool (L)",
    subtools: [
      { id: "lasso", icon: ToolIcons.lasso, title: "Lasso Tool (L)" },
      { id: "polygon-lasso", icon: ToolIcons.polygonLasso, title: "Polygonal Lasso Tool (L)" },
    ]
  },
  { 
    id: "magic-wand", 
    icon: ToolIcons.magicWand, 
    title: "Magic Wand Tool (W)",
    subtools: [
      { id: "magic-wand", icon: ToolIcons.magicWand, title: "Magic Wand Tool (W)" },
      { id: "quick-selection", icon: ToolIcons.quickSelection, title: "Quick Selection Tool (W)" },
    ]
  },
  { 
    id: "crop", 
    icon: ToolIcons.crop, 
    title: "Crop Tool (C)",
    subtools: [
      { id: "crop", icon: ToolIcons.crop, title: "Crop Tool (C)" },
      { id: "slice", icon: ToolIcons.slice, title: "Slice Tool (C)" },
    ]
  },
  { 
    id: "eyedropper", 
    icon: ToolIcons.eyedropper, 
    title: "Eyedropper Tool (I)",
    subtools: [
      { id: "eyedropper", icon: ToolIcons.eyedropper, title: "Eyedropper Tool (I)" },
      { id: "color-sampler", icon: ToolIcons.colorSampler, title: "Color Sampler Tool (I)" },
      { id: "ruler", icon: ToolIcons.ruler, title: "Ruler Tool (I)" },
    ]
  },
  { 
    id: "healing", 
    icon: ToolIcons.spotHealing, 
    title: "Spot Healing Brush Tool (J)",
    subtools: [
      { id: "spot-healing", icon: ToolIcons.spotHealing, title: "Spot Healing Brush Tool (J)" },
      { id: "healing-brush", icon: ToolIcons.healingBrush, title: "Healing Brush Tool (J)" },
      { id: "patch", icon: ToolIcons.patchTool, title: "Patch Tool (J)" },
    ]
  },
  { 
    id: "brush", 
    icon: ToolIcons.brush, 
    title: "Brush Tool (B)",
    subtools: [
      { id: "brush", icon: ToolIcons.brush, title: "Brush Tool (B)" },
      { id: "pencil", icon: ToolIcons.pencil, title: "Pencil Tool (B)" },
      { id: "color-replace", icon: ToolIcons.colorReplace, title: "Color Replacement Tool (B)" },
    ]
  },
  { 
    id: "clone", 
    icon: ToolIcons.cloneStamp, 
    title: "Clone Stamp Tool (S)",
    subtools: [
      { id: "clone-stamp", icon: ToolIcons.cloneStamp, title: "Clone Stamp Tool (S)" },
      { id: "pattern-stamp", icon: ToolIcons.patternStamp, title: "Pattern Stamp Tool (S)" },
    ]
  },
  { 
    id: "history", 
    icon: ToolIcons.historyBrush, 
    title: "History Brush Tool (Y)",
    subtools: [
      { id: "history-brush", icon: ToolIcons.historyBrush, title: "History Brush Tool (Y)" },
      { id: "art-history", icon: ToolIcons.artHistoryBrush, title: "Art History Brush Tool (Y)" },
    ]
  },
  { 
    id: "eraser", 
    icon: ToolIcons.eraser, 
    title: "Eraser Tool (E)",
    subtools: [
      { id: "eraser", icon: ToolIcons.eraser, title: "Eraser Tool (E)" },
      { id: "background-eraser", icon: ToolIcons.backgroundEraser, title: "Background Eraser Tool (E)" },
    ]
  },
  { 
    id: "gradient", 
    icon: ToolIcons.gradient, 
    title: "Gradient Tool (G)",
    subtools: [
      { id: "gradient", icon: ToolIcons.gradient, title: "Gradient Tool (G)" },
      { id: "paint-bucket", icon: ToolIcons.paintBucket, title: "Paint Bucket Tool (G)" },
    ]
  },
  { 
    id: "blur", 
    icon: ToolIcons.blur, 
    title: "Blur Tool",
    subtools: [
      { id: "blur", icon: ToolIcons.blur, title: "Blur Tool" },
      { id: "sharpen", icon: ToolIcons.sharpen, title: "Sharpen Tool" },
      { id: "smudge", icon: ToolIcons.smudge, title: "Smudge Tool" },
    ]
  },
  { 
    id: "dodge", 
    icon: ToolIcons.dodge, 
    title: "Dodge Tool (O)",
    subtools: [
      { id: "dodge", icon: ToolIcons.dodge, title: "Dodge Tool (O)" },
      { id: "burn", icon: ToolIcons.burn, title: "Burn Tool (O)" },
      { id: "sponge", icon: ToolIcons.sponge, title: "Sponge Tool (O)" },
    ]
  },
  { 
    id: "pen", 
    icon: ToolIcons.pen, 
    title: "Pen Tool (P)",
    subtools: [
      { id: "pen", icon: ToolIcons.pen, title: "Pen Tool (P)" },
      { id: "freeform-pen", icon: ToolIcons.freeformPen, title: "Freeform Pen Tool (P)" },
      { id: "add-anchor", icon: ToolIcons.addAnchor, title: "Add Anchor Point Tool" },
    ]
  },
  { 
    id: "text", 
    icon: ToolIcons.text, 
    title: "Horizontal Type Tool (T)",
    subtools: [
      { id: "text-h", icon: ToolIcons.text, title: "Horizontal Type Tool (T)" },
      { id: "text-v", icon: ToolIcons.verticalText, title: "Vertical Type Tool (T)" },
      { id: "text-mask", icon: ToolIcons.textMask, title: "Horizontal Type Mask Tool (T)" },
    ]
  },
  { 
    id: "path-selection", 
    icon: ToolIcons.pathSelection, 
    title: "Path Selection Tool (A)",
    subtools: [
      { id: "path-selection", icon: ToolIcons.pathSelection, title: "Path Selection Tool (A)" },
      { id: "direct-selection", icon: ToolIcons.directSelection, title: "Direct Selection Tool (A)" },
    ]
  },
  { 
    id: "shape", 
    icon: ToolIcons.rectangle, 
    title: "Rectangle Tool (U)",
    subtools: [
      { id: "rectangle", icon: ToolIcons.rectangle, title: "Rectangle Tool (U)" },
      { id: "rounded-rect", icon: ToolIcons.roundedRect, title: "Rounded Rectangle Tool (U)" },
      { id: "ellipse", icon: ToolIcons.ellipse, title: "Ellipse Tool (U)" },
      { id: "polygon", icon: ToolIcons.polygon, title: "Polygon Tool (U)" },
      { id: "line", icon: ToolIcons.line, title: "Line Tool (U)" },
      { id: "custom-shape", icon: ToolIcons.customShape, title: "Custom Shape Tool (U)" },
    ]
  },
  { 
    id: "hand", 
    icon: ToolIcons.hand, 
    title: "Hand Tool (H)",
    subtools: [
      { id: "hand", icon: ToolIcons.hand, title: "Hand Tool (H)" },
      { id: "rotate-view", icon: ToolIcons.rotatView, title: "Rotate View Tool (R)" },
    ]
  },
  { 
    id: "zoom", 
    icon: ToolIcons.zoom, 
    title: "Zoom Tool (Z)",
  },
];

export const ToolsPalette: React.FC = () => {
  const [activeTool, setActiveTool] = useState("marquee");
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
    setExpandedTool(null);
  };

  const handleToolContextMenu = (e: React.MouseEvent, tool: Tool) => {
    if (tool.subtools && tool.subtools.length > 0) {
      e.preventDefault();
      setExpandedTool(expandedTool === tool.id ? null : tool.id);
    }
  };

  const swapColors = () => {
    const temp = foregroundColor;
    setForegroundColor(backgroundColor);
    setBackgroundColor(temp);
  };

  const resetColors = () => {
    setForegroundColor("#000000");
    setBackgroundColor("#ffffff");
  };

  return (
    <div className="w-tools-w bg-panel border-r border-border flex flex-col">
      {/* Tools grid */}
      <div className="flex-1 p-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-[2px]">
          {tools.map((tool) => (
            <div key={tool.id} className="relative">
              <button
                title={tool.title}
                onClick={() => handleToolClick(tool.id)}
                onContextMenu={(e) => handleToolContextMenu(e, tool)}
                className={`w-tool-btn h-tool-btn flex items-center justify-center border transition-colors relative ${
                  activeTool === tool.id
                    ? "bg-tool-active border-border-dark pressed"
                    : "bg-background border-border raised hover:bg-tool-hover"
                }`}
              >
                {tool.icon}
                {tool.subtools && tool.subtools.length > 0 && (
                  <span className="absolute bottom-0 right-0 text-[6px] leading-none">▸</span>
                )}
              </button>
              
              {/* Subtool flyout */}
              {expandedTool === tool.id && tool.subtools && (
                <div className="absolute left-full top-0 ml-1 bg-panel border border-border shadow-md z-50 min-w-[160px]">
                  {tool.subtools.map((subtool) => (
                    <button
                      key={subtool.id}
                      className="w-full flex items-center gap-2 px-2 py-1 text-xs hover:bg-menu-hover hover:text-menu-hover-foreground"
                      onClick={() => {
                        setActiveTool(tool.id);
                        setExpandedTool(null);
                      }}
                    >
                      <span className="w-4 h-4 flex items-center justify-center">
                        {subtool.icon}
                      </span>
                      <span>{subtool.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom section: Color swatches and mode buttons */}
      <div className="p-2 border-t border-border-light">
        {/* Foreground/Background color swatches */}
        <div className="relative w-[42px] h-[42px] mb-2 ml-1">
          {/* Background swatch */}
          <div
            className="absolute bottom-0 right-0 w-[24px] h-[24px] border border-border cursor-pointer"
            style={{ backgroundColor: backgroundColor }}
            title="Set background color"
          />
          {/* Foreground swatch */}
          <div
            className="absolute top-0 left-0 w-[24px] h-[24px] border border-border cursor-pointer"
            style={{ backgroundColor: foregroundColor }}
            title="Set foreground color"
          />
          {/* Swap icon */}
          <button 
            className="absolute top-0 right-0 w-3 h-3 flex items-center justify-center text-[8px] hover:bg-muted"
            title="Switch Foreground and Background Colors (X)"
            onClick={swapColors}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M1 3h6l-2-2M9 7H3l2 2" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
          </button>
          {/* Default icon */}
          <button 
            className="absolute bottom-0 left-0 w-3 h-3 flex items-center justify-center hover:bg-muted"
            title="Default Foreground and Background Colors (D)"
            onClick={resetColors}
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="0" y="4" width="4" height="4" fill="white" stroke="black" strokeWidth="0.5"/>
              <rect x="2" y="2" width="4" height="4" fill="black" stroke="black" strokeWidth="0.5"/>
            </svg>
          </button>
        </div>
        
        {/* Quick Mask / Screen mode buttons */}
        <div className="flex gap-[2px]">
          <button 
            className="w-[22px] h-[22px] bg-tool-active border border-border pressed flex items-center justify-center" 
            title="Edit in Standard Mode (Q)"
          >
            <svg width="14" height="14" viewBox="0 0 14 14">
              <rect x="2" y="2" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2"/>
            </svg>
          </button>
          <button 
            className="w-[22px] h-[22px] bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" 
            title="Edit in Quick Mask Mode (Q)"
          >
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="7" cy="7" r="3" fill="currentColor" opacity="0.3"/>
            </svg>
          </button>
        </div>
        
        {/* Screen mode buttons */}
        <div className="flex gap-[2px] mt-2">
          <button 
            className="w-[14px] h-[14px] bg-tool-active border border-border pressed flex items-center justify-center" 
            title="Standard Screen Mode (F)"
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </button>
          <button 
            className="w-[14px] h-[14px] bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" 
            title="Full Screen Mode with Menu Bar (F)"
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="0" y="0" width="10" height="10" fill="currentColor"/>
              <rect x="1" y="2" width="8" height="7" fill="white"/>
            </svg>
          </button>
          <button 
            className="w-[14px] h-[14px] bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" 
            title="Full Screen Mode (F)"
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="0" y="0" width="10" height="10" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
