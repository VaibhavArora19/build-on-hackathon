"use client";

import { useCallback, useEffect, useState } from "react";
import ChainSelector from "../popups/ChainSelector";
import TokenSelector from "../popups/TokenSelector";
import Modal from "./Modal";
import { useTransactionPayloadStore } from "@/redux/hooks";
import { useTransactionBuilder } from "@/server/api/transaction";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { executeTransaction } from "@/helpers/execute";
import { Skeleton } from "@mui/material";

export type TTransactionPayload = {
  fromChain: string;
  fromToken: string;
  toToken: string;
  toChain: string;
  fromAmount: string;
  protocolName: string;
  userAddress: string;
  type: "SUPPLY" | "WITHDRAW";
};

const SupplyModal = (props: { onClose: () => void }) => {
  const { fromToken, fromChain, toToken, toChain, protocolName, fromDecimals } = useTransactionPayloadStore();
  const [amount, setAmount] = useState("");
  const { address, chainId } = useAccount();
  const [transactionPayload, setTransactionPayload] = useState<TTransactionPayload | null>(null);
  const { data } = useTransactionBuilder(transactionPayload);
  const [isLoading, setIsLoading] = useState(false);

  const prepareTransactionPayload = useCallback(() => {
    console.log("called", { fromToken, fromChain, toToken, toChain, protocolName, fromDecimals, address });
    if (!amount || !fromToken || !fromChain || !toToken || !toChain || !protocolName || !address) return;

    setTransactionPayload({
      fromChain,
      fromToken,
      toToken,
      toChain,
      fromAmount: parseUnits(amount, fromDecimals).toString(),
      protocolName,
      userAddress: address,
      type: "SUPPLY",
    });
    setIsLoading(true);
  }, [amount, fromToken, fromChain, toToken, toChain, protocolName, fromDecimals, address]);

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  useEffect(() => {
    const debouncedFunction = setTimeout(() => {
      prepareTransactionPayload();
    }, 1500);

    return () => clearTimeout(debouncedFunction);
  }, [amount, fromToken, fromChain, toToken, toChain, protocolName, address]);

  const handleSubmit = async () => {
    if (!transactionPayload) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    const signer = provider.getSigner();

    await executeTransaction(chainId as number, signer, data);
  };

  return (
    <Modal className="w-[500px] p-5" onClose={props.onClose}>
      <h1 className="mb-4 font-semibold text-[19px]">Supply Asset</h1>
      <div>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter amount"
            className="input input-bordered w-full max-w-xs mt-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <ChainSelector type="SUPPLY" />
          <TokenSelector type="SUPPLY" />
        </div>
        <h3 className="text-gray-500 text-sm pt-2">Estimated details</h3>
        <div className="mt-2 bg-[#0a0a0a] h-[88px]">
          <div className="flex justify-between">
            <h1 className="pl-4 pt-4">Min received on dest chain</h1>
            <p className="pt-4 pr-2">
              {data?.tx?.estimate?.toAmountMinUSD ? (
                <span>{data?.tx?.estimate?.toAmountMinUSD + "$  "}</span>
              ) : (
                <Skeleton width={90} height={20} variant="rectangular" sx={{ bgcolor: "grey.900", borderRadius: "8px" }} />
              )}
            </p>
          </div>
          <div className="flex justify-between">
            <h1 className="pl-4 pt-2">Estimated fee</h1>
            <p className="pt-2 pr-2">
              {data?.tx?.estimate?.feeCosts[0]?.amountUsd ? (
                <span>{data?.tx?.estimate?.feeCosts[0]?.amountUsd + "$"}</span>
              ) : (
                <Skeleton width={90} height={20} variant="rectangular" sx={{ bgcolor: "grey.900", borderRadius: "8px" }} />
              )}
            </p>
          </div>
        </div>
        <button className={`btn btn-neutral  w-full mt-8 ${isLoading && "btn-disabled"}`} onClick={handleSubmit}>
          <span className={isLoading ? "loading loading-spinner" : ""}>{isLoading ? "Fetching..." : "Supply"}</span>
        </button>
      </div>
    </Modal>
  );
};

export default SupplyModal;
