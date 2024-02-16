/** @type {import('next').NextConfig} */
const nextConfig = {
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
