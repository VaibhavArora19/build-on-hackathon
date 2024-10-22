import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { base, arbitrum, optimism, linea, bsc, polygon, fantom, avalanche, scroll, blast, metis, mantle } from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Spreadefi",
  description: "Omnichain lending and borrowing platform",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [base, arbitrum, optimism, linea, bsc, polygon, fantom, avalanche, scroll, blast, metis, mantle] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
