import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";



const getStats = async (dateRange: string) => {
  const token = localStorage.getItem("accessToken");
  const url = new URL(`${import.meta.env.VITE_BASE_URL}/appointment/stats?range=${dateRange}`);

  const response = await api.get(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = response.data;

  return data;
};

const useGetStats = (dateRange: string) => {
  return useQuery({
    queryKey: ["stats", dateRange],
    queryFn: () => getStats(dateRange),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetStats;