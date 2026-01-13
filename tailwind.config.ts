import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        "border-light": "hsl(var(--border-light))",
        "border-dark": "hsl(var(--border-dark))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--accent))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        panel: {
          DEFAULT: "hsl(var(--panel))",
          foreground: "hsl(var(--panel-foreground))",
          header: "hsl(var(--panel-header))",
        },
        workspace: {
          DEFAULT: "hsl(var(--workspace))",
          foreground: "hsl(var(--workspace-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        highlight: "hsl(var(--highlight))",
        shadow: "hsl(var(--shadow))",
        document: {
          DEFAULT: "hsl(var(--document))",
          foreground: "hsl(var(--document-foreground))",
          shadow: "hsl(var(--document-shadow))",
        },
        ruler: {
          DEFAULT: "hsl(var(--ruler))",
          foreground: "hsl(var(--ruler-foreground))",
          tick: "hsl(var(--ruler-tick))",
          cursor: "hsl(var(--ruler-cursor))",
        },
        swatch: {
          foreground: "hsl(var(--swatch-foreground))",
          background: "hsl(var(--swatch-background))",
        },
        tool: {
          active: "hsl(var(--tool-active))",
          hover: "hsl(var(--tool-hover))",
        },
        layer: {
          selected: "hsl(var(--layer-selected))",
          "selected-foreground": "hsl(var(--layer-selected-foreground))",
        },
        menu: {
          hover: "hsl(var(--menu-hover))",
          "hover-foreground": "hsl(var(--menu-hover-foreground))",
        },
      },
      fontFamily: {
        ui: ["Segoe UI", "Tahoma", "Arial", "sans-serif"],
      },
      fontSize: {
        "2xs": "10px",
        xs: "11px",
        sm: "12px",
      },
      spacing: {
        "menu-h": "var(--menu-height)",
        "options-h": "var(--options-height)",
        "tools-w": "var(--tools-width)",
        "dock-w": "var(--dock-width)",
        "ruler": "var(--ruler-size)",
        "tool-btn": "var(--tool-button-size)",
        "panel-header": "var(--panel-header-height)",
        "tab-h": "var(--tab-height)",
      },
      borderRadius: {
        none: "0px",
        sm: "1px",
        DEFAULT: "1px",
        md: "2px",
      },
      boxShadow: {
        inset: "inset 1px 1px 0 hsl(var(--shadow)), inset -1px -1px 0 hsl(var(--highlight))",
        raised: "inset -1px -1px 0 hsl(var(--shadow)), inset 1px 1px 0 hsl(var(--highlight))",
        pressed: "inset 1px 1px 0 hsl(var(--shadow)), inset -1px -1px 0 hsl(var(--highlight))",
        doc: "2px 2px 4px hsl(var(--document-shadow) / 0.4), 4px 4px 8px hsl(var(--document-shadow) / 0.2)",
      },
      minWidth: {
        app: "980px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
