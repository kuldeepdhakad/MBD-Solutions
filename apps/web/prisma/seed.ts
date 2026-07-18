import { PrismaClient, RoleName, ContentStatus, JobType } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding MBD Solutions database...");

  const permissions = [
    "users.read", "users.write", "users.delete",
    "services.read", "services.write", "services.delete",
    "products.read", "products.write", "products.delete",
    "projects.read", "projects.write", "projects.delete",
    "blogs.read", "blogs.write", "blogs.delete",
    "jobs.read", "jobs.write", "jobs.delete",
    "applications.read", "applications.write",
    "contacts.read", "contacts.write",
    "testimonials.read", "testimonials.write", "testimonials.delete",
    "faqs.read", "faqs.write", "faqs.delete",
    "team.read", "team.write", "team.delete",
    "founder.read", "founder.write",
    "media.read", "media.write", "media.delete",
    "seo.read", "seo.write",
    "settings.read", "settings.write",
    "analytics.read", "audit.read",
  ];

  for (const name of permissions) {
    await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name, description: name.replace(".", " ") },
    });
  }

  const allPerms = await prisma.permission.findMany();

  const superAdminRole = await prisma.role.upsert({
    where: { name: RoleName.SUPER_ADMIN },
    update: { permissions: { set: allPerms.map((p) => ({ id: p.id })) } },
    create: {
      name: RoleName.SUPER_ADMIN,
      description: "Full platform access",
      permissions: { connect: allPerms.map((p) => ({ id: p.id })) },
    },
  });

  await prisma.role.upsert({
    where: { name: RoleName.ADMIN },
    update: {},
    create: {
      name: RoleName.ADMIN,
      description: "Admin access",
      permissions: {
        connect: allPerms
          .filter((p) => !p.name.includes("users.delete") && !p.name.includes("audit"))
          .map((p) => ({ id: p.id })),
      },
    },
  });

  await prisma.role.upsert({
    where: { name: RoleName.EDITOR },
    update: {},
    create: {
      name: RoleName.EDITOR,
      description: "Content editor",
      permissions: {
        connect: allPerms
          .filter((p) => p.name.includes("blogs") || p.name.includes("media") || p.name.includes("faqs"))
          .map((p) => ({ id: p.id })),
      },
    },
  });

  await prisma.role.upsert({
    where: { name: RoleName.CLIENT },
    update: {},
    create: { name: RoleName.CLIENT, description: "Client portal access" },
  });

  await prisma.role.upsert({
    where: { name: RoleName.USER },
    update: {},
    create: { name: RoleName.USER, description: "Standard user" },
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  let admin = null;

  if (adminEmail && adminPassword) {
    const password = await bcrypt.hash(adminPassword, 12);
    admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        password,
        name: "Kuldeep Dhakad",
        phone: "6263478403",
        roleId: superAdminRole.id,
      },
    });
  } else {
    admin = await prisma.user.findFirst({
      where: { role: { name: RoleName.SUPER_ADMIN } },
    });
    if (!admin) {
      console.warn(
        "Admin user not seeded: set ADMIN_EMAIL and ADMIN_PASSWORD in server environment (never use NEXT_PUBLIC_).",
      );
    }
  }

  if (!admin) {
    throw new Error(
      "Cannot complete seed without an admin user. Set ADMIN_EMAIL and ADMIN_PASSWORD in your server .env file.",
    );
  }

  await prisma.founder.upsert({
    where: { id: "founder-mbd-001" },
    update: {},
    create: {
      id: "founder-mbd-001",
      name: "Kuldeep Dhakad",
      title: "Founder & CEO, MBD Solutions",
      biography:
        "Kuldeep Dhakad is the founder of MBD Solutions (Mon Bai Dhakad Solutions), a technology company dedicated to helping businesses across India grow digitally. Named in honour of Mon Bai Dhakad, the company delivers websites, ERP systems, mobile apps, AI solutions, and digital marketing at prices that work for startups and growing businesses.\n\nWith a strong focus on practical, production-ready software, Kuldeep has led the delivery of 100+ digital projects spanning healthcare, fitness, restaurants, education, labour management, and enterprise software. His approach combines modern engineering standards with transparent pricing and hands-on client support.",
      experience: [
        { role: "Founder & CEO", company: "MBD Solutions", period: "2023 – Present", description: "Leading product strategy, engineering, and client delivery across websites, ERP, mobile apps, and AI solutions." },
        { role: "Full Stack Engineer", company: "Independent Consulting", period: "2021 – 2023", description: "Built custom web applications and business automation systems for SMEs across Madhya Pradesh." },
      ],
      education: [
        { degree: "Bachelor of Technology", institution: "Engineering College", year: "2021" },
      ],
      skills: ["Full Stack Development", "Product Strategy", "NestJS", "Next.js", "PostgreSQL", "React Native", "Cloud Deployment", "Digital Marketing", "Client Consulting"],
      achievements: [
        "Delivered 100+ digital projects across India",
        "Built industry platforms for healthcare, gyms, restaurants, and labour contractors",
        "Established MBD Solutions in honour of Mon Bai Dhakad",
        "Maintained 99% client satisfaction with 24×7 support",
      ],
      certificates: [
        { name: "Full Stack Web Development", issuer: "Industry Certification" },
        { name: "Cloud & DevOps Fundamentals", issuer: "Industry Certification" },
      ],
      timeline: [
        { year: "2021", title: "Started Consulting", description: "Began building custom websites and software for local businesses." },
        { year: "2023", title: "Founded MBD Solutions", description: "Launched Mon Bai Dhakad Solutions to deliver complete digital solutions at accessible prices." },
        { year: "2024", title: "Product Suite Launch", description: "Released DoctorCare Pro, FitZone Gym, and FoodHub Restaurant platforms." },
        { year: "2025", title: "100+ Projects", description: "Crossed 100 delivered projects with clients across Madhya Pradesh and India." },
        { year: "2026", title: "Enterprise Platform", description: "Launched the full MBD Solutions enterprise company platform." },
      ],
      email: "kuldeepdhakad153@gmail.com",
      phone: "6263478403",
      linkedinUrl: "https://linkedin.com",
      githubUrl: "https://github.com",
    },
  });

  const services = [
    {
      title: "Website Development",
      slug: "website-development",
      shortDesc: "Professional websites that build trust and convert visitors into customers.",
      description: "From landing pages to full e-commerce stores and government portals, MBD Solutions designs and develops responsive, SEO-ready websites tailored to your business goals. Every site is mobile-friendly, fast, and built with modern frameworks.",
      icon: "Globe",
      features: ["Responsive design", "SEO optimization", "CMS integration", "Contact forms", "WhatsApp integration", "Analytics setup"],
      benefits: ["24/7 online presence", "Higher credibility", "Lead generation", "Mobile-ready experience"],
      process: ["Discovery & requirements", "Design mockups", "Development", "Testing & SEO", "Launch & support"],
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
      timeline: "3–14 days depending on scope",
      pricing: [
        { name: "Landing Page", price: "₹4,999" },
        { name: "Business Website (5 Pages)", price: "₹9,999" },
        { name: "Professional Company Website", price: "₹14,999" },
        { name: "E-Commerce Website", price: "₹24,999" },
        { name: "Custom Business Portal", price: "₹49,999+" },
        { name: "Government Project Portal", price: "₹99,999+" },
      ],
      startingPrice: "₹4,999",
      isFeatured: true,
      sortOrder: 1,
    },
    {
      title: "Healthcare Solutions",
      slug: "healthcare-solutions",
      shortDesc: "Clinic and hospital software for appointments, records, and patient care.",
      description: "Digitize your clinic or hospital with appointment booking, patient records, online consultation, and management dashboards. Built for doctors who want less paperwork and better patient experience.",
      icon: "HeartPulse",
      features: ["Appointment booking", "Patient registration", "Medical records", "Online consultation", "Billing", "WhatsApp reminders"],
      benefits: ["Fewer no-shows", "Organized records", "Faster check-ins", "Better patient trust"],
      process: ["Clinic workflow analysis", "Module selection", "Customization", "Staff training", "Go-live support"],
      techStack: ["Next.js", "NestJS", "PostgreSQL", "React Native"],
      timeline: "1–4 weeks",
      pricing: [
        { name: "Doctor Appointment Booking", price: "₹9,999" },
        { name: "Clinic Management Software", price: "₹14,999" },
        { name: "Hospital Management System", price: "₹49,999" },
        { name: "Patient Record Management", price: "₹7,999" },
        { name: "Online Consultation Portal", price: "₹19,999" },
      ],
      startingPrice: "₹7,999",
      isFeatured: true,
      sortOrder: 2,
    },
    {
      title: "Gym Management Solutions",
      slug: "gym-management",
      shortDesc: "Membership, attendance, and billing systems for fitness businesses.",
      description: "Run your gym with membership plans, attendance tracking, trainer profiles, BMI tools, and automated billing — all in one platform.",
      icon: "Dumbbell",
      features: ["Membership plans", "Attendance tracking", "Trainer profiles", "BMI calculator", "Diet plans", "Billing"],
      benefits: ["Automated renewals", "Member insights", "Less manual work", "Professional brand presence"],
      process: ["Gym setup", "Plan configuration", "Member migration", "Staff onboarding", "Launch"],
      techStack: ["React", "Node.js", "PostgreSQL", "WhatsApp API"],
      timeline: "1–3 weeks",
      pricing: [
        { name: "Gym Website", price: "₹7,999" },
        { name: "Membership Management", price: "₹12,999" },
        { name: "Attendance Tracking", price: "₹9,999" },
        { name: "Complete Gym ERP", price: "₹24,999" },
      ],
      startingPrice: "₹7,999",
      isFeatured: true,
      sortOrder: 3,
    },
    {
      title: "Restaurant Solutions",
      slug: "restaurant-solutions",
      shortDesc: "Online ordering, table booking, and restaurant management software.",
      description: "Grow restaurant revenue with digital menus, online ordering, table reservations, kitchen workflows, and WhatsApp order integration.",
      icon: "UtensilsCrossed",
      features: ["Digital menu", "Online ordering", "Table reservation", "Kitchen display", "Reviews", "Delivery info"],
      benefits: ["More online orders", "Fewer phone errors", "Faster table turns", "Better customer experience"],
      process: ["Menu setup", "Ordering flow design", "Integration", "Staff training", "Go-live"],
      techStack: ["Next.js", "NestJS", "PostgreSQL", "Cloudinary"],
      timeline: "1–3 weeks",
      pricing: [
        { name: "Restaurant Website", price: "₹7,999" },
        { name: "Online Food Ordering", price: "₹14,999" },
        { name: "Table Booking System", price: "₹9,999" },
        { name: "Complete Restaurant Management", price: "₹29,999" },
      ],
      startingPrice: "₹7,999",
      isFeatured: true,
      sortOrder: 4,
    },
    {
      title: "Mobile App Development",
      slug: "mobile-app-development",
      shortDesc: "Android, iOS, and cross-platform apps for business growth.",
      description: "Native-quality mobile apps for Android and iOS, designed for performance, usability, and long-term maintainability.",
      icon: "Smartphone",
      features: ["Android apps", "iOS apps", "Cross-platform", "Push notifications", "Offline support", "App store deployment"],
      benefits: ["Direct customer channel", "Brand loyalty", "Mobile-first experience", "Scalable product"],
      process: ["Product discovery", "UI/UX design", "Development sprints", "QA & testing", "Store launch"],
      techStack: ["React Native", "Flutter", "Node.js", "Firebase"],
      timeline: "3–10 weeks",
      pricing: [
        { name: "Android App", price: "₹24,999" },
        { name: "iOS App", price: "₹39,999" },
        { name: "Android + iOS App", price: "₹59,999" },
        { name: "Enterprise Mobile App", price: "₹99,999+" },
      ],
      startingPrice: "₹24,999",
      isFeatured: false,
      sortOrder: 5,
    },
    {
      title: "Software & ERP Development",
      slug: "software-erp-development",
      shortDesc: "Custom CRM, ERP, HRMS, and inventory systems for operations.",
      description: "We build custom business software — CRM, ERP, HRMS, school management, inventory, and industry-specific platforms — tailored to your exact workflow.",
      icon: "Settings",
      features: ["Custom modules", "Role-based access", "Reports & analytics", "Integrations", "Admin panels", "Audit logs"],
      benefits: ["Process automation", "Single source of truth", "Reduced errors", "Scalable operations"],
      process: ["Workflow mapping", "Architecture design", "Agile development", "UAT", "Deployment & training"],
      techStack: ["NestJS", "Next.js", "PostgreSQL", "Redis", "Docker"],
      timeline: "4–12 weeks",
      pricing: [
        { name: "CRM Development", price: "₹24,999" },
        { name: "HRMS Software", price: "₹49,999" },
        { name: "School Management System", price: "₹39,999" },
        { name: "Inventory Management", price: "₹29,999" },
        { name: "ERP Development", price: "₹99,999+" },
      ],
      startingPrice: "₹24,999",
      isFeatured: true,
      sortOrder: 6,
    },
    {
      title: "AI Solutions",
      slug: "ai-solutions",
      shortDesc: "Chatbots, WhatsApp bots, and AI automation for customer support.",
      description: "Automate support and lead handling with AI chatbots, WhatsApp bots, and intelligent workflows that respond instantly and free up your team.",
      icon: "Bot",
      features: ["AI chatbot", "WhatsApp AI bot", "Lead qualification", "Knowledge base", "Multi-language support", "Analytics"],
      benefits: ["Instant responses", "Lower support cost", "24/7 availability", "Higher conversion"],
      process: ["Use-case definition", "Knowledge setup", "Bot training", "Channel integration", "Optimization"],
      techStack: ["OpenAI APIs", "Node.js", "WhatsApp Business API", "PostgreSQL"],
      timeline: "1–4 weeks",
      pricing: [
        { name: "AI Chatbot", price: "₹14,999" },
        { name: "WhatsApp AI Bot", price: "₹19,999" },
        { name: "AI Customer Support System", price: "₹29,999" },
        { name: "AI Automation Solutions", price: "₹49,999+" },
      ],
      startingPrice: "₹14,999",
      isFeatured: false,
      sortOrder: 7,
    },
    {
      title: "Digital Marketing",
      slug: "digital-marketing",
      shortDesc: "SEO, social media, ads, and lead generation campaigns.",
      description: "Grow visibility and leads with Google Business Profile setup, social media management, paid ads, SEO, and conversion-focused campaigns.",
      icon: "TrendingUp",
      features: ["Google Business Profile", "Social media management", "Facebook & Instagram ads", "SEO", "Lead campaigns", "WhatsApp Business setup"],
      benefits: ["More local visibility", "Consistent leads", "Measurable ROI", "Brand growth"],
      process: ["Audit", "Strategy", "Campaign setup", "Optimization", "Monthly reporting"],
      techStack: ["Google Ads", "Meta Ads", "Search Console", "Analytics"],
      timeline: "Ongoing monthly",
      pricing: [
        { name: "Google Business Profile Setup", price: "₹2,999" },
        { name: "WhatsApp Business Setup", price: "₹1,999" },
        { name: "Social Media Management", price: "₹4,999/mo" },
        { name: "Facebook & Instagram Ads", price: "₹7,999/mo" },
        { name: "SEO Services", price: "₹9,999/mo" },
        { name: "Lead Generation Campaign", price: "₹14,999/mo" },
      ],
      startingPrice: "₹1,999",
      isFeatured: false,
      sortOrder: 8,
    },
    {
      title: "Cloud & DevOps",
      slug: "cloud-devops",
      shortDesc: "Hosting, cloud deployment, AWS setup, and CI/CD pipelines.",
      description: "Deploy and scale applications with secure hosting, cloud infrastructure, Docker, CI/CD, and monitoring best practices.",
      icon: "Cloud",
      features: ["Website hosting", "Cloud deployment", "AWS setup", "Docker", "CI/CD", "Monitoring"],
      benefits: ["Reliable uptime", "Faster releases", "Secure infrastructure", "Lower ops overhead"],
      process: ["Infrastructure planning", "Environment setup", "Pipeline configuration", "Security hardening", "Handover"],
      techStack: ["AWS", "Docker", "GitHub Actions", "NGINX", "PostgreSQL"],
      timeline: "2–10 days",
      pricing: [
        { name: "Website Hosting Setup", price: "₹2,999" },
        { name: "Cloud Deployment", price: "₹4,999" },
        { name: "AWS Server Setup", price: "₹9,999" },
        { name: "DevOps Setup", price: "₹19,999" },
      ],
      startingPrice: "₹2,999",
      isFeatured: false,
      sortOrder: 9,
    },
    {
      title: "Labour Management Solutions",
      slug: "labour-management",
      shortDesc: "Contractor portals, attendance, and payroll for labour businesses.",
      description: "Manage workers, contractors, attendance, and payroll with a dedicated labour ERP designed for Indian contractors and workforce operations.",
      icon: "HardHat",
      features: ["Labour registration", "Contractor portal", "Attendance", "Payroll", "Reports", "Mobile access"],
      benefits: ["Accurate payroll", "Workforce visibility", "Less paperwork", "Faster settlements"],
      process: ["Workforce mapping", "Module setup", "Data import", "Training", "Go-live"],
      techStack: ["Next.js", "NestJS", "PostgreSQL"],
      timeline: "2–5 weeks",
      pricing: [
        { name: "Labour Registration Portal", price: "₹9,999" },
        { name: "Contractor Management System", price: "₹14,999" },
        { name: "Attendance & Payroll System", price: "₹19,999" },
        { name: "Complete Labour ERP", price: "₹39,999" },
      ],
      startingPrice: "₹9,999",
      isFeatured: false,
      sortOrder: 10,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: { ...service, status: ContentStatus.PUBLISHED },
    });
  }

  const products = [
    {
      name: "DoctorCare Pro",
      slug: "doctorcare-pro",
      tagline: "Complete clinic and doctor appointment platform",
      overview: "DoctorCare Pro helps clinics and independent doctors manage appointments, patient registration, reviews, and emergency contacts from one professional platform.",
      description: "A production-ready healthcare product with doctor profiles, time-slot booking, patient onboarding, reviews, and WhatsApp integration. Ideal for clinics that want a modern digital front desk.",
      icon: "HeartPulse",
      features: ["Doctor profile pages", "Appointment booking", "Time slot management", "Patient registration", "Reviews & ratings", "Emergency contact", "WhatsApp integration", "Admin dashboard"],
      screenshots: [],
      gallery: [],
      liveDemoUrl: "/demos/doctor-care-pro/index.html",
      techStack: ["Next.js", "NestJS", "PostgreSQL", "Tailwind CSS"],
      architecture: "Modular monolith with role-based access for doctors, staff, and patients. REST APIs power booking, records, and notifications.",
      databaseInfo: "PostgreSQL stores patients, appointments, doctors, slots, and reviews with relational integrity and audit-friendly schemas.",
      apiInfo: "REST endpoints for appointments, patients, doctors, authentication, and notifications with JWT security.",
      adminPanel: "Manage doctors, slots, appointments, patients, and content from a secure admin dashboard.",
      mobileApp: "Responsive web experience with optional React Native companion app for doctors and patients.",
      documentation: "Includes setup guide, API reference, and staff onboarding checklist.",
      pricing: [{ name: "Starter", price: "₹9,999" }, { name: "Clinic Pro", price: "₹14,999" }, { name: "Hospital Suite", price: "₹49,999" }],
      faqs: [
        { q: "Can I customize branding?", a: "Yes. Logo, colors, doctor profiles, and clinic details are fully customizable." },
        { q: "Does it support WhatsApp?", a: "Yes. Patients can book and receive updates via WhatsApp integration." },
      ],
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "FitZone Gym",
      slug: "fitzone-gym",
      tagline: "Membership and gym operations platform",
      overview: "FitZone Gym is a complete fitness business platform with membership plans, BMI tools, trainer profiles, diet plans, and attendance tracking.",
      description: "Built for gym owners who need a professional website and operational tools in one package — plans, trainers, attendance, and WhatsApp join flows included.",
      icon: "Dumbbell",
      features: ["Membership plans (₹999 / ₹1999 / ₹2999)", "BMI calculator", "Trainer profiles", "Diet plans", "Attendance demo", "Workout programs", "WhatsApp join now"],
      screenshots: [],
      gallery: [],
      liveDemoUrl: "/demos/fitzone-gym/index.html",
      techStack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
      architecture: "Frontend marketing site plus membership and attendance modules backed by secure APIs.",
      databaseInfo: "Members, plans, attendance logs, trainers, and payments stored in PostgreSQL.",
      apiInfo: "Membership, attendance, trainer, and lead capture APIs.",
      adminPanel: "Manage members, plans, trainers, and attendance reports.",
      mobileApp: "Mobile-responsive member experience with optional native app add-on.",
      documentation: "Owner handbook and staff attendance guide included.",
      pricing: [{ name: "Website", price: "₹7,999" }, { name: "Membership System", price: "₹12,999" }, { name: "Complete Gym ERP", price: "₹24,999" }],
      faqs: [
        { q: "Can plans be customized?", a: "Yes. Pricing tiers, benefits, and durations are fully configurable." },
      ],
      isFeatured: true,
      sortOrder: 2,
    },
    {
      name: "FoodHub Restaurant",
      slug: "foodhub-restaurant",
      tagline: "Online ordering and restaurant management",
      overview: "FoodHub Restaurant brings digital menus, online ordering, table reservations, food galleries, and WhatsApp orders into one restaurant platform.",
      description: "A restaurant-ready product designed to increase online orders and streamline reservations with a premium customer experience.",
      icon: "UtensilsCrossed",
      features: ["Online ordering cart", "Digital menu", "Table reservation", "Popular dishes", "Food gallery", "Reviews", "WhatsApp orders", "Delivery information"],
      screenshots: [],
      gallery: [],
      liveDemoUrl: "/demos/foodhub-restaurant/index.html",
      techStack: ["Next.js", "NestJS", "PostgreSQL", "Cloudinary"],
      architecture: "Customer-facing ordering experience with kitchen and admin workflows.",
      databaseInfo: "Menu items, orders, reservations, and reviews in PostgreSQL.",
      apiInfo: "Menu, cart, order, reservation, and notification APIs.",
      adminPanel: "Manage menu, orders, reservations, and promotions.",
      mobileApp: "Responsive ordering experience optimized for mobile customers.",
      documentation: "Restaurant onboarding and menu import guide included.",
      pricing: [{ name: "Website", price: "₹7,999" }, { name: "Online Ordering", price: "₹14,999" }, { name: "Complete Management", price: "₹29,999" }],
      faqs: [
        { q: "Can customers order on WhatsApp?", a: "Yes. WhatsApp order flows are built in for Indian restaurant customers." },
      ],
      isFeatured: true,
      sortOrder: 3,
    },
    {
      name: "Hospital Management System",
      slug: "hospital-management-system",
      tagline: "End-to-end hospital operations software",
      overview: "A comprehensive HMS covering OPD, IPD, billing, pharmacy, labs, and staff management for multi-department hospitals.",
      description: "Designed for hospitals that need reliable patient workflows, department coordination, and operational reporting.",
      icon: "Hospital",
      features: ["OPD & IPD", "Billing", "Pharmacy", "Lab reports", "Staff roles", "Inventory", "Dashboards"],
      screenshots: [],
      gallery: [],
      liveDemoUrl: null,
      techStack: ["NestJS", "Next.js", "PostgreSQL", "Redis"],
      architecture: "Modular hospital ERP with department-level permissions.",
      databaseInfo: "Patients, admissions, billing, pharmacy, and lab modules in PostgreSQL.",
      apiInfo: "Department APIs with RBAC and audit logging.",
      adminPanel: "Central hospital administration and reporting.",
      mobileApp: "Optional staff and patient mobile modules.",
      documentation: "Implementation playbook and role matrix included.",
      pricing: [{ name: "Standard HMS", price: "₹49,999" }, { name: "Enterprise HMS", price: "Custom" }],
      faqs: [{ q: "Is it multi-branch ready?", a: "Yes. Multi-branch configuration is available in enterprise plans." }],
      isFeatured: false,
      sortOrder: 4,
    },
    {
      name: "School ERP",
      slug: "school-erp",
      tagline: "Academic and administration platform for schools",
      overview: "Manage admissions, attendance, fees, exams, and parent communication from a unified school ERP.",
      description: "Built for schools and colleges that need digital administration without complexity.",
      icon: "GraduationCap",
      features: ["Admissions", "Attendance", "Fee management", "Exams & results", "Parent portal", "Staff management"],
      screenshots: [],
      gallery: [],
      liveDemoUrl: null,
      techStack: ["Next.js", "NestJS", "PostgreSQL"],
      architecture: "Role-based portals for admin, teachers, students, and parents.",
      databaseInfo: "Students, classes, fees, attendance, and exams in PostgreSQL.",
      apiInfo: "Academic and administration REST APIs.",
      adminPanel: "School admin console with reports and exports.",
      mobileApp: "Parent and teacher mobile-friendly portals.",
      documentation: "Academic year setup guide included.",
      pricing: [{ name: "School ERP", price: "₹39,999" }],
      faqs: [{ q: "Can fee structures be customized?", a: "Yes. Fee heads, installments, and class-wise structures are configurable." }],
      isFeatured: false,
      sortOrder: 5,
    },
    {
      name: "HRMS",
      slug: "hrms",
      tagline: "Human resource and payroll management",
      overview: "HRMS for employee records, attendance, leave, payroll, and performance tracking.",
      description: "A practical HR platform for growing companies that need reliable people operations.",
      icon: "Users",
      features: ["Employee records", "Attendance", "Leave management", "Payroll", "Performance reviews", "Document vault"],
      screenshots: [],
      gallery: [],
      liveDemoUrl: null,
      techStack: ["NestJS", "React", "PostgreSQL"],
      architecture: "HR core modules with payroll and approval workflows.",
      databaseInfo: "Employees, attendance, leave, and payroll tables.",
      apiInfo: "HR and payroll APIs with role permissions.",
      adminPanel: "HR admin dashboard and payroll runs.",
      mobileApp: "Employee self-service portal.",
      documentation: "HR policy configuration guide included.",
      pricing: [{ name: "HRMS", price: "₹49,999" }],
      faqs: [{ q: "Does it support Indian payroll?", a: "Yes. Salary structures and statutory fields can be configured for Indian businesses." }],
      isFeatured: false,
      sortOrder: 6,
    },
    {
      name: "CRM",
      slug: "crm",
      tagline: "Customer relationship and sales pipeline software",
      overview: "Track leads, deals, follow-ups, and customer communication in one CRM.",
      description: "Designed for sales teams and service businesses that need visibility across the customer journey.",
      icon: "Contact",
      features: ["Lead management", "Pipeline", "Follow-ups", "Notes", "Reports", "WhatsApp integration"],
      screenshots: [],
      gallery: [],
      liveDemoUrl: null,
      techStack: ["Next.js", "NestJS", "PostgreSQL"],
      architecture: "Sales pipeline with activity timeline and reporting.",
      databaseInfo: "Leads, deals, activities, and contacts.",
      apiInfo: "CRM REST APIs and webhook hooks.",
      adminPanel: "Sales admin and team performance views.",
      mobileApp: "Mobile-friendly sales follow-up experience.",
      documentation: "Pipeline setup guide included.",
      pricing: [{ name: "CRM", price: "₹24,999" }],
      faqs: [{ q: "Can we import existing leads?", a: "Yes. CSV import is supported." }],
      isFeatured: false,
      sortOrder: 7,
    },
    {
      name: "Inventory Management",
      slug: "inventory-management",
      tagline: "Stock, purchase, and warehouse control",
      overview: "Track inventory, purchases, suppliers, and stock movements with real-time visibility.",
      description: "A practical inventory system for retailers, distributors, and operations teams.",
      icon: "Package",
      features: ["Stock tracking", "Purchase orders", "Suppliers", "Low-stock alerts", "Reports", "Multi-location"],
      screenshots: [],
      gallery: [],
      liveDemoUrl: null,
      techStack: ["NestJS", "React", "PostgreSQL"],
      architecture: "Inventory core with purchase and warehouse modules.",
      databaseInfo: "Products, stock, purchases, and suppliers.",
      apiInfo: "Inventory and purchase APIs.",
      adminPanel: "Warehouse and purchase admin console.",
      mobileApp: "Optional stock-check mobile views.",
      documentation: "SKU and warehouse setup guide included.",
      pricing: [{ name: "Inventory System", price: "₹29,999" }],
      faqs: [{ q: "Does it support multi-location stock?", a: "Yes. Multi-location inventory is available." }],
      isFeatured: false,
      sortOrder: 8,
    },
    {
      name: "Blockchain Platform",
      slug: "blockchain-platform",
      tagline: "Custom blockchain and smart contract solutions",
      overview: "Build secure blockchain applications, smart contracts, and transparent transaction systems.",
      description: "For businesses exploring decentralized workflows, asset tracking, and verifiable records.",
      icon: "Link",
      features: ["Smart contracts", "Wallet integration", "Transaction explorer", "Admin controls", "Audit trails"],
      screenshots: [],
      gallery: [],
      liveDemoUrl: null,
      techStack: ["Solidity", "Node.js", "Next.js", "PostgreSQL"],
      architecture: "Hybrid on-chain and off-chain architecture.",
      databaseInfo: "Off-chain metadata and user records in PostgreSQL.",
      apiInfo: "Blockchain interaction APIs and webhooks.",
      adminPanel: "Network and contract administration.",
      mobileApp: "Optional wallet-connected mobile experience.",
      documentation: "Architecture and deployment guide included.",
      pricing: [{ name: "Custom Blockchain Platform", price: "Contact Sales" }],
      faqs: [{ q: "Which networks are supported?", a: "We support major EVM-compatible networks based on project needs." }],
      isFeatured: false,
      sortOrder: 9,
    },
    {
      name: "AI Chatbot",
      slug: "ai-chatbot",
      tagline: "Intelligent customer support automation",
      overview: "Deploy AI chatbots on your website and WhatsApp to answer questions, qualify leads, and support customers 24/7.",
      description: "A practical AI product for businesses that want instant responses without hiring a large support team.",
      icon: "Bot",
      features: ["Website chatbot", "WhatsApp bot", "Knowledge base", "Lead capture", "Analytics", "Human handoff"],
      screenshots: [],
      gallery: [],
      liveDemoUrl: null,
      techStack: ["Node.js", "OpenAI APIs", "WhatsApp Business API", "PostgreSQL"],
      architecture: "Conversational engine with channel adapters and escalation rules.",
      databaseInfo: "Conversations, intents, leads, and analytics.",
      apiInfo: "Chat, training, and webhook APIs.",
      adminPanel: "Bot training and conversation review dashboard.",
      mobileApp: "Works across web and WhatsApp channels.",
      documentation: "Knowledge base setup guide included.",
      pricing: [{ name: "AI Chatbot", price: "₹14,999" }, { name: "WhatsApp AI Bot", price: "₹19,999" }],
      faqs: [{ q: "Can it hand off to a human agent?", a: "Yes. Escalation rules can route conversations to your team." }],
      isFeatured: true,
      sortOrder: 10,
    },
    {
      name: "Custom ERP",
      slug: "custom-erp",
      tagline: "Tailored enterprise resource planning",
      overview: "A fully customized ERP built around your departments, approvals, and reporting needs.",
      description: "For organizations whose workflows do not fit off-the-shelf software.",
      icon: "LayoutDashboard",
      features: ["Custom modules", "Approvals", "Finance", "Operations", "Reports", "Integrations"],
      screenshots: [],
      gallery: [],
      liveDemoUrl: null,
      techStack: ["NestJS", "Next.js", "PostgreSQL", "Redis", "Docker"],
      architecture: "Domain-driven modular ERP architecture.",
      databaseInfo: "Custom schema designed around your business entities.",
      apiInfo: "Secure module APIs with RBAC.",
      adminPanel: "Configurable admin and department dashboards.",
      mobileApp: "Optional field and manager mobile modules.",
      documentation: "Blueprint, ERD, and operations manual included.",
      pricing: [{ name: "Custom ERP", price: "₹99,999+" }],
      faqs: [{ q: "How long does implementation take?", a: "Typically 6–12 weeks depending on module scope." }],
      isFeatured: false,
      sortOrder: 11,
    },
    {
      name: "Custom Software",
      slug: "custom-software",
      tagline: "Bespoke software for unique business problems",
      overview: "End-to-end custom software design and development for workflows that need a purpose-built product.",
      description: "From discovery to deployment, MBD Solutions builds software that matches your exact operational requirements.",
      icon: "Code2",
      features: ["Discovery workshops", "UI/UX design", "Full stack development", "QA", "Deployment", "Support"],
      screenshots: [],
      gallery: [],
      liveDemoUrl: null,
      techStack: ["Next.js", "NestJS", "PostgreSQL", "Cloud"],
      architecture: "Architecture selected based on scale, compliance, and integration needs.",
      databaseInfo: "Schema designed for your domain model.",
      apiInfo: "Documented REST or GraphQL APIs as required.",
      adminPanel: "Custom admin experiences for operators and managers.",
      mobileApp: "Web, Android, or iOS delivery options.",
      documentation: "Technical and user documentation included.",
      pricing: [{ name: "Custom Software", price: "Contact Sales" }],
      faqs: [{ q: "Do you provide ongoing support?", a: "Yes. Free support is included, with annual maintenance plans available." }],
      isFeatured: false,
      sortOrder: 12,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: { ...product, status: ContentStatus.PUBLISHED },
    });
  }

  const industries = [
    { name: "Healthcare", slug: "healthcare", description: "Clinics, hospitals, and medical practices.", icon: "HeartPulse", sortOrder: 1 },
    { name: "Fitness & Gyms", slug: "fitness-gyms", description: "Gyms, studios, and fitness centers.", icon: "Dumbbell", sortOrder: 2 },
    { name: "Restaurants", slug: "restaurants", description: "Restaurants, cafes, and cloud kitchens.", icon: "UtensilsCrossed", sortOrder: 3 },
    { name: "Education", slug: "education", description: "Schools, colleges, and coaching institutes.", icon: "GraduationCap", sortOrder: 4 },
    { name: "Real Estate", slug: "real-estate", description: "Builders, brokers, and property businesses.", icon: "Building2", sortOrder: 5 },
    { name: "Labour & Contractors", slug: "labour-contractors", description: "Contractors and workforce operations.", icon: "HardHat", sortOrder: 6 },
    { name: "Retail & Medical Stores", slug: "retail-medical-stores", description: "Retail shops and pharmacies.", icon: "Store", sortOrder: 7 },
    { name: "Hospitality", slug: "hospitality", description: "Hotels and hospitality businesses.", icon: "Hotel", sortOrder: 8 },
  ];

  for (const industry of industries) {
    await prisma.industry.upsert({
      where: { slug: industry.slug },
      update: industry,
      create: { ...industry, status: ContentStatus.PUBLISHED, solutions: [] },
    });
  }

  const healthcare = await prisma.industry.findUnique({ where: { slug: "healthcare" } });
  const fitness = await prisma.industry.findUnique({ where: { slug: "fitness-gyms" } });
  const restaurants = await prisma.industry.findUnique({ where: { slug: "restaurants" } });

  const projects = [
    {
      title: "DoctorCare Pro Platform",
      slug: "doctorcare-pro-platform",
      clientName: "Multi-clinic Healthcare Clients",
      overview: "A complete doctor and clinic management platform with appointment booking, patient registration, and WhatsApp-enabled communication.",
      problem: "Clinics relied on phone calls and paper registers, leading to missed appointments and disorganized patient records.",
      solution: "MBD Solutions delivered DoctorCare Pro with online booking, digital patient records, reviews, and staff-friendly admin tools.",
      features: ["Appointment booking", "Patient registration", "Doctor profiles", "Reviews", "WhatsApp integration"],
      gallery: [],
      screenshots: [],
      techStack: ["Next.js", "NestJS", "PostgreSQL", "Tailwind CSS"],
      timeline: "3 weeks",
      results: ["Faster appointment booking", "Reduced front-desk load", "Improved patient experience"],
      clientReview: "MBD Solutions built our clinic website and appointment system. Patients love booking online. Highly recommended! — Dr. Rajesh Sharma, Clinic Owner, Bhopal",
      liveDemoUrl: "/demos/doctor-care-pro/index.html",
      industryId: healthcare?.id,
      isFeatured: true,
      sortOrder: 1,
    },
    {
      title: "FitZone Gym Management",
      slug: "fitzone-gym-management",
      clientName: "Fitness Centers",
      overview: "Membership, attendance, trainer, and plan management for modern gyms.",
      problem: "Gym owners struggled with manual membership tracking and inconsistent attendance records.",
      solution: "FitZone Gym introduced digital membership plans, BMI tools, trainer profiles, and attendance workflows.",
      features: ["Membership plans", "BMI calculator", "Attendance", "Trainer profiles", "WhatsApp join"],
      gallery: [],
      screenshots: [],
      techStack: ["React", "Node.js", "PostgreSQL"],
      timeline: "2 weeks",
      results: ["Automated membership tracking", "Hours saved weekly on attendance", "Professional online presence"],
      clientReview: "Our gym membership system is smooth and easy to use. Attendance tracking saved us hours every week. — Amit Verma, Gym Owner, Indore",
      liveDemoUrl: "/demos/fitzone-gym/index.html",
      industryId: fitness?.id,
      isFeatured: true,
      sortOrder: 2,
    },
    {
      title: "FoodHub Restaurant Platform",
      slug: "foodhub-restaurant-platform",
      clientName: "Restaurant Owners",
      overview: "Online ordering, digital menu, and table reservation platform for restaurants.",
      problem: "Restaurants lost orders due to phone-only workflows and lacked a strong digital menu experience.",
      solution: "FoodHub Restaurant enabled online ordering, reservations, galleries, and WhatsApp order flows.",
      features: ["Online ordering", "Table reservation", "Digital menu", "Reviews", "WhatsApp orders"],
      gallery: [],
      screenshots: [],
      techStack: ["Next.js", "NestJS", "PostgreSQL"],
      timeline: "2 weeks",
      results: ["Online orders increased by 40%", "Fewer order errors", "Better customer engagement"],
      clientReview: "Restaurant ordering system increased our online orders by 40%. Great support from Kuldeep and team. — Priya Patel, Restaurant Owner, Ujjain",
      liveDemoUrl: "/demos/foodhub-restaurant/index.html",
      industryId: restaurants?.id,
      isFeatured: true,
      sortOrder: 3,
    },
    {
      title: "Labour ERP for Contractors",
      slug: "labour-erp-contractors",
      clientName: "Labour Contractors",
      overview: "Workforce registration, attendance, and payroll automation for contractors managing large teams.",
      problem: "Contractors managing 200+ workers relied on spreadsheets and manual payroll calculations.",
      solution: "A labour ERP with registration, attendance, contractor portals, and automated payroll.",
      features: ["Worker registration", "Attendance", "Payroll", "Contractor portal", "Reports"],
      gallery: [],
      screenshots: [],
      techStack: ["Next.js", "NestJS", "PostgreSQL"],
      timeline: "4 weeks",
      results: ["Payroll automation", "Error-free settlements", "Workforce visibility"],
      clientReview: "Labour ERP helped us manage 200+ workers effortlessly. Payroll is now automated and error-free. — Suresh Yadav, Contractor, Gwalior",
      liveDemoUrl: null,
      industryId: null,
      isFeatured: true,
      sortOrder: 4,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: { ...project, status: ContentStatus.PUBLISHED },
    });
  }

  const techData = [
    { name: "Next.js", slug: "nextjs", category: "Frontend" },
    { name: "React", slug: "react", category: "Frontend" },
    { name: "TypeScript", slug: "typescript", category: "Frontend" },
    { name: "Redux", slug: "redux", category: "Frontend" },
    { name: "Tailwind CSS", slug: "tailwind-css", category: "Frontend" },
    { name: "Shadcn UI", slug: "shadcn-ui", category: "Frontend" },
    { name: "Node.js", slug: "nodejs", category: "Backend" },
    { name: "NestJS", slug: "nestjs", category: "Backend" },
    { name: "Express", slug: "express", category: "Backend" },
    { name: "Java Spring Boot", slug: "spring-boot", category: "Backend" },
    { name: "Python", slug: "python", category: "Backend" },
    { name: "FastAPI", slug: "fastapi", category: "Backend" },
    { name: "PostgreSQL", slug: "postgresql", category: "Databases" },
    { name: "MongoDB", slug: "mongodb", category: "Databases" },
    { name: "Redis", slug: "redis", category: "Databases" },
    { name: "MySQL", slug: "mysql", category: "Databases" },
    { name: "Firebase", slug: "firebase", category: "Databases" },
    { name: "Supabase", slug: "supabase", category: "Databases" },
    { name: "AWS", slug: "aws", category: "Cloud" },
    { name: "Azure", slug: "azure", category: "Cloud" },
    { name: "Docker", slug: "docker", category: "Cloud" },
    { name: "Kubernetes", slug: "kubernetes", category: "Cloud" },
    { name: "NGINX", slug: "nginx", category: "Cloud" },
    { name: "GitHub Actions", slug: "github-actions", category: "Cloud" },
    { name: "Grafana", slug: "grafana", category: "Monitoring" },
    { name: "Prometheus", slug: "prometheus", category: "Monitoring" },
    { name: "OpenTelemetry", slug: "opentelemetry", category: "Monitoring" },
    { name: "JWT", slug: "jwt", category: "Security" },
    { name: "OAuth", slug: "oauth", category: "Security" },
    { name: "RBAC", slug: "rbac", category: "Security" },
    { name: "Helmet", slug: "helmet", category: "Security" },
    { name: "Rate Limiting", slug: "rate-limiting", category: "Security" },
  ];

  let techOrder = 0;
  for (const tech of techData) {
    techOrder += 1;
    await prisma.technology.upsert({
      where: { slug: tech.slug },
      update: { ...tech, sortOrder: techOrder },
      create: {
        ...tech,
        description: `${tech.name} is part of the MBD Solutions engineering stack for ${tech.category.toLowerCase()} delivery.`,
        isFeatured: ["nextjs", "react", "nestjs", "postgresql", "aws", "docker"].includes(tech.slug),
        status: ContentStatus.PUBLISHED,
        sortOrder: techOrder,
      },
    });
  }

  const websiteCat = await prisma.blogCategory.upsert({
    where: { slug: "website" },
    update: {},
    create: { name: "Website", slug: "website" },
  });
  const marketingCat = await prisma.blogCategory.upsert({
    where: { slug: "marketing" },
    update: {},
    create: { name: "Marketing", slug: "marketing" },
  });
  const aiCat = await prisma.blogCategory.upsert({
    where: { slug: "ai" },
    update: {},
    create: { name: "AI", slug: "ai" },
  });
  const healthcareCat = await prisma.blogCategory.upsert({
    where: { slug: "healthcare" },
    update: {},
    create: { name: "Healthcare", slug: "healthcare" },
  });
  const restaurantCat = await prisma.blogCategory.upsert({
    where: { slug: "restaurant" },
    update: {},
    create: { name: "Restaurant", slug: "restaurant" },
  });

  const tags = ["SEO", "Business Growth", "Automation", "ERP", "Mobile Apps"];
  for (const tag of tags) {
    await prisma.blogTag.upsert({
      where: { slug: tag.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: { name: tag, slug: tag.toLowerCase().replace(/\s+/g, "-") },
    });
  }

  const blogs = [
    {
      title: "Benefits of a Professional Business Website",
      slug: "benefits-of-business-website",
      excerpt: "A professional website builds trust, attracts customers 24/7, and helps you compete with larger businesses online.",
      content: `A professional business website is no longer optional. Customers search online before they call, visit, or buy — and your website is often the first impression of your brand.

## Why your business needs a website

- **Trust:** A clean, modern website signals credibility.
- **Availability:** Your business stays open online 24/7.
- **Lead generation:** Forms, WhatsApp buttons, and clear CTAs convert visitors.
- **SEO:** Local search visibility brings customers who are already looking for your services.

## What MBD Solutions delivers

We build responsive business websites starting at ₹4,999, with SEO setup, mobile-friendly design, and WhatsApp integration included in professional packages.

If you are ready to establish a strong digital presence, contact Kuldeep Dhakad at 6263478403 for a free consultation.`,
      categoryId: websiteCat.id,
      authorId: admin.id,
    },
    {
      title: "Digital Marketing Tips for Growing Businesses",
      slug: "digital-marketing-tips",
      excerpt: "Google Business Profile, social media ads, and SEO can bring consistent leads without huge advertising budgets.",
      content: `Digital marketing works best when it is practical and measurable. For local and growing businesses in India, a few focused channels often outperform expensive campaigns.

## High-impact channels

1. **Google Business Profile** — appear in local map results.
2. **WhatsApp Business** — respond quickly and professionally.
3. **SEO** — earn organic traffic over time.
4. **Meta ads** — reach local audiences with clear offers.

MBD Solutions helps businesses set up and manage these channels with transparent monthly plans and clear reporting.`,
      categoryId: marketingCat.id,
      authorId: admin.id,
    },
    {
      title: "How AI Can Help Small Businesses",
      slug: "ai-for-businesses",
      excerpt: "AI chatbots and WhatsApp bots automate customer support, save time, and improve response rates instantly.",
      content: `AI is no longer only for large enterprises. Small businesses can use chatbots and WhatsApp automation to answer common questions, capture leads, and support customers after hours.

## Practical AI use cases

- Website chatbots for FAQs and lead capture
- WhatsApp AI bots for order updates and support
- Automated follow-ups for sales teams

MBD Solutions offers AI chatbot packages starting at ₹14,999, with WhatsApp AI bots from ₹19,999.`,
      categoryId: aiCat.id,
      authorId: admin.id,
    },
    {
      title: "Healthcare Software Benefits for Clinics",
      slug: "healthcare-software-benefits",
      excerpt: "Clinic management software streamlines appointments, records, and billing — improving patient experience.",
      content: `Clinics that still rely on phone bookings and paper files lose time and create friction for patients. Healthcare software solves this with digital appointments, records, and communication.

DoctorCare Pro by MBD Solutions includes appointment booking, patient registration, reviews, and WhatsApp integration — designed specifically for clinics and doctors.`,
      categoryId: healthcareCat.id,
      authorId: admin.id,
    },
    {
      title: "Restaurant Management Solutions That Increase Orders",
      slug: "restaurant-management-solutions",
      excerpt: "Online ordering, table booking, and kitchen management systems boost revenue and reduce manual work.",
      content: `Restaurants grow faster when customers can browse menus, order online, and reserve tables without friction. FoodHub Restaurant helps owners digitize menus, accept orders, and manage reservations with WhatsApp-friendly workflows.

One restaurant client reported a 40% increase in online orders after launching their FoodHub platform.`,
      categoryId: restaurantCat.id,
      authorId: admin.id,
    },
  ];

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: blog,
      create: {
        ...blog,
        status: ContentStatus.PUBLISHED,
        publishedAt: new Date(),
        metaTitle: blog.title,
        metaDesc: blog.excerpt,
      },
    });
  }

  const testimonials = [
    { name: "Dr. Rajesh Sharma", role: "Clinic Owner", company: "Bhopal", content: "MBD Solutions built our clinic website and appointment system. Patients love booking online. Highly recommended!", rating: 5, sortOrder: 1 },
    { name: "Amit Verma", role: "Gym Owner", company: "Indore", content: "Our gym membership system is smooth and easy to use. Attendance tracking saved us hours every week.", rating: 5, sortOrder: 2 },
    { name: "Priya Patel", role: "Restaurant Owner", company: "Ujjain", content: "Restaurant ordering system increased our online orders by 40%. Great support from Kuldeep and team.", rating: 5, sortOrder: 3 },
    { name: "Suresh Yadav", role: "Contractor", company: "Gwalior", content: "Labour ERP helped us manage 200+ workers effortlessly. Payroll is now automated and error-free.", rating: 5, sortOrder: 4 },
    { name: "Rahul Mehta", role: "Business Owner", company: "Jabalpur", content: "Professional company website delivered in 10 days. SEO setup brought us new leads within a month.", rating: 5, sortOrder: 5 },
    { name: "Neha Singh", role: "Startup Founder", company: "Bhopal", content: "Our Android app looks premium and runs fast. MBD Solutions understood our requirements perfectly.", rating: 5, sortOrder: 6 },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: { ...t, isFeatured: true, status: ContentStatus.PUBLISHED },
    });
  }

  const faqs = [
    { question: "What is the website development cost?", answer: "Our websites start from ₹4,999 for a landing page. Business websites (5 pages) are ₹9,999, and e-commerce sites from ₹24,999. Contact us for a custom quote.", category: "Pricing", sortOrder: 1 },
    { question: "What is the delivery time?", answer: "Landing pages: 3–5 days. Business websites: 7–14 days. ERP and custom software: 2–8 weeks depending on scope. We always share a timeline before starting.", category: "Delivery", sortOrder: 2 },
    { question: "Is support available after delivery?", answer: "Yes. We provide 24×7 support via WhatsApp and phone. Free support period is included with every project, and annual maintenance plans are available.", category: "Support", sortOrder: 3 },
    { question: "Is custom software development available?", answer: "Absolutely. We build custom CRM, ERP, HRMS, and industry-specific software tailored to your exact business workflow and requirements.", category: "Services", sortOrder: 4 },
    { question: "Is mobile app development available?", answer: "Yes. We develop Android apps from ₹24,999, iOS from ₹39,999, and cross-platform apps from ₹59,999. Enterprise apps are quoted based on features.", category: "Services", sortOrder: 5 },
    { question: "How do I get a free consultation?", answer: "Call or WhatsApp 6263478403, email kuldeepdhakad153@gmail.com, or submit the contact form on our website. We respond within 24 hours.", category: "General", sortOrder: 6 },
    { question: "Do you provide source code?", answer: "Yes. Ownership and source code handover terms are defined in the project agreement based on the package selected.", category: "General", sortOrder: 7 },
    { question: "Can you redesign an existing website?", answer: "Yes. We redesign and modernize existing websites with improved performance, SEO, and conversion-focused layouts.", category: "Services", sortOrder: 8 },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: { ...faq, status: ContentStatus.PUBLISHED } });
  }

  await prisma.teamMember.createMany({
    data: [
      {
        name: "Kuldeep Dhakad",
        role: "Founder & CEO",
        bio: "Founder of MBD Solutions, leading product strategy, engineering, and client success.",
        experience: "5+ years",
        skills: ["Full Stack", "Product Strategy", "Client Consulting"],
        isLeadership: true,
        sortOrder: 1,
        email: "kuldeepdhakad153@gmail.com",
        status: ContentStatus.PUBLISHED,
      },
      {
        name: "Engineering Team",
        role: "Full Stack Engineers",
        bio: "Builds scalable web, mobile, and ERP products using modern frameworks and clean architecture.",
        experience: "Collective delivery of 100+ projects",
        skills: ["Next.js", "NestJS", "PostgreSQL", "React Native"],
        isLeadership: true,
        sortOrder: 2,
        status: ContentStatus.PUBLISHED,
      },
      {
        name: "Design Team",
        role: "Product & UI Designers",
        bio: "Crafts premium, accessible interfaces inspired by leading SaaS products.",
        experience: "Enterprise SaaS design systems",
        skills: ["UI/UX", "Design Systems", "Prototyping"],
        isLeadership: false,
        sortOrder: 3,
        status: ContentStatus.PUBLISHED,
      },
      {
        name: "Delivery Team",
        role: "Project & Support Specialists",
        bio: "Manages timelines, client communication, and 24×7 support.",
        experience: "End-to-end project delivery",
        skills: ["Project Management", "Support", "QA"],
        isLeadership: false,
        sortOrder: 4,
        status: ContentStatus.PUBLISHED,
      },
    ],
  });

  const jobs = [
    {
      title: "Full Stack Developer",
      slug: "full-stack-developer",
      department: "Engineering",
      location: "Remote / India",
      type: JobType.FULL_TIME,
      description: "Build and ship production web applications using Next.js, NestJS, and PostgreSQL for MBD Solutions products and client projects.",
      requirements: ["Strong TypeScript skills", "Experience with React/Next.js", "Familiarity with NestJS or Node.js APIs", "PostgreSQL and Prisma experience preferred"],
      responsibilities: ["Develop features across frontend and backend", "Write clean, typed code", "Collaborate on architecture decisions", "Participate in code reviews"],
      benefits: ["Flexible remote work", "Real product ownership", "Learning budget", "Performance bonuses"],
      salaryRange: "Competitive",
      isInternship: false,
    },
    {
      title: "UI/UX Designer",
      slug: "ui-ux-designer",
      department: "Design",
      location: "Remote / India",
      type: JobType.FULL_TIME,
      description: "Design premium product interfaces and marketing experiences for MBD Solutions platforms.",
      requirements: ["Strong portfolio", "Figma expertise", "Understanding of SaaS design patterns", "Attention to typography and spacing"],
      responsibilities: ["Design product and marketing UI", "Maintain design system", "Collaborate with engineering", "Conduct usability reviews"],
      benefits: ["Remote-friendly", "Design tool subscriptions", "Portfolio-defining work"],
      salaryRange: "Competitive",
      isInternship: false,
    },
    {
      title: "Software Engineering Intern",
      slug: "software-engineering-intern",
      department: "Engineering",
      location: "Remote / India",
      type: JobType.INTERNSHIP,
      description: "Learn production engineering by contributing to real client and product codebases under mentorship.",
      requirements: ["Basics of JavaScript/TypeScript", "Willingness to learn", "Good communication", "Personal projects preferred"],
      responsibilities: ["Assist with feature development", "Fix bugs", "Write documentation", "Learn code review practices"],
      benefits: ["Mentorship", "Certificate", "Potential full-time offer", "Real project experience"],
      salaryRange: "Stipend based on performance",
      isInternship: true,
    },
  ];

  for (const job of jobs) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: job,
      create: { ...job, isActive: true },
    });
  }

  const clients = [
    { name: "City Care Clinic", industry: "Healthcare", sortOrder: 1 },
    { name: "PowerFit Gym", industry: "Fitness", sortOrder: 2 },
    { name: "Spice Route Kitchen", industry: "Restaurant", sortOrder: 3 },
    { name: "Yadav Contractors", industry: "Labour", sortOrder: 4 },
    { name: "Mehta Enterprises", industry: "Business", sortOrder: 5 },
    { name: "Singh Startups", industry: "Technology", sortOrder: 6 },
  ];

  for (const client of clients) {
    const existing = await prisma.client.findFirst({ where: { name: client.name } });
    if (existing) {
      await prisma.client.update({
        where: { id: existing.id },
        data: { ...client, isFeatured: true },
      });
    } else {
      await prisma.client.create({ data: { ...client, isFeatured: true } });
    }
  }

  const partners = ["AWS", "Google Cloud", "Vercel", "GitHub", "PostgreSQL", "Docker"];
  let pOrder = 0;
  for (const name of partners) {
    pOrder += 1;
    await prisma.partner.create({ data: { name, sortOrder: pOrder } });
  }

  const processSteps = [
    { title: "Discover", description: "We understand your business, goals, and constraints through a free consultation.", icon: "Search", sortOrder: 1 },
    { title: "Design", description: "We craft clean UI/UX and technical architecture tailored to your workflow.", icon: "PenTool", sortOrder: 2 },
    { title: "Develop", description: "Our engineers build production-ready software with modern, scalable stacks.", icon: "Code2", sortOrder: 3 },
    { title: "Deliver", description: "We test, deploy, train your team, and provide ongoing support.", icon: "Rocket", sortOrder: 4 },
  ];

  for (const step of processSteps) {
    await prisma.processStep.create({ data: step });
  }

  const stats = [
    { label: "Projects Delivered", value: "100", suffix: "+", sortOrder: 1 },
    { label: "Happy Clients", value: "50", suffix: "+", sortOrder: 2 },
    { label: "Support", value: "24×7", suffix: "", sortOrder: 3 },
    { label: "Client Satisfaction", value: "99", suffix: "%", sortOrder: 4 },
  ];

  for (const stat of stats) {
    await prisma.statistic.create({ data: stat });
  }

  const pricingPlans = [
    {
      name: "Starter",
      slug: "starter",
      price: "₹4,999",
      period: "one-time",
      description: "Ideal for landing pages and first digital presence.",
      features: ["Landing page website", "Mobile responsive design", "Contact & WhatsApp buttons", "Basic SEO setup", "7-day support"],
      isPopular: false,
      sortOrder: 1,
    },
    {
      name: "Business",
      slug: "business",
      price: "₹14,999",
      period: "one-time",
      description: "Professional company websites and industry demos.",
      features: ["Up to 8 pages", "Premium UI design", "SEO optimization", "Lead capture forms", "Analytics setup", "14-day support"],
      isPopular: true,
      sortOrder: 2,
    },
    {
      name: "Enterprise",
      slug: "enterprise",
      price: "Custom",
      period: "project-based",
      description: "ERP, mobile apps, and custom software platforms.",
      features: ["Custom architecture", "Admin dashboard", "API integrations", "Cloud deployment", "Training & documentation", "Priority support"],
      isPopular: false,
      sortOrder: 3,
    },
  ];

  for (const plan of pricingPlans) {
    await prisma.pricingPlan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: { ...plan, status: ContentStatus.PUBLISHED, ctaText: "Get Started" },
    });
  }

  const solutions = [
    { title: "Digital Transformation", slug: "digital-transformation", description: "Move from manual processes to modern digital workflows.", icon: "Sparkles", features: ["Process audit", "Roadmap", "Implementation", "Training"], sortOrder: 1 },
    { title: "Industry Platforms", slug: "industry-platforms", description: "Ready-to-customize platforms for healthcare, gyms, restaurants, and more.", icon: "Layers", features: ["DoctorCare Pro", "FitZone Gym", "FoodHub Restaurant", "Labour ERP"], sortOrder: 2 },
    { title: "Enterprise Software", slug: "enterprise-software", description: "Custom ERP, CRM, HRMS, and operational systems.", icon: "Building", features: ["Custom modules", "RBAC", "Integrations", "Reporting"], sortOrder: 3 },
    { title: "Growth Marketing", slug: "growth-marketing", description: "SEO, ads, and conversion systems that generate leads.", icon: "TrendingUp", features: ["SEO", "Ads", "Landing pages", "Analytics"], sortOrder: 4 },
  ];

  for (const solution of solutions) {
    await prisma.solution.upsert({
      where: { slug: solution.slug },
      update: solution,
      create: { ...solution, status: ContentStatus.PUBLISHED },
    });
  }

  const settings = [
    { key: "company", value: { name: "MBD Solutions", legalName: "Mon Bai Dhakad Solutions", phone: "6263478403", email: "kuldeepdhakad153@gmail.com", whatsapp: "916263478403", address: "India", founded: "2023" } },
    { key: "social", value: { whatsapp: "https://wa.me/916263478403", instagram: "https://instagram.com", facebook: "https://facebook.com", linkedin: "https://linkedin.com" } },
    { key: "seo_defaults", value: { title: "MBD Solutions | Enterprise Software, Websites & Digital Solutions", description: "MBD Solutions builds websites, ERP systems, mobile apps, AI solutions and digital marketing for businesses across India.", siteUrl: "https://monbaidhakad.in" } },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  const homepageSections = [
    { key: "hero", title: "Complete Digital Solutions for Every Business", subtitle: "Websites, mobile apps, ERP systems, AI solutions & digital marketing — professional quality at prices that work for you.", isVisible: true, sortOrder: 1 },
    { key: "stats", title: "Trusted delivery metrics", isVisible: true, sortOrder: 2 },
    { key: "clients", title: "Trusted by growing businesses", isVisible: true, sortOrder: 3 },
    { key: "services", title: "Our Services", subtitle: "Transparent pricing. No hidden charges.", isVisible: true, sortOrder: 4 },
    { key: "products", title: "Featured Products", isVisible: true, sortOrder: 5 },
    { key: "projects", title: "Featured Projects", isVisible: true, sortOrder: 6 },
    { key: "industries", title: "Industries We Serve", isVisible: true, sortOrder: 7 },
    { key: "process", title: "Our Development Process", isVisible: true, sortOrder: 8 },
    { key: "testimonials", title: "What Our Clients Say", isVisible: true, sortOrder: 9 },
    { key: "blog", title: "Latest Insights", isVisible: true, sortOrder: 10 },
    { key: "faq", title: "Frequently Asked Questions", isVisible: true, sortOrder: 11 },
    { key: "cta", title: "Get Your Free Business Consultation", subtitle: "Talk to Kuldeep Dhakad and get a custom quote within 24 hours.", isVisible: true, sortOrder: 12 },
  ];

  for (const section of homepageSections) {
    await prisma.homepageSection.upsert({
      where: { key: section.key },
      update: section,
      create: section,
    });
  }

  const seoPages = [
    { pagePath: "/", title: "MBD Solutions | Enterprise Software, Websites & Digital Solutions", description: "Premium digital solutions for doctors, gyms, restaurants & businesses. Websites, ERP, mobile apps, AI & digital marketing." },
    { pagePath: "/services", title: "Services | MBD Solutions", description: "Website development, healthcare software, gym ERP, restaurant systems, mobile apps, AI and digital marketing." },
    { pagePath: "/products", title: "Products | MBD Solutions", description: "DoctorCare Pro, FitZone Gym, FoodHub Restaurant, HMS, School ERP, HRMS, CRM and custom software." },
    { pagePath: "/portfolio", title: "Portfolio | MBD Solutions", description: "Explore delivered projects and live demos across healthcare, fitness, restaurants and enterprise software." },
    { pagePath: "/about", title: "About MBD Solutions", description: "Learn about Mon Bai Dhakad Solutions, our mission, vision and journey helping businesses grow digitally." },
    { pagePath: "/contact", title: "Contact MBD Solutions", description: "Get a free consultation from Kuldeep Dhakad. Call 6263478403 or email kuldeepdhakad153@gmail.com." },
  ];

  for (const seo of seoPages) {
    await prisma.sEO.upsert({
      where: { pagePath: seo.pagePath },
      update: seo,
      create: seo,
    });
  }

  console.log("✅ Seed completed successfully");
  console.log(`   Admin: ${admin.email} (password stored as bcrypt hash in database)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
