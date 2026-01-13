import React from "react";
import { Panel } from "./Panel";

export const CharacterPanel: React.FC = () => {
  return (
    <Panel title="Character" defaultExpanded={true}>
      <div className="space-y-2">
        {/* Font family row */}
        <div className="flex gap-1">
          <select className="flex-1 h-[18px] text-xs bg-input border border-border inset-input">
            <option>Myriad Pro</option>
            <option>Arial</option>
            <option>Helvetica</option>
            <option>Times New Roman</option>
          </select>
        </div>
        
        {/* Font style row */}
        <div className="flex gap-1">
          <select className="flex-1 h-[18px] text-xs bg-input border border-border inset-input">
            <option>Regular</option>
            <option>Bold</option>
            <option>Italic</option>
            <option>Bold Italic</option>
          </select>
        </div>
        
        {/* Size and leading row */}
        <div className="flex gap-1">
          <div className="flex items-center gap-1 flex-1">
            <svg width="12" height="12" viewBox="0 0 12 12" className="text-muted-foreground">
              <text x="1" y="10" fontSize="10" fill="currentColor">T</text>
            </svg>
            <input
              type="text"
              defaultValue="12 pt"
              className="w-full h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
          <div className="flex items-center gap-1 flex-1">
            <svg width="12" height="12" viewBox="0 0 12 12" className="text-muted-foreground">
              <line x1="2" y1="3" x2="10" y2="3" stroke="currentColor" strokeWidth="1"/>
              <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1"/>
              <line x1="2" y1="9" x2="10" y2="9" stroke="currentColor" strokeWidth="1"/>
            </svg>
            <input
              type="text"
              defaultValue="(Auto)"
              className="w-full h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
        </div>
        
        {/* Kerning and tracking */}
        <div className="flex gap-1">
          <div className="flex items-center gap-1 flex-1">
            <span className="text-2xs text-muted-foreground">VA</span>
            <input
              type="text"
              defaultValue="Metrics"
              className="w-full h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
          <div className="flex items-center gap-1 flex-1">
            <span className="text-2xs text-muted-foreground">VA</span>
            <input
              type="text"
              defaultValue="0"
              className="w-full h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
        </div>
        
        {/* Scale inputs */}
        <div className="flex gap-1">
          <div className="flex items-center gap-1 flex-1">
            <span className="text-2xs text-muted-foreground">T↔</span>
            <input
              type="text"
              defaultValue="100%"
              className="w-full h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
          <div className="flex items-center gap-1 flex-1">
            <span className="text-2xs text-muted-foreground">T↕</span>
            <input
              type="text"
              defaultValue="100%"
              className="w-full h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
        </div>
        
        {/* Baseline and color */}
        <div className="flex gap-1">
          <div className="flex items-center gap-1 flex-1">
            <span className="text-2xs text-muted-foreground">A↑</span>
            <input
              type="text"
              defaultValue="0 pt"
              className="w-full h-[18px] px-1 text-xs bg-input border border-border inset-input"
            />
          </div>
          <div className="flex items-center gap-1 flex-1">
            <div className="w-full h-[18px] bg-foreground border border-border" />
          </div>
        </div>
        
        {/* Style buttons */}
        <div className="flex gap-1 pt-1 border-t border-border-light">
          <button className="w-6 h-5 bg-background border border-border raised text-xs font-bold">T</button>
          <button className="w-6 h-5 bg-background border border-border raised text-xs italic">T</button>
          <button className="w-6 h-5 bg-background border border-border raised text-xs uppercase">TT</button>
          <button className="w-6 h-5 bg-background border border-border raised text-xs line-through">T</button>
          <button className="w-6 h-5 bg-background border border-border raised text-xs underline">T</button>
        </div>
        
        {/* Language dropdown */}
        <div className="pt-1 border-t border-border-light">
          <select className="w-full h-[18px] text-xs bg-input border border-border inset-input">
            <option>English: USA</option>
            <option>English: UK</option>
            <option>German</option>
            <option>French</option>
          </select>
        </div>
      </div>
    </Panel>
  );
};
