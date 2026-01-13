import React from "react";

interface PropertiesPanelProps {
  selectedTool: string;
  selectedLayer?: string;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedTool,
  selectedLayer,
}) => {
  const renderBrushProperties = () => (
    <div className="space-y-3">
      <div className="text-xs font-medium border-b border-border-light pb-1">Brush Settings</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Size:</span>
          <div className="flex items-center gap-1">
            <input
              type="range"
              min="1"
              max="500"
              defaultValue="30"
              className="w-16 h-2"
            />
            <input
              type="text"
              defaultValue="30 px"
              className="w-12 h-[18px] px-1 text-xs bg-input border border-border inset-input text-right"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Hardness:</span>
          <div className="flex items-center gap-1">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="100"
              className="w-16 h-2"
            />
            <input
              type="text"
              defaultValue="100%"
              className="w-12 h-[18px] px-1 text-xs bg-input border border-border inset-input text-right"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Opacity:</span>
          <div className="flex items-center gap-1">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="100"
              className="w-16 h-2"
            />
            <input
              type="text"
              defaultValue="100%"
              className="w-12 h-[18px] px-1 text-xs bg-input border border-border inset-input text-right"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Flow:</span>
          <div className="flex items-center gap-1">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="100"
              className="w-16 h-2"
            />
            <input
              type="text"
              defaultValue="100%"
              className="w-12 h-[18px] px-1 text-xs bg-input border border-border inset-input text-right"
            />
          </div>
        </div>
      </div>
      <div className="pt-2 border-t border-border-light">
        <div className="text-xs text-muted-foreground mb-1">Brush Presets</div>
        <div className="grid grid-cols-5 gap-1">
          {[5, 10, 20, 30, 50, 100, 150, 200, 300, 500].map((size) => (
            <button
              key={size}
              className="w-8 h-8 bg-input border border-border flex items-center justify-center hover:bg-tool-hover"
            >
              <div
                className="rounded-full bg-foreground"
                style={{
                  width: Math.min(size / 20, 20),
                  height: Math.min(size / 20, 20),
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSelectionProperties = () => (
    <div className="space-y-3">
      <div className="text-xs font-medium border-b border-border-light pb-1">Selection</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Feather:</span>
          <input
            type="text"
            defaultValue="0 px"
            className="w-14 h-[18px] px-1 text-xs bg-input border border-border inset-input"
          />
        </div>
        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" defaultChecked className="w-3 h-3" />
          Anti-alias
        </label>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Style:</span>
          <select className="w-20 h-[18px] text-xs bg-input border border-border inset-input">
            <option>Normal</option>
            <option>Fixed Ratio</option>
            <option>Fixed Size</option>
          </select>
        </div>
      </div>
      <div className="pt-2 border-t border-border-light">
        <div className="text-xs text-muted-foreground mb-1">Selection Actions</div>
        <div className="flex flex-wrap gap-1">
          <button className="px-2 h-5 bg-background border border-border raised text-xs hover:bg-tool-hover">
            Select All
          </button>
          <button className="px-2 h-5 bg-background border border-border raised text-xs hover:bg-tool-hover">
            Deselect
          </button>
          <button className="px-2 h-5 bg-background border border-border raised text-xs hover:bg-tool-hover">
            Inverse
          </button>
        </div>
      </div>
    </div>
  );

  const renderTextProperties = () => (
    <div className="space-y-3">
      <div className="text-xs font-medium border-b border-border-light pb-1">Text</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Font:</span>
          <select className="w-24 h-[18px] text-xs bg-input border border-border inset-input">
            <option>Arial</option>
            <option>Helvetica</option>
            <option>Times</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Size:</span>
          <input
            type="text"
            defaultValue="12 pt"
            className="w-14 h-[18px] px-1 text-xs bg-input border border-border inset-input"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Weight:</span>
          <select className="w-20 h-[18px] text-xs bg-input border border-border inset-input">
            <option>Regular</option>
            <option>Bold</option>
            <option>Light</option>
          </select>
        </div>
        <div className="flex items-center gap-1 pt-1">
          <button className="w-6 h-5 bg-background border border-border raised text-xs font-bold">B</button>
          <button className="w-6 h-5 bg-background border border-border raised text-xs italic">I</button>
          <button className="w-6 h-5 bg-background border border-border raised text-xs underline">U</button>
          <button className="w-6 h-5 bg-background border border-border raised text-xs line-through">S</button>
        </div>
      </div>
    </div>
  );

  const renderShapeProperties = () => (
    <div className="space-y-3">
      <div className="text-xs font-medium border-b border-border-light pb-1">Shape</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Fill:</span>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-foreground border border-border cursor-pointer" />
            <select className="w-14 h-[18px] text-xs bg-input border border-border inset-input">
              <option>Solid</option>
              <option>Gradient</option>
              <option>Pattern</option>
              <option>None</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Stroke:</span>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 border-2 border-foreground cursor-pointer" />
            <input
              type="text"
              defaultValue="1 px"
              className="w-10 h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Corner:</span>
          <input
            type="text"
            defaultValue="0 px"
            className="w-14 h-[18px] px-1 text-xs bg-input border border-border inset-input"
          />
        </div>
      </div>
    </div>
  );

  const renderLayerProperties = () => (
    <div className="space-y-3">
      <div className="text-xs font-medium border-b border-border-light pb-1">
        Layer: {selectedLayer || "None"}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Blend:</span>
          <select className="w-20 h-[18px] text-xs bg-input border border-border inset-input">
            <option>Normal</option>
            <option>Multiply</option>
            <option>Screen</option>
            <option>Overlay</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Opacity:</span>
          <div className="flex items-center gap-1">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="100"
              className="w-16 h-2"
            />
            <span className="text-xs w-8 text-right">100%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Fill:</span>
          <div className="flex items-center gap-1">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="100"
              className="w-16 h-2"
            />
            <span className="text-xs w-8 text-right">100%</span>
          </div>
        </div>
      </div>
      <div className="pt-2 border-t border-border-light">
        <div className="text-xs text-muted-foreground mb-1">Quick Actions</div>
        <div className="flex flex-wrap gap-1">
          <button className="px-2 h-5 bg-background border border-border raised text-xs hover:bg-tool-hover">
            Duplicate
          </button>
          <button className="px-2 h-5 bg-background border border-border raised text-xs hover:bg-tool-hover">
            Merge
          </button>
          <button className="px-2 h-5 bg-background border border-border raised text-xs hover:bg-tool-hover">
            Flatten
          </button>
        </div>
      </div>
    </div>
  );

  const renderDefaultProperties = () => (
    <div className="space-y-3">
      <div className="text-xs font-medium border-b border-border-light pb-1">Properties</div>
      <div className="text-xs text-muted-foreground text-center py-4">
        Select a tool or layer to see properties
      </div>
    </div>
  );

  const getPropertiesContent = () => {
    switch (selectedTool) {
      case "brush":
      case "pencil":
      case "eraser":
      case "clone":
      case "history":
      case "healing":
        return renderBrushProperties();
      case "marquee":
      case "lasso":
      case "magic-wand":
        return renderSelectionProperties();
      case "text":
        return renderTextProperties();
      case "shape":
      case "rectangle":
      case "ellipse":
      case "polygon":
      case "line":
        return renderShapeProperties();
      case "move":
        return renderLayerProperties();
      default:
        if (selectedLayer) {
          return renderLayerProperties();
        }
        return renderDefaultProperties();
    }
  };

  return <div className="h-full overflow-auto">{getPropertiesContent()}</div>;
};
