import React, { useState, useEffect } from "react";
import { Panel as ResizablePanel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { DraggablePanel, FloatingWindow, usePanelContext } from "./DockablePanel";

// Color Panel Content
const ColorPanelContent: React.FC = () => {
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  const SliderRow = ({ label, color, value, onChange }: {
    label: string;
    color: string;
    value: number;
    onChange: (v: number) => void;
  }) => (
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

  return (
    <div>
      <SliderRow label="R" color="R" value={rgb.r} onChange={(v) => setRgb({ ...rgb, r: v })} />
      <SliderRow label="G" color="G" value={rgb.g} onChange={(v) => setRgb({ ...rgb, g: v })} />
      <SliderRow label="B" color="B" value={rgb.b} onChange={(v) => setRgb({ ...rgb, b: v })} />
      <div className="mt-2 h-3 border border-border" style={{
        background: "linear-gradient(to right, #000, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #fff)"
      }} />
    </div>
  );
};

// Character Panel Content
const CharacterPanelContent: React.FC = () => (
  <div className="space-y-2">
    <div className="flex gap-1">
      <select className="flex-1 h-[18px] text-xs bg-input border border-border inset-input">
        <option>Myriad Pro</option>
        <option>Arial</option>
      </select>
    </div>
    <div className="flex gap-1">
      <select className="flex-1 h-[18px] text-xs bg-input border border-border inset-input">
        <option>Regular</option>
        <option>Bold</option>
      </select>
    </div>
    <div className="flex gap-1">
      <input type="text" defaultValue="12 pt" className="flex-1 h-[18px] px-1 text-xs bg-input border border-border inset-input" />
      <input type="text" defaultValue="(Auto)" className="flex-1 h-[18px] px-1 text-xs bg-input border border-border inset-input" />
    </div>
    <div className="flex gap-1 pt-1 border-t border-border-light">
      <button className="w-6 h-5 bg-background border border-border raised text-xs font-bold">T</button>
      <button className="w-6 h-5 bg-background border border-border raised text-xs italic">T</button>
      <button className="w-6 h-5 bg-background border border-border raised text-xs uppercase">TT</button>
    </div>
  </div>
);

// Paragraph Panel Content
const ParagraphPanelContent: React.FC = () => (
  <div className="space-y-2">
    <div className="flex gap-1">
      {["left", "center", "right", "justify"].map((align) => (
        <button
          key={align}
          className="w-5 h-5 bg-background border border-border raised flex items-center justify-center"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" className="text-foreground">
            <line x1="1" y1="2" x2={align === "right" ? "9" : align === "center" ? "8" : "7"} y2="2" stroke="currentColor" strokeWidth="1"/>
            <line x1={align === "left" ? "1" : align === "center" ? "2" : "3"} y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1"/>
            <line x1="1" y1="8" x2={align === "justify" ? "9" : "6"} y2="8" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </button>
      ))}
    </div>
    <div className="flex gap-1">
      <input type="text" defaultValue="0 pt" className="flex-1 h-[18px] px-1 text-xs bg-input border border-border inset-input" />
      <input type="text" defaultValue="0 pt" className="flex-1 h-[18px] px-1 text-xs bg-input border border-border inset-input" />
    </div>
  </div>
);

// Layers Panel Content
const LayersPanelContent: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState("background");
  const [layerVisibility, setLayerVisibility] = useState<Record<string, boolean>>({
    background: true,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 mb-2">
        <select className="flex-1 h-[18px] text-xs bg-input border border-border inset-input">
          <option>Normal</option>
          <option>Multiply</option>
        </select>
        <span className="text-xs">Opacity:</span>
        <input type="text" defaultValue="100%" className="w-12 h-[18px] px-1 text-xs bg-input border border-border inset-input" />
      </div>
      <div className="flex-1 bg-input border border-border inset-input overflow-auto">
        <div
          className={`flex items-center gap-1 p-1 cursor-pointer ${
            selectedLayer === "background" ? "bg-accent text-accent-foreground" : "hover:bg-muted"
          }`}
          onClick={() => setSelectedLayer("background")}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLayerVisibility((prev) => ({ ...prev, background: !prev.background }));
            }}
            className="w-4 h-4 flex items-center justify-center"
          >
            {layerVisibility.background ? "👁" : "○"}
          </button>
          <div className="w-8 h-6 bg-white border border-border" />
          <span className="text-xs flex-1">Background</span>
          <span className="text-2xs text-muted-foreground">🔒</span>
        </div>
      </div>
      <div className="flex gap-1 mt-2 pt-2 border-t border-border-light">
        <button className="flex-1 h-5 bg-background border border-border raised text-2xs">New</button>
        <button className="flex-1 h-5 bg-background border border-border raised text-2xs">Group</button>
        <button className="flex-1 h-5 bg-background border border-border raised text-2xs">Del</button>
      </div>
    </div>
  );
};

