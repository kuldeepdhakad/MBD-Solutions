/**
 * Generates premium static demo websites for all MBD services & products.
 * Run: node scripts/generate-demos.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEMOS_ROOT = path.join(__dirname, "../public/demos");

const demos = [
  {
    slug: "website-development",
    brand: "WebCraft Pro",
    icon: "🌐",
    tagline: "Premium Business Websites",
    heroTitle: "Build Your Digital",
    heroAccent: "Presence",
    heroSub: "Professional, responsive websites that convert visitors into customers. SEO-ready, fast, and built for growth.",
    theme: { accent: "#2563eb", accentLight: "#60a5fa", bg: "#0b1120" },
    features: [
      { icon: "📱", title: "Responsive Design", desc: "Perfect on mobile, tablet and desktop." },
      { icon: "🔍", title: "SEO Optimized", desc: "Rank higher on Google from day one." },
      { icon: "⚡", title: "Lightning Fast", desc: "Sub-second load times with modern tech." },
      { icon: "🎨", title: "Custom Branding", desc: "Your logo, colors and identity throughout." },
      { icon: "📊", title: "Analytics Ready", desc: "Track visitors and conversions easily." },
      { icon: "💬", title: "WhatsApp Integration", desc: "Direct customer contact built in." },
    ],
    pricing: [
      { name: "Landing Page", price: "₹4,999", features: ["1 Page", "Mobile Ready", "Contact Form"] },
      { name: "Business Site", price: "₹9,999", popular: true, features: ["5 Pages", "SEO Setup", "CMS"] },
      { name: "E-Commerce", price: "₹24,999", features: ["Online Store", "Payments", "Inventory"] },
    ],
    testimonials: [
      { name: "Rahul Mehta", role: "Retail Owner", text: "Our website increased online inquiries by 300% in the first month." },
      { name: "Priya Sharma", role: "Consultant", text: "Professional, fast delivery. Exactly what our business needed." },
    ],
  },
  {
    slug: "healthcare-solutions",
    brand: "MediCare Hub",
    icon: "🏥",
    tagline: "Healthcare Digital Platform",
    heroTitle: "Modern Healthcare",
    heroAccent: "Management",
    heroSub: "Complete clinic and hospital software — appointments, patient records, billing and telemedicine.",
    theme: { accent: "#0ea5e9", accentLight: "#38bdf8", bg: "#0a1628" },
    features: [
      { icon: "📅", title: "Appointments", desc: "Online booking with automated reminders." },
      { icon: "📋", title: "Patient Records", desc: "Secure digital health records." },
      { icon: "💊", title: "Prescriptions", desc: "Digital prescriptions and pharmacy integration." },
      { icon: "📹", title: "Telemedicine", desc: "Video consultations from anywhere." },
      { icon: "💳", title: "Billing", desc: "Automated invoicing and insurance claims." },
      { icon: "📱", title: "Patient App", desc: "Mobile app for patients and doctors." },
    ],
    pricing: [
      { name: "Clinic Starter", price: "₹9,999", features: ["Appointments", "Patient Portal", "WhatsApp"] },
      { name: "Clinic Pro", price: "₹14,999", popular: true, features: ["Full HMS", "Billing", "Reports"] },
      { name: "Hospital Suite", price: "₹49,999", features: ["Multi-dept", "IPD/OPD", "Pharmacy"] },
    ],
    testimonials: [
      { name: "Dr. Anil Verma", role: "Clinic Owner", text: "Patient no-shows dropped 40% with automated reminders." },
      { name: "Dr. Sunita Rao", role: "Pediatrician", text: "Finally organized records and smooth appointment flow." },
    ],
  },
  {
    slug: "gym-management",
    brand: "FitZone Pro",
    icon: "💪",
    tagline: "Gym & Fitness Management",
    heroTitle: "Power Your",
    heroAccent: "Fitness Business",
    heroSub: "Membership plans, attendance tracking, trainer profiles and automated billing in one platform.",
    theme: { accent: "#f59e0b", accentLight: "#fbbf24", bg: "#0f0f0f" },
    features: [
      { icon: "🎫", title: "Membership Plans", desc: "Flexible plans with auto-renewal." },
      { icon: "✅", title: "Attendance", desc: "Biometric and QR check-in." },
      { icon: "👨‍🏫", title: "Trainer Profiles", desc: "Showcase trainers and schedules." },
      { icon: "📊", title: "BMI Tracker", desc: "Member health progress tracking." },
      { icon: "🥗", title: "Diet Plans", desc: "Personalized nutrition programs." },
      { icon: "💰", title: "Billing", desc: "Automated payments and invoices." },
    ],
    pricing: [
      { name: "Gym Website", price: "₹7,999", features: ["Marketing Site", "Plans Display", "Contact"] },
      { name: "Membership System", price: "₹12,999", popular: true, features: ["Members", "Attendance", "Billing"] },
      { name: "Complete Gym ERP", price: "₹24,999", features: ["Full ERP", "Trainer Portal", "Reports"] },
    ],
    testimonials: [
      { name: "Vikram Singh", role: "Gym Owner", text: "Member renewals are now fully automated. Saved 10 hours weekly." },
      { name: "Neha Kapoor", role: "Fitness Studio", text: "Professional platform that our members love using." },
    ],
  },
  {
    slug: "restaurant-solutions",
    brand: "FoodHub Pro",
    icon: "🍽️",
    tagline: "Restaurant Management",
    heroTitle: "Serve More",
    heroAccent: "Customers",
    heroSub: "Digital menus, online ordering, table reservations and kitchen management for modern restaurants.",
    theme: { accent: "#ef4444", accentLight: "#f87171", bg: "#1a0a0a" },
    features: [
      { icon: "📱", title: "Online Ordering", desc: "Customers order directly from your site." },
      { icon: "📋", title: "Digital Menu", desc: "Beautiful menus with photos and prices." },
      { icon: "🪑", title: "Table Booking", desc: "Real-time reservation management." },
      { icon: "👨‍🍳", title: "Kitchen Display", desc: "Streamlined kitchen order flow." },
      { icon: "⭐", title: "Reviews", desc: "Collect and showcase customer reviews." },
      { icon: "📦", title: "Delivery Tracking", desc: "Track orders from kitchen to door." },
    ],
    pricing: [
      { name: "Restaurant Site", price: "₹7,999", features: ["Menu", "Gallery", "Contact"] },
      { name: "Online Ordering", price: "₹14,999", popular: true, features: ["Cart", "Payments", "Orders"] },
      { name: "Full Management", price: "₹29,999", features: ["Kitchen", "Inventory", "Reports"] },
    ],
    testimonials: [
      { name: "Chef Arjun", role: "Restaurant Owner", text: "Online orders increased 250% after launching FoodHub." },
      { name: "Meera Patel", role: "Cafe Manager", text: "Table bookings are seamless. No more phone chaos." },
    ],
  },
  {
    slug: "mobile-app-development",
    brand: "AppForge",
    icon: "📱",
    tagline: "Mobile App Development",
    heroTitle: "Apps That",
    heroAccent: "Drive Growth",
    heroSub: "Native-quality Android and iOS apps built with React Native and Flutter for maximum reach.",
    theme: { accent: "#8b5cf6", accentLight: "#a78bfa", bg: "#0f0a1a" },
    features: [
      { icon: "🤖", title: "Android Apps", desc: "Play Store ready Android applications." },
      { icon: "🍎", title: "iOS Apps", desc: "App Store compliant iOS builds." },
      { icon: "🔄", title: "Cross-Platform", desc: "One codebase, two platforms." },
      { icon: "🔔", title: "Push Notifications", desc: "Engage users with timely alerts." },
      { icon: "📴", title: "Offline Mode", desc: "Works without internet connection." },
      { icon: "🔐", title: "Secure Auth", desc: "Biometric and OAuth login." },
    ],
    pricing: [
      { name: "Android App", price: "₹24,999", features: ["Single Platform", "UI/UX", "Store Launch"] },
      { name: "iOS + Android", price: "₹59,999", popular: true, features: ["Both Platforms", "Backend", "Support"] },
      { name: "Enterprise", price: "₹99,999+", features: ["Custom Features", "Scalable", "SLA"] },
    ],
    testimonials: [
      { name: "Amit Joshi", role: "Startup Founder", text: "Launched on both stores in 8 weeks. Impressive quality." },
      { name: "Kavita Nair", role: "E-commerce", text: "Our app drives 60% of total sales now." },
    ],
  },
  {
    slug: "software-erp-development",
    brand: "EnterpriseCore",
    icon: "⚙️",
    tagline: "Custom ERP & Software",
    heroTitle: "Software Built",
    heroAccent: "For You",
    heroSub: "Custom CRM, ERP, HRMS and inventory systems tailored to your exact business workflow.",
    theme: { accent: "#2563eb", accentLight: "#60a5fa", bg: "#0b1120" },
    features: [
      { icon: "📊", title: "Custom Modules", desc: "Built around your processes." },
      { icon: "👥", title: "Role-Based Access", desc: "Granular permissions per role." },
      { icon: "📈", title: "Reports & Analytics", desc: "Real-time business intelligence." },
      { icon: "🔗", title: "Integrations", desc: "Connect with existing tools." },
      { icon: "📝", title: "Audit Logs", desc: "Complete activity tracking." },
      { icon: "☁️", title: "Cloud Deploy", desc: "Secure, scalable infrastructure." },
    ],
    pricing: [
      { name: "CRM", price: "₹24,999", features: ["Leads", "Pipeline", "Reports"] },
      { name: "HRMS", price: "₹49,999", popular: true, features: ["Payroll", "Attendance", "Leave"] },
      { name: "Full ERP", price: "₹99,999+", features: ["All Modules", "Custom", "Training"] },
    ],
    testimonials: [
      { name: "Rajesh Kumar", role: "Manufacturing", text: "Replaced 5 spreadsheets with one unified ERP system." },
      { name: "Deepa Iyer", role: "HR Director", text: "Payroll processing time reduced from days to hours." },
    ],
  },
  {
    slug: "ai-solutions",
    brand: "IntelliBot AI",
    icon: "🤖",
    tagline: "AI Automation Platform",
    heroTitle: "AI That Works",
    heroAccent: "For You",
    heroSub: "Intelligent chatbots, WhatsApp bots and automation that respond instantly and qualify leads 24/7.",
    theme: { accent: "#06b6d4", accentLight: "#22d3ee", bg: "#0a1520" },
    features: [
      { icon: "💬", title: "AI Chatbot", desc: "Website chat with natural language." },
      { icon: "📲", title: "WhatsApp Bot", desc: "Automated WhatsApp conversations." },
      { icon: "🎯", title: "Lead Qualification", desc: "Score and route leads automatically." },
      { icon: "📚", title: "Knowledge Base", desc: "Train on your business data." },
      { icon: "🌐", title: "Multi-Language", desc: "Support Hindi, English and more." },
      { icon: "📊", title: "Analytics", desc: "Conversation insights and metrics." },
    ],
    pricing: [
      { name: "AI Chatbot", price: "₹14,999", features: ["Website Bot", "Training", "Analytics"] },
      { name: "WhatsApp AI", price: "₹19,999", popular: true, features: ["WhatsApp", "Lead Capture", "Handoff"] },
      { name: "Enterprise AI", price: "₹49,999+", features: ["Custom AI", "Integrations", "SLA"] },
    ],
    testimonials: [
      { name: "Sanjay Gupta", role: "E-commerce", text: "AI bot handles 80% of customer queries without human help." },
      { name: "Pooja Reddy", role: "Real Estate", text: "Lead qualification improved our sales conversion by 45%." },
    ],
  },
  {
    slug: "digital-marketing",
    brand: "GrowthMax",
    icon: "📈",
    tagline: "Digital Marketing Agency",
    heroTitle: "Grow Your",
    heroAccent: "Business Online",
    heroSub: "SEO, social media, paid ads and lead generation campaigns that deliver measurable ROI.",
    theme: { accent: "#10b981", accentLight: "#34d399", bg: "#0a1a14" },
    features: [
      { icon: "🔍", title: "SEO Services", desc: "Rank higher and get organic traffic." },
      { icon: "📱", title: "Social Media", desc: "Consistent brand presence online." },
      { icon: "📢", title: "Paid Ads", desc: "Facebook, Instagram and Google ads." },
      { icon: "📍", title: "Google Business", desc: "Local visibility optimization." },
      { icon: "📊", title: "Lead Campaigns", desc: "Targeted lead generation funnels." },
      { icon: "📈", title: "Monthly Reports", desc: "Transparent performance tracking." },
    ],
    pricing: [
      { name: "Starter", price: "₹4,999/mo", features: ["Social Media", "GBP Setup", "Reports"] },
      { name: "Growth", price: "₹9,999/mo", popular: true, features: ["SEO", "Ads", "Content"] },
      { name: "Enterprise", price: "₹14,999/mo", features: ["Full Stack", "Leads", "Strategy"] },
    ],
    testimonials: [
      { name: "Manish Agarwal", role: "Local Business", text: "Google ranking improved from page 3 to page 1 in 3 months." },
      { name: "Ritu Bansal", role: "Salon Owner", text: "Social media campaigns brought 200+ new customers." },
    ],
  },
  {
    slug: "cloud-devops",
    brand: "CloudStack",
    icon: "☁️",
    tagline: "Cloud & DevOps Services",
    heroTitle: "Deploy With",
    heroAccent: "Confidence",
    heroSub: "AWS hosting, Docker containers, CI/CD pipelines and monitoring for reliable, scalable applications.",
    theme: { accent: "#6366f1", accentLight: "#818cf8", bg: "#0a0a1a" },
    features: [
      { icon: "🌐", title: "Cloud Hosting", desc: "Reliable AWS and cloud deployment." },
      { icon: "🐳", title: "Docker", desc: "Containerized applications." },
      { icon: "🔄", title: "CI/CD Pipelines", desc: "Automated build and deploy." },
      { icon: "🔒", title: "Security", desc: "SSL, firewalls and hardening." },
      { icon: "📊", title: "Monitoring", desc: "24/7 uptime and alert systems." },
      { icon: "⚡", title: "Performance", desc: "CDN and caching optimization." },
    ],
    pricing: [
      { name: "Hosting Setup", price: "₹2,999", features: ["Server", "SSL", "DNS"] },
      { name: "Cloud Deploy", price: "₹4,999", popular: true, features: ["AWS", "Docker", "Monitoring"] },
      { name: "DevOps Suite", price: "₹19,999", features: ["CI/CD", "Full Stack", "Support"] },
    ],
    testimonials: [
      { name: "Arun Pillai", role: "CTO", text: "Deployment time went from hours to minutes with CI/CD." },
      { name: "Suresh Menon", role: "SaaS Founder", text: "99.9% uptime since moving to CloudStack infrastructure." },
    ],
  },
  {
    slug: "labour-management",
    brand: "WorkForce ERP",
    icon: "👷",
    tagline: "Labour & Contractor Management",
    heroTitle: "Manage Your",
    heroAccent: "Workforce",
    heroSub: "Contractor portals, attendance tracking, payroll and workforce reporting for labour businesses.",
    theme: { accent: "#f97316", accentLight: "#fb923c", bg: "#1a1008" },
    features: [
      { icon: "📝", title: "Labour Registration", desc: "Digital worker onboarding." },
      { icon: "🏗️", title: "Contractor Portal", desc: "Manage multiple contractors." },
      { icon: "✅", title: "Attendance", desc: "Daily attendance with geo-tagging." },
      { icon: "💰", title: "Payroll", desc: "Automated wage calculations." },
      { icon: "📊", title: "Reports", desc: "Workforce analytics dashboard." },
      { icon: "📱", title: "Mobile Access", desc: "Field supervisors on mobile." },
    ],
    pricing: [
      { name: "Registration Portal", price: "₹9,999", features: ["Worker DB", "Documents", "Search"] },
      { name: "Attendance & Payroll", price: "₹19,999", popular: true, features: ["Attendance", "Payroll", "Reports"] },
      { name: "Complete Labour ERP", price: "₹39,999", features: ["Full ERP", "Contractors", "Mobile"] },
    ],
    testimonials: [
      { name: "Ramesh Yadav", role: "Contractor", text: "Payroll errors eliminated. Workers get paid on time every week." },
      { name: "Harish Choudhary", role: "Construction", text: "Attendance tracking saved us from wage disputes." },
    ],
  },
  {
    slug: "hospital-management-system",
    brand: "HospiCare HMS",
    icon: "🏨",
    tagline: "Hospital Management System",
    heroTitle: "Complete Hospital",
    heroAccent: "Operations",
    heroSub: "OPD, IPD, billing, pharmacy, lab reports and staff management for multi-department hospitals.",
    theme: { accent: "#0284c7", accentLight: "#38bdf8", bg: "#0a1525" },
    features: [
      { icon: "🩺", title: "OPD & IPD", desc: "Outpatient and inpatient management." },
      { icon: "💊", title: "Pharmacy", desc: "Inventory and prescription dispensing." },
      { icon: "🔬", title: "Lab Reports", desc: "Digital lab test management." },
      { icon: "💳", title: "Billing", desc: "Insurance and cash billing." },
      { icon: "👨‍⚕️", title: "Staff Roles", desc: "Doctor, nurse and admin access." },
      { icon: "📊", title: "Dashboards", desc: "Hospital-wide analytics." },
    ],
    pricing: [
      { name: "Standard HMS", price: "₹49,999", features: ["OPD", "Billing", "Pharmacy"] },
      { name: "Enterprise HMS", price: "Custom", popular: true, features: ["Multi-branch", "IPD", "Lab"] },
      { name: "Cloud HMS", price: "₹9,999/mo", features: ["Hosted", "Updates", "Support"] },
    ],
    testimonials: [
      { name: "Dr. Kapoor", role: "Hospital Director", text: "Streamlined operations across 4 departments seamlessly." },
      { name: "Nurse Anita", role: "Head Nurse", text: "Patient records are organized and accessible instantly." },
    ],
  },
  {
    slug: "school-erp",
    brand: "EduSmart ERP",
    icon: "🎓",
    tagline: "School Management System",
    heroTitle: "Smart School",
    heroAccent: "Administration",
    heroSub: "Admissions, attendance, fees, exams and parent communication in one unified school ERP.",
    theme: { accent: "#7c3aed", accentLight: "#a78bfa", bg: "#0f0a1a" },
    features: [
      { icon: "📝", title: "Admissions", desc: "Online admission and enrollment." },
      { icon: "✅", title: "Attendance", desc: "Student and staff attendance." },
      { icon: "💰", title: "Fee Management", desc: "Fee collection and reminders." },
      { icon: "📋", title: "Exams & Results", desc: "Exam scheduling and report cards." },
      { icon: "👨‍👩‍👧", title: "Parent Portal", desc: "Parents track child progress." },
      { icon: "👨‍🏫", title: "Staff Management", desc: "Teacher schedules and payroll." },
    ],
    pricing: [
      { name: "Basic School", price: "₹29,999", features: ["Attendance", "Fees", "Reports"] },
      { name: "School ERP", price: "₹39,999", popular: true, features: ["Full ERP", "Parent App", "Exams"] },
      { name: "College ERP", price: "₹59,999", features: ["Multi-campus", "Hostel", "Library"] },
    ],
    testimonials: [
      { name: "Principal Sharma", role: "School Principal", text: "Fee collection improved 95% with automated reminders." },
      { name: "Parent Mrs. Gupta", role: "Parent", text: "Love tracking my child's attendance and results online." },
    ],
  },
  {
    slug: "hrms",
    brand: "PeopleFirst HRMS",
    icon: "👥",
    tagline: "Human Resource Management",
    heroTitle: "HR Made",
    heroAccent: "Simple",
    heroSub: "Employee records, attendance, leave, payroll and performance reviews for growing companies.",
    theme: { accent: "#2563eb", accentLight: "#60a5fa", bg: "#0b1120" },
    features: [
      { icon: "📁", title: "Employee Records", desc: "Centralized employee database." },
      { icon: "✅", title: "Attendance", desc: "Biometric and manual tracking." },
      { icon: "🏖️", title: "Leave Management", desc: "Leave requests and approvals." },
      { icon: "💰", title: "Payroll", desc: "Indian payroll with statutory compliance." },
      { icon: "⭐", title: "Performance", desc: "Reviews and goal tracking." },
      { icon: "📄", title: "Document Vault", desc: "Secure document storage." },
    ],
    pricing: [
      { name: "Starter HRMS", price: "₹29,999", features: ["50 Employees", "Attendance", "Leave"] },
      { name: "HRMS Pro", price: "₹49,999", popular: true, features: ["Payroll", "Performance", "Reports"] },
      { name: "Enterprise", price: "Custom", features: ["Unlimited", "Multi-location", "API"] },
    ],
    testimonials: [
      { name: "HR Manager Priya", role: "HR Head", text: "Payroll runs that took 3 days now complete in 2 hours." },
      { name: "CEO Vikram", role: "Tech Startup", text: "Scaled from 10 to 100 employees without HR chaos." },
    ],
  },
  {
    slug: "crm",
    brand: "SalesPulse CRM",
    icon: "📊",
    tagline: "Customer Relationship Management",
    heroTitle: "Close More",
    heroAccent: "Deals",
    heroSub: "Track leads, manage pipelines, automate follow-ups and grow revenue with intelligent CRM.",
    theme: { accent: "#059669", accentLight: "#34d399", bg: "#0a1a14" },
    features: [
      { icon: "🎯", title: "Lead Management", desc: "Capture and score leads automatically." },
      { icon: "📈", title: "Sales Pipeline", desc: "Visual deal stages and forecasting." },
      { icon: "📞", title: "Follow-ups", desc: "Automated reminders and tasks." },
      { icon: "📝", title: "Notes & History", desc: "Complete customer interaction log." },
      { icon: "📊", title: "Reports", desc: "Sales performance analytics." },
      { icon: "💬", title: "WhatsApp CRM", desc: "WhatsApp integration for sales." },
    ],
    pricing: [
      { name: "CRM Starter", price: "₹14,999", features: ["5 Users", "Pipeline", "Reports"] },
      { name: "CRM Pro", price: "₹24,999", popular: true, features: ["Unlimited Leads", "Automation", "WhatsApp"] },
      { name: "Enterprise CRM", price: "₹49,999", features: ["Custom Fields", "API", "Training"] },
    ],
    testimonials: [
      { name: "Sales Head Rohan", role: "Sales Director", text: "Pipeline visibility increased our close rate by 35%." },
      { name: "Agent Meena", role: "Real Estate", text: "Never miss a follow-up with automated reminders." },
    ],
  },
  {
    slug: "inventory-management",
    brand: "StockFlow",
    icon: "📦",
    tagline: "Inventory Management System",
    heroTitle: "Control Your",
    heroAccent: "Inventory",
    heroSub: "Real-time stock tracking, purchase orders, supplier management and multi-location warehouse control.",
    theme: { accent: "#d97706", accentLight: "#fbbf24", bg: "#1a1208" },
    features: [
      { icon: "📦", title: "Stock Tracking", desc: "Real-time inventory levels." },
      { icon: "🛒", title: "Purchase Orders", desc: "Automated reordering." },
      { icon: "🏭", title: "Suppliers", desc: "Supplier database and history." },
      { icon: "⚠️", title: "Low Stock Alerts", desc: "Never run out of stock." },
      { icon: "📍", title: "Multi-Location", desc: "Warehouse and store tracking." },
      { icon: "📊", title: "Reports", desc: "Inventory valuation and movement." },
    ],
    pricing: [
      { name: "Basic Inventory", price: "₹19,999", features: ["Single Location", "PO", "Reports"] },
      { name: "Pro Inventory", price: "₹29,999", popular: true, features: ["Multi-location", "Alerts", "Barcode"] },
      { name: "Enterprise", price: "₹49,999", features: ["Unlimited SKUs", "API", "Integration"] },
    ],
    testimonials: [
      { name: "Store Owner Raj", role: "Retail Chain", text: "Stock discrepancies reduced by 90% across 5 stores." },
      { name: "Warehouse Manager", role: "Distributor", text: "Purchase order automation saved 15 hours per week." },
    ],
  },
  {
    slug: "blockchain-platform",
    brand: "ChainSecure",
    icon: "🔗",
    tagline: "Blockchain Solutions",
    heroTitle: "Secure",
    heroAccent: "Blockchain Apps",
    heroSub: "Smart contracts, wallet integration and transparent transaction systems for modern businesses.",
    theme: { accent: "#7c3aed", accentLight: "#a78bfa", bg: "#0f0820" },
    features: [
      { icon: "📜", title: "Smart Contracts", desc: "Automated trustless agreements." },
      { icon: "👛", title: "Wallet Integration", desc: "Connect MetaMask and wallets." },
      { icon: "🔍", title: "Transaction Explorer", desc: "Transparent on-chain history." },
      { icon: "🔐", title: "Admin Controls", desc: "Governance and access management." },
      { icon: "📋", title: "Audit Trails", desc: "Immutable activity records." },
      { icon: "🌐", title: "Multi-Chain", desc: "EVM-compatible networks." },
    ],
    pricing: [
      { name: "Smart Contract", price: "₹49,999", features: ["Contract Dev", "Audit", "Deploy"] },
      { name: "DApp Platform", price: "₹99,999", popular: true, features: ["Full DApp", "Wallet", "Explorer"] },
      { name: "Enterprise", price: "Custom", features: ["Private Chain", "Custom", "Support"] },
    ],
    testimonials: [
      { name: "CTO Blockchain Co", role: "Fintech", text: "Transparent supply chain tracking built in 6 weeks." },
      { name: "Founder NFT Project", role: "Web3", text: "Smart contracts deployed securely with full documentation." },
    ],
  },
  {
    slug: "ai-chatbot",
    brand: "ChatGenius AI",
    icon: "🤖",
    tagline: "AI Customer Support",
    heroTitle: "Support That",
    heroAccent: "Never Sleeps",
    heroSub: "Deploy AI chatbots on your website and WhatsApp to answer questions and qualify leads 24/7.",
    theme: { accent: "#06b6d4", accentLight: "#22d3ee", bg: "#0a1520" },
    features: [
      { icon: "💬", title: "Website Chatbot", desc: "Embed on any website instantly." },
      { icon: "📲", title: "WhatsApp Bot", desc: "Automated WhatsApp support." },
      { icon: "📚", title: "Knowledge Base", desc: "Train on your FAQs and docs." },
      { icon: "🎯", title: "Lead Capture", desc: "Collect contact info automatically." },
      { icon: "👤", title: "Human Handoff", desc: "Escalate to live agents." },
      { icon: "📊", title: "Analytics", desc: "Conversation insights dashboard." },
    ],
    pricing: [
      { name: "AI Chatbot", price: "₹14,999", features: ["Website", "Training", "Analytics"] },
      { name: "WhatsApp AI", price: "₹19,999", popular: true, features: ["WhatsApp", "Leads", "Handoff"] },
      { name: "Enterprise AI", price: "₹29,999", features: ["Multi-channel", "Custom", "SLA"] },
    ],
    testimonials: [
      { name: "Support Manager", role: "SaaS Company", text: "80% of tickets resolved without human intervention." },
      { name: "E-commerce Owner", role: "Online Store", text: "Cart abandonment reduced with proactive AI chat." },
    ],
  },
  {
    slug: "custom-erp",
    brand: "FlexERP",
    icon: "🏢",
    tagline: "Custom Enterprise ERP",
    heroTitle: "ERP Built",
    heroAccent: "Your Way",
    heroSub: "Fully customized enterprise resource planning tailored to your departments, approvals and reporting.",
    theme: { accent: "#2563eb", accentLight: "#60a5fa", bg: "#0b1120" },
    features: [
      { icon: "🧩", title: "Custom Modules", desc: "Built for your exact workflow." },
      { icon: "✅", title: "Approval Workflows", desc: "Multi-level approval chains." },
      { icon: "💰", title: "Finance", desc: "Accounting and financial reporting." },
      { icon: "⚙️", title: "Operations", desc: "Production and supply chain." },
      { icon: "📊", title: "Executive Reports", desc: "C-level dashboards." },
      { icon: "🔗", title: "Integrations", desc: "Connect existing systems." },
    ],
    pricing: [
      { name: "Module Pack", price: "₹49,999", features: ["3 Modules", "Training", "Support"] },
      { name: "Custom ERP", price: "₹99,999+", popular: true, features: ["Full ERP", "Custom", "6-12 weeks"] },
      { name: "Enterprise", price: "Custom", features: ["Multi-entity", "API", "Dedicated"] },
    ],
    testimonials: [
      { name: "COO Manufacturing", role: "Factory", text: "Replaced legacy software with a system that fits our process." },
      { name: "Director Operations", role: "Logistics", text: "ROI achieved within 8 months of go-live." },
    ],
  },
  {
    slug: "custom-software",
    brand: "CodeCraft",
    icon: "💻",
    tagline: "Bespoke Software Development",
    heroTitle: "Software For",
    heroAccent: "Unique Problems",
    heroSub: "End-to-end custom software from discovery to deployment for workflows that need purpose-built solutions.",
    theme: { accent: "#6366f1", accentLight: "#818cf8", bg: "#0a0a1a" },
    features: [
      { icon: "🔍", title: "Discovery", desc: "Deep dive into your requirements." },
      { icon: "🎨", title: "UI/UX Design", desc: "Beautiful, intuitive interfaces." },
      { icon: "⚡", title: "Full Stack Dev", desc: "Frontend, backend and database." },
      { icon: "🧪", title: "QA Testing", desc: "Rigorous quality assurance." },
      { icon: "🚀", title: "Deployment", desc: "Cloud launch and handover." },
      { icon: "🛠️", title: "Support", desc: "Ongoing maintenance available." },
    ],
    pricing: [
      { name: "MVP", price: "₹49,999", features: ["Core Features", "Web App", "3 months"] },
      { name: "Full Product", price: "₹99,999+", popular: true, features: ["Complete", "Mobile", "Support"] },
      { name: "Enterprise", price: "Custom", features: ["Scale", "Compliance", "SLA"] },
    ],
    testimonials: [
      { name: "Founder Startup", role: "Tech", text: "From idea to production in 10 weeks. Exceptional team." },
      { name: "Operations Head", role: "Enterprise", text: "Solved a 5-year-old workflow problem with custom software." },
    ],
  },
];

function generateHTML(demo) {
  const t = demo.theme;
  const featuresHTML = demo.features
    .map(
      (f) => `
      <div class="glass glass-card feature-card reveal">
        <div class="feature-icon">${f.icon}</div>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </div>`,
    )
    .join("");

  const pricingHTML = demo.pricing
    .map(
      (p) => `
      <div class="glass glass-card pricing-card reveal${p.popular ? " popular" : ""}">
        ${p.popular ? '<span class="popular-badge">Most Popular</span>' : ""}
        <h3>${p.name}</h3>
        <div class="price">${p.price}</div>
        <ul>${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
        <button class="btn btn-primary btn-block pricing-btn" data-plan="${p.name}">Get Started</button>
      </div>`,
    )
    .join("");

  const testimonialsHTML = demo.testimonials
    .map(
      (t) => `
      <div class="glass glass-card testimonial-card reveal">
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <strong>${t.name}</strong>
          <span>${t.role}</span>
        </div>
      </div>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${demo.brand} - ${demo.tagline} demo by MBD Solutions Pvt. Ltd.">
  <title>${demo.brand} | ${demo.tagline} – MBD Solutions Demo</title>
  <base href="/demos/${demo.slug}/">
  <link rel="icon" type="image/svg+xml" href="/assets/logos/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/demos/demo-shared.css">
  <style>
    :root {
      --bg: ${t.bg};
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent: ${t.accent};
      --accent-light: ${t.accentLight};
      --accent-glow: ${t.accent}40;
      --accent-gradient: linear-gradient(135deg, ${t.accentLight}, ${t.accent});
      --border: rgba(255,255,255,0.1);
      --glass-bg: rgba(255,255,255,0.05);
      --hero-bg: radial-gradient(ellipse at 30% 20%, ${t.accent}20 0%, transparent 50%), ${t.bg};
    }
    .demo-hero h1 span { color: var(--accent-light); }
    .feature-card { text-align: center; }
    .feature-icon { font-size: 2rem; margin-bottom: 1rem; }
    .feature-card h3 { font-family: var(--font-display); margin-bottom: 0.5rem; }
    .feature-card p { color: var(--text-muted); font-size: 0.9rem; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
    .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; align-items: start; }
    .pricing-card { position: relative; text-align: center; }
    .pricing-card.popular { border-color: var(--accent); box-shadow: 0 0 40px var(--accent-glow); }
    .popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent-gradient); color: #fff; font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.05em; }
    .pricing-card h3 { font-family: var(--font-display); font-size: 1.25rem; margin-bottom: 0.5rem; }
    .price { font-size: 2rem; font-weight: 800; font-family: var(--font-display); color: var(--accent-light); margin: 1rem 0; }
    .pricing-card ul { list-style: none; text-align: left; margin: 1.5rem 0; }
    .pricing-card li { padding: 0.4rem 0; color: var(--text-muted); font-size: 0.9rem; }
    .pricing-card li::before { content: "✓ "; color: var(--accent-light); font-weight: 700; }
    .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
    .testimonial-text { font-style: italic; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.7; }
    .testimonial-author strong { display: block; color: var(--text); }
    .testimonial-author span { font-size: 0.85rem; color: var(--text-muted); }
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
    .contact-form input, .contact-form textarea { width: 100%; padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid var(--border); background: var(--glass-bg); color: var(--text); font-family: inherit; margin-bottom: 1rem; }
    .contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: var(--accent); }
    .stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 3rem; }
    @media (max-width: 768px) { .stat-row { grid-template-columns: repeat(2, 1fr); } }
    .stat-card strong { display: block; font-size: 2rem; font-family: var(--font-display); color: var(--accent-light); }
    .stat-card span { font-size: 0.85rem; color: var(--text-muted); }
  </style>
</head>
<body>
  <div class="demo-badge">Demo by <a href="/">MBD Solutions</a></div>

  <header class="demo-header">
    <nav class="demo-nav container">
      <a href="#home" class="demo-logo">
        <span class="demo-logo-icon">${demo.icon}</span>
        ${demo.brand}
      </a>
      <button class="demo-nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul class="demo-nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#testimonials">Reviews</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="/" class="btn btn-sm btn-outline">← MBD Solutions</a></li>
      </ul>
    </nav>
  </header>

  <section class="demo-hero" id="home">
    <div class="demo-hero-bg"></div>
    <div class="demo-hero-orb demo-hero-orb-1"></div>
    <div class="demo-hero-orb demo-hero-orb-2"></div>
    <div class="container demo-hero-content">
      <span class="section-tag">${demo.tagline}</span>
      <h1>${demo.heroTitle} <span>${demo.heroAccent}</span></h1>
      <p class="demo-hero-sub">${demo.heroSub}</p>
      <div class="demo-hero-actions">
        <a href="#pricing" class="btn btn-primary">View Pricing</a>
        <a href="#" class="btn btn-whatsapp" id="hero-wa">WhatsApp Us</a>
        <a href="#contact" class="btn btn-outline">Free Demo</a>
      </div>
      <div class="stat-row reveal">
        <div class="glass glass-card stat-card"><strong>500+</strong><span>Clients</span></div>
        <div class="glass glass-card stat-card"><strong>99%</strong><span>Satisfaction</span></div>
        <div class="glass glass-card stat-card"><strong>24/7</strong><span>Support</span></div>
        <div class="glass glass-card stat-card"><strong>4.9★</strong><span>Rating</span></div>
      </div>
    </div>
  </section>

  <section id="features">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">Features</span>
        <h2>Everything You Need</h2>
        <p>Powerful features designed for modern businesses.</p>
      </div>
      <div class="features-grid">${featuresHTML}</div>
    </div>
  </section>

  <section id="pricing" style="background: rgba(0,0,0,0.25);">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">Pricing</span>
        <h2>Transparent Pricing</h2>
        <p>Choose the plan that fits your business. No hidden charges.</p>
      </div>
      <div class="pricing-grid">${pricingHTML}</div>
    </div>
  </section>

  <section id="testimonials">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">Testimonials</span>
        <h2>What Clients Say</h2>
        <p>Trusted by businesses across India.</p>
      </div>
      <div class="testimonials-grid">${testimonialsHTML}</div>
    </div>
  </section>

  <section id="contact" style="background: rgba(0,0,0,0.25);">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">Contact</span>
        <h2>Get Started Today</h2>
        <p>Fill the form and our team will contact you within 24 hours.</p>
      </div>
      <div class="contact-grid reveal">
        <div class="glass glass-card">
          <h3 style="font-family: var(--font-display); margin-bottom: 1rem;">Contact Info</h3>
          <p style="color: var(--text-muted); margin-bottom: 0.5rem;">📞 +91 6263478403</p>
          <p style="color: var(--text-muted); margin-bottom: 0.5rem;">📧 kuldeepdhakad153@gmail.com</p>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">💬 WhatsApp Support Available</p>
          <button class="btn btn-whatsapp btn-block" id="contact-wa">Chat on WhatsApp</button>
        </div>
        <form class="glass glass-card contact-form" id="contact-form">
          <input type="text" placeholder="Your Name" required>
          <input type="email" placeholder="Email Address" required>
          <input type="tel" placeholder="Phone Number" required>
          <textarea rows="4" placeholder="Tell us about your requirement..." required></textarea>
          <button type="submit" class="btn btn-primary btn-block">Send Message</button>
        </form>
      </div>
    </div>
  </section>

  <footer style="padding: 2rem 0; text-align: center; border-top: 1px solid var(--border);">
    <div class="container">
      <p style="color: var(--text-muted); font-size: 0.85rem;">
        © ${new Date().getFullYear()} ${demo.brand} Demo · Built by <a href="/" style="color: var(--accent-light);">MBD Solutions Pvt. Ltd.</a>
      </p>
    </div>
  </footer>

  <script src="/demos/demo-shared.js"></script>
  <script>
    document.getElementById('hero-wa')?.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp('Hi, I am interested in ${demo.brand}. Please share more details.');
    });
    document.getElementById('contact-wa')?.addEventListener('click', () => {
      openWhatsApp('Hi, I want a demo of ${demo.brand}.');
    });
    document.getElementById('contact-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! We will contact you within 24 hours.');
      e.target.reset();
    });
    document.querySelectorAll('.pricing-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        showToast('Selected: ' + btn.dataset.plan + ' plan. Contact us to proceed!');
      });
    });
  </script>
</body>
</html>`;
}

// Skip existing handcrafted demos
const SKIP = new Set(["doctor-care-pro", "fitzone-gym", "foodhub-restaurant"]);

let created = 0;
let skipped = 0;

for (const demo of demos) {
  if (SKIP.has(demo.slug)) {
    skipped++;
    continue;
  }
  const dir = path.join(DEMOS_ROOT, demo.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), generateHTML(demo), "utf8");
  created++;
  console.log(`✓ ${demo.slug}`);
}

console.log(`\nDone: ${created} created, ${skipped} skipped (handcrafted).`);
