import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { CTABand } from "@/components/shared/cta";
import { TrustedBySection } from "@/components/home/trusted-by-section";
import { getList } from "@/lib/api";
import { resolveTrustedClients } from "@/lib/home-content";

export const metadata: Metadata = createPageMetadata({
  title: "Clients",
  description:
    "Businesses that trust Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions) for digital growth.",
  path: "/clients",
});

export default async function ClientsPage() {
  let clients: any[] = [];
  try {
    const res = await getList("clients", { limit: "50" });
    clients = res.data || [];
  } catch {}

  return (
    <>
      <PageHero eyebrow="Clients" title="Our Clients" description="Businesses that trust MBD Solutions for digital growth." />
      <TrustedBySection clients={resolveTrustedClients(clients)} />
      <CTABand />
    </>
  );
}
