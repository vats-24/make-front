import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const getMonthlyServiceBookings = async () => {
  const token = localStorage.getItem("accessToken");
  const url = new URL(`${import.meta.env.VITE_BASE_URL}/appointment/monthly-service-bookings`);

  const response = await api.get(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });


  const data = response.data;
  return data;
};

const useGetMonthlyServiceBookings = () => {
  return useQuery({
    queryKey: ["monthly-service-bookings"],
    queryFn: () => getMonthlyServiceBookings(),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetMonthlyServiceBookings;