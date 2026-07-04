import {
  Bot,
  Building2,
  Cloud,
  Code2,
  Contact,
  Dumbbell,
  Globe,
  GraduationCap,
  HardHat,
  HeartPulse,
  Hospital,
  Hotel,
  Layers,
  LayoutDashboard,
  Link as LinkIcon,
  Package,
  PenTool,
  Rocket,
  Search,
  Settings,
  Smartphone,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Globe,
  HeartPulse,
  Dumbbell,
  UtensilsCrossed,
  Smartphone,
  Settings,
  Bot,
  TrendingUp,
  Cloud,
  HardHat,
  Hospital,
  GraduationCap,
  Users,
  Contact,
  Package,
  Link: LinkIcon,
  LayoutDashboard,
  Code2,
  Building2,
  Store,
  Hotel,
  Sparkles,
  Layers,
  Building: Building2,
  Search,
  PenTool,
  Rocket,
};

export function DynamicIcon({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  const Icon = (name && icons[name]) || Globe;
  return <Icon className={className} />;
}
