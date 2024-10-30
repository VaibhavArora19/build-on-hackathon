import { TPositionedAsset } from "@/app/positions/page";
import { CHAIN_CONFIG } from "@/constants/chainInfo";
import { protocolNameToImage } from "@/constants/protcolInfo";
import { TProtocolName } from "@/types/protocol";
import { transactionPayloadActions } from "@/redux/actions";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { SetStateAction } from "react";
import { assetNameToImage } from "@/constants/assetInfo";

const PositionsTable = (props: { assets: TPositionedAsset[]; setShowWithdrawModal: React.Dispatch<SetStateAction<boolean>> }) => {
  const dispatch = useDispatch();

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
              <td className="w-[500px] flex pt-4">
                <Image src={assetNameToImage(asset.underlyingAssetSymbol)} alt="asset image" width={30} height={30} />
                <span className="text-center align-middle pt-2 ml-2">{asset.underlyingAssetSymbol}</span>
              </td>
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
                <button
                  className="btn btn-neutral w-full text-md"
                  onClick={() => {
                    dispatch(transactionPayloadActions.setFromToken(asset.address));
                    dispatch(transactionPayloadActions.setFromChain(asset.chainId));
                    props.setShowWithdrawModal(true);
                  }}
                >
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
