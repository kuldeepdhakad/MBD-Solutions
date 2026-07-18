import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand } from "@/components/shared/cta";
import { ContentImage } from "@/components/shared/content-image";
import { getList } from "@/lib/api";
import { getAvatarImage } from "@/lib/images";

export const metadata: Metadata = createPageMetadata({
  title: "Our Team",
  description:
    "Meet the team behind Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions) delivering web, mobile, AI and cloud solutions.",
  path: "/team",
});

export default async function TeamPage() {
  let team: any[] = [];
  try { const res = await getList("team", { limit: "50" }); team = res.data || []; } catch {}
  return (
    <>
      <PageHero eyebrow="People" title="Our Team" description="The people building products and delivering client success at MBD Solutions." />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
          {team.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <ContentImage
                  src={getAvatarImage(member.name, member.avatar)}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">{member.name}</h2>
                <p className="mt-1 text-sm text-accent">{member.role}</p>
                <p className="mt-3 text-sm text-muted">{member.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(member.skills || []).map((skill: string, index: number) => (
                    <span key={`${member.id}-skill-${index}`} className="rounded-full bg-background px-2.5 py-1 text-xs">{skill}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
