"use client";

import PositionsTable from "@/components/UI/PositionsTable";
import { useFetchPositions } from "@/server/api/positions";
import { useAccount } from "wagmi";

export type TPositionedAsset = {
  address: string;
  balance: string;
  balanceUSD: string;
  chainId: string;
  name: string;
  symbol: string;
  protocolName: string;
  underlyingAssetAddress: string;
  underlyingAssetSymbol: string;
};

const PositionsPage = () => {
  const { address } = useAccount();
  const { data } = useFetchPositions(address);
  return <div>{data?.data ? <PositionsTable assets={data?.data} /> : <></>}</div>;
};

export default PositionsPage;
