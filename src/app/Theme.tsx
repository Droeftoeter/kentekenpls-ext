import React from "react";
import { ThemeProvider } from "styled-components";

import useMatchMedia from "./hooks/useMatchMedia";

type ThemeProps = {
  children: React.ReactNode;
};

interface LabelColorSet {
  background: string;
  foreground: string;
}

interface Theme {
  surfaceColor: string;
  surfaceColorDarker: string;
  surfaceColorDarkest: string;
  focusColor: string;
  borderColor: string;

  textColor: string;
  subtleTextColor: string;

  iconColor: string;

  labelColors: {
    black: LabelColorSet;
    green: LabelColorSet;
    yellow: LabelColorSet;
    lightBlue: LabelColorSet;
    blue: LabelColorSet;
    cyan: LabelColorSet;
  };
}

const baseTheme: Pick<Theme, "labelColors"> = {
  labelColors: {
    black: {
      background: "#121212",
      foreground: "#FFFFFF",
    },
    green: {
      background: "#1B5E20",
      foreground: "#FFFFFF",
    },
    yellow: {
      background: "#FFC107",
      foreground: "#000000",
    },
    lightBlue: {
      background: "#0277BD",
      foreground: "#FFFFFF",
    },
    blue: {
      background: "#1565C0",
      foreground: "#FFFFFF",
    },
    cyan: {
      background: "#006064",
      foreground: "#FFFFFF",
    },
  },
};

const darkTheme: Theme = {
  ...baseTheme,
  surfaceColor: "hsl(0, 0%, 7%)",
  surfaceColorDarker: "hsl(0, 0%, 12%)",
  surfaceColorDarkest: "hsl(0, 0%, 14%)",
  focusColor: "hsl(0, 0%, 14%)",
  borderColor: "hsl(0, 0%, 21%)",

  textColor: "hsla(0, 0%, 100%, 1)",
  subtleTextColor: "hsla(0, 0%, 100%, .67)",

  iconColor: "hsla(0, 0%, 100%, .67)",
};

const lightTheme: Theme = {
  ...baseTheme,
  surfaceColor: "hsl(0, 0%, 100%)",
  surfaceColorDarker: "hsl(0, 0%, 95%)",
  surfaceColorDarkest: "hsl(0, 0%, 93%)",
  focusColor: "hsla(0, 0%, 0%, .08)",
  borderColor: "hsla(0, 0%, 0%, .08)",

  textColor: "hsla(0, 0%, 0%, .87)",
  subtleTextColor: "hsla(0, 0%, 0%, .67)",

  iconColor: "hsla(0, 0%, 0%, .47)",
};

const Theme = ({ children }: ThemeProps) => {
  const darkMode = useMatchMedia("(prefers-color-scheme: dark)");

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;
