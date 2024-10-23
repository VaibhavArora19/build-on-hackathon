import { ASSETS } from "@/constants/query";
import { useQuery } from "@tanstack/react-query";

export const useFetchAsset = () => {
  const fetchAsset = async () => {
    try {
      const response = await fetch("/backend/asset");

      const data = await response.json();

      return {
        data,
      };
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return useQuery({
    queryKey: [ASSETS.FETCH],
    queryFn: fetchAsset,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useFetchAssetBySymbol = (symbol: string) => {
  const fetchAssetBySymbol = async () => {
    try {
      const response = await fetch(`/backend/asset/symbol?symbol=${symbol}`);

      const data = await response.json();

      return { data };
    } catch (error) {
      console.log("error is", error);
    }
  };

  return useQuery({
    queryKey: [ASSETS.FETCH_BY_SYMBOL],
    queryFn: fetchAssetBySymbol,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
