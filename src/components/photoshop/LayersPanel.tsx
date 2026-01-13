import React, { useState } from "react";
import { Panel } from "./Panel";

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  selected: boolean;
  thumbnail?: string;
}

export const LayersPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("layers");
  const [layers, setLayers] = useState<Layer[]>([
    { id: "1", name: "Background", visible: true, locked: true, selected: true },
  ]);

  const tabs = [
    { id: "layers", label: "Layers" },
    { id: "channels", label: "Channels" },
    { id: "paths", label: "Paths" },
  ];

  const toggleVisibility = (id: string) => {
    setLayers(layers.map(l => 
      l.id === id ? { ...l, visible: !l.visible } : l
    ));
  };

  const selectLayer = (id: string) => {
    setLayers(layers.map(l => ({ ...l, selected: l.id === id })));
  };

  return (
    <Panel tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} title="Layers">
      {activeTab === "layers" && (
        <div className="flex flex-col" style={{ minHeight: '150px' }}>
          {/* Blend mode and opacity row */}
          <div className="flex gap-1 mb-2">
            <select className="flex-1 h-[18px] text-xs bg-input border border-border inset-input">
              <option>Normal</option>
              <option>Dissolve</option>
              <option>Multiply</option>
              <option>Screen</option>
              <option>Overlay</option>
            </select>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Opacity:</span>
              <input
                type="text"
                defaultValue="100%"
                className="w-[40px] h-[18px] px-1 text-xs bg-input border border-border inset-input text-right"
              />
            </div>
          </div>
          
          {/* Lock buttons row */}
          <div className="flex items-center gap-1 mb-2 pb-1 border-b border-border-light">
            <span className="text-xs text-muted-foreground">Lock:</span>
            <button className="w-4 h-4 bg-background border border-border raised flex items-center justify-center text-2xs" title="Lock transparent pixels">
              ▦
            </button>
            <button className="w-4 h-4 bg-background border border-border raised flex items-center justify-center text-2xs" title="Lock image pixels">
              🖌
            </button>
            <button className="w-4 h-4 bg-background border border-border raised flex items-center justify-center text-2xs" title="Lock position">
              ↔
            </button>
            <button className="w-4 h-4 bg-background border border-border raised flex items-center justify-center text-2xs" title="Lock all">
              🔒
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Fill:</span>
              <input
                type="text"
                defaultValue="100%"
                className="w-[40px] h-[18px] px-1 text-xs bg-input border border-border inset-input text-right"
              />
            </div>
          </div>
          
          {/* Layers list */}
          <div className="flex-1 bg-input border border-border inset-input min-h-[80px]">
            {layers.map((layer) => (
              <div
                key={layer.id}
                onClick={() => selectLayer(layer.id)}
                className={`flex items-center gap-1 px-1 py-0.5 cursor-pointer ${
                  layer.selected ? "bg-layer-selected" : "hover:bg-muted"
                }`}
              >
                {/* Visibility toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVisibility(layer.id);
                  }}
                  className="w-4 h-4 flex items-center justify-center text-xs"
                >
                  {layer.visible ? "👁" : ""}
                </button>
                
                {/* Chain link placeholder */}
                <div className="w-3 h-4" />
                
                {/* Layer thumbnail */}
                <div className="w-8 h-6 bg-swatch-background border border-border flex items-center justify-center">
                  <div className="w-6 h-4 bg-gradient-to-br from-gray-100 to-gray-300" />
                </div>
                
                {/* Layer name */}
                <span className="flex-1 text-xs truncate">{layer.name}</span>
                
                {/* Lock icon */}
                {layer.locked && (
                  <span className="text-xs">🔒</span>
                )}
              </div>
            ))}
          </div>
          
          {/* Bottom action buttons */}
          <div className="flex gap-1 mt-2 pt-1 border-t border-border-light">
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center text-xs" title="Link layers">
              🔗
            </button>
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center text-xs" title="Add layer style">
              ƒx
            </button>
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center text-xs" title="Add layer mask">
              ◐
            </button>
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center text-xs" title="Create new fill or adjustment layer">
              ◑
            </button>
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center text-xs" title="Create a new group">
              📁
            </button>
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center text-xs" title="Create a new layer">
              📄
            </button>
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center text-xs" title="Delete layer">
              🗑
            </button>
          </div>
        </div>
      )}
      {activeTab === "channels" && (
        <div className="min-h-[150px] flex items-center justify-center">
          <span className="text-xs text-muted-foreground">RGB Channels</span>
        </div>
      )}
      {activeTab === "paths" && (
        <div className="min-h-[150px] flex items-center justify-center">
          <span className="text-xs text-muted-foreground">No paths defined</span>
        </div>
      )}
    </Panel>
  );
};
