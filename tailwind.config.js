module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}', './public/**/*.html'],
  theme: {
    extend: {
      spacing: {
        'dock-w': 'var(--spacing-dock-w, 280px)',
        'tools-w': 'var(--spacing-tools-w, 66px)',
        'menu-h': 'var(--spacing-menu-h, 24px)',
        'options-h': 'var(--spacing-options-h, 36px)',
        'tab-h': 'var(--spacing-tab-h, 18px)',
        'panel-header': 'var(--spacing-panel-header, 18px)',
      },
      minWidth: {
        'app': 'var(--min-width-app, 980px)',
      },
      width: {
        'dock-w': 'var(--spacing-dock-w, 280px)',
        'tools-w': 'var(--spacing-tools-w, 66px)',
      },
      height: {
        'menu': 'var(--spacing-menu-h, 24px)',
        'options': 'var(--spacing-options-h, 36px)',
        'tab': 'var(--spacing-tab-h, 18px)',
      },
      colors: {
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'panel': 'hsl(var(--panel))',
        'panel-foreground': 'hsl(var(--panel-foreground))',
        'panel-header': 'hsl(var(--panel-header))',
        'border': 'hsl(var(--border))',
        'border-light': 'hsl(var(--border-light))',
        'border-dark': 'hsl(var(--border-dark))',
        'input': 'hsl(var(--input))',
        'muted': 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        'accent': 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
      },
    },
  },
  plugins: [],
};
