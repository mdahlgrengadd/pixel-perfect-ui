import React, { useState, useRef, useEffect, createContext, useContext } from "react";

// Panel context for managing docked and floating panels
interface PanelState {
  id: string;
  title: string;
  component: React.ReactNode;
  isFloating: boolean;
  isClosed: boolean;
  isCollapsed: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  order: number;
}

interface PanelContextType {
  panels: PanelState[];
  setPanels: React.Dispatch<React.SetStateAction<PanelState[]>>;
  undockPanel: (id: string) => void;
  dockPanel: (id: string) => void;
  closePanel: (id: string) => void;
  openPanel: (id: string) => void;
  toggleCollapsePanel: (id: string) => void;
  reorderPanels: (dragId: string, dropId: string) => void;
  updatePanelPosition: (id: string, x: number, y: number) => void;
  updatePanelSize: (id: string, width: number, height: number) => void;
}

const PanelContext = createContext<PanelContextType | null>(null);

export const usePanelContext = () => {
  const context = useContext(PanelContext);
  if (!context) throw new Error("usePanelContext must be used within PanelProvider");
  return context;
};

export const PanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [panels, setPanels] = useState<PanelState[]>([]);

  const undockPanel = (id: string) => {
    setPanels((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, isFloating: true, isClosed: false, position: { x: 400, y: 200 }, size: { width: 280, height: 200 } }
          : p
      )
    );
  };

  const dockPanel = (id: string) => {
    setPanels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFloating: false, isClosed: false } : p))
    );
  };

  const closePanel = (id: string) => {
    setPanels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isClosed: true, isFloating: false } : p))
    );
  };

  const openPanel = (id: string) => {
    setPanels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isClosed: false } : p))
    );
  };

  const toggleCollapsePanel = (id: string) => {
    setPanels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isCollapsed: !p.isCollapsed } : p))
    );
  };

  const reorderPanels = (dragId: string, dropId: string) => {
    setPanels((prev) => {
      const dragPanel = prev.find((p) => p.id === dragId);
      const dropPanel = prev.find((p) => p.id === dropId);
      if (!dragPanel || !dropPanel) return prev;

      const newOrder = [...prev];
      const dragIndex = newOrder.findIndex((p) => p.id === dragId);
      const dropIndex = newOrder.findIndex((p) => p.id === dropId);

      newOrder.splice(dragIndex, 1);
      newOrder.splice(dropIndex, 0, dragPanel);

      return newOrder.map((p, i) => ({ ...p, order: i }));
    });
  };

  const updatePanelPosition = (id: string, x: number, y: number) => {
    setPanels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, position: { x, y } } : p))
    );
  };

  const updatePanelSize = (id: string, width: number, height: number) => {
    setPanels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, size: { width, height } } : p))
    );
  };

  return (
    <PanelContext.Provider
      value={{
        panels,
        setPanels,
        undockPanel,
        dockPanel,
        closePanel,
        openPanel,
        toggleCollapsePanel,
        reorderPanels,
        updatePanelPosition,
        updatePanelSize,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
};

// Floating Window Component
interface FloatingWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onClose: () => void;
  onDock: () => void;
}

export const FloatingWindow: React.FC<FloatingWindowProps> = ({
  id,
  title,
  children,
  position,
  size,
  onClose,
  onDock,
}) => {
  const { updatePanelPosition, updatePanelSize } = usePanelContext();
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updatePanelPosition(
          id,
          e.clientX - dragOffset.current.x,
          e.clientY - dragOffset.current.y
        );
      }
      if (isResizing && windowRef.current) {
        const newWidth = Math.max(200, e.clientX - position.x);
        const newHeight = Math.max(100, e.clientY - position.y);
        updatePanelSize(id, newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, id, position.x, position.y, updatePanelPosition, updatePanelSize]);

  return (
    <div
      ref={windowRef}
      className="fixed bg-panel border border-border shadow-lg z-50"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
    >
      {/* Title bar */}
      <div
        className="h-5 bg-panel-header border-b border-border-light flex items-center px-1 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="text-2xs font-medium flex-1">{title}</span>
        <div className="window-controls flex gap-0.5">
          <button
            onClick={onDock}
            className="w-4 h-4 bg-background border border-border raised text-2xs hover:bg-tool-hover"
            title="Dock panel"
          >
            ⊟
          </button>
          <button
            onClick={onClose}
            className="w-4 h-4 bg-background border border-border raised text-2xs hover:bg-tool-hover"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="overflow-auto" style={{ height: `calc(100% - 20px)` }}>
        {children}
      </div>
      
      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize"
        onMouseDown={handleResizeMouseDown}
      >
        <svg viewBox="0 0 12 12" className="w-full h-full text-muted-foreground">
          <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="10" y1="5" x2="5" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="10" y1="8" x2="8" y2="10" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
};

// Draggable Panel Header Component
interface DraggablePanelProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isCollapsed?: boolean;
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  onClose?: () => void;
  onUndock?: () => void;
  onCollapse?: () => void;
}

export const DraggablePanel: React.FC<DraggablePanelProps> = ({
  id,
  title,
  children,
  isCollapsed = false,
  tabs,
  activeTab,
  onTabChange,
  onClose,
  onUndock,
  onCollapse,
}) => {
  const { reorderPanels } = usePanelContext();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("panelId", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dragId = e.dataTransfer.getData("panelId");
    if (dragId && dragId !== id) {
      reorderPanels(dragId, id);
    }
    setIsDragOver(false);
  };

  const handleDoubleClick = () => {
    onUndock?.();
  };

  return (
    <div
      className={`border-b border-border bg-panel flex flex-col ${
        isDragOver ? "border-t-2 border-t-accent" : ""
      } ${isCollapsed ? "shrink-0" : "flex-1 min-h-0"}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Panel header with tabs or title */}
      {tabs ? (
        <div className="h-tab-h bg-panel-header border-b border-border-light flex shrink-0">
          <div
            className="flex cursor-grab active:cursor-grabbing"
            draggable
            onDragStart={handleDragStart}
            onDoubleClick={handleDoubleClick}
            title="Drag to reorder, double-click to undock"
          >
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
          </div>
          <div className="flex-1 bg-background" />
          <button
            onClick={onCollapse}
            className="w-[18px] h-full bg-background border-l border-border-light flex items-center justify-center text-xs hover:bg-tool-hover"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? "▼" : "▲"}
          </button>
          <button
            onClick={onClose}
            className="w-[18px] h-full bg-background border-l border-border-light flex items-center justify-center text-xs hover:bg-tool-hover"
            title="Close panel"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          className="h-panel-header bg-panel-header border-b border-border-light flex items-center px-2 cursor-grab active:cursor-grabbing hover:bg-muted shrink-0"
          draggable
          onDragStart={handleDragStart}
          onDoubleClick={handleDoubleClick}
          title="Drag to reorder, double-click to undock"
        >
          <span className="text-xs font-medium flex-1">{title}</span>
          <div className="flex gap-0.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCollapse?.();
              }}
              className="text-xs hover:text-foreground px-1"
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? "▼" : "▲"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
              className="text-xs hover:text-foreground px-1"
              title="Close panel"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Panel content */}
      {!isCollapsed && <div className="p-2 flex-1 overflow-auto min-h-0">{children}</div>}
    </div>
  );
};
