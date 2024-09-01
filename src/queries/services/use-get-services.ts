import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getServices = async () => {
  const token = localStorage.getItem("accessToken");
  const url = new URL(`${import.meta.env.VITE_BASE_URL}/experts/get-all-services`);

  const response = await axios.get(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};

const useGetAllServices = () => {
  return useQuery({
    queryKey: ["all-services"],
    queryFn: () => getServices(),
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetAllServices;
