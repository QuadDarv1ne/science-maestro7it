"use client";

import * as React from "react";
import { Share2, Link2, Check, Twitter, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { confettiFromElement } from "@/components/site/confetti";

interface ShareMenuProps {
  url: string;
  title: string;
}

export function ShareMenu({ url, title }: ShareMenuProps) {
  const [copied, setCopied] = React.useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "Telegram",
      icon: Send,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "VK",
      icon: MessageCircle,
      href: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      label: "X (Twitter)",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Ссылка скопирована в буфер обмена");
      confettiFromElement(document.activeElement, 25);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Не удалось скопировать ссылку");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="rounded-full">
          <Share2 className="h-4 w-4" />
          Поделиться
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Поделиться публикацией</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {shareLinks.map((l) => (
          <DropdownMenuItem asChild key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer"
            >
              <l.icon className="h-3.5 w-3.5" />
              {l.label}
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={copyLink}
          className="flex items-center gap-2 cursor-pointer"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-accent" />
          ) : (
            <Link2 className="h-3.5 w-3.5" />
          )}
          {copied ? "Скопировано!" : "Копировать ссылку"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
