"use client";

import Table from "@/components/UI/Table";
import { useFetchAsset } from "@/server/api/asset";

export type AssetList = {
  assetSupplyApys: number[];
  assetSupplyBoostedApys: number[];
  chainIds: string[];
  protocolNames: string[];
  underlyingAssetSymbol: string;
  totalApys: number[];
}[];

export default function Home() {
  const { data } = useFetchAsset();

  console.log("data is", data?.data.data);
  return <div>{data?.data ? <Table assets={data?.data.data as AssetList} /> : <></>}</div>;
}
