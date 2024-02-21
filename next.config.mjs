/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xaqchrxqbgmthdvmmyxc.supabase.co",
      },
    ],
  },
};

export default nextConfig;
