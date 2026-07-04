import type { Metadata } from "next";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/shared/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig, whatsappLink } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get a free consultation from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions). Call 6263478403 or email kuldeepdhakad153@gmail.com.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="Get Your Free Business Consultation"
        description="Fill the form and our team will contact you within 24 hours with a custom quote and demo."
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-10 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold">{siteConfig.founder}</h2>
                <p className="mt-1 text-muted">Founder, MBD Solutions</p>
                <div className="mt-6 space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-primary">Mobile / WhatsApp</p>
                    <a href={`tel:+91${siteConfig.phone}`} className="text-accent">
                      {siteConfig.phone}
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-primary">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-accent">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="whatsapp">
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp
                    </a>
                  </Button>
                  <Button asChild>
                    <a href={`tel:+91${siteConfig.phone}`}>Call Now</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold">What happens next?</h3>
                <ol className="mt-4 space-y-3 text-sm text-muted">
                  <li>1. Share your business requirement</li>
                  <li>2. Get a free quote and timeline</li>
                  <li>3. We build and deliver your solution</li>
                  <li>4. Ongoing support when you need it</li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="mb-6 text-xl font-semibold">Request a Free Quote</h2>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
