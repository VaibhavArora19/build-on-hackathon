"use client";

import SupplyModal from "@/components/UI/SupplyModal";
import Table from "@/components/UI/Table";
import { useState } from "react";

const DUMMY_TOKEN_LIST = [
  {
    symbol: "ETH",
    apy: 0.5,
    chains: "42161",
    protocols: "Compound",
  },
  {
    symbol: "ETH",
    apy: 0.5,
    chains: "8453",
    protocols: "Aave",
  },
  {
    symbol: "USDC",
    apy: 0.5,
    chains: "10",
    protocols: "Aave",
  },
];

const AssetPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <Table assets={DUMMY_TOKEN_LIST} setShowModal={setShowModal} />
      {showModal && <SupplyModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AssetPage;
