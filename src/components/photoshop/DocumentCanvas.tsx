import React, { useState, useRef, useEffect } from "react";

// Generate ruler tick marks with proper spacing like Photoshop
const RulerTicks: React.FC<{ orientation: "horizontal" | "vertical"; length: number }> = ({
  orientation,
  length,
}) => {
  const ticks = [];
  const majorInterval = 100; // Major tick every 100px (with number)
  const mediumInterval = 50; // Medium tick every 50px
  const minorInterval = 10; // Minor tick every 10px

  for (let i = 0; i <= length; i += minorInterval) {
    const isMajor = i % majorInterval === 0;
    const isMedium = !isMajor && i % mediumInterval === 0;

    // Tick lengths: major=full, medium=half, minor=quarter
    const tickLength = isMajor ? 18 : isMedium ? 10 : 5;

    ticks.push(
      <div
        key={i}
        className="absolute flex"
        style={
          orientation === "horizontal"
            ? { left: `${i}px`, top: 0, height: "20px", flexDirection: "column" }
            : { top: `${i}px`, left: 0, width: "20px", flexDirection: "row" }
        }
      >
        {/* Tick mark */}
        <div
          className="bg-ruler-tick"
          style={
            orientation === "horizontal"
              ? { width: "1px", height: `${tickLength}px` }
              : { height: "1px", width: `${tickLength}px` }
          }
        />
        {/* Number label for major ticks */}
        {isMajor && i > 0 && (
          <span
            className="absolute text-ruler-foreground font-mono select-none leading-none"
            style={
              orientation === "horizontal"
                ? {
                    left: "3px",
                    top: "2px",
                    fontSize: "9px",
                  }
                : {
                    top: "3px",
                    left: "2px",
                    fontSize: "9px",
                    writingMode: "vertical-lr",
                  }
            }
          >
            {i}
          </span>
        )}
      </div>
    );
  }

  return <>{ticks}</>;
};

// Cursor position indicator on rulers
const CursorIndicator: React.FC<{
  orientation: "horizontal" | "vertical";
  position: number;
}> = ({ orientation, position }) => {
  if (position < 0) return null;

  return (
    <div
      className="absolute bg-ruler-cursor z-10 pointer-events-none opacity-70"
      style={
        orientation === "horizontal"
          ? { left: `${position}px`, top: 0, width: "1px", height: "100%" }
          : { top: `${position}px`, left: 0, height: "1px", width: "100%" }
      }
    />
  );
};

export const DocumentCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: -1, y: -1 });
  const [rulerLength, setRulerLength] = useState({ h: 1200, v: 900 });

  useEffect(() => {
    const updateRulerLength = () => {
      if (canvasRef.current) {
        setRulerLength({
          h: Math.max(1200, canvasRef.current.clientWidth + 200),
          v: Math.max(900, canvasRef.current.clientHeight + 200),
        });
      }
    };

    updateRulerLength();
    window.addEventListener("resize", updateRulerLength);
    return () => window.removeEventListener("resize", updateRulerLength);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setCursorPos({ x: -1, y: -1 });
  };

  return (
    <div className="flex-1 flex flex-col bg-workspace overflow-hidden">
      {/* Rulers and canvas area */}
      <div className="flex flex-1">
        {/* Vertical ruler */}
        <div className="w-ruler bg-ruler border-r border-border flex flex-col relative">
          {/* Corner box */}
          <div className="h-ruler bg-ruler border-b border-border flex items-center justify-center">
            <div className="w-2 h-2 border border-ruler-tick opacity-50" />
          </div>
          {/* Ruler ticks container */}
          <div className="flex-1 relative overflow-hidden">
            <RulerTicks orientation="vertical" length={rulerLength.v} />
            <CursorIndicator orientation="vertical" position={cursorPos.y} />
          </div>
        </div>

        {/* Main area with horizontal ruler */}
        <div className="flex-1 flex flex-col">
          {/* Horizontal ruler */}
          <div className="h-ruler bg-ruler border-b border-border relative overflow-hidden">
            <RulerTicks orientation="horizontal" length={rulerLength.h} />
            <CursorIndicator orientation="horizontal" position={cursorPos.x} />
          </div>

          {/* Canvas workspace */}
          <div
            ref={canvasRef}
            className="flex-1 overflow-auto p-8 flex items-start justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Document */}
            <div
              className="bg-document doc-shadow border border-border-dark relative"
              style={{ width: "600px", height: "450px" }}
            >
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
