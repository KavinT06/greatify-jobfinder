import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Briefcase, ExternalLink, DollarSign } from "lucide-react";

import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CompanyAvatar } from "@/components/CompanyAvatar";
import { JOBS } from "@/lib/data";

export function generateStaticParams() {
  return JOBS.map((job) => ({ id: job.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = JOBS.find((j) => j.id === id);

  if (!job) return { title: "Job not found" };

  return {
    title: `${job.title} at ${job.company} — Greatify Jobs`,
    description: job.description,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = JOBS.find((j) => j.id === id);

  if (!job) notFound();

  return (
    <div className="flex flex-col min-h-full">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto p-6 space-y-6">
          <Link
            href="/"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="size-4" />
            Back to jobs
          </Link>

          <Card className="border border-border shadow-sm">
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <CompanyAvatar name={job.company} className="size-11 text-lg" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                      {job.title}
                    </h1>
                  </div>
                  <Button size="sm" className="shrink-0">
                    <ExternalLink className="size-4" />
                    Apply
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="size-3.5" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {job.postedAt}
                  </span>
                  {job.salary && (
                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                      <DollarSign className="size-3.5" />
                      {job.salary}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{job.type}</Badge>
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <hr className="border-border" />

              <div className="space-y-3">
                <h2 className="text-base font-medium">About this role</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
              </div>

              <div className="pt-2">
                <Button className="w-full sm:w-auto">
                  <ExternalLink className="size-4" />
                  Apply for this position
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
