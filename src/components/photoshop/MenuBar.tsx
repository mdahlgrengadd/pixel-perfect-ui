import React, { useState } from "react";

interface MenuItem {
  label: string;
  shortcut?: string;
}

const menuItems = [
  "File",
  "Edit", 
  "Image",
  "Layer",
  "Select",
  "Filter",
  "Analysis",
  "3D",
  "View",
  "Window",
  "Help",
];

export const MenuBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="h-menu-h bg-panel border-b border-border flex items-center px-1">
      {menuItems.map((item) => (
        <button
          key={item}
          className={`px-2 h-[20px] text-sm font-ui leading-none transition-colors ${
            activeMenu === item
              ? "bg-menu-hover text-menu-hover-foreground"
              : "hover:bg-menu-hover hover:text-menu-hover-foreground"
          }`}
          onMouseEnter={() => setActiveMenu(item)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
