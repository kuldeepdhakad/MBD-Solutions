import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(({ className, type, error, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full rounded-xl border bg-surface px-4 text-sm text-foreground outline-none transition duration-200 placeholder:text-muted/70",
      "focus:border-accent focus:ring-2 focus:ring-accent/20",
      error
        ? "border-danger focus:border-danger focus:ring-danger/20"
        : "border-border",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[120px] w-full rounded-xl border bg-surface px-4 py-3 text-sm text-foreground outline-none transition duration-200 placeholder:text-muted/70",
      "focus:border-accent focus:ring-2 focus:ring-accent/20",
      error
        ? "border-danger focus:border-danger focus:ring-danger/20"
        : "border-border",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("mb-1.5 block text-sm font-medium text-foreground", className)}
    {...props}
  />
));
Label.displayName = "Label";

export const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-danger" role="alert">
      {message}
    </p>
  );
};

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }
>(({ className, error, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-xl border bg-surface px-4 text-sm text-foreground outline-none transition duration-200",
      "focus:border-accent focus:ring-2 focus:ring-accent/20",
      error
        ? "border-danger focus:border-danger focus:ring-danger/20"
        : "border-border",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
