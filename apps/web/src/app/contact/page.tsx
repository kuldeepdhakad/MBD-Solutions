import type { Metadata } from "next";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { ContactShowcase } from "@/components/premium/contact-showcase";
import { JsonLd } from "@/components/seo/json-ld";

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
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-container px-5 md:px-8">
          <ContactShowcase />
        </div>
      </section>
    </>
  );
}
