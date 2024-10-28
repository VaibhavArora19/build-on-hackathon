import { TPositionedAsset } from "@/app/positions/page";
import { CHAIN_CONFIG } from "@/constants/chainInfo";
import { protocolNameToImage } from "@/constants/protcolInfo";
import { TProtocolName } from "@/types/protocol";
import Image from "next/image";

const PositionsTable = (props: { assets: TPositionedAsset[] }) => {
  return (
    <div className="overflow-x-auto w-[80%] mx-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Balance</th>
            <th>Balance USD</th>
            <th>Chain</th>
            <th>Protocol</th>
          </tr>
        </thead>
        <tbody>
          {props?.assets?.map((asset, index) => (
            <tr className="hover" key={index}>
              <td className="w-[500px]">{asset.underlyingAssetSymbol}</td>
              <td className="w-[500px]">{asset.balance}</td>
              <td className="w-[500px]">{asset.balanceUSD}</td>
              <td className="w-[500px]">
                <Image src={CHAIN_CONFIG[asset.chainId]?.chainImageUrl} alt="asset image" width={30} height={30} />
              </td>
              <td className="w-[300px]">
                {" "}
                {<Image src={protocolNameToImage(asset.protocolName as TProtocolName)} alt="asset image" width={30} height={30} />}
              </td>
              <td>
                <button className="btn btn-primary w-full text-md" onClick={() => console.log("hello")}>
                  Withdraw
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionsTable;
