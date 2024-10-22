import { useState } from "react";
import ChainModal from "./ChainModal";

const ChainSelector = () => {
  const [showChainModal, setShowChainModal] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setShowChainModal(true);
        }}
        className="text-xs bg-[#151515] p-2 w-[100px] rounded-md flex items-center gap-2"
      >
        {/* {(type === Action.WITHDRAW || type == Action.BORROW ? toChain !== "" : fromChain !== "") ? (
          <>
            <Image
              src={type === Action.WITHDRAW || type == Action.BORROW ? CHAIN_CONFIG[toChain].chainImageUrl : CHAIN_CONFIG[fromChain].chainImageUrl}
              alt={type === Action.WITHDRAW || type == Action.BORROW ? CHAIN_CONFIG[toChain].chainName : CHAIN_CONFIG[fromChain].chainName}
              height={15}
              width={15}
            />
            <span className="text-xs">
              {type === Action.WITHDRAW || type == Action.BORROW ? CHAIN_CONFIG[toChain].chainName : CHAIN_CONFIG[fromChain].chainName}
            </span>
          </>
        ) : ( */}
        <p className="mx-auto">Chain</p>
        {/* )} */}
      </div>

      {showChainModal ? (
        <ChainModal
        //   onClose={() => {
        //     setShowChainModal(false);
        //   }}
        //   onSelect={handleSelectChain}
        />
      ) : null}
    </>
  );
};

export default ChainSelector;
