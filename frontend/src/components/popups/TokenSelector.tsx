import { useState } from "react";
import TokenModal from "./TokenModal";
import { transactionPayloadActions } from "@/redux/actions";
import { useDispatch } from "react-redux";

const TokenSelector = (props: { type: "SUPPLY" | "WITHDRAW" }) => {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<{
    tokenName: string;
    logo: string | undefined;
    balance: number;
    address: string;
    decimals: number;
  } | null>(null);
  const dispatch = useDispatch();

  const handleTokenSelect = (token: { tokenName: string; logo: string | undefined; balance: number; address: string; decimals: number }) => {
    setSelectedToken(token);
    if (props.type === "SUPPLY") {
      dispatch(transactionPayloadActions.setFromToken(token.address));
      dispatch(transactionPayloadActions.setFromDecimals(token.decimals));
    } else {
      dispatch(transactionPayloadActions.setToToken(token.address));
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setShowTokenModal(true);
        }}
        className=" text-xs bg-[#151515] p-2 w-[100px] rounded-md flex items-center gap-2 "
      >
        {/* {selectedToken ? (
          <>
            <Image src={selectedToken.logo ? selectedToken.logo : ""} alt={selectedToken.tokenName} height={15} width={15} />
            <span className="text-xs uppercase">{selectedToken.tokenName}</span>
          </>
        ) : ( */}
        <button className="mx-auto cursor-pointer btn btn-neutral">{selectedToken ? selectedToken.tokenName : "Token"}</button>
        {/* )} */}
      </div>

      {showTokenModal ? (
        <TokenModal
          onSelect={handleTokenSelect}
          onClose={() => {
            setShowTokenModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default TokenSelector;
