import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getServiceDetails = async () => {
  const token = localStorage.getItem("accessToken");
  const url = new URL(`${import.meta.env.VITE_BASE_URL}/appointment/get-service-details`);

  const response = await axios.get(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = response.data;

  return data;
};

const useGetServiceDetails = () => {
  return useQuery({
    queryKey: ["get-service-details"],
    queryFn: () => getServiceDetails(),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetServiceDetails;