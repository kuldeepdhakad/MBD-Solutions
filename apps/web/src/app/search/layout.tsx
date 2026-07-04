import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Search",
  description:
    "Search services, products, portfolio and insights from Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions).",
  path: "/search",
});

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
