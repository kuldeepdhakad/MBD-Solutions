import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DemoLinkProps = {
  href: string;
  variant?: "accent" | "outline" | "ghost" | "default";
  size?: "sm" | "default" | "lg";
  className?: string;
  label?: string;
};

export function DemoLink({
  href,
  variant = "accent",
  size = "sm",
  className,
  label = "Live Demo",
}: DemoLinkProps) {
  return (
    <Button asChild size={size} variant={variant} className={cn("gap-1.5", className)}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Play className="h-3.5 w-3.5" />
        {label}
        <ExternalLink className="h-3 w-3 opacity-60" />
      </a>
    </Button>
  );
}
