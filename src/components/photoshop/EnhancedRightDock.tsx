import React, { useState, useEffect, createContext, useContext } from "react";
import { DraggablePanel, FloatingWindow, usePanelContext } from "./DockablePanel";
import { ColorPickerPanel } from "./ColorPickerPanel";
import { HistoryPanelContent } from "./HistoryPanel";
import { NavigatorPanelContent } from "./NavigatorPanel";
import { ActionsPanelContent } from "./ActionsPanel";
import { PropertiesPanel } from "./PropertiesPanel";

// Tool context for sharing selected tool state
interface ToolContextType {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}

const ToolContext = createContext<ToolContextType | null>(null);

export const useToolContext = () => {
  const context = useContext(ToolContext);
  return context;
};

export const ToolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState("marquee");
  return (
    <ToolContext.Provider value={{ selectedTool, setSelectedTool }}>
      {children}
    </ToolContext.Provider>
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

// Layers Panel Content
const LayersPanelContent: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState("background");
  const [layerVisibility, setLayerVisibility] = useState<Record<string, boolean>>({
    background: true,
    layer1: true,
  });

  const layers = [
    { id: "layer1", name: "Layer 1", type: "normal" },
    { id: "background", name: "Background", type: "locked" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Blend mode and opacity */}
      <div className="flex gap-1 mb-2">
        <select className="flex-1 h-[18px] text-xs bg-input border border-border inset-input">
          <option>Normal</option>
          <option>Multiply</option>
          <option>Screen</option>
          <option>Overlay</option>
        </select>
        <span className="text-2xs text-muted-foreground">Opacity:</span>
        <input type="text" defaultValue="100%" className="w-12 h-[18px] px-1 text-xs bg-input border border-border inset-input text-right" />
      </div>

      {/* Lock options */}
      <div className="flex items-center gap-1 mb-2 pb-2 border-b border-border-light">
        <span className="text-2xs text-muted-foreground">Lock:</span>
        <button className="w-4 h-4 bg-background border border-border raised text-2xs" title="Lock transparent pixels">🔲</button>
        <button className="w-4 h-4 bg-background border border-border raised text-2xs" title="Lock image pixels">🖌</button>
        <button className="w-4 h-4 bg-background border border-border raised text-2xs" title="Lock position">↔</button>
        <button className="w-4 h-4 bg-background border border-border raised text-2xs" title="Lock all">🔒</button>
        <div className="flex-1" />
        <span className="text-2xs text-muted-foreground">Fill:</span>
        <input type="text" defaultValue="100%" className="w-10 h-[16px] px-1 text-2xs bg-input border border-border inset-input text-right" />
      </div>

      {/* Layer list */}
      <div className="flex-1 bg-input border border-border inset-input overflow-auto min-h-[80px]">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`flex items-center gap-1 p-1 cursor-pointer ${
              selectedLayer === layer.id ? "bg-layer-selected text-layer-selected-foreground" : "hover:bg-muted"
            }`}
            onClick={() => setSelectedLayer(layer.id)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLayerVisibility((prev) => ({ ...prev, [layer.id]: !prev[layer.id] }));
              }}
              className="w-4 h-4 flex items-center justify-center text-xs"
            >
              {layerVisibility[layer.id] ? "👁" : "○"}
            </button>
            <div className={`w-8 h-6 border border-border ${layer.type === "locked" ? "bg-white" : "bg-checker"}`} />
            <span className="text-xs flex-1">{layer.name}</span>
            {layer.type === "locked" && <span className="text-2xs">🔒</span>}
          </div>
        ))}
      </div>

      {/* Layer actions */}
      <div className="flex gap-1 mt-2 pt-2 border-t border-border-light">
        <button className="w-6 h-5 bg-background border border-border raised text-2xs" title="Link layers">🔗</button>
        <button className="w-6 h-5 bg-background border border-border raised text-2xs" title="Add layer style">fx</button>
        <button className="w-6 h-5 bg-background border border-border raised text-2xs" title="Add layer mask">◐</button>
        <button className="w-6 h-5 bg-background border border-border raised text-2xs" title="New adjustment layer">◑</button>
        <button className="w-6 h-5 bg-background border border-border raised text-2xs" title="New group">📁</button>
        <button className="w-6 h-5 bg-background border border-border raised text-2xs" title="New layer">+</button>
        <button className="w-6 h-5 bg-background border border-border raised text-2xs" title="Delete layer">🗑</button>
      </div>
    </div>
  );
};

