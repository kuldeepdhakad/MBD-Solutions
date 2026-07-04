import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand } from "@/components/shared/cta";
import { getList } from "@/lib/api";

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
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-4 px-5 sm:grid-cols-2 md:grid-cols-3 md:px-8">
          {clients.map((client) => (
            <Card key={client.id}>
              <CardContent className="p-6">
                <h2 className="font-semibold">{client.name}</h2>
                <p className="mt-1 text-sm text-muted">{client.industry}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
