import React, { useState, useRef, useEffect } from "react";

// HSB to RGB conversion
const hsbToRgb = (h: number, s: number, b: number): [number, number, number] => {
  s = s / 100;
  b = b / 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [Math.round(255 * f(5)), Math.round(255 * f(3)), Math.round(255 * f(1))];
};

// RGB to HSB conversion
const rgbToHsb = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }
  return [Math.round(h), Math.round(s * 100), Math.round(v * 100)];
};

interface ColorPickerPanelProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const ColorPickerPanel: React.FC<ColorPickerPanelProps> = ({
  activeTab: externalActiveTab,
  onTabChange,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState("color");
  const activeTab = externalActiveTab ?? internalActiveTab;
  const setActiveTab = onTabChange ?? setInternalActiveTab;

  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [foregroundColor, setForegroundColor] = useState({ r: 255, g: 0, b: 0 });
  const [backgroundColor, setBackgroundColor] = useState({ r: 255, g: 255, b: 255 });
  const [isSelectingForeground, setIsSelectingForeground] = useState(true);

  const gradientRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const [isDraggingGradient, setIsDraggingGradient] = useState(false);
  const [isDraggingHue, setIsDraggingHue] = useState(false);

  // Update RGB from HSB
  useEffect(() => {
    const [r, g, b] = hsbToRgb(hue, saturation, brightness);
    if (isSelectingForeground) {
      setForegroundColor({ r, g, b });
    } else {
      setBackgroundColor({ r, g, b });
    }
  }, [hue, saturation, brightness, isSelectingForeground]);

  const handleGradientClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gradientRef.current) return;
    const rect = gradientRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setSaturation(Math.round(x * 100));
    setBrightness(Math.round((1 - y) * 100));
  };

  const handleHueClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setHue(Math.round(y * 360));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingGradient && gradientRef.current) {
        const rect = gradientRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        setSaturation(Math.round(x * 100));
        setBrightness(Math.round((1 - y) * 100));
      }
      if (isDraggingHue && hueRef.current) {
        const rect = hueRef.current.getBoundingClientRect();
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        setHue(Math.round(y * 360));
      }
    };

    const handleMouseUp = () => {
      setIsDraggingGradient(false);
      setIsDraggingHue(false);
    };

    if (isDraggingGradient || isDraggingHue) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingGradient, isDraggingHue]);

  const pureHueColor = hsbToRgb(hue, 100, 100);

  return (
    <div className="h-full">
      {activeTab === "color" && (
        <div className="flex gap-2">
          {/* Foreground/Background swatches */}
          <div className="relative w-8 h-8 shrink-0">
            <div
              className={`absolute top-0 left-0 w-5 h-5 border cursor-pointer z-10 ${
                isSelectingForeground ? "border-white shadow-md" : "border-border"
              }`}
              style={{ backgroundColor: `rgb(${foregroundColor.r}, ${foregroundColor.g}, ${foregroundColor.b})` }}
              onClick={() => setIsSelectingForeground(true)}
              title="Foreground color"
            />
            <div
              className={`absolute bottom-0 right-0 w-5 h-5 border cursor-pointer ${
                !isSelectingForeground ? "border-white shadow-md" : "border-border"
              }`}
              style={{ backgroundColor: `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})` }}
              onClick={() => setIsSelectingForeground(false)}
              title="Background color"
            />
          </div>

          {/* Main gradient picker */}
          <div
            ref={gradientRef}
            className="flex-1 h-[140px] relative cursor-crosshair border border-border"
            style={{
              background: `
                linear-gradient(to top, #000, transparent),
                linear-gradient(to right, #fff, rgb(${pureHueColor[0]}, ${pureHueColor[1]}, ${pureHueColor[2]}))
              `,
            }}
            onMouseDown={(e) => {
              setIsDraggingGradient(true);
              handleGradientClick(e);
            }}
          >
            {/* Picker indicator */}
            <div
              className="absolute w-3 h-3 border-2 border-white rounded-full shadow-md pointer-events-none"
              style={{
                left: `calc(${saturation}% - 6px)`,
                top: `calc(${100 - brightness}% - 6px)`,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          {/* Hue slider */}
          <div
            ref={hueRef}
            className="w-3 h-[140px] relative cursor-pointer border border-border"
            style={{
              background: `linear-gradient(to bottom, 
                hsl(0, 100%, 50%), 
                hsl(60, 100%, 50%), 
                hsl(120, 100%, 50%), 
                hsl(180, 100%, 50%), 
                hsl(240, 100%, 50%), 
                hsl(300, 100%, 50%), 
                hsl(360, 100%, 50%)
              )`,
            }}
            onMouseDown={(e) => {
              setIsDraggingHue(true);
              handleHueClick(e);
            }}
          >
            {/* Hue indicator */}
            <div
              className="absolute left-0 right-0 h-1 bg-white border border-black pointer-events-none"
              style={{ top: `calc(${(hue / 360) * 100}% - 2px)` }}
            />
          </div>
        </div>
      )}

      {activeTab === "swatches" && (
        <div className="grid grid-cols-12 gap-px">
          {Array.from({ length: 96 }, (_, i) => (
            <div
              key={i}
              className="w-3 h-3 border border-border cursor-pointer hover:border-foreground"
              style={{
                backgroundColor: `hsl(${(i * 3.75) % 360}, ${50 + (i % 4) * 15}%, ${25 + (i % 5) * 12}%)`,
              }}
              onClick={() => {
                const h = (i * 3.75) % 360;
                const s = 50 + (i % 4) * 15;
                const l = 25 + (i % 5) * 12;
                setHue(Math.round(h));
                setSaturation(Math.round(s));
                setBrightness(Math.round(l + 25));
              }}
            />
          ))}
        </div>
      )}

      {/* RGB values display */}
      <div className="mt-2 pt-2 border-t border-border-light flex gap-2 text-2xs">
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">R:</span>
          <span>{foregroundColor.r}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">G:</span>
          <span>{foregroundColor.g}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">B:</span>
          <span>{foregroundColor.b}</span>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-muted-foreground">#</span>
          <span>
            {foregroundColor.r.toString(16).padStart(2, "0")}
            {foregroundColor.g.toString(16).padStart(2, "0")}
            {foregroundColor.b.toString(16).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
};
