import React, { useState } from "react";
import { Panel } from "./Panel";

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  selected: boolean;
  thumbnail?: string;
  opacity?: number;
}

export const LayersPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("layers");
  const [layers, setLayers] = useState<Layer[]>([
    { id: "1", name: "Background", visible: true, locked: true, selected: true, opacity: 100 },
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

  const addLayer = () => {
    const newId = String(layers.length + 1);
    setLayers([
      { id: newId, name: `Layer ${newId}`, visible: true, locked: false, selected: true, opacity: 100 },
      ...layers.map(l => ({ ...l, selected: false }))
    ]);
  };

  return (
    <Panel tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} title="Layers">
      {activeTab === "layers" && (
        <div className="flex flex-col h-full">
          {/* Blend mode and opacity row */}
          <div className="flex gap-1 mb-2 shrink-0">
            <select className="flex-1 h-[18px] text-xs bg-input border border-border inset-input">
              <option>Normal</option>
              <option>Dissolve</option>
              <option>Darken</option>
              <option>Multiply</option>
              <option>Color Burn</option>
              <option>Linear Burn</option>
              <option>Darker Color</option>
              <option>Lighten</option>
              <option>Screen</option>
              <option>Color Dodge</option>
              <option>Linear Dodge</option>
              <option>Lighter Color</option>
              <option>Overlay</option>
              <option>Soft Light</option>
              <option>Hard Light</option>
              <option>Vivid Light</option>
              <option>Linear Light</option>
              <option>Pin Light</option>
              <option>Hard Mix</option>
              <option>Difference</option>
              <option>Exclusion</option>
              <option>Hue</option>
              <option>Saturation</option>
              <option>Color</option>
              <option>Luminosity</option>
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
          <div className="flex items-center gap-1 mb-2 pb-1 border-b border-border-light shrink-0">
            <span className="text-xs text-muted-foreground">Lock:</span>
            <button className="w-4 h-4 bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" title="Lock transparent pixels">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2"/>
              </svg>
            </button>
            <button className="w-4 h-4 bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" title="Lock image pixels">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M2 8V4h1V3c0-1.1.9-2 2-2s2 .9 2 2v1h1v4H2zM4 4h2V3c0-.6-.4-1-1-1s-1 .4-1 1v1z"/>
              </svg>
            </button>
            <button className="w-4 h-4 bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" title="Lock position">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M5 2l3 3h-2v3H4V5H2z"/>
              </svg>
            </button>
            <button className="w-4 h-4 bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" title="Lock all">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M2 9V4h1V3c0-1.7 1.3-3 3-3s3 1.3 3 3v1h1v5H2zM4 4h3V3c0-1-.7-1.5-1.5-1.5S4 2 4 3v1z"/>
              </svg>
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
          <div className="flex-1 bg-input border border-border inset-input min-h-[60px] overflow-y-auto">
            {layers.map((layer) => (
              <div
                key={layer.id}
                onClick={() => selectLayer(layer.id)}
                className={`flex items-center gap-1 px-1 py-0.5 cursor-pointer border-b border-border-light last:border-0 ${
                  layer.selected ? "bg-layer-selected" : "hover:bg-muted"
                }`}
              >
                {/* Visibility toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVisibility(layer.id);
                  }}
                  className="w-4 h-4 flex items-center justify-center"
                  title={layer.visible ? "Hide layer" : "Show layer"}
                >
                  {layer.visible && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <ellipse cx="6" cy="6" rx="5" ry="3" fill="none" stroke="currentColor" strokeWidth="1"/>
                      <circle cx="6" cy="6" r="1.5"/>
                    </svg>
                  )}
                </button>
                
                {/* Chain link placeholder */}
                <div className="w-3 h-4" />
                
                {/* Layer thumbnail */}
                <div className="w-10 h-7 bg-swatch-background border border-border flex items-center justify-center shrink-0">
                  <div className="w-8 h-5 bg-gradient-to-br from-gray-100 to-gray-300 border border-gray-400" />
                </div>
                
                {/* Layer name */}
                <span className="flex-1 text-xs truncate">{layer.name}</span>
                
                {/* Lock icon */}
                {layer.locked && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="shrink-0">
                    <path d="M2 9V4h1V3c0-1.7 1.3-3 3-3s3 1.3 3 3v1h1v5H2zM4 4h3V3c0-1-.7-1.5-1.5-1.5S4 2 4 3v1z"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
          
          {/* Bottom action buttons */}
          <div className="flex gap-1 mt-2 pt-1 border-t border-border-light shrink-0">
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" title="Link layers">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M4 5h4M3 7c-1 0-2-1-2-2s1-2 2-2h2M7 3h2c1 0 2 1 2 2s-1 2-2 2H7"/>
              </svg>
            </button>
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover text-[8px] font-bold" title="Add layer style">
              fx
            </button>
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" title="Add layer mask">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <rect x="2" y="2" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="6" cy="6" r="2"/>
              </svg>
            </button>
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" title="Create new fill or adjustment layer">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <circle cx="6" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="1"/>
                <path d="M6 2v8" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </button>
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" title="Create a new group">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M2 3v7h8V5H6l-1-2z"/>
              </svg>
            </button>
            <button 
              className="w-5 h-5 bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" 
              title="Create a new layer"
              onClick={addLayer}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M2 2h6l2 2v6H2z"/>
                <path d="M4 2V0h6l2 2v6h-2" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </svg>
            </button>
            <button className="w-5 h-5 bg-background border border-border raised flex items-center justify-center hover:bg-tool-hover" title="Delete layer">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M3 3v7h6V3zM2 2h8M5 1h2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      {activeTab === "channels" && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-input border border-border inset-input">
            <div className="flex items-center gap-1 px-1 py-0.5 bg-layer-selected">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <ellipse cx="6" cy="6" rx="5" ry="3" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="6" cy="6" r="1.5"/>
              </svg>
              <span className="flex-1 text-xs">RGB</span>
              <span className="text-xs text-muted-foreground">Ctrl+~</span>
            </div>
            <div className="flex items-center gap-1 px-1 py-0.5 hover:bg-muted">
              <div className="w-3" />
              <span className="flex-1 text-xs text-red-600">Red</span>
              <span className="text-xs text-muted-foreground">Ctrl+1</span>
            </div>
            <div className="flex items-center gap-1 px-1 py-0.5 hover:bg-muted">
              <div className="w-3" />
              <span className="flex-1 text-xs text-green-600">Green</span>
              <span className="text-xs text-muted-foreground">Ctrl+2</span>
            </div>
            <div className="flex items-center gap-1 px-1 py-0.5 hover:bg-muted">
              <div className="w-3" />
              <span className="flex-1 text-xs text-blue-600">Blue</span>
              <span className="text-xs text-muted-foreground">Ctrl+3</span>
            </div>
          </div>
        </div>
      )}
      {activeTab === "paths" && (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">No paths defined</span>
        </div>
      )}
    </Panel>
  );
};
