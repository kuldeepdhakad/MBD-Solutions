"use client";

import { ServiceCardPremium } from "@/components/home/service-card-premium";

type Service = {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  icon: string;
  startingPrice: string;
  bannerImage?: string | null;
};

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <ServiceCardPremium
          key={service.id}
          {...service}
          index={index}
        />
      ))}
    </div>
  );
}
