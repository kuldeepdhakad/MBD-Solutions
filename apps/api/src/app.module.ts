import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { PrismaModule } from "./prisma/prisma.module";
import { CrudModule } from "./common/crud.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ServicesModule } from "./services/services.module";
import { ProductsModule } from "./products/products.module";
import { ProjectsModule } from "./projects/projects.module";
import { TechnologiesModule } from "./technologies/technologies.module";
import { IndustriesModule } from "./industries/industries.module";
import { BlogsModule } from "./blogs/blogs.module";
import { FounderModule } from "./founder/founder.module";
import { TeamModule } from "./team/team.module";
import { JobsModule } from "./jobs/jobs.module";
import { ApplicationsModule } from "./applications/applications.module";
import { TestimonialsModule } from "./testimonials/testimonials.module";
import { FaqsModule } from "./faqs/faqs.module";
import { ContactsModule } from "./contacts/contacts.module";
import { NewsletterModule } from "./newsletter/newsletter.module";
import { MediaModule } from "./media/media.module";
import { SeoModule } from "./seo/seo.module";
import { SettingsModule } from "./settings/settings.module";
import { HomepageModule } from "./homepage/homepage.module";
import { ClientsModule } from "./clients/clients.module";
import { SolutionsModule } from "./solutions/solutions.module";
import { PricingModule } from "./pricing/pricing.module";
import { PortalModule } from "./portal/portal.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { SearchModule } from "./search/search.module";
import { PublicModule } from "./public/public.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ["../../.env", ".env"] }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }]),
    PrismaModule,
    CrudModule,
    AuthModule,
    UsersModule,
    ServicesModule,
    ProductsModule,
    ProjectsModule,
    TechnologiesModule,
    IndustriesModule,
    BlogsModule,
    FounderModule,
    TeamModule,
    JobsModule,
    ApplicationsModule,
    TestimonialsModule,
    FaqsModule,
    ContactsModule,
    NewsletterModule,
    MediaModule,
    SeoModule,
    SettingsModule,
    HomepageModule,
    ClientsModule,
    SolutionsModule,
    PricingModule,
    PortalModule,
    AnalyticsModule,
    SearchModule,
    PublicModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
