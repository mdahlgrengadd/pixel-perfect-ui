import React, { useState } from "react";

interface PanelProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
}

export const Panel: React.FC<PanelProps> = ({
  title,
  children,
  defaultExpanded = true,
  tabs,
  activeTab,
  onTabChange,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-border bg-panel">
      {/* Panel header with tabs or title */}
      {tabs ? (
        <div className="h-tab-h bg-panel-header border-b border-border-light flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`px-2 h-full text-xs border-r border-border-light transition-colors ${
                activeTab === tab.id
                  ? "bg-panel text-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <div className="flex-1 bg-background" />
          {/* Panel menu button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-[18px] h-full bg-background border-l border-border-light flex items-center justify-center text-xs hover:bg-tool-hover"
          >
            {expanded ? "▲" : "▼"}
          </button>
        </div>
      ) : (
        <div
          className="h-panel-header bg-panel-header border-b border-border-light flex items-center px-2 cursor-pointer hover:bg-muted"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="text-xs font-medium flex-1">{title}</span>
          <span className="text-xs">{expanded ? "▲" : "▼"}</span>
        </div>
      )}
      
      {/* Panel content */}
      {expanded && <div className="p-2">{children}</div>}
    </div>
  );
};
