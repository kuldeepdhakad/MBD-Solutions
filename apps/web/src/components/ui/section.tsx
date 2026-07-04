import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-20", className)}>
      <div className="mx-auto max-w-container px-5 md:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-medium tracking-wide text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-surface pt-28 pb-14 md:pt-32 md:pb-16">
      <div className="mx-auto max-w-container px-5 md:px-8">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium tracking-wide text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-primary md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
