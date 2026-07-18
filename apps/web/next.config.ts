import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
    ],
  },
  async redirects() {
    return [{ source: "/index.html", destination: "/", permanent: true }];
  },
  async rewrites() {
    return [
      {
        source: "/demos/:slug([a-z0-9-]+)",
        destination: "/demos/:slug/index.html",
      },
    ];
  },
};

export default nextConfig;
