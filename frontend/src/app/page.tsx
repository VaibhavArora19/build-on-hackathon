import Table from "@/components/UI/Table";

const DUMMY_ASSETS = [
  {
    symbol: "ETH",
    apy: 0.5,
    chains: ["Ethereum", "Arbitrum"],
    protocols: ["Aave", "Compound", "MakerDAO"],
  },
  {
    symbol: "BTC",
    apy: 0.5,
    chains: ["Bitcoin"],
    protocols: ["Aave", "Compound", "MakerDAO"],
  },
  {
    symbol: "USDC",
    apy: 0.5,
    chains: ["Ethereum", "Arbitrum"],
    protocols: ["Aave", "Compound", "MakerDAO"],
  },
];

export default function Home() {
  return <Table assets={DUMMY_ASSETS} />;
}
