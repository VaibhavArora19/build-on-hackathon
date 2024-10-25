"use client";

import SupplyModal from "@/components/UI/SupplyModal";
import Table from "@/components/UI/Table";
import { useState } from "react";
import { transactionPayloadActions } from "@/redux/actions";
import { useDispatch } from "react-redux";
import { useFetchAssetBySymbol } from "@/server/api/asset";
import { useParams } from "next/navigation";
import AssetTable from "@/components/UI/AssetTable";

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

export type Asset = {
  underlyingAssetSymbol: string;
  assetSupplyApy: number;
  assetSupplyBoostedApy: number;
  chainId: string;
  protocolName: string;
  underlyingAssetAddress: string;
  underlyingAssetDecimals: number;
  assetSymbol: string;
  assetAddress: string;
  assetDecimals: number;
};

const AssetPage = () => {
  const paramName = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data } = useFetchAssetBySymbol(paramName.asset.toString());

  console.log("data isss ", data);

  return (
    <div>
      <AssetTable assets={data?.data.data} setShowModal={setShowModal} />
      {showModal && (
        <SupplyModal
          onClose={() => {
            dispatch(transactionPayloadActions.resetState());
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AssetPage;
