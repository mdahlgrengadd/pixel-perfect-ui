import React, { useState, useRef, useEffect } from "react";

interface MenuItem {
  label: string;
  shortcut?: string;
  separator?: boolean;
  submenu?: MenuItem[];
  disabled?: boolean;
}

interface MenuData {
  [key: string]: MenuItem[];
}

const menuData: MenuData = {
  File: [
    { label: "New...", shortcut: "Ctrl+N" },
    { label: "Open...", shortcut: "Ctrl+O" },
    { label: "Browse in Bridge...", shortcut: "Alt+Ctrl+O" },
    { label: "Open As...", shortcut: "Alt+Shift+Ctrl+O" },
    { label: "Open Recent", submenu: [
      { label: "recent_file_1.psd" },
      { label: "recent_file_2.jpg" },
      { label: "recent_file_3.png" },
      { label: "separator", separator: true },
      { label: "Clear Recent File List" },
    ]},
    { label: "separator", separator: true },
    { label: "Close", shortcut: "Ctrl+W" },
    { label: "Close All", shortcut: "Alt+Ctrl+W" },
    { label: "Close and Go to Bridge...", shortcut: "Shift+Ctrl+W" },
    { label: "Save", shortcut: "Ctrl+S" },
    { label: "Save As...", shortcut: "Shift+Ctrl+S" },
    { label: "Save for Web & Devices...", shortcut: "Alt+Shift+Ctrl+S" },
    { label: "separator", separator: true },
    { label: "Revert", shortcut: "F12" },
    { label: "separator", separator: true },
    { label: "Place..." },
    { label: "Import", submenu: [
      { label: "Variable Data Sets..." },
      { label: "Video Frames to Layers..." },
      { label: "Notes..." },
      { label: "WIA Support..." },
    ]},
    { label: "Export", submenu: [
      { label: "Data Sets as Files..." },
      { label: "Paths to Illustrator..." },
      { label: "Render Video..." },
      { label: "Zoomify..." },
    ]},
    { label: "separator", separator: true },
    { label: "Automate", submenu: [
      { label: "Batch..." },
      { label: "PDF Presentation..." },
      { label: "Create Droplet..." },
      { label: "Crop and Straighten Photos" },
      { label: "Contact Sheet II..." },
      { label: "Picture Package..." },
      { label: "Web Photo Gallery..." },
      { label: "Photomerge..." },
      { label: "Merge to HDR..." },
    ]},
    { label: "Scripts", submenu: [
      { label: "Image Processor..." },
      { label: "Layer Comps to Files..." },
      { label: "Layer Comps to PDF..." },
      { label: "Layer Comps to WPG..." },
      { label: "Export Layers to Files..." },
      { label: "Script Events Manager..." },
      { label: "Load Files into Stack..." },
      { label: "Load Multiple DICOM Files..." },
      { label: "Statistics..." },
      { label: "Browse..." },
    ]},
    { label: "separator", separator: true },
    { label: "File Info...", shortcut: "Alt+Shift+Ctrl+I" },
    { label: "Page Setup...", shortcut: "Shift+Ctrl+P" },
    { label: "Print...", shortcut: "Ctrl+P" },
    { label: "Print One Copy", shortcut: "Alt+Shift+Ctrl+P" },
    { label: "separator", separator: true },
    { label: "Exit", shortcut: "Ctrl+Q" },
  ],
  Edit: [
    { label: "Undo", shortcut: "Ctrl+Z" },
    { label: "Step Forward", shortcut: "Shift+Ctrl+Z" },
    { label: "Step Backward", shortcut: "Alt+Ctrl+Z" },
    { label: "Fade...", shortcut: "Shift+Ctrl+F" },
    { label: "separator", separator: true },
    { label: "Cut", shortcut: "Ctrl+X" },
    { label: "Copy", shortcut: "Ctrl+C" },
    { label: "Copy Merged", shortcut: "Shift+Ctrl+C" },
    { label: "Paste", shortcut: "Ctrl+V" },
    { label: "Paste Into", shortcut: "Shift+Ctrl+V" },
    { label: "Clear" },
    { label: "separator", separator: true },
    { label: "Check Spelling..." },
    { label: "Find and Replace Text..." },
    { label: "separator", separator: true },
    { label: "Fill...", shortcut: "Shift+F5" },
    { label: "Stroke..." },
    { label: "separator", separator: true },
    { label: "Free Transform", shortcut: "Ctrl+T" },
    { label: "Transform", submenu: [
      { label: "Again", shortcut: "Shift+Ctrl+T" },
      { label: "Scale" },
      { label: "Rotate" },
      { label: "Skew" },
      { label: "Distort" },
      { label: "Perspective" },
      { label: "Warp" },
      { label: "separator", separator: true },
      { label: "Rotate 180°" },
      { label: "Rotate 90° CW" },
      { label: "Rotate 90° CCW" },
      { label: "separator", separator: true },
      { label: "Flip Horizontal" },
      { label: "Flip Vertical" },
    ]},
    { label: "Auto-Align Layers..." },
    { label: "Auto-Blend Layers..." },
    { label: "separator", separator: true },
    { label: "Define Brush Preset..." },
    { label: "Define Pattern..." },
    { label: "Define Custom Shape..." },
    { label: "separator", separator: true },
    { label: "Purge", submenu: [
      { label: "Undo" },
      { label: "Clipboard" },
      { label: "Histories" },
      { label: "All" },
    ]},
    { label: "separator", separator: true },
    { label: "Adobe PDF Presets..." },
    { label: "Preset Manager..." },
    { label: "separator", separator: true },
    { label: "Color Settings...", shortcut: "Shift+Ctrl+K" },
    { label: "Assign Profile..." },
    { label: "Convert to Profile..." },
    { label: "separator", separator: true },
    { label: "Keyboard Shortcuts...", shortcut: "Alt+Shift+Ctrl+K" },
    { label: "Menus...", shortcut: "Alt+Shift+Ctrl+M" },
    { label: "separator", separator: true },
    { label: "Preferences", submenu: [
      { label: "General...", shortcut: "Ctrl+K" },
      { label: "Interface..." },
      { label: "File Handling..." },
      { label: "Performance..." },
      { label: "Cursors..." },
      { label: "Transparency & Gamut..." },
      { label: "Units & Rulers..." },
      { label: "Guides, Grid & Slices..." },
      { label: "Plug-Ins..." },
      { label: "Type..." },
    ]},
  ],
  Image: [
    { label: "Mode", submenu: [
      { label: "Bitmap" },
      { label: "Grayscale" },
      { label: "Duotone" },
      { label: "Indexed Color..." },
      { label: "RGB Color" },
      { label: "CMYK Color" },
      { label: "Lab Color" },
      { label: "Multichannel" },
      { label: "separator", separator: true },
      { label: "8 Bits/Channel" },
      { label: "16 Bits/Channel" },
      { label: "32 Bits/Channel" },
      { label: "separator", separator: true },
      { label: "Color Table..." },
    ]},
    { label: "Adjustments", submenu: [
      { label: "Levels...", shortcut: "Ctrl+L" },
      { label: "Curves...", shortcut: "Ctrl+M" },
      { label: "Color Balance...", shortcut: "Ctrl+B" },
      { label: "Brightness/Contrast..." },
      { label: "separator", separator: true },
      { label: "Hue/Saturation...", shortcut: "Ctrl+U" },
      { label: "Desaturate", shortcut: "Shift+Ctrl+U" },
      { label: "Match Color..." },
      { label: "Replace Color..." },
      { label: "Selective Color..." },
      { label: "separator", separator: true },
      { label: "Channel Mixer..." },
      { label: "Gradient Map..." },
      { label: "Photo Filter..." },
      { label: "Shadow/Highlight..." },
      { label: "Exposure..." },
      { label: "separator", separator: true },
      { label: "Invert", shortcut: "Ctrl+I" },
      { label: "Equalize" },
      { label: "Threshold..." },
      { label: "Posterize..." },
      { label: "Variations..." },
    ]},
    { label: "separator", separator: true },
    { label: "Duplicate..." },
    { label: "Apply Image..." },
    { label: "Calculations..." },
    { label: "separator", separator: true },
    { label: "Image Size...", shortcut: "Alt+Ctrl+I" },
    { label: "Canvas Size...", shortcut: "Alt+Ctrl+C" },
    { label: "Pixel Aspect Ratio", submenu: [
      { label: "Custom Pixel Aspect Ratio..." },
      { label: "Delete Pixel Aspect Ratio..." },
      { label: "Reset Pixel Aspect Ratios..." },
      { label: "separator", separator: true },
      { label: "Square" },
      { label: "D1/DV NTSC (0.9)" },
      { label: "D1/DV PAL (1.07)" },
      { label: "D1/DV NTSC Widescreen (1.2)" },
      { label: "HDV 1080/DVCPRO HD 720 (1.33)" },
      { label: "D1/DV PAL Widescreen (1.42)" },
      { label: "Anamorphic 2:1 (2)" },
      { label: "DVCPRO HD 1080 (1.5)" },
    ]},
    { label: "Rotate Canvas", submenu: [
      { label: "180°" },
      { label: "90° CW" },
      { label: "90° CCW" },
      { label: "Arbitrary..." },
      { label: "separator", separator: true },
      { label: "Flip Canvas Horizontal" },
      { label: "Flip Canvas Vertical" },
    ]},
    { label: "Crop" },
    { label: "Trim..." },
    { label: "Reveal All" },
    { label: "separator", separator: true },
    { label: "Variables", submenu: [
      { label: "Define..." },
      { label: "Data Sets..." },
    ]},
    { label: "Apply Data Set..." },
    { label: "separator", separator: true },
    { label: "Trap..." },
  ],
  Layer: [
    { label: "New", submenu: [
      { label: "Layer...", shortcut: "Shift+Ctrl+N" },
      { label: "Layer from Background..." },
      { label: "Group...", },
      { label: "Group from Layers..." },
      { label: "Layer via Copy", shortcut: "Ctrl+J" },
      { label: "Layer via Cut", shortcut: "Shift+Ctrl+J" },
    ]},
    { label: "Duplicate Layer..." },
    { label: "Delete", submenu: [
      { label: "Layer" },
      { label: "Hidden Layers" },
    ]},
    { label: "separator", separator: true },
    { label: "Layer Properties..." },
    { label: "Layer Style", submenu: [
      { label: "Blending Options..." },
      { label: "separator", separator: true },
      { label: "Drop Shadow..." },
      { label: "Inner Shadow..." },
      { label: "Outer Glow..." },
      { label: "Inner Glow..." },
      { label: "Bevel and Emboss..." },
      { label: "Satin..." },
      { label: "Color Overlay..." },
      { label: "Gradient Overlay..." },
      { label: "Pattern Overlay..." },
      { label: "Stroke..." },
      { label: "separator", separator: true },
      { label: "Copy Layer Style" },
      { label: "Paste Layer Style" },
      { label: "Clear Layer Style" },
      { label: "separator", separator: true },
      { label: "Global Light..." },
      { label: "Create Layer" },
      { label: "Hide All Effects" },
      { label: "Scale Effects..." },
    ]},
    { label: "Smart Filter", submenu: [
      { label: "Enable Smart Filters" },
      { label: "Delete Filter Mask" },
      { label: "Disable Filter Mask" },
      { label: "Clear Smart Filters" },
    ]},
    { label: "separator", separator: true },
    { label: "New Fill Layer", submenu: [
      { label: "Solid Color..." },
      { label: "Gradient..." },
      { label: "Pattern..." },
    ]},
    { label: "New Adjustment Layer", submenu: [
      { label: "Levels..." },
      { label: "Curves..." },
      { label: "Color Balance..." },
      { label: "Brightness/Contrast..." },
      { label: "Hue/Saturation..." },
      { label: "Selective Color..." },
      { label: "Channel Mixer..." },
      { label: "Gradient Map..." },
      { label: "Photo Filter..." },
      { label: "Invert" },
      { label: "Threshold..." },
      { label: "Posterize..." },
    ]},
    { label: "Change Layer Content", submenu: [
      { label: "Solid Color..." },
      { label: "Gradient..." },
      { label: "Pattern..." },
      { label: "separator", separator: true },
      { label: "Levels..." },
      { label: "Curves..." },
      { label: "Color Balance..." },
      { label: "Brightness/Contrast..." },
      { label: "Hue/Saturation..." },
      { label: "Selective Color..." },
      { label: "Channel Mixer..." },
      { label: "Gradient Map..." },
      { label: "Photo Filter..." },
      { label: "Invert" },
      { label: "Threshold..." },
      { label: "Posterize..." },
    ]},
    { label: "Layer Content Options..." },
    { label: "separator", separator: true },
    { label: "Layer Mask", submenu: [
      { label: "Reveal All" },
      { label: "Hide All" },
      { label: "Reveal Selection" },
      { label: "Hide Selection" },
      { label: "separator", separator: true },
      { label: "Delete" },
      { label: "Apply" },
      { label: "separator", separator: true },
      { label: "Disable" },
      { label: "Unlink" },
    ]},
    { label: "Vector Mask", submenu: [
      { label: "Reveal All" },
      { label: "Hide All" },
      { label: "Current Path" },
      { label: "separator", separator: true },
      { label: "Delete" },
      { label: "Enable" },
      { label: "Link" },
    ]},
    { label: "Create Clipping Mask", shortcut: "Alt+Ctrl+G" },
    { label: "Release Clipping Mask" },
    { label: "separator", separator: true },
    { label: "Smart Objects", submenu: [
      { label: "Convert to Smart Object" },
      { label: "New Smart Object via Copy" },
      { label: "Edit Contents" },
      { label: "Export Contents..." },
      { label: "Replace Contents..." },
      { label: "Rasterize" },
    ]},
    { label: "Type", submenu: [
      { label: "Create Work Path" },
      { label: "Convert to Shape" },
      { label: "Horizontal" },
      { label: "Vertical" },
      { label: "separator", separator: true },
      { label: "Anti-Alias None" },
      { label: "Anti-Alias Sharp" },
      { label: "Anti-Alias Crisp" },
      { label: "Anti-Alias Strong" },
      { label: "Anti-Alias Smooth" },
      { label: "separator", separator: true },
      { label: "Convert to Paragraph Text" },
      { label: "Warp Text..." },
      { label: "Update All Text Layers" },
      { label: "Replace All Missing Fonts" },
    ]},
    { label: "Rasterize", submenu: [
      { label: "Type" },
      { label: "Shape" },
      { label: "Fill Content" },
      { label: "Vector Mask" },
      { label: "Smart Object" },
      { label: "Video" },
      { label: "3D" },
      { label: "Layer" },
      { label: "All Layers" },
    ]},
    { label: "separator", separator: true },
    { label: "New Layer Based Slice" },
    { label: "separator", separator: true },
    { label: "Group Layers", shortcut: "Ctrl+G" },
    { label: "Ungroup Layers", shortcut: "Shift+Ctrl+G" },
    { label: "Hide Layers" },
    { label: "separator", separator: true },
    { label: "Arrange", submenu: [
      { label: "Bring to Front", shortcut: "Shift+Ctrl+]" },
      { label: "Bring Forward", shortcut: "Ctrl+]" },
      { label: "Send Backward", shortcut: "Ctrl+[" },
      { label: "Send to Back", shortcut: "Shift+Ctrl+[" },
      { label: "separator", separator: true },
      { label: "Reverse" },
    ]},
    { label: "Align", submenu: [
      { label: "Top Edges" },
      { label: "Vertical Centers" },
      { label: "Bottom Edges" },
      { label: "separator", separator: true },
      { label: "Left Edges" },
      { label: "Horizontal Centers" },
      { label: "Right Edges" },
    ]},
    { label: "Distribute", submenu: [
      { label: "Top Edges" },
      { label: "Vertical Centers" },
      { label: "Bottom Edges" },
      { label: "separator", separator: true },
      { label: "Left Edges" },
      { label: "Horizontal Centers" },
      { label: "Right Edges" },
    ]},
    { label: "Lock All Layers in Group..." },
    { label: "Link Layers" },
    { label: "Select Linked Layers" },
    { label: "separator", separator: true },
    { label: "Merge Layers", shortcut: "Ctrl+E" },
    { label: "Merge Visible", shortcut: "Shift+Ctrl+E" },
    { label: "Flatten Image" },
    { label: "Matting", submenu: [
      { label: "Defringe..." },
      { label: "Remove Black Matte" },
      { label: "Remove White Matte" },
    ]},
  ],
  Select: [
    { label: "All", shortcut: "Ctrl+A" },
    { label: "Deselect", shortcut: "Ctrl+D" },
    { label: "Reselect", shortcut: "Shift+Ctrl+D" },
    { label: "Inverse", shortcut: "Shift+Ctrl+I" },
    { label: "separator", separator: true },
    { label: "All Layers", shortcut: "Alt+Ctrl+A" },
    { label: "Deselect Layers" },
    { label: "Similar Layers" },
    { label: "separator", separator: true },
    { label: "Color Range..." },
    { label: "Refine Edge...", shortcut: "Alt+Ctrl+R" },
    { label: "separator", separator: true },
    { label: "Modify", submenu: [
      { label: "Border..." },
      { label: "Smooth..." },
      { label: "Expand..." },
      { label: "Contract..." },
      { label: "Feather...", shortcut: "Shift+F6" },
    ]},
    { label: "Grow" },
    { label: "Similar" },
    { label: "separator", separator: true },
    { label: "Transform Selection" },
    { label: "separator", separator: true },
    { label: "Load Selection..." },
    { label: "Save Selection..." },
  ],
  Filter: [
    { label: "Last Filter", shortcut: "Ctrl+F" },
    { label: "Convert for Smart Filters" },
    { label: "separator", separator: true },
    { label: "Filter Gallery..." },
    { label: "Liquify...", shortcut: "Shift+Ctrl+X" },
    { label: "Vanishing Point...", shortcut: "Alt+Ctrl+V" },
    { label: "separator", separator: true },
    { label: "Artistic", submenu: [
      { label: "Colored Pencil..." },
      { label: "Cutout..." },
      { label: "Dry Brush..." },
      { label: "Film Grain..." },
      { label: "Fresco..." },
      { label: "Neon Glow..." },
      { label: "Paint Daubs..." },
      { label: "Palette Knife..." },
      { label: "Plastic Wrap..." },
      { label: "Poster Edges..." },
      { label: "Rough Pastels..." },
      { label: "Smudge Stick..." },
      { label: "Sponge..." },
      { label: "Underpainting..." },
      { label: "Watercolor..." },
    ]},
    { label: "Blur", submenu: [
      { label: "Average" },
      { label: "Blur" },
      { label: "Blur More" },
      { label: "Box Blur..." },
      { label: "Gaussian Blur..." },
      { label: "Lens Blur..." },
      { label: "Motion Blur..." },
      { label: "Radial Blur..." },
      { label: "Shape Blur..." },
      { label: "Smart Blur..." },
      { label: "Surface Blur..." },
    ]},
    { label: "Brush Strokes", submenu: [
      { label: "Accented Edges..." },
      { label: "Angled Strokes..." },
      { label: "Crosshatch..." },
      { label: "Dark Strokes..." },
      { label: "Ink Outlines..." },
      { label: "Spatter..." },
      { label: "Sprayed Strokes..." },
      { label: "Sumi-e..." },
    ]},
    { label: "Distort", submenu: [
      { label: "Diffuse Glow..." },
      { label: "Displace..." },
      { label: "Glass..." },
      { label: "Lens Correction..." },
      { label: "Ocean Ripple..." },
      { label: "Pinch..." },
      { label: "Polar Coordinates..." },
      { label: "Ripple..." },
      { label: "Shear..." },
      { label: "Spherize..." },
      { label: "Twirl..." },
      { label: "Wave..." },
      { label: "ZigZag..." },
    ]},
    { label: "Noise", submenu: [
      { label: "Add Noise..." },
      { label: "Despeckle" },
      { label: "Dust & Scratches..." },
      { label: "Median..." },
      { label: "Reduce Noise..." },
    ]},
    { label: "Pixelate", submenu: [
      { label: "Color Halftone..." },
      { label: "Crystallize..." },
      { label: "Facet" },
      { label: "Fragment" },
      { label: "Mezzotint..." },
      { label: "Mosaic..." },
      { label: "Pointillize..." },
    ]},
    { label: "Render", submenu: [
      { label: "Clouds" },
      { label: "Difference Clouds" },
      { label: "Fibers..." },
      { label: "Lens Flare..." },
      { label: "Lighting Effects..." },
    ]},
    { label: "Sharpen", submenu: [
      { label: "Sharpen" },
      { label: "Sharpen Edges" },
      { label: "Sharpen More" },
      { label: "Smart Sharpen..." },
      { label: "Unsharp Mask..." },
    ]},
    { label: "Sketch", submenu: [
      { label: "Bas Relief..." },
      { label: "Chalk & Charcoal..." },
      { label: "Charcoal..." },
      { label: "Chrome..." },
      { label: "Conté Crayon..." },
      { label: "Graphic Pen..." },
      { label: "Halftone Pattern..." },
      { label: "Note Paper..." },
      { label: "Photocopy..." },
      { label: "Plaster..." },
      { label: "Reticulation..." },
      { label: "Stamp..." },
      { label: "Torn Edges..." },
      { label: "Water Paper..." },
    ]},
    { label: "Stylize", submenu: [
      { label: "Diffuse..." },
      { label: "Emboss..." },
      { label: "Extrude..." },
      { label: "Find Edges" },
      { label: "Glowing Edges..." },
      { label: "Solarize" },
      { label: "Tiles..." },
      { label: "Trace Contour..." },
      { label: "Wind..." },
    ]},
    { label: "Texture", submenu: [
      { label: "Craquelure..." },
      { label: "Grain..." },
      { label: "Mosaic Tiles..." },
      { label: "Patchwork..." },
      { label: "Stained Glass..." },
      { label: "Texturizer..." },
    ]},
    { label: "Video", submenu: [
      { label: "De-Interlace..." },
      { label: "NTSC Colors" },
    ]},
    { label: "Other", submenu: [
      { label: "Custom..." },
      { label: "High Pass..." },
      { label: "Maximum..." },
      { label: "Minimum..." },
      { label: "Offset..." },
    ]},
    { label: "separator", separator: true },
    { label: "Digimarc", submenu: [
      { label: "Embed Watermark..." },
      { label: "Read Watermark" },
    ]},
    { label: "Browse Filters Online..." },
  ],
  Analysis: [
    { label: "Set Measurement Scale", submenu: [
      { label: "Default" },
      { label: "Custom..." },
    ]},
    { label: "Select Data Points", submenu: [
      { label: "Custom..." },
    ]},
    { label: "Record Measurements" },
    { label: "separator", separator: true },
    { label: "Ruler Tool" },
    { label: "Count Tool" },
    { label: "separator", separator: true },
    { label: "Place Scale Marker..." },
  ],
  "3D": [
    { label: "New Layer from 3D File..." },
    { label: "New 3D Postcard from Layer" },
    { label: "New Shape from Layer", submenu: [
      { label: "Cone" },
      { label: "Cube" },
      { label: "Cube Wrap" },
      { label: "Cylinder" },
      { label: "Donut" },
      { label: "Hat" },
      { label: "Pyramid" },
      { label: "Ring" },
      { label: "Soda Can" },
      { label: "Sphere" },
      { label: "Spherical Panorama" },
      { label: "Wine Bottle" },
    ]},
    { label: "New Mesh from Grayscale", submenu: [
      { label: "Plane" },
      { label: "Two-Sided Plane" },
      { label: "Cylinder" },
      { label: "Sphere" },
    ]},
    { label: "separator", separator: true },
    { label: "Transform 3D Model" },
    { label: "Transform 3D Camera" },
    { label: "separator", separator: true },
    { label: "Render Settings", submenu: [
      { label: "Default" },
      { label: "Bounding Box Outline" },
      { label: "Depth Map" },
      { label: "Hidden Wireframe" },
      { label: "Line Illustration" },
      { label: "Normals" },
      { label: "Paint Mask" },
      { label: "Ray Traced" },
      { label: "Shaded Illustration" },
      { label: "Shaded Vertices" },
      { label: "Shaded Wireframe" },
      { label: "Solid Outline" },
      { label: "Solid Wireframe" },
      { label: "Transparent Bounding Box" },
      { label: "Transparent Bounding Box Outline" },
      { label: "Two-Sided" },
      { label: "Vertices" },
      { label: "Wireframe" },
    ]},
    { label: "Ground Plane Shadow Catcher" },
    { label: "separator", separator: true },
    { label: "Edit in Google Earth" },
    { label: "Get More Content..." },
    { label: "separator", separator: true },
    { label: "Browse 3D Content Online..." },
  ],
  View: [
    { label: "Proof Setup", submenu: [
      { label: "Custom..." },
      { label: "separator", separator: true },
      { label: "Working CMYK" },
      { label: "Working Cyan Plate" },
      { label: "Working Magenta Plate" },
      { label: "Working Yellow Plate" },
      { label: "Working Black Plate" },
      { label: "Working CMY Plates" },
      { label: "separator", separator: true },
      { label: "Macintosh RGB" },
      { label: "Windows RGB" },
      { label: "Monitor RGB" },
      { label: "separator", separator: true },
      { label: "Color Blindness - Protanopia-type" },
      { label: "Color Blindness - Deuteranopia-type" },
    ]},
    { label: "Proof Colors", shortcut: "Ctrl+Y" },
    { label: "separator", separator: true },
    { label: "Gamut Warning", shortcut: "Shift+Ctrl+Y" },
    { label: "Pixel Aspect Ratio Correction" },
    { label: "separator", separator: true },
    { label: "32-bit Preview Options..." },
    { label: "separator", separator: true },
    { label: "Zoom In", shortcut: "Ctrl++" },
    { label: "Zoom Out", shortcut: "Ctrl+-" },
    { label: "Fit on Screen", shortcut: "Ctrl+0" },
    { label: "Actual Pixels", shortcut: "Alt+Ctrl+0" },
    { label: "Print Size" },
    { label: "separator", separator: true },
    { label: "Screen Mode", submenu: [
      { label: "Standard Screen Mode" },
      { label: "Maximized Screen Mode" },
      { label: "Full Screen Mode with Menu Bar" },
      { label: "Full Screen Mode" },
    ]},
    { label: "separator", separator: true },
    { label: "Extras", shortcut: "Ctrl+H" },
    { label: "Show", submenu: [
      { label: "Layer Edges" },
      { label: "Selection Edges" },
      { label: "Target Path" },
      { label: "Grid" },
      { label: "Guides" },
      { label: "Count" },
      { label: "Smart Guides" },
      { label: "Slices" },
      { label: "Notes" },
      { label: "Pixel Grid" },
      { label: "3D Axis" },
      { label: "3D Ground Plane" },
      { label: "3D Lights" },
      { label: "3D Selection" },
      { label: "Brush Preview" },
      { label: "Mesh" },
      { label: "Edit Pins" },
      { label: "separator", separator: true },
      { label: "All" },
      { label: "None" },
      { label: "Show Extras Options..." },
    ]},
    { label: "separator", separator: true },
    { label: "Rulers", shortcut: "Ctrl+R" },
    { label: "separator", separator: true },
    { label: "Snap", shortcut: "Shift+Ctrl+;" },
    { label: "Snap To", submenu: [
      { label: "Guides" },
      { label: "Grid" },
      { label: "Layers" },
      { label: "Slices" },
      { label: "Document Bounds" },
      { label: "All" },
      { label: "None" },
    ]},
    { label: "separator", separator: true },
    { label: "Lock Guides", shortcut: "Alt+Ctrl+;" },
    { label: "Clear Guides" },
    { label: "New Guide..." },
    { label: "Lock Slices" },
    { label: "Clear Slices" },
  ],
  Window: [
    { label: "Arrange", submenu: [
      { label: "Cascade" },
      { label: "Tile" },
      { label: "Float in Window" },
      { label: "Float All in Windows" },
      { label: "Consolidate All to Tabs" },
      { label: "separator", separator: true },
      { label: "Match Zoom" },
      { label: "Match Location" },
      { label: "Match Rotation" },
      { label: "Match All" },
    ]},
    { label: "Workspace", submenu: [
      { label: "Save Workspace..." },
      { label: "Delete Workspace..." },
      { label: "separator", separator: true },
      { label: "Basic" },
      { label: "What's New in CS4" },
      { label: "Advanced 3D" },
      { label: "Analysis" },
      { label: "Automation" },
      { label: "Color and Tone" },
      { label: "Painting" },
      { label: "Proofing" },
      { label: "Typography" },
      { label: "Video" },
      { label: "Web" },
      { label: "separator", separator: true },
      { label: "Reset Basic" },
    ]},
    { label: "separator", separator: true },
    { label: "3D" },
    { label: "Actions", shortcut: "Alt+F9" },
    { label: "Adjustments" },
    { label: "Animation" },
    { label: "Brush Presets" },
    { label: "Brushes", shortcut: "F5" },
    { label: "Channels" },
    { label: "Character" },
    { label: "Clone Source" },
    { label: "Color", shortcut: "F6" },
    { label: "Histogram" },
    { label: "History" },
    { label: "Info", shortcut: "F8" },
    { label: "Layer Comps" },
    { label: "Layers", shortcut: "F7" },
    { label: "Masks" },
    { label: "Measurement Log" },
    { label: "Navigator" },
    { label: "Notes" },
    { label: "Paragraph" },
    { label: "Paths" },
    { label: "Styles" },
    { label: "Swatches" },
    { label: "Tool Presets" },
    { label: "Options" },
    { label: "Tools" },
  ],
  Help: [
    { label: "Photoshop Help...", shortcut: "F1" },
    { label: "separator", separator: true },
    { label: "About Photoshop..." },
    { label: "About Plug-In", submenu: [
      { label: "Camera Raw..." },
      { label: "HDR Toning..." },
    ]},
    { label: "separator", separator: true },
    { label: "Legal Notices..." },
    { label: "System Info..." },
    { label: "separator", separator: true },
    { label: "GPU Test..." },
    { label: "separator", separator: true },
    { label: "Registration..." },
    { label: "Deactivate..." },
    { label: "Updates..." },
    { label: "separator", separator: true },
    { label: "Photoshop Online..." },
  ],
};

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