export const EnhancedRightDock: React.FC = () => {
  const { panels, setPanels, closePanel, openPanel, toggleCollapsePanel, undockPanel, dockPanel } = usePanelContext();
  const [activeLayerTab, setActiveLayerTab] = useState("layers");
  const toolContext = useToolContext();
  const selectedTool = toolContext?.selectedTool || "marquee";

  // Initialize panels
  useEffect(() => {
    setPanels([
      { id: "colorpicker", title: "Color", component: null, isFloating: false, isClosed: false, isCollapsed: false, position: { x: 0, y: 0 }, size: { width: 280, height: 200 }, order: 0 },
      { id: "properties", title: "Properties", component: null, isFloating: false, isClosed: false, isCollapsed: false, position: { x: 0, y: 0 }, size: { width: 280, height: 180 }, order: 1 },
      { id: "layers", title: "Layers", component: null, isFloating: false, isClosed: false, isCollapsed: false, position: { x: 0, y: 0 }, size: { width: 280, height: 200 }, order: 2 },
      { id: "history", title: "History", component: null, isFloating: false, isClosed: false, isCollapsed: false, position: { x: 0, y: 0 }, size: { width: 280, height: 150 }, order: 3 },
      { id: "navigator", title: "Navigator", component: null, isFloating: false, isClosed: false, isCollapsed: false, position: { x: 0, y: 0 }, size: { width: 280, height: 180 }, order: 4 },
      { id: "actions", title: "Actions", component: null, isFloating: false, isClosed: false, isCollapsed: false, position: { x: 0, y: 0 }, size: { width: 280, height: 150 }, order: 5 },
      { id: "character", title: "Character", component: null, isFloating: false, isClosed: false, isCollapsed: false, position: { x: 0, y: 0 }, size: { width: 280, height: 150 }, order: 6 },
    ]);
  }, [setPanels]);

  const dockedPanels = panels.filter((p) => !p.isFloating && !p.isClosed).sort((a, b) => a.order - b.order);
  const floatingPanels = panels.filter((p) => p.isFloating && !p.isClosed);
  const closedPanels = panels.filter((p) => p.isClosed);

  // Render panel content based on ID
  const renderPanelContent = (panelId: string, isFloating: boolean = false) => {
    const panel = panels.find(p => p.id === panelId);
    const isCollapsed = panel?.isCollapsed || false;

    const content = (() => {
      switch (panelId) {
        case "colorpicker":
          return <ColorPickerPanel />;
        case "properties":
          return <PropertiesPanel selectedTool={selectedTool} selectedLayer="Background" />;
        case "layers":
          return (
            <>
              {activeLayerTab === "layers" ? (
                <LayersPanelContent />
              ) : (
                <div className="text-xs text-muted-foreground text-center py-2">
                  {activeLayerTab === "channels" ? "RGB, Red, Green, Blue" : "No paths"}
                </div>
              )}
            </>
          );
        case "history":
          return <HistoryPanelContent />;
        case "navigator":
          return <NavigatorPanelContent />;
        case "actions":
          return <ActionsPanelContent />;
        case "character":
          return <CharacterPanelContent />;
        default:
          return null;
      }
    })();

    if (isFloating) return content;

    const tabs = panelId === "layers" ? [
      { id: "layers", label: "Layers" },
      { id: "channels", label: "Channels" },
      { id: "paths", label: "Paths" },
    ] : undefined;

    return (
      <DraggablePanel
        id={panelId}
        title={panel?.title || panelId}
        tabs={tabs}
        activeTab={tabs ? activeLayerTab : undefined}
        onTabChange={tabs ? setActiveLayerTab : undefined}
        isCollapsed={isCollapsed}
        onClose={() => closePanel(panelId)}
        onUndock={() => undockPanel(panelId)}
        onCollapse={() => toggleCollapsePanel(panelId)}
      >
        {content}
      </DraggablePanel>
    );
  };

  return (
    <>
      <div className="w-dock-w bg-panel border-l border-border flex flex-col overflow-hidden">
        {/* Closed panels menu */}
        {closedPanels.length > 0 && (
          <div className="px-2 py-1 border-b border-border-light bg-panel-header">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-2xs text-muted-foreground">Closed:</span>
              {closedPanels.map((panel) => (
                <button
                  key={panel.id}
                  onClick={() => openPanel(panel.id)}
                  className="px-1.5 py-0.5 text-2xs bg-background border border-border rounded hover:bg-tool-hover"
                  title={`Open ${panel.title}`}
                >
                  {panel.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Docked panels - flex layout for auto-sizing */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {dockedPanels.map((panel) => (
            <div key={panel.id} className={`${panel.isCollapsed ? 'flex-shrink-0' : 'flex-1 min-h-0'} overflow-hidden`}>
              {renderPanelContent(panel.id)}
            </div>
          ))}
        </div>
      </div>

      {/* Floating windows */}
      {floatingPanels.map((panel) => (
        <FloatingWindow
          key={panel.id}
          id={panel.id}
          title={panel.title}
          position={panel.position}
          size={panel.size}
          onClose={() => closePanel(panel.id)}
          onDock={() => dockPanel(panel.id)}
        >
          <div className="p-2 h-full overflow-auto">
            {renderPanelContent(panel.id, true)}
          </div>
        </FloatingWindow>
      ))}
    </>
  );
};
