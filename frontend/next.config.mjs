const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "raw.githubusercontent.com",
      "s2.coinmarketcap.com",
      "assets.coingecko.com",
      "tokens.pancakeswap.finance",
      "axelarscan.io",
      "assets-cdn.trustwallet.com",
      "app.mento.org",
      "assets.spooky.fi",
      "ethereum-optimism.github.io",
      "assets.smold.app",
      "polygonscan.com",
      "i.ibb.co",
      "oceanprotocol.com",
    ],
  },
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
