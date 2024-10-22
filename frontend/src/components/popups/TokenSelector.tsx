import { useState } from "react";
import TokenModal from "./TokenModal";

const TokenSelector = () => {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<{
    tokenName: string;
    logo: string | undefined;
    balance: number;
    address: string;
  } | null>(null);

  const handleTokenSelect = (token: { tokenName: string; logo: string | undefined; balance: number; address: string; decimals: number }) => {
    setToken(token);
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
        <p className="mx-auto">Token</p>
        {/* )} */}
      </div>

      {showTokenModal ? (
        <TokenModal
          //   onSelect={handleTokenSelect}
          //   onClose={() => {
          //     setShowTokenModal(false);
          //   }}
          type={"a"}
        />
      ) : null}
    </>
  );
};

export default TokenSelector;