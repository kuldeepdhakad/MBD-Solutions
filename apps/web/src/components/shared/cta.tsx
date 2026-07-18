import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/api";

export function CTABand({
  title = "Get Your Free Business Consultation",
  description = "Talk to Kuldeep Dhakad and receive a custom quote and live demo within 24 hours.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-container px-5 md:px-8">
        <div className="rounded-3xl border border-border bg-primary px-8 py-12 text-primary-foreground shadow-elevated md:px-14 md:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-heading font-semibold tracking-tight text-primary-foreground">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary-foreground/70 md:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="whatsapp">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp {siteConfig.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
