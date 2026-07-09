"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search jobs, companies...",
}: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 h-8"
      />
    </div>
  );
}
