import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Client Portal",
    template: "%s | MBD Portal",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
