import React from "react";
import { Panel } from "./Panel";

export const ParagraphPanel: React.FC = () => {
  return (
    <Panel title="Paragraph" defaultExpanded={true}>
      <div className="space-y-2">
        {/* Alignment buttons row 1 */}
        <div className="flex gap-1">
          <button className="w-6 h-5 bg-tool-active border border-border pressed flex items-center justify-center">
            <svg width="14" height="10" viewBox="0 0 14 10">
              <line x1="1" y1="1" x2="10" y2="1" stroke="currentColor" strokeWidth="1"/>
              <line x1="1" y1="4" x2="8" y2="4" stroke="currentColor" strokeWidth="1"/>
              <line x1="1" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </button>
          <button className="w-6 h-5 bg-background border border-border raised flex items-center justify-center">
            <svg width="14" height="10" viewBox="0 0 14 10">
              <line x1="2" y1="1" x2="12" y2="1" stroke="currentColor" strokeWidth="1"/>
              <line x1="4" y1="4" x2="10" y2="4" stroke="currentColor" strokeWidth="1"/>
              <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </button>
          <button className="w-6 h-5 bg-background border border-border raised flex items-center justify-center">
            <svg width="14" height="10" viewBox="0 0 14 10">
              <line x1="4" y1="1" x2="13" y2="1" stroke="currentColor" strokeWidth="1"/>
              <line x1="6" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="1"/>
              <line x1="2" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </button>
          <div className="w-px bg-border-light mx-1" />
          <button className="w-6 h-5 bg-background border border-border raised flex items-center justify-center">
            <svg width="14" height="10" viewBox="0 0 14 10">
              <line x1="1" y1="1" x2="13" y2="1" stroke="currentColor" strokeWidth="1"/>
              <line x1="1" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="1"/>
              <line x1="1" y1="7" x2="10" y2="7" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </button>
          <button className="w-6 h-5 bg-background border border-border raised flex items-center justify-center">
            <svg width="14" height="10" viewBox="0 0 14 10">
              <line x1="1" y1="1" x2="13" y2="1" stroke="currentColor" strokeWidth="1"/>
              <line x1="1" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="1"/>
              <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </button>
          <button className="w-6 h-5 bg-background border border-border raised flex items-center justify-center">
            <svg width="14" height="10" viewBox="0 0 14 10">
              <line x1="1" y1="1" x2="13" y2="1" stroke="currentColor" strokeWidth="1"/>
              <line x1="1" y1="4" x2="13" y2="4" stroke="currentColor" strokeWidth="1"/>
              <line x1="4" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </button>
        </div>
        
        {/* Indent inputs */}
        <div className="flex gap-1">
          <div className="flex items-center gap-1 flex-1">
            <span className="text-2xs text-muted-foreground">↦</span>
            <input
              type="text"
              defaultValue="0 pt"
              className="w-full h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
          <div className="flex items-center gap-1 flex-1">
            <span className="text-2xs text-muted-foreground">↤</span>
            <input
              type="text"
              defaultValue="0 pt"
              className="w-full h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
        </div>
        
        {/* First line indent */}
        <div className="flex gap-1">
          <div className="flex items-center gap-1 flex-1">
            <span className="text-2xs text-muted-foreground">¶→</span>
            <input
              type="text"
              defaultValue="0 pt"
              className="w-full h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
          <div className="flex-1" />
        </div>
        
        {/* Space before/after */}
        <div className="flex gap-1 pt-1 border-t border-border-light">
          <div className="flex items-center gap-1 flex-1">
            <span className="text-2xs text-muted-foreground">↑¶</span>
            <input
              type="text"
              defaultValue="0 pt"
              className="w-full h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
          <div className="flex items-center gap-1 flex-1">
            <span className="text-2xs text-muted-foreground">¶↓</span>
            <input
              type="text"
              defaultValue="0 pt"
              className="w-full h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
        </div>
        
        {/* Hyphenation checkbox */}
        <div className="pt-1 border-t border-border-light">
          <label className="flex items-center gap-1 text-xs">
            <input type="checkbox" defaultChecked className="w-3 h-3" />
            Hyphenate
          </label>
        </div>
      </div>
    </Panel>
  );
};
