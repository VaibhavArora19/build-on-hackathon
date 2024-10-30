"use client";

import PositionsTable from "@/components/UI/PositionsTable";
import WithdrawModal from "@/components/UI/WithdrawModal";
import { transactionPayloadActions } from "@/redux/actions";
import { useFetchPositions } from "@/server/api/positions";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";
import BasicInfo from "@/components/Info/BasicInfo";

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
  assetDecimals: number;
};

const PositionsPage = () => {
  const { address } = useAccount();
  const { data } = useFetchPositions(address);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const dispatch = useDispatch();

  console.log("positions are: ", data?.data);

  return (
    <div>
      <BasicInfo />
      {data?.data && data?.data.length > 0 ? (
        <PositionsTable assets={data?.data} setShowWithdrawModal={setShowWithdrawModal} />
      ) : (
        <h1 className="text-center mx-auto mt-20 text-xl">No positions found...</h1>
      )}
      {showWithdrawModal && (
        <WithdrawModal
          onClose={() => {
            dispatch(transactionPayloadActions.resetState());
            setShowWithdrawModal(false);
          }}
        />
      )}
    </div>
  );
};

export default PositionsPage;
