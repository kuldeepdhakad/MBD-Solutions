import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Support",
  description:
    "24x7 support from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions) via WhatsApp, phone and email.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <>
      <PageHero eyebrow="Support" title="We're Here to Help" description="24×7 support via WhatsApp and phone. Free support period included with every project." />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-3 md:px-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-lg font-semibold">WhatsApp</h2>
              <p className="mt-2 text-sm text-muted">Fastest way to reach the team for demos and support.</p>
              <Button asChild className="mt-6" variant="whatsapp">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Chat Now</a>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-lg font-semibold">Phone</h2>
              <p className="mt-2 text-sm text-muted">Speak directly with {siteConfig.founder}.</p>
              <Button asChild className="mt-6">
                <a href={`tel:+91${siteConfig.phone}`}>Call {siteConfig.phone}</a>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-lg font-semibold">Email</h2>
              <p className="mt-2 text-sm text-muted">Share requirements, documents and support tickets.</p>
              <Button asChild className="mt-6" variant="outline">
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto mt-10 max-w-container px-5 md:px-8">
          <Button asChild variant="outline"><Link href="/portal">Client Portal Login</Link></Button>
        </div>
      </section>
    </>
  );
}
