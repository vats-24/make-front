import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { toast } from "react-hot-toast";

interface DeleteServiceParams {
    serviceId: string;
  }

const deleteService = async ({serviceId}: DeleteServiceParams) => {
  const token = localStorage.getItem("accessToken");
  const url = new URL(`${import.meta.env.VITE_BASE_URL}/experts/delete-service/${serviceId}`);

  const response = await axios.delete(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};

const useDeleteService = (): UseMutationResult<void, AxiosError, DeleteServiceParams> => {
  return useMutation({
    mutationFn: (params: DeleteServiceParams) => deleteService(params),
    onSuccess: () => {
        toast.success("Service updated successfully");
      },
      onError: (error: AxiosError) => {
        console.error("Error updating service:", error);
        toast.error("Error in updating service");
      },
  });
};

export default useDeleteService;
