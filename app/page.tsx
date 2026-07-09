import { Header } from "@/components/Header";
import { JobBrowser } from "@/components/JobBrowser";
import { JOBS } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-6">
          <JobBrowser jobs={JOBS} />
        </div>
      </main>
    </div>
  );
}
