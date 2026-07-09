"use client";

import { useMemo, useState } from "react";

import type { Job, Region } from "@/lib/data";

export function useJobFilters(jobs: Job[]) {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Region | undefined>();
  const [jobType, setJobType] = useState<string | undefined>();

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const query = search.toLowerCase().trim();
      if (
        query &&
        !job.title.toLowerCase().includes(query) &&
        !job.company.toLowerCase().includes(query) &&
        !job.tags.some((t) => t.toLowerCase().includes(query))
      ) {
        return false;
      }

      if (selectedLocation && !job.regions.includes(selectedLocation)) {
        return false;
      }

      if (jobType && job.type !== jobType) return false;

      return true;
    });
  }, [jobs, search, selectedLocation, jobType]);

  return {
    search,
    setSearch,
    selectedLocation,
    setSelectedLocation,
    jobType,
    setJobType,
    filteredJobs,
  };
}
