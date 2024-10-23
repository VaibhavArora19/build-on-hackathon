import { TRANSACTIONS } from "@/constants/query";
import { useQuery } from "@tanstack/react-query";

export const useTransactionBuilder = (transactionPayload: any) => {
  const prepareTransaction = async () => {
    try {
      const response = await fetch("/backend/transaction/prepare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionPayload),
      });

      const data = await response.json();

      return data;
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
