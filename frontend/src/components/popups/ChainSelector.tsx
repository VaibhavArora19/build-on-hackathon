import { useState } from "react";
import ChainModal from "./ChainModal";
import { transactionPayloadActions } from "@/redux/actions";
import { useDispatch } from "react-redux";
import { useTransactionPayloadStore } from "@/redux/hooks";
import { CHAIN_CONFIG } from "@/constants/chainInfo";

const ChainSelector = () => {
  const dispatch = useDispatch();
  const { fromChain } = useTransactionPayloadStore();
  const [showChainModal, setShowChainModal] = useState(false);

  const handleSelectChain = (chain: { chainId: number; chainName: string; logo: string; shortName: string }) => {
    console.log("entered here", chain.chainId.toString());
    if (chain.chainId.toString() !== fromChain) dispatch(transactionPayloadActions.setFromToken(""));
    dispatch(transactionPayloadActions.setFromChain(chain.chainId.toString()));
    // props.setChain(chain.chainId.toString());
  };

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
        <p className="mx-auto cursor-pointer">{fromChain ? CHAIN_CONFIG[fromChain].chainName : "Chain"}</p>
        {/* )} */}
      </div>

      {showChainModal ? (
        <ChainModal
          onClose={() => {
            setShowChainModal(false);
          }}
          onSelect={handleSelectChain}
        />
      ) : null}
    </>
  );
};

export default ChainSelector;
