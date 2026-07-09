"use client";

import { Bookmark } from "lucide-react";

import { Header } from "@/components/Header";
import { JobList } from "@/components/JobList";
import { EmptyState } from "@/components/EmptyState";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { JOBS } from "@/lib/data";

export default function SavedJobsPage() {
  const { savedIds, isSaved, toggleSave } = useSavedJobs();

  const savedJobs = JOBS.filter((job) => savedIds.has(job.id));

  return (
    <div className="flex flex-col min-h-full">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Saved jobs</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {savedJobs.length} {savedJobs.length === 1 ? "position" : "positions"} saved
            </p>
          </div>

          {savedJobs.length === 0 ? (
            <EmptyState
              icon={Bookmark}
              title="No saved jobs yet"
              description="Jobs you save will appear here."
              action={{ label: "Browse jobs", href: "/" }}
            />
          ) : (
            <JobList jobs={savedJobs} isSaved={isSaved} onToggleSave={toggleSave} />
          )}
        </div>
      </main>
    </div>
  );
}
