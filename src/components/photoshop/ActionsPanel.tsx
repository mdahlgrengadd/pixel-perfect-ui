import React, { useState } from "react";

interface Action {
  id: string;
  name: string;
  steps: ActionStep[];
  expanded: boolean;
}

interface ActionStep {
  id: string;
  name: string;
  enabled: boolean;
}

const mockActions: Action[] = [
  {
    id: "1",
    name: "Default Actions",
    expanded: true,
    steps: [
      { id: "1-1", name: "Vignette (selection)", enabled: true },
      { id: "1-2", name: "Frame Channel - 50 pixel", enabled: true },
      { id: "1-3", name: "Wood Frame - 50 pixel", enabled: true },
      { id: "1-4", name: "Cast Shadow (type)", enabled: true },
      { id: "1-5", name: "Water Reflection (type)", enabled: true },
    ],
  },
  {
    id: "2",
    name: "Image Effects",
    expanded: false,
    steps: [
      { id: "2-1", name: "Sepia Toning", enabled: true },
      { id: "2-2", name: "Quadrant Colors", enabled: true },
      { id: "2-3", name: "Gradient Overlay", enabled: false },
    ],
  },
];

export const ActionsPanelContent: React.FC = () => {
  const [actions, setActions] = useState<Action[]>(mockActions);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const toggleExpand = (actionId: string) => {
    setActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, expanded: !a.expanded } : a))
    );
  };

  const toggleStep = (actionId: string, stepId: string) => {
    setActions((prev) =>
      prev.map((a) =>
        a.id === actionId
          ? {
              ...a,
              steps: a.steps.map((s) =>
                s.id === stepId ? { ...s, enabled: !s.enabled } : s
              ),
            }
          : a
      )
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-input border border-border inset-input overflow-auto max-h-[150px]">
        {actions.map((action) => (
          <div key={action.id}>
            {/* Action group header */}
            <div
              className="flex items-center gap-1 px-1 py-0.5 cursor-pointer hover:bg-muted text-xs font-medium"
              onClick={() => toggleExpand(action.id)}
            >
              <span className="w-3 text-center text-2xs">
                {action.expanded ? "▼" : "▶"}
              </span>
              <span className="w-3 text-center">📁</span>
              <span>{action.name}</span>
            </div>

            {/* Action steps */}
            {action.expanded && (
              <div className="pl-4">
                {action.steps.map((step) => (
                  <div
                    key={step.id}
                    className={`
                      flex items-center gap-1 px-1 py-0.5 cursor-pointer text-xs
                      ${selectedAction === step.id 
                        ? "bg-layer-selected text-layer-selected-foreground" 
                        : "hover:bg-muted"
                      }
                    `}
                    onClick={() => setSelectedAction(step.id)}
                  >
                    <button
                      className="w-3 h-3 flex items-center justify-center text-2xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStep(action.id, step.id);
                      }}
                    >
                      {step.enabled ? "✓" : ""}
                    </button>
                    <span className={!step.enabled ? "text-muted-foreground" : ""}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions panel footer */}
      <div className="flex gap-1 mt-2 pt-2 border-t border-border-light">
        <button
          className="w-6 h-5 bg-background border border-border raised text-2xs hover:bg-tool-hover"
          title="Stop"
        >
          ⬛
        </button>
        <button
          className="w-6 h-5 bg-background border border-border raised text-2xs hover:bg-tool-hover"
          title="Record"
        >
          🔴
        </button>
        <button
          className="w-6 h-5 bg-background border border-border raised text-2xs hover:bg-tool-hover"
          title="Play"
        >
          ▶
        </button>
        <div className="flex-1" />
        <button
          className="w-6 h-5 bg-background border border-border raised text-2xs hover:bg-tool-hover"
          title="New Action"
        >
          +
        </button>
        <button
          className="w-6 h-5 bg-background border border-border raised text-2xs hover:bg-tool-hover"
          title="Delete"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

// Keep legacy export for backwards compatibility
export const ActionsPanel = ActionsPanelContent;
