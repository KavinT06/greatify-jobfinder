import { Search } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { JobCard } from "@/components/JobCard";
import { EmptyState } from "@/components/EmptyState";
import type { Job } from "@/lib/data";

function JobCardSkeleton() {
  return (
    <Card className="border border-border shadow-sm">
      <div className="flex items-start justify-between gap-4 p-6">
        <div className="flex flex-col gap-3 min-w-0 flex-1">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
        <Skeleton className="size-7 shrink-0 rounded-md" />
      </div>
    </Card>
  );
}

interface JobListProps {
  jobs: Job[];
  isLoading?: boolean;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
}

export function JobList({
  jobs,
  isLoading = false,
  isSaved,
  onToggleSave,
}: JobListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))
      ) : jobs.length === 0 ? (
        <div className="col-span-full">
          <EmptyState
            icon={Search}
            title="No jobs found"
            description="Try adjusting your filters or check back later."
          />
        </div>
      ) : (
        jobs.map((job, index) => (
          <div
            key={job.id}
            className="animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-backwards"
            style={{ animationDelay: `${Math.min(index, 8) * 40}ms`, animationDuration: "300ms" }}
          >
            <JobCard
              job={job}
              isSaved={isSaved(job.id)}
              onToggleSave={onToggleSave}
            />
          </div>
        ))
      )}
    </div>
  );
}
