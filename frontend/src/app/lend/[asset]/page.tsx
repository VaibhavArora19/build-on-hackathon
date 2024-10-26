"use client";

import SupplyModal from "@/components/UI/SupplyModal";
import { useState } from "react";
import { transactionPayloadActions } from "@/redux/actions";
import { useDispatch } from "react-redux";
import { useFetchAssetBySymbol } from "@/server/api/asset";
import { useParams } from "next/navigation";
import AssetTable from "@/components/UI/AssetTable";

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
