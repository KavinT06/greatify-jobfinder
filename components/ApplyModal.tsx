"use client";

import { useRef, useState, useCallback } from "react";
import { X, Upload, FileText, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApplyModalProps {
  jobTitle: string;
  company: string;
  open: boolean;
  onClose: () => void;
}

type Step = "form" | "submitting" | "success";

export function ApplyModal({ jobTitle, company, open, onClose }: ApplyModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setStep("form");
    setName("");
    setEmail("");
    setFile(null);
    setDragging(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleFile = (f: File | null) => {
    if (f && f.type === "application/pdf") setFile(f);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !file) return;
    setStep("submitting");
    setTimeout(() => setStep("success"), 2000);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: "fadeIn 0.2s ease" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl border border-border bg-background shadow-2xl"
        style={{ animation: "slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Gradient accent bar */}
        <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-linear-to-r from-violet-500 via-fuchsia-500 to-pink-500" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <div className="p-7">
          {/* ─── FORM STEP ─── */}
          {step === "form" && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold tracking-tight">Apply for this role</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{jobTitle}</span> · {company}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" htmlFor="apply-name">
                    Full name
                  </label>
                  <input
                    id="apply-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" htmlFor="apply-email">
                    Email address
                  </label>
                  <input
                    id="apply-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>

                {/* PDF uploader */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Resume (PDF)</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    className={cn(
                      "group relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-7 text-center transition-all",
                      dragging
                        ? "border-violet-500 bg-violet-500/10"
                        : file
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-border bg-muted/30 hover:border-violet-400 hover:bg-violet-500/5"
                    )}
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                    />
                    {file ? (
                      <>
                        <FileText className="size-8 text-emerald-500" />
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(0)} KB · Click to replace
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="size-8 text-muted-foreground transition group-hover:text-violet-500" />
                        <p className="text-sm font-medium">
                          {dragging ? "Drop it here!" : "Drag & drop or click to upload"}
                        </p>
                        <p className="text-xs text-muted-foreground">PDF only · Max 10 MB</p>
                      </>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!name || !email || !file}
                  className="w-full gap-2 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-700 hover:to-fuchsia-700 disabled:opacity-50"
                >
                  Submit Application
                </Button>
              </form>
            </>
          )}

          {/* ─── SUBMITTING STEP ─── */}
          {step === "submitting" && (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <div className="relative">
                <div className="size-16 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 opacity-20 blur-xl absolute inset-0 scale-150" />
                <Loader2 className="relative size-12 animate-spin text-violet-500" />
              </div>
              <p className="text-lg font-semibold">Submitting your application…</p>
              <p className="text-sm text-muted-foreground">Just a moment!</p>
            </div>
          )}

          {/* ─── SUCCESS STEP ─── */}
          {step === "success" && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 scale-150 rounded-full bg-emerald-400/20 blur-2xl" />
                <div
                  className="relative size-20 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg"
                  style={{ animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}
                >
                  <CheckCircle2 className="size-10 text-white" />
                </div>
              </div>

              <Sparkles className="size-5 text-yellow-400" style={{ animation: "fadeIn 0.6s 0.4s both" }} />

              <div style={{ animation: "fadeIn 0.5s 0.2s both" }}>
                <h2 className="text-xl font-semibold tracking-tight">You're applied! 🎉</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your application for <span className="font-medium text-foreground">{jobTitle}</span> at{" "}
                  <span className="font-medium text-foreground">{company}</span> has been submitted.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  A confirmation has been sent to <span className="font-medium">{email}</span>.
                </p>
              </div>

              <Button
                onClick={handleClose}
                className="mt-2 w-full bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                style={{ animation: "fadeIn 0.5s 0.4s both" }}
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes popIn  { from { opacity: 0; transform: scale(0.5) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}
