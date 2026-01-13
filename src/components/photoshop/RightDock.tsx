import React from "react";
import { Panel as ResizablePanel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ColorPanel } from "./ColorPanel";
import { CharacterPanel } from "./CharacterPanel";
import { ParagraphPanel } from "./ParagraphPanel";
import { LayersPanel } from "./LayersPanel";

const ResizeHandle: React.FC = () => (
  <PanelResizeHandle className="h-1 bg-border-light hover:bg-accent cursor-row-resize flex items-center justify-center">
    <div className="w-8 h-0.5 bg-muted-foreground rounded opacity-50" />
  </PanelResizeHandle>
);

export const RightDock: React.FC = () => {
  return (
    <div className="w-dock-w bg-panel border-l border-border flex flex-col overflow-hidden">
      <PanelGroup direction="vertical" className="flex-1">
        <Panel defaultSize={20} minSize={10}>
          <div className="h-full overflow-auto">
            <ColorPanel />
          </div>
        </Panel>
        
        <ResizeHandle />
        
        <Panel defaultSize={30} minSize={10}>
          <div className="h-full overflow-auto">
            <CharacterPanel />
          </div>
        </Panel>
        
        <ResizeHandle />
        
        <Panel defaultSize={15} minSize={8}>
          <div className="h-full overflow-auto">
            <ParagraphPanel />
          </div>
        </Panel>
        
        <ResizeHandle />
        
        <Panel defaultSize={35} minSize={15}>
          <div className="h-full overflow-auto">
            <LayersPanel />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};
