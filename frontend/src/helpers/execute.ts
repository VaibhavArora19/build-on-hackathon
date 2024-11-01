import { squidConfig } from "@/config/squid";
import { RouteResponse, TransactionResponse } from "@0xsquid/sdk/dist/types";
import { ethers } from "ethers";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const executeTransaction = async (
  chainId: number,
  signer: ethers.providers.JsonRpcSigner,
  transaction: { chain: number; tx: RouteResponse["route"] }
) => {
  if (chainId !== transaction.chain) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + Number(transaction.chain).toString(16) }],
    });

    await sleep(500);
  }
  const squid = await squidConfig();
  const tx = (await squid.executeRoute({ signer, route: transaction.tx })) as TransactionResponse;

  await tx.wait();
};
