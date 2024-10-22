"use client";

import ChainSelector from "../popups/ChainSelector";
import Modal from "./Modal";
const SupplyModal = () => {
  return (
    <Modal className="w-[500px] p-5 ">
      <div>
        <div className="flex">
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          <ChainSelector />
        </div>
      </div>
    </Modal>
  );
};

export default SupplyModal;
