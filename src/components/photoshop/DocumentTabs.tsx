import React, { useState } from "react";

interface DocumentTab {
  id: string;
  name: string;
  zoom: number;
  colorMode: string;
  bitDepth: number;
  modified: boolean;
}

const defaultTabs: DocumentTab[] = [
  { id: "1", name: "Untitled-1", zoom: 100, colorMode: "RGB", bitDepth: 8, modified: true },
  { id: "2", name: "Untitled-2", zoom: 50, colorMode: "RGB", bitDepth: 8, modified: false },
];

export const DocumentTabs: React.FC = () => {
  const [tabs, setTabs] = useState<DocumentTab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState("1");

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    if (tabs.length > 1) {
      const newTabs = tabs.filter((t) => t.id !== tabId);
      setTabs(newTabs);
      if (activeTab === tabId) {
        setActiveTab(newTabs[0].id);
      }
    }
  };

  const formatTabTitle = (tab: DocumentTab) => {
    return `${tab.name}${tab.modified ? " *" : ""} @ ${tab.zoom}% (${tab.colorMode}/${tab.bitDepth})`;
  };

  return (
    <div className="h-6 bg-tab-bar border-b border-border flex items-end">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            h-full px-3 flex items-center gap-2 cursor-pointer text-xs border-r border-border
            transition-colors group relative
            ${activeTab === tab.id 
              ? "bg-workspace text-workspace-foreground" 
              : "bg-tab-inactive text-muted-foreground hover:bg-tab-active hover:text-foreground"
            }
          `}
        >
          <span className="truncate max-w-[180px]">{formatTabTitle(tab)}</span>
          <button
            onClick={(e) => handleCloseTab(e, tab.id)}
            className={`
              w-4 h-4 flex items-center justify-center rounded-sm
              opacity-0 group-hover:opacity-100 transition-opacity
              hover:bg-background/30
              ${activeTab === tab.id ? "opacity-100" : ""}
            `}
          >
            ×
          </button>
        </div>
      ))}
      <div className="flex-1" />
    </div>
  );
};
