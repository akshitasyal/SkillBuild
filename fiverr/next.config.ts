/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8747",
      },
      {
        protocol: "https",
        hostname: "fiverr-res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      }
    ],
  },
};

export default nextConfig;
