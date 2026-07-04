import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { siteConfig } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Terms and Conditions",
  description:
    "Terms and conditions for using services from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" description="Terms governing use of MBD Solutions websites and services." />
      <section className="py-16 md:py-20">
        <div className="prose-mbd mx-auto max-w-3xl px-5 md:px-8">
          <p>Last updated: July 3, 2026</p>
          <h2>Services</h2>
          <p>
            MBD Solutions provides website development, software products, mobile applications, AI solutions and
            digital marketing services. Project scope, timelines and pricing are defined in individual proposals
            or agreements.
          </p>
          <h2>Payments</h2>
          <p>
            Project fees are payable as agreed in the proposal. Work may be paused if invoices remain unpaid beyond
            the agreed terms.
          </p>
          <h2>Intellectual Property</h2>
          <p>
            Upon full payment, clients receive the deliverables defined in the project agreement. MBD Solutions
            retains rights to reusable frameworks, internal tools and portfolio presentation unless otherwise agreed.
          </p>
          <h2>Support</h2>
          <p>
            Free support periods and maintenance plans are defined per project. Ongoing support is available via
            WhatsApp, phone and email.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to {siteConfig.email}.
          </p>
        </div>
      </section>
    </>
  );
}
