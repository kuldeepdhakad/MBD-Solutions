import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Case Studies",
  description:
    "Case studies and success stories from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  redirect("/portfolio");
}
