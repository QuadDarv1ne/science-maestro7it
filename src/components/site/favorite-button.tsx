"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/components/site/favorites-context";
import { confettiFromElement } from "@/components/site/confetti";
import { toast } from "sonner";

interface FavoriteButtonProps {
  publicationId: number;
  publicationTitle: string;
  variant?: "icon" | "full";
  className?: string;
}

export function FavoriteButton({
  publicationId,
  publicationTitle,
  variant = "icon",
  className = "",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(publicationId);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(publicationId);
    if (!favorited) {
      confettiFromElement(e.currentTarget, 15);
      toast.success("Добавлено в избранное", {
        description: publicationTitle.substring(0, 80) + (publicationTitle.length > 80 ? "…" : ""),
      });
    } else {
      toast.info("Удалено из избранного");
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleToggle}
        aria-label={favorited ? "Удалить из избранного" : "Добавить в избранное"}
        className={`relative inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-muted/60 transition-colors ${className}`}
      >
        <AnimatePresence mode="wait">
          {favorited ? (
            <motion.span
              key="filled"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <BookmarkCheck className="h-4 w-4 text-accent fill-accent/30" />
            </motion.span>
          ) : (
            <motion.span
              key="empty"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  }

  return (
    <Button
      variant={favorited ? "default" : "outline"}
      size="lg"
      className={`rounded-full ${className}`}
      onClick={handleToggle}
    >
      {favorited ? (
        <>
          <BookmarkCheck className="h-4 w-4" />
          В избранном
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" />
          В избранное
        </>
      )}
    </Button>
  );
}

/** Button to clear all favorites — used in favorites panel */
export function ClearFavoritesButton() {
  const { clearFavorites, count } = useFavorites();
  if (count === 0) return null;

  const handleClear = () => {
    clearFavorites();
    toast.info("Избранное очищено");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-destructive"
      onClick={handleClear}
    >
      <Trash2 className="h-3.5 w-3.5" />
      Очистить
    </Button>
  );
}
