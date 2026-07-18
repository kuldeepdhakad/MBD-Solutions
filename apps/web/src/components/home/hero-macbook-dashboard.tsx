"use client";

import {
  Activity,
  Bell,
  Blocks,
  Bot,
  Cloud,
  LayoutDashboard,
  Link2,
  Server,
  Shield,
  TrendingUp,
  Users,
  UserCog,
} from "lucide-react";

function MiniChart({ color = "#2563EB" }: { color?: string }) {
  const points = "2,28 8,22 14,24 20,16 26,18 32,10 38,14 44,6 50,8 56,4";
  return (
    <svg viewBox="0 0 58 32" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={`${points} 56,32 2,32`} fill="url(#chartFill)" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BarChart() {
  const bars = [38, 62, 48, 78, 58, 88, 70];
  return (
    <div className="flex h-full items-end justify-between gap-[2px] px-0.5" aria-hidden="true">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-[#8B5CF6] to-[#A78BFA]"
          style={{ height: `${h}%`, opacity: 0.5 + i * 0.07 }}
        />
      ))}
    </div>
  );
}

const NAV = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Blocks, label: "ERP" },
  { icon: Bot, label: "AI Analytics" },
  { icon: Users, label: "CRM" },
  { icon: UserCog, label: "HRMS" },
  { icon: Link2, label: "Blockchain" },
  { icon: Cloud, label: "Cloud" },
];

const KPIS = [
  { label: "Revenue", value: "₹2.4Cr", change: "+18.2%", color: "#22C55E" },
  { label: "Active Users", value: "12,847", change: "+6.4%", color: "#22C55E" },
  { label: "Uptime", value: "99.97%", change: "Live", color: "#60A5FA" },
  { label: "ERP Sync", value: "100%", change: "OK", color: "#22C55E" },
];

const ACTIVITY = [
  { text: "ERP batch sync completed", color: "#22C55E" },
  { text: "AI model inference deployed", color: "#60A5FA" },
  { text: "Blockchain tx verified", color: "#A78BFA" },
  { text: "CRM lead auto-assigned", color: "#FBBF24" },
];