interface SubmenuProps {
  items: MenuItem[];
  position: { top: number; left: number };
}

const Submenu: React.FC<SubmenuProps> = ({ items, position }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [submenuPos, setSubmenuPos] = useState<{ top: number; left: number } | null>(null);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  return (
    <div
      className="absolute bg-panel border border-border shadow-md z-50 min-w-[220px]"
      style={{ top: position.top, left: position.left }}
    >
      {items.map((item, index) => {
        if (item.separator) {
          return <div key={index} className="h-px bg-border-light mx-1 my-1" />;
        }
        
        return (
          <div
            key={item.label}
            ref={(el) => (itemRefs.current[item.label] = el)}
            className={`relative flex items-center px-4 py-1 text-xs cursor-pointer ${
              item.disabled 
                ? "text-muted-foreground cursor-not-allowed" 
                : "hover:bg-menu-hover hover:text-menu-hover-foreground"
            }`}
            onMouseEnter={() => {
              setHoveredItem(item.label);
              if (item.submenu && itemRefs.current[item.label]) {
                const rect = itemRefs.current[item.label]!.getBoundingClientRect();
                setSubmenuPos({ top: 0, left: rect.width - 4 });
              }
            }}
            onMouseLeave={() => {
              if (!item.submenu) setHoveredItem(null);
            }}
          >
            <span className="flex-1">{item.label}</span>
            {item.shortcut && (
              <span className="ml-8 text-muted-foreground">{item.shortcut}</span>
            )}
            {item.submenu && <span className="ml-2">▸</span>}
            
            {item.submenu && hoveredItem === item.label && submenuPos && (
              <Submenu items={item.submenu} position={submenuPos} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export const MenuBar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (item: string) => {
    if (menuOpen && activeMenu === item) {
      setMenuOpen(false);
      setActiveMenu(null);
    } else {
      setMenuOpen(true);
      setActiveMenu(item);
    }
  };

  const handleMenuHover = (item: string) => {
    if (menuOpen) {
      setActiveMenu(item);
    }
  };

  const getDropdownPosition = (item: string) => {
    const button = buttonRefs.current[item];
    if (!button) return { top: 24, left: 0 };
    const rect = button.getBoundingClientRect();
    return { top: 24, left: rect.left };
  };

  return (
    <div ref={menuRef} className="h-menu-h bg-panel border-b border-border flex items-center px-1 relative">
      {menuItems.map((item) => (
        <button
          key={item}
          ref={(el) => (buttonRefs.current[item] = el)}
          className={`px-2 h-[20px] text-sm font-ui leading-none transition-colors ${
            activeMenu === item && menuOpen
              ? "bg-menu-hover text-menu-hover-foreground"
              : "hover:bg-menu-hover hover:text-menu-hover-foreground"
          }`}
          onClick={() => handleMenuClick(item)}
          onMouseEnter={() => handleMenuHover(item)}
        >
          {item}
        </button>
      ))}
      
      {menuOpen && activeMenu && menuData[activeMenu] && (
        <Submenu 
          items={menuData[activeMenu]} 
          position={getDropdownPosition(activeMenu)} 
        />
      )}
    </div>
  );
};
