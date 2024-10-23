const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: "/backend/:path*",
          destination: `${BACKEND_URL}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
