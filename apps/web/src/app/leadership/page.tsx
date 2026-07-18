import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTABand } from "@/components/shared/cta";
import { ContentImage } from "@/components/shared/content-image";
import { getList } from "@/lib/api";
import { brandImages, getAvatarImage } from "@/lib/images";

export const metadata: Metadata = createPageMetadata({
  title: "Leadership Team",
  description:
    "Meet the leadership team guiding Mon Bai Dhakad Solutions Pvt. Ltd. (MBD Solutions) across product, engineering and client success.",
  path: "/leadership",
});

export default async function LeadershipPage() {
  let team: any[] = [];
  try { const res = await getList("team", { limit: "50", isLeadership: "true" }); team = res.data || []; } catch {}
  return (
    <>
      <PageHero eyebrow="Leadership" title="Leadership Team" description="Guiding product strategy, engineering excellence and client success." />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-container gap-6 px-5 md:grid-cols-2 md:px-8">
          {team.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="relative h-48 overflow-hidden sm:h-56">
                <ContentImage
                  src={getAvatarImage(member.name, member.avatar) || brandImages.founderPortrait}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold">{member.name}</h2>
                <p className="mt-1 text-accent">{member.role}</p>
                <p className="mt-4 text-muted">{member.bio}</p>
                {member.name.includes("Kuldeep") && (
                  <Button asChild className="mt-6" variant="outline"><Link href="/founder">View Founder Profile</Link></Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  );
}
