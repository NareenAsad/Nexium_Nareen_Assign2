'use client';

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";

import {
  Footer,
  FooterBottom,
} from "@/components/ui/footer";

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  copyright?: string;
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  copyright = "© 2025 Blog Summarizer. All rights reserved.",
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="max-w-7xl mx-auto">
        <Footer>
          <FooterBottom className="text-sm text-muted-foreground flex justify-around items-center">
            <div>{copyright}</div>
            {showModeToggle && <ModeToggle />}
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
