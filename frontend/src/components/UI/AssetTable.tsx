"use client";

import { CHAIN_CONFIG } from "@/constants/chainInfo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { protocolNameToImage } from "@/constants/protcolInfo";
import { TProtocolName } from "@/types/protocol";
import { transactionPayloadActions } from "@/redux/actions";
import { Asset } from "@/app/lend/[asset]/page";

type TProps = {
  assets: Asset[];
  setShowModal?: Dispatch<SetStateAction<boolean>>;
};

const AssetTable = (props: TProps) => {
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
              <td className="w-[500px]">{asset.underlyingAssetSymbol}</td>
              <td className="w-[500px]">{asset.assetSupplyApy}</td>
              <td className="w-[500px]">
                <Image src={CHAIN_CONFIG[asset.chainId]?.chainImageUrl} alt="asset image" width={30} height={30} />
              </td>
              <td className="w-[300px]">
                {" "}
                {<Image src={protocolNameToImage(asset.protocolName as TProtocolName)} alt="asset image" width={30} height={30} />}
              </td>
              <td>
                <button
                  className="btn btn-primary w-full text-md"
                  onClick={() => {
                    if (!props.setShowModal) {
                      router.push(`/lend/${asset.underlyingAssetSymbol}`);
                    } else {
                      props.setShowModal(true);
                      transactionPayloadActions.setToChain(asset.chainId);
                      transactionPayloadActions.setToToken(asset.assetAddress);
                      transactionPayloadActions.setProtocolName(asset.protocolName);
                    }
                  }}
                >
                  {Array.isArray(asset.chainId) ? "View" : "Deposit"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
