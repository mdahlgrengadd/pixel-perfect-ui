import React, { useState, useEffect } from "react";
import { Panel as ResizablePanel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { DraggablePanel, FloatingWindow, usePanelContext } from "./DockablePanel";
import { ColorPickerPanel } from "./ColorPickerPanel";
import { HistoryPanel } from "./HistoryPanel";
import { NavigatorPanel } from "./NavigatorPanel";
import { ActionsPanel } from "./ActionsPanel";

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

const ResizeHandle: React.FC = () => (
  <PanelResizeHandle className="h-1 bg-border-light hover:bg-accent cursor-row-resize flex items-center justify-center group">
    <div className="w-8 h-0.5 bg-muted-foreground rounded opacity-50 group-hover:opacity-100" />
  </PanelResizeHandle>
);

export const EnhancedRightDock: React.FC = () => {
  const { panels, setPanels, dockPanel } = usePanelContext();
  const [activeLayerTab, setActiveLayerTab] = useState("layers");

  // Initialize panels
  useEffect(() => {
    setPanels([
      { id: "colorpicker", title: "Color", component: null, isFloating: false, position: { x: 0, y: 0 }, size: { width: 280, height: 200 }, order: 0 },
      { id: "layers", title: "Layers", component: null, isFloating: false, position: { x: 0, y: 0 }, size: { width: 280, height: 200 }, order: 1 },
      { id: "history", title: "History", component: null, isFloating: false, position: { x: 0, y: 0 }, size: { width: 280, height: 150 }, order: 2 },
      { id: "navigator", title: "Navigator", component: null, isFloating: false, position: { x: 0, y: 0 }, size: { width: 280, height: 180 }, order: 3 },
      { id: "actions", title: "Actions", component: null, isFloating: false, position: { x: 0, y: 0 }, size: { width: 280, height: 150 }, order: 4 },
      { id: "character", title: "Character", component: null, isFloating: false, position: { x: 0, y: 0 }, size: { width: 280, height: 150 }, order: 5 },
    ]);
  }, [setPanels]);

  const dockedPanels = panels.filter((p) => !p.isFloating).sort((a, b) => a.order - b.order);
  const floatingPanels = panels.filter((p) => p.isFloating);

  // Render panel content based on ID
  const renderPanelContent = (panelId: string) => {
    switch (panelId) {
      case "colorpicker":
        return <ColorPickerPanel />;
      case "layers":
        return (
          <DraggablePanel
            id="layers"
            title="Layers"
            tabs={[
              { id: "layers", label: "Layers" },
              { id: "channels", label: "Channels" },
              { id: "paths", label: "Paths" },
            ]}
            activeTab={activeLayerTab}
            onTabChange={setActiveLayerTab}
          >
            {activeLayerTab === "layers" ? (
              <LayersPanelContent />
            ) : (
              <div className="text-xs text-muted-foreground text-center py-2">
                {activeLayerTab === "channels" ? "RGB, Red, Green, Blue" : "No paths"}
              </div>
            )}
          </DraggablePanel>
        );
      case "history":
        return <HistoryPanel />;
      case "navigator":
        return <NavigatorPanel />;
      case "actions":
        return <ActionsPanel />;
      case "character":
        return (
          <DraggablePanel id="character" title="Character">
            <CharacterPanelContent />
          </DraggablePanel>
        );
      default:
        return null;
    }
  };

  // Calculate panel sizes based on count
  const getPanelSize = (index: number, total: number) => {
    if (total <= 3) return 100 / total;
    if (index < 2) return 25; // First two panels get 25%
    return 50 / (total - 2); // Rest share remaining 50%
  };

  return (
    <>
      <div className="w-dock-w bg-panel border-l border-border flex flex-col overflow-hidden">
        <PanelGroup direction="vertical" className="flex-1">
          {dockedPanels.map((panel, index) => (
            <React.Fragment key={panel.id}>
              {index > 0 && <ResizeHandle />}
              <ResizablePanel 
                defaultSize={getPanelSize(index, dockedPanels.length)} 
                minSize={8}
              >
                <div className="h-full overflow-auto">
                  {renderPanelContent(panel.id)}
                </div>
              </ResizablePanel>
            </React.Fragment>
          ))}
        </PanelGroup>
      </div>

      {/* Floating windows */}
      {floatingPanels.map((panel) => (
        <FloatingWindow
          key={panel.id}
          id={panel.id}
          title={panel.title}
          position={panel.position}
          size={panel.size}
          onClose={() => dockPanel(panel.id)}
          onDock={() => dockPanel(panel.id)}
        >
          {renderPanelContent(panel.id)}
        </FloatingWindow>
      ))}
    </>
  );
};
