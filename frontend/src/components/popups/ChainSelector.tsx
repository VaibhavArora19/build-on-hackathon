import { useState } from "react";
import ChainModal from "./ChainModal";
import { transactionPayloadActions } from "@/redux/actions";
import { useDispatch } from "react-redux";
import { useTransactionPayloadStore } from "@/redux/hooks";
import { CHAIN_CONFIG } from "@/constants/chainInfo";

const ChainSelector = (props: { type: "SUPPLY" | "WITHDRAW" }) => {
  const dispatch = useDispatch();
  const { fromChain, toChain } = useTransactionPayloadStore();
  const [showChainModal, setShowChainModal] = useState(false);

  const handleSelectChain = (chain: { chainId: number; chainName: string; logo: string; shortName: string }) => {
    if (chain.chainId.toString() !== fromChain && props.type === "SUPPLY") {
      dispatch(transactionPayloadActions.setFromToken(""));
      dispatch(transactionPayloadActions.setFromChain(chain.chainId.toString()));
    } else if (chain.chainId.toString() !== toChain && props.type === "WITHDRAW") {
      dispatch(transactionPayloadActions.setToToken(""));
      dispatch(transactionPayloadActions.setToChain(chain.chainId.toString()));
    }
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
        <button className="mx-auto cursor-pointer btn btn-primary">
          {props.type === "SUPPLY" && fromChain
            ? CHAIN_CONFIG[fromChain].chainName
            : props.type === "WITHDRAW" && toChain
            ? CHAIN_CONFIG[toChain].chainName
            : "Chain"}
        </button>
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
