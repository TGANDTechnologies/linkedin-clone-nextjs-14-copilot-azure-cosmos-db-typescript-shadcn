/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "links.papareact.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "api.x.ai",
      },
      {
        protocol: "https",
        hostname: "ailinkedin.blob.core.windows.net",
      }
    ],
  },
};

export default nextConfig;
