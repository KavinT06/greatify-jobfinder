"use client";

import { useState, useEffect } from "react";

import { FiltersBar } from "@/components/FiltersBar";
import { JobList } from "@/components/JobList";
import { Pagination } from "@/components/Pagination";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { useJobFilters } from "@/hooks/use-job-filters";
import type { Job, Region } from "@/lib/data";

const PAGE_SIZE = 6;

export interface JobBrowserProps {
  jobs: Job[];
}

export function JobBrowser({ jobs }: JobBrowserProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const { isSaved, toggleSave } = useSavedJobs();
  const {
    search,
    setSearch,
    selectedLocation,
    setSelectedLocation,
    jobType,
    setJobType,
    filteredJobs,
  } = useJobFilters(jobs);

  // Brief simulated fetch so the first paint demonstrates the loading state.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // Jump back to page 1 whenever the active filters change the result set.
  // Adjusting state during render (rather than in an effect) avoids an extra render pass.
  const filterKey = `${search}|${selectedLocation}|${jobType}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const pageJobs = filteredJobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Browse jobs</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {filteredJobs.length} {filteredJobs.length === 1 ? "position" : "positions"} available
        </p>
      </div>

      <FiltersBar
        search={search}
        selectedLocation={selectedLocation}
        jobType={jobType}
        onSearchChange={setSearch}
        onLocationChange={(v) => setSelectedLocation(v as Region | undefined)}
        onJobTypeChange={setJobType}
      />

      <JobList
        jobs={pageJobs}
        isLoading={isLoading}
        isSaved={isSaved}
        onToggleSave={toggleSave}
      />

      {!isLoading && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}
