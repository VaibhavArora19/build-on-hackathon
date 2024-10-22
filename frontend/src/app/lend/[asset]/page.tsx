"use client";

import SupplyModal from "@/components/UI/SupplyModal";
import Table from "@/components/UI/Table";
import { useState } from "react";

const DUMMY_TOKEN_LIST = [
  {
    symbol: "ETH",
    apy: 0.5,
    chains: "Ethereum",
    protocols: "Compound",
  },
  {
    symbol: "ETH",
    apy: 0.5,
    chains: "Ethereum",
    protocols: "MakerDAO",
  },
  {
    symbol: "USDC",
    apy: 0.5,
    chains: "Ethereum",
    protocols: "Aave",
  },
];

const AssetPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <Table assets={DUMMY_TOKEN_LIST} setShowModal={setShowModal} />
      {showModal && <SupplyModal />}
    </div>
  );
};

export default AssetPage;
