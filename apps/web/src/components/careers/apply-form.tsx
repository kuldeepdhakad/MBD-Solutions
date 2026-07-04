"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { api } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  resumeUrl: z.string().url().optional().or(z.literal("")),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  coverLetter: z.string().min(20),
});

type FormValues = z.infer<typeof schema>;

export function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setError("");
    try {
      await api("/applications", {
        method: "POST",
        body: JSON.stringify({ ...values, jobId }),
        revalidate: false,
      });
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Failed to submit application");
    }
  };

  if (success) {
    return (
      <div className="rounded-xl bg-surface p-4 text-sm text-secondary">
        Application submitted for <strong>{jobTitle}</strong>. We will review and respond soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-danger">Name is required</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register("phone")} />
      </div>
      <div>
        <Label htmlFor="resumeUrl">Resume URL</Label>
        <Input id="resumeUrl" placeholder="https://..." {...register("resumeUrl")} />
      </div>
      <div>
        <Label htmlFor="portfolioUrl">Portfolio URL</Label>
        <Input id="portfolioUrl" placeholder="https://..." {...register("portfolioUrl")} />
      </div>
      <div>
        <Label htmlFor="coverLetter">Cover Letter</Label>
        <Textarea id="coverLetter" {...register("coverLetter")} />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
