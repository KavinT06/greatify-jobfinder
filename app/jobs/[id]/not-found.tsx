import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Header } from "@/components/Header";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 py-24">
          <p className="text-base font-medium">Job not found</p>
          <p className="text-sm text-muted-foreground">
            This position may have been removed.
          </p>
          <Link
            href="/"
            className={buttonVariants({ variant: "ghost", size: "sm", className: "mt-4" })}
          >
            <ArrowLeft className="size-4" />
            Back to jobs
          </Link>
        </div>
      </main>
    </div>
  );
}
