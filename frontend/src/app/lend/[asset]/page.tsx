"use client";

import SupplyModal from "@/components/UI/SupplyModal";
import Table from "@/components/UI/Table";
import { useState } from "react";
import { transactionPayloadActions } from "@/redux/actions";

const DUMMY_TOKEN_LIST = [
  {
    symbol: "ETH",
    apy: 0.5,
    chains: "42161",
    protocols: "Compound",
    address: "0x0000000000000000000000000000000000000000",
  },
  {
    symbol: "ETH",
    apy: 0.5,
    chains: "8453",
    protocols: "Aave",
    address: "0x0000000000000000000000000000000000000000",
  },
  {
    symbol: "USDC",
    apy: 0.5,
    chains: "10",
    protocols: "Aave",
    address: "0x0000000000000000000000000000000000000000",
  },
];

const AssetPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <Table assets={DUMMY_TOKEN_LIST} setShowModal={setShowModal} />
      {showModal && (
        <SupplyModal
          onClose={() => {
            transactionPayloadActions.resetState();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AssetPage;
