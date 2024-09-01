import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { toast } from "react-hot-toast";

interface CreateServiceParams {
  title: string;
  description: string;
  duration: string;
  price: string;
  type: [string];
}

const createService = async (data: CreateServiceParams): Promise<void> => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  const url = new URL(`${import.meta.env.VITE_BASE_URL}/experts/create-service`);

  await axios.post(
    url.toString(),
    {
      data,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const useCreateService = (): UseMutationResult<
  void,
  AxiosError,
  CreateServiceParams
> => {
  return useMutation({
    mutationFn: (params: CreateServiceParams) => createService(params),
    onSuccess: () => {
      toast.success("You have successfully created a new service. It's time to share this to your network");
    },
    onError: (error: AxiosError) => {
      console.error(error)
      toast.error("There was some error creating your service. Please try again");
    },
  });
};

export default useCreateService;
