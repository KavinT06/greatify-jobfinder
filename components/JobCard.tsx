"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CompanyAvatar } from "@/components/CompanyAvatar";
import { cn } from "@/lib/utils";
import type { Job } from "@/lib/data";

export interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export function JobCard({ job, isSaved, onToggleSave }: JobCardProps) {
  return (
    <Card className="group border border-border shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-4 p-6">
        <Link
          href={`/jobs/${job.id}`}
          className="flex min-w-0 flex-1 cursor-pointer gap-3"
        >
          <CompanyAvatar name={job.company} className="mt-0.5 size-10 text-base" />

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold leading-snug tracking-tight truncate transition-colors group-hover:text-primary">
                {job.title}
              </h3>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground/80">{job.company}</span>
                <span className="text-border select-none" aria-hidden>·</span>
                <span>{job.location}</span>
                <span className="text-border select-none" aria-hidden>·</span>
                <span>{job.postedAt}</span>
              </p>
              {job.salary && (
                <p className="text-sm font-medium text-foreground">{job.salary}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {job.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Link>

        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={isSaved ? "Unsave job" : "Save job"}
          aria-pressed={isSaved}
          onClick={() => onToggleSave(job.id)}
          className={cn(
            "shrink-0 mt-0.5 text-muted-foreground transition-colors",
            isSaved && "text-primary"
          )}
        >
          <Bookmark
            className={cn("size-4 transition-all", isSaved && "fill-primary")}
          />
        </Button>
      </div>
    </Card>
  );
}
