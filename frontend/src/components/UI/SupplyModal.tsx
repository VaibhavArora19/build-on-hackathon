"use client";

import { useCallback, useEffect, useState } from "react";
import ChainSelector from "../popups/ChainSelector";
import TokenSelector from "../popups/TokenSelector";
import Modal from "./Modal";
import { useTransactionPayloadStore } from "@/redux/hooks";
import { useTransactionBuilder } from "@/server/api/transaction";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";

export type TTransactionPayload = {
  fromChain: string;
  fromToken: string;
  toToken: string;
  toChain: string;
  fromAmount: string;
  protocolName: string;
  userAddress: string;
};

const SupplyModal = (props: { onClose: () => void }) => {
  const { fromToken, fromChain, toToken, toChain, protocolName, fromDecimals } = useTransactionPayloadStore();
  const [amount, setAmount] = useState("");
  const { address } = useAccount();
  const [transactionPayload, setTransactionPayload] = useState<TTransactionPayload | null>(null);
  const { data } = useTransactionBuilder(transactionPayload);

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
    });
  }, [amount, fromToken, fromChain, toToken, toChain, protocolName, fromDecimals, address]);

  useEffect(() => {
    const debouncedFunction = setTimeout(() => {
      prepareTransactionPayload();
    }, 1500);

    return () => clearTimeout(debouncedFunction);
  }, [amount, fromToken, fromChain, toToken, toChain, protocolName, address]);

  const handleSubmit = () => {
    if (!transactionPayload) return;
  };

  return (
    <Modal className="w-[500px] p-5" onClose={props.onClose}>
      <div>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter amount"
            className="input input-bordered w-full max-w-xs"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <ChainSelector />
          <TokenSelector />
        </div>
        <button className="btn btn-primary w-full mt-10" onClick={handleSubmit}>
          Supply
        </button>
      </div>
    </Modal>
  );
};

export default SupplyModal;
