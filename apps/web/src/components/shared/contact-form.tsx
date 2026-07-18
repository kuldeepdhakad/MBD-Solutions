"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/input";
import { api } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone is required"),
  email: z.string().email().optional().or(z.literal("")),
  businessType: z.string().min(1, "Select business type"),
  requirement: z.string().min(10, "Please describe your requirement"),
  budget: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setError("");
    try {
      await api("/contacts", {
        method: "POST",
        body: JSON.stringify(values),
        revalidate: false,
      });
      setSuccess(true);
      reset();
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try WhatsApp.");
    }
  };

  if (success) {
    return (
      <div className="animate-fade-in rounded-2xl border border-border bg-surface p-8 text-center shadow-card">
        <h3 className="text-xl font-semibold text-foreground">Thank you</h3>
        <p className="mt-2 text-muted">
          Your request has been received. Our team will contact you within 24 hours.
        </p>
        <Button className="mt-6" onClick={() => setSuccess(false)}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          placeholder="Your full name"
          error={!!errors.name}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
        <FieldError message={errors.name?.message} />
      </div>
      <div>
        <Label htmlFor="phone">Mobile Number *</Label>
        <Input
          id="phone"
          type="tel"
          inputMode="tel"
          placeholder="10-digit mobile number"
          error={!!errors.phone}
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
        <FieldError message={errors.phone?.message} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          {...register("email")}
        />
      </div>
      <div>
        <Label htmlFor="businessType">Business Type *</Label>
        <Select
          id="businessType"
          error={!!errors.businessType}
          aria-invalid={!!errors.businessType}
          {...register("businessType")}
        >
          <option value="">Select business type</option>
          <option>Doctor / Clinic</option>
          <option>Hospital</option>
          <option>Gym / Fitness</option>
          <option>Restaurant / Cafe</option>
          <option>School / College</option>
          <option>Real Estate</option>
          <option>Labour / Contractor</option>
          <option>Medical Store</option>
          <option>Hotel</option>
          <option>Other Business</option>
        </Select>
        <FieldError message={errors.businessType?.message} />
      </div>
      <div>
        <Label htmlFor="requirement">Requirement *</Label>
        <Textarea
          id="requirement"
          placeholder="Describe what you need..."
          error={!!errors.requirement}
          aria-invalid={!!errors.requirement}
          {...register("requirement")}
        />
        <FieldError message={errors.requirement?.message} />
      </div>
      <div>
        <Label htmlFor="budget">Budget</Label>
        <Select id="budget" {...register("budget")}>
          <option value="">Select budget range</option>
          <option>Under ₹10,000</option>
          <option>₹10,000 – ₹25,000</option>
          <option>₹25,000 – ₹50,000</option>
          <option>₹50,000 – ₹1,00,000</option>
          <option>₹1,00,000+</option>
        </Select>
      </div>
      {error && (
        <p className="rounded-lg border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        className="w-full transition-transform hover:shadow-glow active:scale-[0.98]"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit & Get Free Quote"}
      </Button>
    </form>
  );
}
