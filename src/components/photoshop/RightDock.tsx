import React from "react";
import { ColorPanel } from "./ColorPanel";
import { CharacterPanel } from "./CharacterPanel";
import { ParagraphPanel } from "./ParagraphPanel";
import { LayersPanel } from "./LayersPanel";

export const RightDock: React.FC = () => {
  return (
    <div className="w-dock-w bg-panel border-l border-border flex flex-col overflow-y-auto">
      <ColorPanel />
      <CharacterPanel />
      <ParagraphPanel />
      <LayersPanel />
    </div>
  );
};
