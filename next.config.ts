import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "hsvfykptjnbctcqpslwe.supabase.co",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