// Panel configuration
interface PanelConfig {
  id: string;
  title: string;
  tabs?: { id: string; label: string }[];
  defaultTab?: string;
  content: React.ReactNode;
}

const ResizeHandle: React.FC = () => (
  <PanelResizeHandle className="h-1 bg-border-light hover:bg-accent cursor-row-resize flex items-center justify-center group">
    <div className="w-8 h-0.5 bg-muted-foreground rounded opacity-50 group-hover:opacity-100" />
  </PanelResizeHandle>
);

export const EnhancedRightDock: React.FC = () => {
  const { panels, setPanels, dockPanel } = usePanelContext();
  const [activeColorTab, setActiveColorTab] = useState("color");
  const [activeLayerTab, setActiveLayerTab] = useState("layers");

  // Initialize panels
  useEffect(() => {
    setPanels([
      { id: "color", title: "Color", component: <ColorPanelContent />, isFloating: false, position: { x: 0, y: 0 }, size: { width: 280, height: 150 }, order: 0 },
      { id: "character", title: "Character", component: <CharacterPanelContent />, isFloating: false, position: { x: 0, y: 0 }, size: { width: 280, height: 180 }, order: 1 },
      { id: "paragraph", title: "Paragraph", component: <ParagraphPanelContent />, isFloating: false, position: { x: 0, y: 0 }, size: { width: 280, height: 100 }, order: 2 },
      { id: "layers", title: "Layers", component: <LayersPanelContent />, isFloating: false, position: { x: 0, y: 0 }, size: { width: 280, height: 200 }, order: 3 },
    ]);
  }, [setPanels]);

  const dockedPanels = panels.filter((p) => !p.isFloating).sort((a, b) => a.order - b.order);
  const floatingPanels = panels.filter((p) => p.isFloating);

  // Panel contents with tabs configuration
  const getPanelContent = (panelId: string) => {
    switch (panelId) {
      case "color":
        return {
          tabs: [
            { id: "color", label: "Color" },
            { id: "swatches", label: "Swatches" },
            { id: "styles", label: "Styles" },
          ],
          activeTab: activeColorTab,
          onTabChange: setActiveColorTab,
          content: activeColorTab === "color" ? <ColorPanelContent /> : (
            <div className="text-xs text-muted-foreground text-center py-2">
              {activeColorTab === "swatches" ? (
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
              ) : "No styles defined"}
            </div>
          ),
        };
      case "layers":
        return {
          tabs: [
            { id: "layers", label: "Layers" },
            { id: "channels", label: "Channels" },
            { id: "paths", label: "Paths" },
          ],
          activeTab: activeLayerTab,
          onTabChange: setActiveLayerTab,
          content: activeLayerTab === "layers" ? <LayersPanelContent /> : (
            <div className="text-xs text-muted-foreground text-center py-2">
              {activeLayerTab === "channels" ? "RGB, Red, Green, Blue" : "No paths"}
            </div>
          ),
        };
      default:
        return { content: panels.find((p) => p.id === panelId)?.component };
    }
  };

  return (
    <>
      <div className="w-dock-w bg-panel border-l border-border flex flex-col overflow-hidden">
        <PanelGroup direction="vertical" className="flex-1">
          {dockedPanels.map((panel, index) => {
            const config = getPanelContent(panel.id);
            const defaultSize = index === dockedPanels.length - 1 ? 35 : 20 + index * 5;
            
            return (
              <React.Fragment key={panel.id}>
                {index > 0 && <ResizeHandle />}
                <ResizablePanel defaultSize={defaultSize} minSize={10}>
                  <div className="h-full overflow-auto">
                    <DraggablePanel
                      id={panel.id}
                      title={panel.title}
                      tabs={config.tabs}
                      activeTab={config.activeTab}
                      onTabChange={config.onTabChange}
                    >
                      {config.content}
                    </DraggablePanel>
                  </div>
                </ResizablePanel>
              </React.Fragment>
            );
          })}
        </PanelGroup>
      </div>

      {/* Floating windows */}
      {floatingPanels.map((panel) => {
        const config = getPanelContent(panel.id);
        return (
          <FloatingWindow
            key={panel.id}
            id={panel.id}
            title={panel.title}
            position={panel.position}
            size={panel.size}
            onClose={() => dockPanel(panel.id)}
            onDock={() => dockPanel(panel.id)}
          >
            {config.content}
          </FloatingWindow>
        );
      })}
    </>
  );
};
