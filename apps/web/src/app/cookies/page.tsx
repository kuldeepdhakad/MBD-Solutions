import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";

export const metadata: Metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Cookie policy for Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie Policy" description="How we use cookies and similar technologies." />
      <section className="py-16 md:py-20">
        <div className="prose-mbd mx-auto max-w-3xl px-5 md:px-8">
          <p>Last updated: July 3, 2026</p>
          <h2>What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device to help websites function, remember preferences and
            understand usage patterns.
          </p>
          <h2>How We Use Cookies</h2>
          <p>
            We use essential cookies for authentication and security, and analytics cookies to improve performance
            and content. You can control cookies through your browser settings.
          </p>
          <h2>Third-Party Services</h2>
          <p>
            Some embedded services or analytics providers may set their own cookies subject to their privacy policies.
          </p>
        </div>
      </section>
    </>
  );
}
