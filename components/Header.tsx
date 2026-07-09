"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Bookmark } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function Header() {
  const { isDark, toggle } = useTheme();
  const pathname = usePathname();
  const isSavedActive = pathname === "/saved";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/greatifylogo.jpg"
            alt="Greatify"
            width={32}
            height={32}
            className="size-12 scale-125 rounded-xl mr-2" 
            priority
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-semibold tracking-tight leading-none">
              Greatify Jobs
            </span>
            <span className="text-sm text-muted-foreground leading-none">
              Find your next opportunity
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/saved"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              isSavedActive && "bg-muted text-foreground"
            )}
            aria-current={isSavedActive ? "page" : undefined}
          >
            <Bookmark className={cn("size-4", isSavedActive && "fill-current")} />
            <span className="hidden sm:inline">Saved</span>
          </Link>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggle}
          >
            {isDark ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          <div
            role="img"
            aria-label="User avatar"
            className="size-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground select-none"
          >
            U
          </div>
        </div>
      </div>
    </header>
  );
}
