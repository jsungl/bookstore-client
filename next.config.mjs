/** @type {import('next').NextConfig} */

const apiUrl = process.env.API_URL;

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: apiUrl + "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
