"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AVAILABLE_THEMES, type ThemeId } from "@/components/site/theme-provider";

function Swatch({ swatch }: { swatch: string }) {
  const isGradient = swatch.includes("gradient") || swatch.includes("(");
  return (
    <span
      className="w-4 h-4 rounded-full ring-1 ring-border/60 shadow-sm shrink-0"
      style={isGradient ? { background: swatch } : { backgroundColor: swatch }}
    />
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const currentTheme = (mounted ? theme : "dark") as ThemeId;

  const currentSwatch =
    AVAILABLE_THEMES.find((t) => t.id === currentTheme)?.swatch || "#d49a4a";
  const isCurrentGradient =
    currentSwatch.includes("gradient") || currentSwatch.includes("(");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Выбрать тему оформления"
          className="rounded-full h-9 w-9 relative overflow-hidden"
        >
          {/* Live swatch dot showing current theme accent */}
          <span
            className="absolute inset-0 opacity-25"
            style={
              isCurrentGradient
                ? { background: currentSwatch }
                : { backgroundColor: currentSwatch }
            }
          />
          <Palette className="h-4 w-4 relative z-10" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-3.5 w-3.5" />
          Тема оформления
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {AVAILABLE_THEMES.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Swatch swatch={t.swatch} />
            <span className="flex-1">{t.label}</span>
            {currentTheme === t.id && (
              <Check className="h-3.5 w-3.5 text-accent" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
