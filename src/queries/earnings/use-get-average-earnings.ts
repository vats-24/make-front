import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAverageEarnings = async (dateRange: string) => {
  const token = localStorage.getItem("accessToken");
  const url = new URL(`${import.meta.env.VITE_BASE_URL}/appointment/get-average-earnings?range=${dateRange}`);

  const response = await axios.get(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = response.data;

  return data;
};

const useGetAverageEarnings = (dateRange: string) => {
  return useQuery({
    queryKey: ["get-average-earnings",dateRange],
    queryFn: () => getAverageEarnings(dateRange),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetAverageEarnings;