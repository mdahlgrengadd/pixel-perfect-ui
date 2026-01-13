import React from "react";

// Detailed SVG tool icons matching classic Photoshop
export const ToolIcons = {
  move: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0l2.5 2.5h-1.5v4h4v-1.5l2.5 2.5-2.5 2.5v-1.5h-4v4h1.5l-2.5 2.5-2.5-2.5h1.5v-4h-4v1.5l-2.5-2.5 2.5-2.5v1.5h4v-4h-1.5z"/>
    </svg>
  ),
  
  marqueeRect: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="2" y="3" width="12" height="10" strokeDasharray="2 1"/>
    </svg>
  ),
  
  marqueeEllipse: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
      <ellipse cx="8" cy="8" rx="6" ry="5" strokeDasharray="2 1"/>
    </svg>
  ),
  
  lasso: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 5c0-2.2-1.8-4-4-4S4 2.8 4 5c0 1.5.8 2.8 2 3.5V10c0 1 .5 2 1.5 2.5" strokeDasharray="2 1"/>
      <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
    </svg>
  ),
  
  polygonLasso: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M3 12L6 3l6 2 1 7-5 1z" strokeDasharray="2 1"/>
      <circle cx="3" cy="12" r="1" fill="currentColor"/>
    </svg>
  ),
  
  magicWand: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13 1l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM7 5l.7 1.3 1.3.7-1.3.7-.7 1.3-.7-1.3-1.3-.7 1.3-.7zM2 14l8-8 2 2-8 8z"/>
    </svg>
  ),
  
  quickSelection: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="6" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1"/>
      <path d="M9 9l5 5M12 10l2-2M10 12l2 2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  
  crop: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M0 4h4V0h1v4h8v1h-8v8h-1V5H0zM12 5v7H5v1h8V5z"/>
    </svg>
  ),
  
  slice: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="2" y="2" width="5" height="5"/>
      <rect x="9" y="2" width="5" height="5"/>
      <rect x="2" y="9" width="5" height="5"/>
      <rect x="9" y="9" width="5" height="5"/>
    </svg>
  ),
  
  eyedropper: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14 1c.6 0 1 .4 1 1s-.4 1-1 1c-.3 0-.5.2-.5.5 0 .1 0 .3.1.4l-1.5 1.5-.6-.6-6.4 6.4c-.2.2-.3.4-.4.7l-.7 2.1 2.1-.7c.3-.1.5-.2.7-.4l6.4-6.4-.6-.6 1.5-1.5c.1.1.3.1.4.1.3 0 .5-.2.5-.5S14.6 1 14 1zM5.5 11.9l-.4.4-1.4.5.5-1.4.4-.4.9.9z"/>
    </svg>
  ),
  
  colorSampler: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13 2c.6 0 1 .4 1 1v1h-1V3h-1V2zM8 4l4 4-6 6H2v-4zM4 12h1l4-4-1-1-4 4z"/>
      <circle cx="13" cy="13" r="2" fill="none" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  
  ruler: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1 5l10 10h4V5H1zM3 7h2v1H3zm3 0h1v2H6zm3 0h2v1H9zm0 3h1v2H9z"/>
    </svg>
  ),
  
  spotHealing: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13 1c1.1 0 2 .9 2 2 0 .7-.3 1.3-.8 1.7l-8.4 8.4c-.4.4-1 .6-1.5.6-.4 0-.8-.1-1.1-.3l-1.9 1.9-.7-.7 1.9-1.9c-.2-.3-.3-.7-.3-1.1 0-.6.2-1.1.6-1.5l8.4-8.4c.4-.5 1-.7 1.8-.7zM8 6l-4 4 2 2 4-4z"/>
    </svg>
  ),
  
  healingBrush: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14 2c.6 0 1 .4 1 1s-.4 1-1 1h-1l-9 9-2-2 9-9V1c0-.6.4-1 1-1h1z"/>
      <path d="M2 12l-1 3 3-1z"/>
    </svg>
  ),
  
  patchTool: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M4 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z" strokeDasharray="2 1"/>
      <path d="M6 6l4 4M10 6l-4 4"/>
    </svg>
  ),
  
  brush: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14 1c.6 0 1 .4 1 1 0 1-1 2-2 3l-4 4c-.5.5-1.2.8-2 1-1 .2-2 1-2 2v1c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1v-1c0-2 1-3 2-4l1-1c.2-.2.4-.3.6-.3.2 0 .4.1.6.3l.3.3 4-4c1-1 2-2 3-2z"/>
    </svg>
  ),
  
  pencil: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14 1l1 1-10 10-2 1 1-2zM12 3l1 1"/>
    </svg>
  ),
  
  colorReplace: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M12 1c1.1 0 2 .9 2 2v1l-7 7-3-3 7-7h1zM4 10l-2 5 5-2z"/>
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  
  cloneStamp: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="5" cy="5" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
      <path d="M8 8c2.2 0 4 1.8 4 4v2H4v-2c0-2.2 1.8-4 4-4z"/>
      <path d="M5 3v4M3 5h4"/>
    </svg>
  ),
  
  patternStamp: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="2" width="4" height="4"/>
      <rect x="6" y="6" width="4" height="4"/>
      <rect x="10" y="10" width="4" height="4"/>
      <path d="M8 8c2.2 0 4 1.8 4 4v2H4v-2c0-2.2 1.8-4 4-4z" fill="none" stroke="currentColor"/>
    </svg>
  ),
  
  historyBrush: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 8c0-2.8 2.2-5 5-5 1.4 0 2.6.5 3.5 1.5l-1.4 1.4C9.4 5.4 8.7 5 8 5c-1.7 0-3 1.3-3 3s1.3 3 3 3c.7 0 1.4-.4 2.1-.9l1.4 1.4c-.9 1-2.1 1.5-3.5 1.5-2.8 0-5-2.2-5-5z"/>
      <path d="M1 5l2 3 2-3z"/>
    </svg>
  ),
  
  artHistoryBrush: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 8c0-2.8 2.2-5 5-5 1.4 0 2.6.5 3.5 1.5l-1.4 1.4C9.4 5.4 8.7 5 8 5c-1.7 0-3 1.3-3 3s1.3 3 3 3c.7 0 1.4-.4 2.1-.9l1.4 1.4c-.9 1-2.1 1.5-3.5 1.5-2.8 0-5-2.2-5-5z"/>
      <path d="M12 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
    </svg>
  ),
  
  eraser: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14 10l-4 4H6l-4-4 6-8z"/>
      <path d="M2 14h12" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  
  backgroundEraser: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
      <path d="M8 4v8M4 8h8"/>
    </svg>
  ),
  
  gradient: (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor:"currentColor", stopOpacity:1}}/>
          <stop offset="100%" style={{stopColor:"currentColor", stopOpacity:0}}/>
        </linearGradient>
      </defs>
      <rect x="2" y="4" width="12" height="8" fill="url(#grad)" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  
  paintBucket: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M10 2l4 4-8 8-4-4zM2 14c0-1 1-2 2-2l-1-1 7-7 2 2-7 7-1-1c0 1-1 2-2 2z"/>
      <path d="M13 10c1 1 2 3 2 4s-.4 1-1 1-1-.4-1-1c0-1 0-3 0-4z"/>
    </svg>
  ),
  
  blur: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="8" r="2"/>
      <circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7"/>
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2"/>
    </svg>
  ),
  
  sharpen: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 2l6 12H2z"/>
    </svg>
  ),
  
  smudge: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 13c0-1 1-2 2-2 .5 0 1 .2 1.4.6l5.6-5.6c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-5.6 5.6c.4.4.6.9.6 1.4 0 1-1 2-2 2H3v-3z"/>
    </svg>
  ),
  
  dodge: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <ellipse cx="8" cy="5" rx="5" ry="3" fill="none" stroke="currentColor" strokeWidth="1"/>
      <path d="M8 8v6M6 12h4"/>
    </svg>
  ),
  
  burn: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 2c2 2 4 4 4 7 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-3 2-5 4-7z"/>
    </svg>
  ),
  
  sponge: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="4" y="2" width="8" height="12" rx="2"/>
      <path d="M6 5h4M6 8h4M6 11h4" stroke="white" strokeWidth="1"/>
    </svg>
  ),
  
  pen: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 14l1-4 8-8 3 3-8 8zM10 3l3 3"/>
      <circle cx="3" cy="13" r="1"/>
    </svg>
  ),
  
  freeformPen: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M3 12c0-2 2-4 4-4s4 2 6 2"/>
      <circle cx="3" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="13" cy="10" r="1.5" fill="currentColor"/>
    </svg>
  ),
  
  addAnchor: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 14l1-4 8-8 3 3-8 8z"/>
      <path d="M12 4h4M14 2v4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  
  text: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 3h10v2h-4v9H7V5H3z"/>
    </svg>
  ),
  
  verticalText: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 2v10M5 5l3-3 3 3M5 9l3 3 3-3"/>
    </svg>
  ),
  
  textMask: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M3 3h10v2h-4v9H7V5H3z" strokeDasharray="2 1"/>
    </svg>
  ),
  
  pathSelection: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 2l5 12 2-4 4-2z"/>
    </svg>
  ),
  
  directSelection: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M2 2l5 12 2-4 4-2z"/>
    </svg>
  ),
  
  rectangle: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="3" width="12" height="10"/>
    </svg>
  ),
  
  roundedRect: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="3" width="12" height="10" rx="2"/>
    </svg>
  ),
  
  ellipse: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <ellipse cx="8" cy="8" rx="6" ry="5"/>
    </svg>
  ),
  
  polygon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 2l6 4.5v5L8 14l-6-2.5v-5z"/>
    </svg>
  ),
  
  line: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 14L14 2" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  
  customShape: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z"/>
    </svg>
  ),
  
  hand: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13 6V4c0-.6-.4-1-1-1s-1 .4-1 1V3c0-.6-.4-1-1-1s-1 .4-1 1V2c0-.6-.4-1-1-1s-1 .4-1 1v6l-1.3-1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l3.7 3.7V14h5c.6 0 1-.4 1-1V6z"/>
    </svg>
  ),
  
  rotatView: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 2c3.3 0 6 2.7 6 6h-2c0-2.2-1.8-4-4-4V2z"/>
      <path d="M12 8l2-2 2 2"/>
      <path d="M8 14c-3.3 0-6-2.7-6-6h2c0 2.2 1.8 4 4 4v2z"/>
      <path d="M4 8l-2 2-2-2"/>
    </svg>
  ),
  
  zoom: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 10l5 5" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 6h4M6 4v4"/>
    </svg>
  ),
  
  zoomOut: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 10l5 5" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 6h4"/>
    </svg>
  ),
};

export type ToolIconName = keyof typeof ToolIcons;
