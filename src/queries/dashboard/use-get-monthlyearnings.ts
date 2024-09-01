import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const getMonthlyEarnings = async () => {
  const token = localStorage.getItem("accessToken");
  const url = new URL(`${import.meta.env.VITE_BASE_URL}/appointment/monthly-earnings`);

  const response = await api.get(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = response.data;
  return data;
};

const useGetMonthlyEarnings = () => {
  return useQuery({
    queryKey: ["monthly-earnings"],
    queryFn: () => getMonthlyEarnings(),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetMonthlyEarnings;