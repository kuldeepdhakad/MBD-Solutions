"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { ContentImage } from "@/components/shared/content-image";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { brandImages } from "@/lib/images";
import { siteConfig } from "@/lib/site";

const values = [
  { title: "Quality First", description: "Clean architecture, modern design and production standards on every project.", num: "01" },
  { title: "Transparent Pricing", description: "Clear packages and honest quotes with no hidden charges.", num: "02" },
  { title: "Client Partnership", description: "We stay available after delivery with 24×7 support.", num: "03" },
  { title: "Practical Innovation", description: "Modern technology only when it creates real business value.", num: "04" },
];

const timeline = [
  { year: "2023", title: "Founded", description: "MBD Solutions launched in honour of Mon Bai Dhakad." },
  { year: "2024", title: "Product Suite", description: "Released DoctorCare Pro, FitZone Gym and FoodHub Restaurant." },
  { year: "2025", title: "100+ Projects", description: "Crossed 100 delivered projects across India." },
  { year: "2026", title: "Enterprise Platform", description: "Full company platform with admin and client portals." },
];

export function AboutShowcase() {
  return (
    <div className="space-y-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-accent">Our Story</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Built to Help Businesses Grow Digitally
          </h2>
          <p className="mt-5 leading-relaxed text-muted">
            MBD Solutions was established to help businesses grow digitally through websites, software,
            mobile apps, AI solutions and digital marketing services. Founded by {siteConfig.founder} in
            honour of Mon Bai Dhakad, the company focuses on practical, affordable and production-ready
            digital products.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <p className="text-sm text-muted">Digital Solutions for Every Business</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative h-72 overflow-hidden rounded-3xl border border-border shadow-card md:h-96">
            <ContentImage src={brandImages.aboutOffice} alt="MBD Solutions office" fill priority />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden h-40 w-40 overflow-hidden rounded-2xl border-4 border-background shadow-elevated md:block">
            <ContentImage src={brandImages.aboutTeam} alt="MBD Solutions team" fill />
          </div>
        </motion.div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { value: "100+", label: "Projects Delivered" },
          { value: "50+", label: "Happy Clients" },
          { value: "24×7", label: "Support Available" },
          { value: "99%", label: "Client Satisfaction" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <p className="text-3xl font-bold text-accent">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold text-primary">Why Choose Us</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Affordable, transparent pricing",
            "Professional development standards",
            "Fast delivery without compromise",
            "WhatsApp-first customer workflows",
            "24×7 support after delivery",
            "Production-ready code on every project",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-secondary">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-primary p-8 text-primary-foreground md:p-10">
          <h3 className="text-xl font-bold">Mission</h3>
          <p className="mt-3 text-primary-foreground/70">
            Make professional digital solutions accessible to every business — from clinics and gyms to
            restaurants, schools and enterprises.
          </p>
        </div>
        <div className="rounded-3xl border border-accent/20 bg-accent/5 p-8 md:p-10">
          <h3 className="text-xl font-bold text-primary">Vision</h3>
          <p className="mt-3 text-muted">
            Become India&apos;s most trusted partner for industry-ready software platforms and digital growth.
          </p>
        </div>
      </div>

      <div>
        <h2 className="mb-8 text-2xl font-bold text-primary">Core Values</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={value.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-2xl border border-border p-6 transition hover:border-accent/30 hover:shadow-glow"
            >
              <span className="text-2xl font-bold text-accent/30 group-hover:text-accent/60 transition-colors">
                {value.num}
              </span>
              <h3 className="mt-3 font-semibold text-primary">{value.title}</h3>
              <p className="mt-2 text-sm text-muted">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-8 text-2xl font-bold text-primary">Our Journey</h2>
        <div className="relative border-l-2 border-accent/20 pl-8 space-y-10">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative"
            >
              <span className="absolute -left-[2.55rem] flex h-5 w-5 items-center justify-center rounded-full bg-accent ring-4 ring-background" />
              <p className="text-sm font-bold text-accent">{item.year}</p>
              <h3 className="mt-1 text-lg font-semibold text-primary">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-gradient-to-r from-primary to-secondary p-8 text-primary-foreground md:flex-row md:items-center md:p-10">
        <div>
          <h2 className="text-2xl font-bold">Meet the Founder</h2>
          <p className="mt-2 text-primary-foreground/70">
            Learn more about {siteConfig.founder}, Founder & CEO of MBD Solutions.
          </p>
        </div>
        <Button asChild variant="accent" size="lg">
          <Link href="/founder" prefetch>View Founder Profile</Link>
        </Button>
      </div>
    </div>
  );
}
