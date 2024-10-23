"use client";

import { useState } from "react";
import ChainSelector from "../popups/ChainSelector";
import TokenSelector from "../popups/TokenSelector";
import Modal from "./Modal";
const SupplyModal = () => {
  const [amount, setAmount] = useState("");
  const [chain, SetChain] = useState("");
  const [token, setToken] = useState("");

  return (
    <Modal className="w-[500px] p-5 ">
      <div>
        <div className="flex">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <ChainSelector setChain={SetChain} />
          <TokenSelector setToken={setToken} />
        </div>
      </div>
    </Modal>
  );
};

export default SupplyModal;
