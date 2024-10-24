"use client";

import { CHAIN_CONFIG } from "@/constants/chainInfo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { protocolNameToImage } from "@/constants/protcolInfo";
import { TProtocolName } from "@/types/protocol";
import { transactionPayloadActions } from "@/redux/actions";

type TProps = {
  assets: {
    symbol: string;
    apy: number;
    chains: string[] | string;
    protocols: string[] | string;
    address: string;
  }[];
  setShowModal?: Dispatch<SetStateAction<boolean>>;
};

const Table = (props: TProps) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto w-[80%] mx-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Apy</th>
            <th>Chains</th>
            <th>Protocols</th>
          </tr>
        </thead>
        <tbody>
          {props.assets?.map((asset, index) => (
            <tr className="hover" key={index}>
              <td className="w-[500px]">{asset.symbol}</td>
              <td className="w-[500px]">{asset.apy}</td>
              <td className="w-[500px]">
                {!Array.isArray(asset.chains) ? (
                  <Image src={CHAIN_CONFIG[asset.chains]?.chainImageUrl} alt="asset image" width={30} height={30} />
                ) : (
                  <div className="flex ">
                    {asset.chains.map((chain, index) => {
                      return <Image key={index} src={CHAIN_CONFIG[chain]?.chainImageUrl} alt="asset image" width={30} height={30} />;
                    })}
                  </div>
                )}
              </td>
              <td className="w-[300px]">
                {" "}
                {!Array.isArray(asset.protocols) ? (
                  <Image src={protocolNameToImage(asset.protocols as TProtocolName)} alt="asset image" width={30} height={30} />
                ) : (
                  <div className="flex ">
                    {asset.protocols.map((protocol, index) => {
                      return <Image key={index} src={protocolNameToImage(protocol as TProtocolName)} alt="asset image" width={30} height={30} />;
                    })}
                  </div>
                )}
              </td>
              <td>
                <button
                  className="btn btn-primary w-full text-md"
                  onClick={() => {
                    if (!props.setShowModal) {
                      router.push(`/lend/${asset.symbol}`);
                    } else {
                      props.setShowModal(true);
                      transactionPayloadActions.setToChain(asset.chains);
                      transactionPayloadActions.setToToken(asset.address);
                      transactionPayloadActions.setProtocolName(asset.protocols);
                    }
                  }}
                >
                  {Array.isArray(asset.chains) ? "View" : "Deposit"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
