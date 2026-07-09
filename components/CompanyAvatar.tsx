import { cn, avatarPalette } from "@/lib/utils";

export interface CompanyAvatarProps {
  name: string;
  className?: string;
}

export function CompanyAvatar({ name, className }: CompanyAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg text-sm font-semibold select-none",
        avatarPalette(name),
        className
      )}
    >
      {initial}
    </div>
  );
}
