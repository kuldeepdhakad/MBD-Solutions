import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("skeleton", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-container animate-fade-in px-5 py-28 md:px-8">
      <Skeleton className="mb-4 h-6 w-32 rounded-full" />
      <Skeleton className="mb-6 h-12 w-full max-w-xl rounded-xl" />
      <Skeleton className="mb-3 h-4 w-full max-w-lg rounded-md" />
      <Skeleton className="mb-10 h-4 w-full max-w-md rounded-md" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-surface">
            <Skeleton className="h-40 w-full rounded-none" />
            <div className="space-y-3 p-6">
              <Skeleton className="h-5 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
