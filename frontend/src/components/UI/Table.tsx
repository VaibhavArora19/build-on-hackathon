"use client";

import { CHAIN_CONFIG } from "@/constants/chainInfo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { protocolNameToImage } from "@/constants/protcolInfo";
import { TProtocolName } from "@/types/protocol";
import { AssetList } from "@/app/lend/page";
import { assetNameToImage } from "@/constants/assetInfo";

type TProps = {
  assets: AssetList;
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
          {props?.assets?.map((asset, index) => (
            <tr className="hover" key={index}>
              <td className="w-[500px] flex pt-4">
                <Image src={assetNameToImage(asset.underlyingAssetSymbol)} alt="asset image" width={28} height={28} />
                <span className="text-center align-middle pt-1 ml-2">{asset.underlyingAssetSymbol}</span>
              </td>
              <td className="w-[500px]">
                {asset.totalApys.length > 1 ? asset.totalApys[0] + "% - " + asset.totalApys[asset.totalApys.length - 1] + "%" : asset.totalApys + "%"}
              </td>
              <td className="w-[500px]">
                {!Array.isArray(asset.chainIds) ? (
                  <Image src={CHAIN_CONFIG[asset.chainIds]?.chainImageUrl} alt="asset image" width={28} height={28} />
                ) : (
                  <div className="flex ">
                    {asset.chainIds.map((chain, index) => {
                      return <Image key={index} src={CHAIN_CONFIG[chain]?.chainImageUrl} alt="asset image" width={28} height={28} />;
                    })}
                  </div>
                )}
              </td>
              <td className="w-[300px]">
                {" "}
                {!Array.isArray(asset.protocolNames) ? (
                  <Image src={protocolNameToImage(asset.protocolNames as TProtocolName)} alt="asset image" width={28} height={28} />
                ) : (
                  <div className="flex ">
                    {asset.protocolNames.map((protocol, index) => {
                      return <Image key={index} src={protocolNameToImage(protocol as TProtocolName)} alt="asset image" width={28} height={28} />;
                    })}
                  </div>
                )}
              </td>
              <td>
                <button
                  className="btn btn-neutral w-full text-md"
                  onClick={() => {
                    if (!props.setShowModal) {
                      router.push(`/lend/${asset.underlyingAssetSymbol}`);
                    }
                  }}
                >
                  {Array.isArray(asset.chainIds) ? "View" : "Deposit"}
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
