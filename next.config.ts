import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Abaikan error ESLint saat build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Abaikan error TypeScript saat build
  },
};

export default nextConfig;
