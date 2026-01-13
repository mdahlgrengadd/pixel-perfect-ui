import React, { useState } from "react";
import { DraggablePanel } from "./DockablePanel";

interface HistoryState {
  id: number;
  action: string;
  icon: string;
}

const mockHistory: HistoryState[] = [
  { id: 0, action: "Open", icon: "📂" },
  { id: 1, action: "New Layer", icon: "📄" },
  { id: 2, action: "Brush Tool", icon: "🖌️" },
  { id: 3, action: "Brush Tool", icon: "🖌️" },
  { id: 4, action: "Transform", icon: "↔️" },
  { id: 5, action: "Levels", icon: "📊" },
];

export const HistoryPanel: React.FC = () => {
  const [currentState, setCurrentState] = useState(5);

  const handleStateClick = (stateId: number) => {
    setCurrentState(stateId);
  };

  return (
    <DraggablePanel id="history" title="History" defaultExpanded={true}>
      <div className="flex flex-col h-full">
        <div className="flex-1 bg-input border border-border inset-input overflow-auto max-h-[150px]">
          {mockHistory.map((state) => (
            <div
              key={state.id}
              onClick={() => handleStateClick(state.id)}
              className={`
                flex items-center gap-2 px-2 py-1 cursor-pointer text-xs
                ${state.id === currentState 
                  ? "bg-layer-selected text-layer-selected-foreground" 
                  : state.id > currentState
                    ? "text-muted-foreground opacity-50"
                    : "hover:bg-muted"
                }
              `}
            >
              <span className="w-4 text-center">{state.icon}</span>
              <span>{state.action}</span>
            </div>
          ))}
        </div>
        
        {/* History panel footer */}
        <div className="flex gap-1 mt-2 pt-2 border-t border-border-light">
          <button
            className="flex-1 h-5 bg-background border border-border raised text-2xs hover:bg-tool-hover disabled:opacity-50"
            disabled={currentState === 0}
            onClick={() => setCurrentState(Math.max(0, currentState - 1))}
          >
            ← Step Back
          </button>
          <button
            className="flex-1 h-5 bg-background border border-border raised text-2xs hover:bg-tool-hover disabled:opacity-50"
            disabled={currentState === mockHistory.length - 1}
            onClick={() => setCurrentState(Math.min(mockHistory.length - 1, currentState + 1))}
          >
            Step Forward →
          </button>
        </div>
      </div>
    </DraggablePanel>
  );
};
