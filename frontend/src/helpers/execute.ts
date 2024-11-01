import { squidConfig } from "@/config/squid";
import { RouteResponse, TransactionResponse } from "@0xsquid/sdk/dist/types";
import { ethers } from "ethers";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const executeTransaction = async (
  chainId: string,
  signer: ethers.providers.JsonRpcSigner,
  transaction: { chain: number; tx: RouteResponse["route"] }
) => {
  if (chainId !== transaction.chain) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + Number(transaction.chain).toString(16) }],
    });

    await sleep(500);
  }
  const squid = await squidConfig();
  const tx = (await squid.executeRoute({ signer, route: transaction.tx })) as TransactionResponse;

  await tx.wait();
};

export const executeWithdrawTransaction = async (
  chainId: number,
  signer: ethers.providers.JsonRpcSigner,
  transaction: { chain: number; type: string; tx: RouteResponse["route"] | string; to: string }
) => {
  if (chainId !== transaction.chain) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + Number(transaction.chain).toString(16) }],
    });

    await sleep(500);
  }

  if (transaction.type === "SQUID") {
    const squid = await squidConfig();
    const tx = (await squid.executeRoute({ signer, route: transaction.tx as RouteResponse["route"] })) as TransactionResponse;

    await tx.wait();
  } else {
    const tx = {
      to: transaction.to,
      data: transaction.tx as string,
      gasLimit: "500000",
    };

    const txResponse = await signer.sendTransaction(tx);

    await txResponse.wait();
  }
};