export function HeroMacbookDashboard() {
  return (
    <div className="flex h-full w-full overflow-hidden bg-[#060D18] text-white">
      <aside className="flex w-[17%] shrink-0 flex-col border-r border-white/[0.06] bg-[#0A1220]/90 py-2">
        <div className="mb-2 px-2">
          <p className="text-[4.5px] font-bold leading-tight text-white/95">Mon Bai Dhakad</p>
          <p className="text-[4px] font-semibold text-[#60A5FA]">Solutions</p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-1">
          {NAV.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-1 rounded-md px-1.5 py-1 ${
                item.active
                  ? "bg-[#2563EB]/25 text-[#93C5FD]"
                  : "text-white/35 hover:text-white/55"
              }`}
            >
              <item.icon className="h-2 w-2 shrink-0" strokeWidth={2} />
              <span className="truncate text-[4px] font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="mx-1.5 mt-1 rounded-md border border-[#22C55E]/20 bg-[#22C55E]/10 px-1.5 py-1">
          <div className="flex items-center gap-0.5">
            <Shield className="h-2 w-2 text-[#22C55E]" strokeWidth={2} />
            <span className="text-[3.5px] font-semibold text-[#22C55E]">ISO Secure</span>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/[0.06] px-2 py-1.5">
          <div>
            <p className="text-[5px] font-semibold text-white/90">Enterprise Command Center</p>
            <p className="text-[3.5px] text-white/40">AI · ERP · CRM · Cloud · Blockchain</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="relative">
              <Bell className="h-2.5 w-2.5 text-white/45" strokeWidth={2} />
              <span className="absolute -right-0.5 -top-0.5 h-1 w-1 rounded-full bg-[#EF4444]" />
            </div>
            <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]" />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-1 overflow-hidden p-1.5">
          <div className="grid grid-cols-4 gap-1">
            {KPIS.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-md border border-white/[0.06] bg-white/[0.03] p-1"
              >
                <p className="text-[3px] text-white/35">{kpi.label}</p>
                <p className="text-[5.5px] font-bold tracking-tight text-white">{kpi.value}</p>
                <p className="text-[2.8px] font-semibold" style={{ color: kpi.color }}>
                  {kpi.change}
                </p>
              </div>
            ))}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-6 gap-1">
            <div className="col-span-3 flex flex-col rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5">
              <div className="mb-0.5 flex items-center justify-between">
                <span className="text-[4px] font-semibold text-white/70">Revenue Analytics</span>
                <TrendingUp className="h-2 w-2 text-[#2563EB]" strokeWidth={2} />
              </div>
              <div className="min-h-[24px] flex-1">
                <MiniChart />
              </div>
            </div>

            <div className="col-span-2 flex flex-col rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5">
              <div className="mb-0.5 flex items-center justify-between">
                <span className="text-[4px] font-semibold text-white/70">HRMS Overview</span>
                <UserCog className="h-2 w-2 text-[#8B5CF6]" strokeWidth={2} />
              </div>
              <div className="min-h-[24px] flex-1">
                <BarChart />
              </div>
            </div>

            <div className="flex flex-col rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5">
              <div className="mb-0.5 flex items-center gap-0.5">
                <Server className="h-2 w-2 text-[#60A5FA]" strokeWidth={2} />
                <span className="text-[3.5px] font-semibold text-white/70">Cloud</span>
              </div>
              <p className="text-[5px] font-bold text-[#60A5FA]">99.9%</p>
              <p className="text-[2.8px] text-white/35">Infra health</p>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-1">
            <div className="col-span-2 rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5">
              <div className="mb-0.5 flex items-center gap-0.5">
                <Bot className="h-2 w-2 text-[#60A5FA]" strokeWidth={2} />
                <span className="text-[3.5px] font-semibold text-white/70">AI Analytics</span>
              </div>
              <p className="text-[3px] leading-relaxed text-white/45">
                +23% revenue forecast Q3 from ERP pipeline intelligence.
              </p>
            </div>

            <div className="rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5">
              <div className="mb-0.5 flex items-center gap-0.5">
                <Blocks className="h-2 w-2 text-[#34D399]" strokeWidth={2} />
                <span className="text-[3.5px] font-semibold text-white/70">ERP</span>
              </div>
              <p className="text-[4.5px] font-bold text-white">847</p>
              <p className="text-[2.8px] text-white/35">Active modules</p>
            </div>

            <div className="rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5">
              <div className="mb-0.5 flex items-center gap-0.5">
                <Users className="h-2 w-2 text-[#FBBF24]" strokeWidth={2} />
                <span className="text-[3.5px] font-semibold text-white/70">CRM</span>
              </div>
              <p className="text-[4.5px] font-bold text-white">1.2K</p>
              <p className="text-[2.8px] text-white/35">Leads today</p>
            </div>

            <div className="col-span-2 rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5">
              <div className="mb-0.5 flex items-center gap-0.5">
                <Link2 className="h-2 w-2 text-[#A78BFA]" strokeWidth={2} />
                <span className="text-[3.5px] font-semibold text-white/70">
                  Blockchain Monitoring
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="relative flex h-1 w-1">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-50" />
                  <span className="relative inline-flex h-1 w-1 rounded-full bg-[#22C55E]" />
                </span>
                <span className="text-[3px] text-[#22C55E]">847 nodes · verified</span>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-white/[0.06] bg-white/[0.03] p-1.5">
            <div className="mb-0.5 flex items-center gap-0.5">
              <Activity className="h-2 w-2 text-[#F59E0B]" strokeWidth={2} />
              <span className="text-[3.5px] font-semibold text-white/70">Live Activity</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
              {ACTIVITY.map((a) => (
                <div key={a.text} className="flex items-center gap-0.5">
                  <span className="h-0.5 w-0.5 shrink-0 rounded-full" style={{ background: a.color }} />
                  <span className="truncate text-[2.8px] text-white/40">{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
