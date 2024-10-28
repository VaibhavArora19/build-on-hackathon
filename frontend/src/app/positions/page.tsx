"use client";

import PositionsTable from "@/components/UI/PositionsTable";
import WithdrawModal from "@/components/UI/WithdrawModal";
import { transactionPayloadActions } from "@/redux/actions";
import { useFetchPositions } from "@/server/api/positions";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";

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

  return (
    <div>
      {data?.data ? <PositionsTable assets={data?.data} setShowWithdrawModal={setShowWithdrawModal} /> : <></>}
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
