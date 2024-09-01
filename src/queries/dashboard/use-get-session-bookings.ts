import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getSessionBookings = async () => {
  const token = localStorage.getItem("accessToken");
  const url = new URL(`${import.meta.env.VITE_BASE_URL}/appointment/session-bookings`);

  const response = await api.get(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = response.data;
  return data;
};

const useGetSessionBookings = () => {
  return useQuery({
    queryKey: ["session-bookings"],
    queryFn: () => getSessionBookings(),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetSessionBookings;