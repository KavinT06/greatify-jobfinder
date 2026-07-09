"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL = "all";

const LOCATIONS = [
  { value: "remote", label: "Remote" },
  { value: "usa", label: "United States" },
  { value: "europe", label: "Europe" },
  { value: "asia", label: "Asia" },
];

const JOB_TYPES = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
];

const LOCATION_LABELS: Record<string, string> = Object.fromEntries(
  LOCATIONS.map(({ value, label }) => [value, label])
);
const JOB_TYPE_LABELS: Record<string, string> = Object.fromEntries(
  JOB_TYPES.map(({ value, label }) => [value, label])
);

export interface FiltersBarProps {
  search?: string;
  selectedLocation?: string;
  jobType?: string;
  onSearchChange?: (value: string) => void;
  onLocationChange?: (value: string | undefined) => void;
  onJobTypeChange?: (value: string | undefined) => void;
}

export function FiltersBar({
  search = "",
  selectedLocation,
  jobType,
  onSearchChange,
  onLocationChange,
  onJobTypeChange,
}: FiltersBarProps) {
  const hasActiveFilters = Boolean(search || selectedLocation || jobType);

  const clearFilters = () => {
    onSearchChange?.("");
    onLocationChange?.(undefined);
    onJobTypeChange?.(undefined);
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card/50 p-3 sm:flex-row sm:items-center">
      <SearchBar value={search} onChange={(v) => onSearchChange?.(v)} />

      <div className="w-full sm:w-40">
        <Select
          value={selectedLocation ?? ALL}
          onValueChange={(v) => onLocationChange?.(v === ALL || v == null ? undefined : v)}
        >
          <SelectTrigger className="w-full h-8">
            <SelectValue placeholder="Location">
              {(value: string) => (value === ALL ? "All locations" : LOCATION_LABELS[value])}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All locations</SelectItem>
            {LOCATIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-40">
        <Select
          value={jobType ?? ALL}
          onValueChange={(v) => onJobTypeChange?.(v === ALL || v == null ? undefined : v)}
        >
          <SelectTrigger className="w-full h-8">
            <SelectValue placeholder="Job type">
              {(value: string) => (value === ALL ? "All types" : JOB_TYPE_LABELS[value])}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All types</SelectItem>
            {JOB_TYPES.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground shrink-0"
        >
          <X className="size-3.5" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
