"use client";

import { useState } from "react";
import ChainSelector from "../popups/ChainSelector";
import TokenSelector from "../popups/TokenSelector";
import Modal from "./Modal";
const SupplyModal = (props: { onClose: () => void }) => {
  const [amount, setAmount] = useState("");
  const [chain, SetChain] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = () => {
    if (!amount || !chain || !token) return;

    //amount = fromamount
    //chain = fromchain
    //token == fromtoken
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
          <ChainSelector setChain={SetChain} />
          <TokenSelector setToken={setToken} />
        </div>
        <button className="btn btn-primary w-full mt-10" onClick={handleSubmit}>
          Supply
        </button>
      </div>
    </Modal>
  );
};

export default SupplyModal;
