import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "fluent-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          appearance?: "accent" | "lightweight" | "neutral" | "outline-solid" | "stealth";
          disabled?: boolean;
        },
        HTMLElement
      >;
      "fluent-tabs": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          activeid?: string;
          orientation?: "horizontal" | "vertical";
        },
        HTMLElement
      >;
      "fluent-tab": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          id?: string;
        },
        HTMLElement
      >;
      "fluent-tab-panel": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "fluent-text-field": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          placeholder?: string;
          readonly?: boolean;
          type?: string;
        },
        HTMLElement
      >;
      "fluent-slider": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          min?: string | number;
          max?: string | number;
          value?: string | number;
          step?: string | number;
        },
        HTMLElement
      >;
      "fluent-checkbox": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          checked?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

export {};
