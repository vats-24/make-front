import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { toast } from "react-hot-toast";

interface UpdateServiceParams {
  serviceId: string;
  price: string;
  duration: string;
}

const updateService = async ({ serviceId, price, duration }: UpdateServiceParams): Promise<void> => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }


  const url = new URL(
    `${import.meta.env.VITE_BASE_URL}/experts/update-service/${serviceId}`
  );

  await axios.patch(
    url.toString(),
    {
      amount: price,
      duration: duration,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const useUpdateService = (): UseMutationResult<void, AxiosError, UpdateServiceParams> => {
  return useMutation({
    mutationFn: (params: UpdateServiceParams) => updateService(params),
    onSuccess: () => {
      toast.success("Service updated successfully");
    },
    onError: (error: AxiosError) => {
      console.error("Error updating service:", error);
      toast.error("Error in updating service");
    },
  });
};