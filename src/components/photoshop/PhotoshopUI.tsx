import React from "react";
import { MenuBar } from "./MenuBar";
import { ToolOptionsBar } from "./ToolOptionsBar";
import { ToolsPalette } from "./ToolsPalette";
import { DocumentCanvas } from "./DocumentCanvas";
import { EnhancedRightDock, ToolProvider } from "./EnhancedRightDock";
import { ReferenceOverlay, useReferenceMode } from "./ReferenceOverlay";
import { PanelProvider } from "./DockablePanel";
import { ThemeProvider } from "./ThemeToggle";

export const PhotoshopUI: React.FC = () => {
  const { isActive: referenceActive } = useReferenceMode();

  return (
    <ThemeProvider>
      <PanelProvider>
        <ToolProvider>
        <div className="min-w-app h-full flex flex-col bg-background overflow-hidden">
          {/* Reference overlay for pixel alignment */}
          <ReferenceOverlay isActive={referenceActive} />
          
          {/* Top menu bar */}
          <MenuBar />
          
          {/* Tool options bar */}
          <ToolOptionsBar />
          
          {/* Main workspace area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left tools palette */}
            <ToolsPalette />
            
            {/* Central document canvas */}
            <DocumentCanvas />
            
            {/* Right dock panels */}
            <EnhancedRightDock />
          </div>
          
          {/* Status bar */}
          <div className="h-5 bg-panel border-t border-border flex items-center px-2 text-xs text-muted-foreground">
            <span>Doc: 1.32M/1.32M</span>
            <div className="flex-1" />
            <span>Press R to toggle reference overlay | Double-click panel header to undock</span>
          </div>
        </div>
        </ToolProvider>
      </PanelProvider>
    </ThemeProvider>
  );
};
