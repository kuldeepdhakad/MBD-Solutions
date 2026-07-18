/**
 * Full project audit script
 * Run: node scripts/audit-project.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DEMOS_ROOT = path.join(ROOT, "public/demos");
const SRC = path.join(ROOT, "src");

const REQUIRED_DEMO_SECTIONS = ["demo-hero", "features", "pricing", "testimonials", "contact"];
const REQUIRED_DEMO_META = ["viewport", "demo-shared.css", "demo-shared.js"];

const PRODUCT_SLUGS = {
  "doctorcare-pro": "doctor-care-pro",
  "fitzone-gym": "fitzone-gym",
  "foodhub-restaurant": "foodhub-restaurant",
  "hospital-management-system": "hospital-management-system",
  "school-erp": "school-erp",
  hrms: "hrms",
  crm: "crm",
  "inventory-management": "inventory-management",
  "blockchain-platform": "blockchain-platform",
  "ai-chatbot": "ai-chatbot",
  "custom-erp": "custom-erp",
  "custom-software": "custom-software",
};

const SERVICE_SLUGS = {
  "website-development": "website-development",
  "healthcare-solutions": "healthcare-solutions",
  "gym-management": "gym-management",
  "restaurant-solutions": "restaurant-solutions",
  "mobile-app-development": "mobile-app-development",
  "software-erp-development": "software-erp-development",
  "ai-solutions": "ai-solutions",
  "digital-marketing": "digital-marketing",
  "cloud-devops": "cloud-devops",
  "labour-management": "labour-management",
};

const issues = [];
const passes = [];

function pass(msg) {
  passes.push(msg);
}
function fail(msg) {
  issues.push(msg);
}

// 1. Count demo folders
const demoDirs = fs
  .readdirSync(DEMOS_ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

pass(`Demo folders found: ${demoDirs.length}`);

if (demoDirs.length !== 22) {
  fail(`Expected 22 demo folders, found ${demoDirs.length}`);
}

// 2. Verify each mapping resolves to existing file
for (const [slug, demoSlug] of Object.entries({ ...PRODUCT_SLUGS, ...SERVICE_SLUGS })) {
  const htmlPath = path.join(DEMOS_ROOT, demoSlug, "index.html");
  if (!fs.existsSync(htmlPath)) {
    fail(`Missing demo file for slug "${slug}" → /demos/${demoSlug}/index.html`);
  } else {
    pass(`Demo mapping OK: ${slug} → /demos/${demoSlug}/index.html`);
  }
}

// 3. Verify demo HTML structure
for (const dir of demoDirs) {
  const htmlPath = path.join(DEMOS_ROOT, dir, "index.html");
  if (!fs.existsSync(htmlPath)) {
    fail(`Demo folder "${dir}" has no index.html`);
    continue;
  }
  const html = fs.readFileSync(htmlPath, "utf8").toLowerCase();

  for (const section of REQUIRED_DEMO_SECTIONS) {
    const patterns = {
      "demo-hero": ["demo-hero", 'class="demo-hero"'],
      features: ['id="features"', "#features"],
      pricing: ['id="pricing"', "#pricing"],
      testimonials: ['id="testimonials"', "#testimonials", 'id="reviews"'],
      contact: ['id="contact"', "#contact"],
    };
    const found = patterns[section].some((p) => html.includes(p.toLowerCase()));
    if (!found) {
      fail(`Demo "${dir}" missing section: ${section}`);
    }
  }

  for (const meta of REQUIRED_DEMO_META) {
    if (!html.includes(meta)) {
      if (dir === "doctor-care-pro" || dir === "fitzone-gym" || dir === "foodhub-restaurant") {
        if (meta === "demo-shared.js" && html.includes("script.js")) continue;
        if (meta === "demo-shared.css" && html.includes("styles.css")) continue;
      }
      fail(`Demo "${dir}" missing: ${meta}`);
    }
  }

  if (!html.includes("@media") && !html.includes("max-width")) {
    const stylesPath = path.join(DEMOS_ROOT, dir, "styles.css");
    const sharedCss = fs.readFileSync(path.join(DEMOS_ROOT, "demo-shared.css"), "utf8");
    const localCss = fs.existsSync(stylesPath) ? fs.readFileSync(stylesPath, "utf8") : "";
    if (!sharedCss.includes("@media") && !localCss.includes("@media")) {
      fail(`Demo "${dir}" may lack responsive CSS`);
    }
  }
}

// 4. Check GsapReveal usage
const srcFiles = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory() && f.name !== "node_modules") walk(p);
    else if (/\.(tsx|ts|jsx|js)$/.test(f.name)) srcFiles.push(p);
  }
}
walk(SRC);

const gsapUsed = srcFiles.some((f) => {
  const c = fs.readFileSync(f, "utf8");
  return (c.includes("GsapReveal") || c.includes("PremiumSection")) && !f.endsWith("gsap-reveal.tsx") && !f.endsWith("premium-section.tsx");
});
if (!gsapUsed) {
  fail("GsapReveal component is defined but not used on any page");
}

const gsapImport = srcFiles.filter((f) => fs.readFileSync(f, "utf8").includes('from "gsap"'));
if (gsapImport.length === 0) {
  fail("GSAP is installed but not imported anywhere");
}

// 5. Check logo assets
const logos = [
  "public/assets/logos/mbd-logo-light-bg.svg",
  "public/assets/logos/mbd-logo-dark-bg.svg",
  "public/assets/logos/mbd-logo-favicon.png",
  "public/assets/logos/favicon.svg",
];
for (const logo of logos) {
  if (!fs.existsSync(path.join(ROOT, logo))) {
    fail(`Missing logo asset: ${logo}`);
  }
}

// 6. ESLint config
if (!fs.existsSync(path.join(ROOT, ".eslintrc.json")) && !fs.existsSync(path.join(ROOT, "eslint.config.mjs"))) {
  fail("No ESLint configuration file found");
}

// 7. Count components
const componentFiles = srcFiles.filter((f) => f.includes(`${path.sep}components${path.sep}`));
pass(`Component files: ${componentFiles.length}`);

// 8. Count pages
const pageFiles = srcFiles.filter((f) => f.includes(`${path.sep}app${path.sep}`) && f.endsWith("page.tsx"));
pass(`Page files: ${pageFiles.length}`);

// 9. Three.js usage
const threeFiles = srcFiles.filter((f) => {
  const c = fs.readFileSync(f, "utf8");
  return c.includes("@react-three/fiber") || c.includes("from \"three\"");
});
pass(`3D scene files: ${threeFiles.length}`);

// 10. Framer motion page transition
const hasPageTransition = fs.readFileSync(path.join(SRC, "app/layout.tsx"), "utf8").includes("PageTransition");
if (!hasPageTransition) fail("PageTransition not wired in layout.tsx");
else pass("PageTransition wired in layout");

// 11. Lenis smooth scroll
const hasLenis = fs.readFileSync(path.join(SRC, "components/providers.tsx"), "utf8").includes("SmoothScroll");
if (!hasLenis) fail("Lenis SmoothScroll not in providers");
else pass("Lenis SmoothScroll in providers");

// 12. Custom cursor
const hasCursor = fs.readFileSync(path.join(SRC, "components/providers.tsx"), "utf8").includes("CustomCursor");
if (!hasCursor) fail("CustomCursor not in providers");
else pass("CustomCursor in providers");

// Report
console.log("\n========== MBD SOLUTIONS AUDIT REPORT ==========\n");
console.log(`PASSED CHECKS: ${passes.length}`);
passes.slice(0, 5).forEach((p) => console.log(`  ✓ ${p}`));
if (passes.length > 5) console.log(`  ... and ${passes.length - 5} more passes`);

console.log(`\nISSUES FOUND: ${issues.length}`);
issues.forEach((i) => console.log(`  ✗ ${i}`));

console.log("\n================================================\n");
process.exit(issues.length > 0 ? 1 : 0);
