import React, { useState, useEffect } from "react";

interface ReferenceOverlayProps {
  isActive: boolean;
}

export const ReferenceOverlay: React.FC<ReferenceOverlayProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{ opacity: 0.5 }}
    >
      {/* 
        Instructions: 
        To use reference mode, replace this placeholder with your actual screenshot.
        1. Save your reference screenshot as 'src/assets/reference.png'
        2. Import it and use it as the src below
        
        Example:
        import referenceImage from '@/assets/reference.png';
        <img src={referenceImage} ... />
      */}
      <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
        <div className="bg-black/80 text-white p-4 rounded text-sm text-center max-w-md">
          <p className="font-bold mb-2">Reference Mode Active</p>
          <p>To use: Place your reference screenshot at</p>
          <code className="bg-black/50 px-2 py-1 rounded block mt-1">
            src/assets/reference.png
          </code>
          <p className="mt-2 text-xs text-gray-300">
            Press R to toggle this overlay
          </p>
        </div>
      </div>
    </div>
  );
};

export const useReferenceMode = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "r" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Don't trigger if typing in an input
        if (
          document.activeElement?.tagName === "INPUT" ||
          document.activeElement?.tagName === "TEXTAREA"
        ) {
          return;
        }
        setIsActive((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { isActive, toggle: () => setIsActive((prev) => !prev) };
};
