import { POSITIONS } from "@/constants/query";
import { useQuery } from "@tanstack/react-query";

export const useFetchPositions = (address: string | undefined) => {
  const fetchPositions = async () => {
    const data = await fetch(`/backend/positions/${address}`);

    const response = await data.json();

    return response;
  };

  return useQuery({
    queryKey: [POSITIONS.FETCH],
    enabled: !!address,
    queryFn: fetchPositions,
    refetchOnWindowFocus: true,
    refetchInterval: 1800000, //1 minute
  });
};
