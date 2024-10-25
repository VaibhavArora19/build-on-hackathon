import { IoClose } from "react-icons/io5";
import Modal from "../UI/Modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTransactionPayloadStore } from "@/redux/hooks";
import { squidConfig } from "@/config/squid";
import { Token } from "@0xsquid/squid-types";
import { Skeleton } from "@mui/material";

type TokenItemProps = {
  token: {
    tokenName: string;
    logo: string | undefined;
    balance: number;
    address: string;
    balanceUSD: number;
    decimals: number;
  };
  onClose: () => void;
  onSelect: (token: { tokenName: string; logo: string | undefined; balance: number; address: string; decimals: number }) => void;
};

const TokenItem: React.FC<TokenItemProps> = ({ token, onClose, onSelect }) => {
  const handleClick = () => {
    onSelect(token);
    onClose();
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between py-5 px-3 w-full bg-[#252525] cursor-pointer hover:bg-[#313131] text-white rounded-md"
    >
      <div className="flex items-center gap-2">
        <Image src={token.logo ? token.logo : ""} alt={token.tokenName} height={30} width={30} />
        <p className="font-semibold text-sm uppercase">{token.tokenName}</p>
      </div>

      {token.balance ? (
        <div className="flex flex-col ">
          <p className="font-medium text-sm text-right">{token.balance}</p>
          <p className="text-xs text-[#707070] text-right mt-1">${token.balanceUSD}</p>
        </div>
      ) : null}
    </div>
  );
};

const TokenModal = ({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (token: { tokenName: string; logo: string | undefined; balance: number; address: string; decimals: number }) => void;
}) => {
  const { fromChain } = useTransactionPayloadStore();
  const [tokenList, setTokenList] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getTokens() {
      console.log("chain", fromChain);
      if (!fromChain) return;
      console.log("tokens to hai");
      const squid = await squidConfig();

      const tokens = squid.tokens.filter((token) => token.chainId === fromChain);
      console.log("tokens are", tokens);

      setTokenList(tokens);
      setIsLoading(false);
    }

    getTokens();
  }, [fromChain]);

  return (
    <Modal isBackdrop={false} className="w-[500px] bg-[#111111] h-[530px] rounded-2xl overflow-x-hidden">
      <div className="flex items-center justify-between p-6 bg-[#1e1e1e] w-full">
        <p className=" text-white text-base font-semibold">Select Token</p>
        <IoClose size={18} className="cursor-pointer" onClick={onClose} />
      </div>

      <div className="flex flex-col space-y-2 p-2 overflow-hidden">
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <Skeleton key={num} width={480} height={70} variant="rectangular" sx={{ bgcolor: "grey.900", borderRadius: "8px" }} />
          ))}

        {/* {tokens?.length && (
          <div className="bg-[#252525] w-full flex items-center gap-2 p-4 rounded-md ">
            <IoSearchOutline size={20} />
            <input className="w-full  p-1 text-sm bg-inherit text-white outline-none border-none" placeholder="Search token here.." />
          </div>
        )} */}

        <div className="overflow-hidden">
          {tokenList.length > 0 &&
            tokenList.map((token: any) => (
              <TokenItem
                onSelect={onSelect}
                onClose={onClose}
                token={{
                  tokenName: token.symbol,
                  logo: token.logoURI,
                  balance: token?.balance || 0,
                  address: token.address,
                  decimals: token.decimals,
                  balanceUSD: token?.balanceUSD || 0,
                }}
                key={token.address}
              />
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default TokenModal;
