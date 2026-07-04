import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { siteConfig } from "@/lib/api";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions) and how we handle your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="How MBD Solutions collects, uses and protects your information." />
      <section className="py-16 md:py-20">
        <div className="prose-mbd mx-auto max-w-3xl px-5 md:px-8">
          <p>Last updated: July 3, 2026</p>
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide through contact forms, job applications, newsletter subscriptions,
            and client portal accounts. This may include your name, phone number, email address, business details
            and project requirements.
          </p>
          <h2>How We Use Information</h2>
          <p>
            We use your information to respond to enquiries, deliver services, process applications, improve our
            platform and communicate project updates. We do not sell personal data.
          </p>
          <h2>Data Security</h2>
          <p>
            We implement industry-standard security practices including encrypted authentication tokens, access
            controls and secure hosting. Access to admin systems is restricted by role-based permissions.
          </p>
          <h2>Contact</h2>
          <p>
            For privacy requests, contact {siteConfig.founder} at {siteConfig.email} or {siteConfig.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
