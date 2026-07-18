import Image from "next/image";
import { PageSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background" role="status" aria-label="Loading page">
      <div className="flex flex-col items-center justify-center gap-6 border-b border-border py-16">
        <div className="relative animate-fade-in">
          <div className="absolute inset-0 animate-pulse rounded-full bg-accent/15 blur-xl" />
          <Image
            src="/assets/logos/mbd-logo-primary.png"
            alt="MBD Solutions"
            width={72}
            height={72}
            className="relative object-contain"
            priority
          />
        </div>
        <div className="flex flex-col items-center gap-2 animate-fade-in">
          <p className="text-sm font-semibold tracking-tight text-primary">MBD Solutions</p>
          <div className="h-1 w-24 overflow-hidden rounded-full bg-border">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-accent" />
          </div>
        </div>
      </div>
      <PageSkeleton />
    </div>
  );
}
