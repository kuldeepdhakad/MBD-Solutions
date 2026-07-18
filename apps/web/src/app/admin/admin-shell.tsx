"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Briefcase,
  Building2,
  Contact,
  FileText,
  FolderKanban,
  HelpCircle,
  Home,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  Package,
  ScrollText,
  Search,
  Settings,
  Shield,
  Users,
  Wrench,
  Cpu,
  Factory,
  UserCircle,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { clearAuth, fetchCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/homepage", label: "Homepage", icon: Home },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/projects", label: "Portfolio", icon: FolderKanban },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/categories", label: "Categories", icon: FileText },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/founder", label: "Founder", icon: UserCircle },
  { href: "/admin/jobs", label: "Careers", icon: Briefcase },
  { href: "/admin/applications", label: "Applications", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/technologies", label: "Technologies", icon: Cpu },
  { href: "/admin/industries", label: "Industries", icon: Factory },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/contacts", label: "Contacts", icon: Contact },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/roles", label: "Roles", icon: Shield },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
  { href: "/admin/clients", label: "Clients", icon: Building2 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }
    fetchCurrentUser<{ role?: { name?: string } }>().then((user) => {
      if (!user || !["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(user.role?.name ?? "")) {
        router.replace("/admin/login");
        return;
      }
      setReady(true);
    });
  }, [pathname, router]);

  if (pathname === "/admin/login") return children;
  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background" role="status" aria-label="Loading admin">
        <Logo size="lg" showText />
        <p className="text-sm text-muted">Loading admin...</p>
      </div>
    );
  }

  const Nav = (
    <nav className="space-y-0.5 p-3">
      {links.map((link) => {
        const Icon = link.icon;
        const active =
          pathname === link.href ||
          (link.href !== "/admin" && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
              active ? "bg-primary text-white" : "text-secondary hover:bg-background",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {link.label}
          </Link>
        );
      })}
      <button
        onClick={async () => {
          await clearAuth();
          router.push("/admin/login");
        }}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-danger hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 overflow-y-auto border-r border-border bg-surface md:block">
          <div className="sticky top-0 flex h-16 items-center border-b border-border bg-surface px-4">
            <Logo size="sm" showText />
            <span className="ml-2 text-xs font-medium text-muted">Admin</span>
          </div>
          {Nav}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-5 md:px-8">
            <div>
              <p className="text-sm font-semibold text-primary">MBD Solutions Admin</p>
              <p className="text-xs text-muted">Manage website content without code changes</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="text-sm text-accent md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
              >
                Menu
              </button>
              <Link href="/" className="text-sm text-accent">
                View site
              </Link>
            </div>
          </header>
          {mobileOpen && (
            <div className="max-h-[60vh] overflow-y-auto border-b border-border bg-surface md:hidden">
              {Nav}
            </div>
          )}
          <div className="flex-1 p-5 md:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
