import React from "react";

export const DocumentCanvas: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-workspace overflow-hidden">
      {/* Rulers and canvas area */}
      <div className="flex flex-1">
        {/* Vertical ruler */}
        <div className="w-ruler bg-ruler border-r border-border flex flex-col">
          {/* Corner */}
          <div className="h-ruler bg-ruler border-b border-border" />
          {/* Ruler ticks */}
          <div className="flex-1 relative">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="absolute left-0 w-full flex items-center text-ruler-foreground"
                style={{ top: `${i * 20}px` }}
              >
                <div className="w-full h-px bg-ruler-tick" />
                {i % 5 === 0 && (
                  <span className="absolute left-1 text-2xs transform -rotate-90 origin-left" style={{ top: '10px' }}>
                    {i * 10}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Main area with horizontal ruler */}
        <div className="flex-1 flex flex-col">
          {/* Horizontal ruler */}
          <div className="h-ruler bg-ruler border-b border-border relative">
            {Array.from({ length: 60 }, (_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full flex flex-col items-center text-ruler-foreground"
                style={{ left: `${i * 20}px` }}
              >
                <div className="h-full w-px bg-ruler-tick" />
                {i % 5 === 0 && (
                  <span className="absolute top-1 text-2xs">
                    {i * 10}
                  </span>
                )}
              </div>
            ))}
          </div>
          
          {/* Canvas workspace */}
          <div className="flex-1 overflow-auto p-8 flex items-start justify-center">
            {/* Document */}
            <div className="bg-document doc-shadow border border-border-dark relative" style={{ width: '600px', height: '450px' }}>
              {/* Document title bar simulation */}
              <div className="absolute -top-5 left-0 right-0 flex items-center justify-center">
                <span className="text-xs text-workspace-foreground bg-workspace/80 px-2">
                  Untitled-1 @ 100% (RGB/8)
                </span>
              </div>
              
              {/* Placeholder content */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                {/* Empty canvas */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
