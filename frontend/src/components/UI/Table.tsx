"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type TProps = {
  assets: {
    symbol: string;
    apy: number;
    chains: string[] | string;
    protocols: string[] | string;
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
              <td className="w-[500px]">{asset.chains}</td>
              <td className="w-[300px]">{asset.protocols}</td>
              <td>
                <button
                  className="btn btn-primary w-full text-md"
                  onClick={() => {
                    if (!props.setShowModal) {
                      router.push(`/lend/${asset.symbol}`);
                    } else {
                      props.setShowModal(true);
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
