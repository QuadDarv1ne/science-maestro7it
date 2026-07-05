"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const AVAILABLE_THEMES = [
  { id: "auto", label: "Авто", swatch: "linear-gradient(135deg,#e8c896 50%,#1a1410 50%)" },
  { id: "light", label: "Светлая", swatch: "#e8c896" },
  { id: "dark", label: "Тёмная", swatch: "#d49a4a" },
  { id: "purple", label: "Фиолетовая", swatch: "#a774e8" },
  { id: "orange", label: "Оранжевая", swatch: "#f08a3a" },
  { id: "ocean", label: "Океан", swatch: "#4fb8d6" },
  { id: "forest", label: "Лес", swatch: "#5fb86f" },
  { id: "sunset", label: "Закат", swatch: "#e85a7a" },
  { id: "contrast", label: "Контраст", swatch: "#f5d700" },
] as const;

export type ThemeId = (typeof AVAILABLE_THEMES)[number]["id"];

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      themes={AVAILABLE_THEMES.filter((t) => t.id !== "auto").map((t) => t.id)}
      value={{
        auto: typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark",
        light: "light",
        dark: "dark",
        purple: "purple",
        orange: "orange",
        ocean: "ocean",
        forest: "forest",
        sunset: "sunset",
        contrast: "contrast",
      }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
