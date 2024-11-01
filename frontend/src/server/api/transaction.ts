"use client";

import { TTransactionPayload } from "@/components/UI/SupplyModal";
import { TRANSACTIONS } from "@/constants/query";
import { useQuery } from "@tanstack/react-query";

export const useTransactionBuilder = (transactionPayload: TTransactionPayload | null) => {
  const prepareTransaction = async () => {
    try {
      console.log("Preparing Transaction");
      const response = await fetch("/backend/transaction/prepare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionPayload),
      });

      const data = await response.json();
      console.log("data is", data.data);

      if (Array.isArray(data.data)) {
        return data.data;
      }

      return { tx: data.data.tx, chain: data.data.chain };
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return useQuery({
    queryKey: [TRANSACTIONS.FETCH, transactionPayload],
    queryFn: prepareTransaction,
    enabled: !!transactionPayload,
    refetchOnWindowFocus: false,
    refetchInterval: 1800000, //1 minute
  });
};
