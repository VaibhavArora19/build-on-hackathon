"use client";

import BasicInfo from "@/components/Info/BasicInfo";
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

  return (
    <div>
      <BasicInfo />
      {data?.data ? <Table assets={data?.data.data as AssetList} /> : <></>}
    </div>
  );
}
