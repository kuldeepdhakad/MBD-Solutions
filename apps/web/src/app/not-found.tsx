import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      className="flex min-h-[70vh] items-center justify-center px-5 pt-28"
      aria-labelledby="not-found-heading"
    >
      <div className="max-w-lg text-center">
        <p className="text-sm font-medium text-accent">404</p>
        <h1
          id="not-found-heading"
          className="mt-3 text-4xl font-semibold tracking-tight text-primary"
        >
          Page not found
        </h1>
        <p className="mt-4 text-muted">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild variant="accent">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/search">Search</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
