import Table from "@/components/UI/Table";

const DUMMY_ASSETS = [
  {
    symbol: "ETH",
    apy: 0.5,
    chains: ["8453", "10"],
    protocols: ["Aave", "Compound"],
  },
  {
    symbol: "BTC",
    apy: 0.5,
    chains: ["42161"],
    protocols: ["Aave", "Compound"],
  },
  {
    symbol: "USDC",
    apy: 0.5,
    chains: ["59144", "10"],
    protocols: ["Aave", "Compound"],
  },
];

export default function Home() {
  return <Table assets={DUMMY_ASSETS} />;
}
