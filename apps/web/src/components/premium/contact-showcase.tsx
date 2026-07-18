"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/shared/contact-form";
import { ContentImage } from "@/components/shared/content-image";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { brandImages } from "@/lib/images";
import { siteConfig, whatsappLink } from "@/lib/site";

export function ContactShowcase() {
  return (
    <div className="space-y-10">
      <div className="relative h-48 overflow-hidden rounded-3xl border border-border shadow-card md:h-56">
        <ContentImage src={brandImages.contactOffice} alt="Contact MBD Solutions" fill priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        <div className="absolute inset-0 flex items-center gap-4 px-8">
          <Logo size="lg" showText={false} />
          <div className="text-primary-foreground">
            <p className="text-sm font-medium text-primary-foreground/70">Get in touch</p>
            <h2 className="text-2xl font-bold">MBD Solutions</h2>
          </div>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 lg:col-span-2"
        >
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-primary">{siteConfig.founder}</h2>
            <p className="text-muted">Founder & CEO, MBD Solutions</p>
            <div className="mt-8 space-y-5">
              <a
                href={`tel:+91${siteConfig.phone}`}
                className="flex items-center gap-3 text-secondary transition hover:text-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Phone className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Phone / WhatsApp</span>
                  {siteConfig.phone}
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-secondary transition hover:text-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Mail className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Email</span>
                  {siteConfig.email}
                </span>
              </a>
              <div className="flex items-center gap-3 text-secondary">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Location</span>
                  India — Serving clients nationwide
                </span>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="whatsapp">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:+91${siteConfig.phone}`}>Call Now</a>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-primary p-8 text-primary-foreground">
            <h3 className="font-semibold">What happens next?</h3>
            <ol className="mt-4 space-y-3 text-sm text-primary-foreground/70">
              <li className="flex gap-2">
                <span className="font-bold text-accent">01</span> Share your requirement
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-accent">02</span> Get a free quote & timeline
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-accent">03</span> View live demo instantly
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-accent">04</span> We build & deliver
              </li>
            </ol>
          </div>

          <div className="relative h-48 overflow-hidden rounded-2xl border border-border">
            <ContentImage src={brandImages.contactMap} alt="Office location map" fill />
            <div className="absolute inset-0 flex items-center justify-center bg-primary/40">
              <p className="rounded-xl bg-surface/90 px-4 py-2 text-sm font-medium text-primary shadow-soft">
                Map — India (Serving Nationwide)
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 lg:col-span-3"
        >
          <h2 className="mb-2 text-xl font-bold text-primary">Request a Free Quote</h2>
          <p className="mb-8 text-sm text-muted">
            Our team responds within 24 hours with a custom proposal and live demo link.
          </p>
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}
