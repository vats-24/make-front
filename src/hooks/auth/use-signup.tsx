import {
  useQueryClient,
  type UseMutateFunction,
  useMutation,
} from "@tanstack/react-query";
import type { User } from "./useUser";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { QUERY_KEY } from "@/constants/queryKeys";
import { ACCESS_TOKEN } from "@/utils/constants";

async function signUp(email: string, password: string) {
  const response = await fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
}

type IUserSignUp = UseMutateFunction<
  User,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown
>;

export function useSignUp(): IUserSignUp {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: singUpMutation } = useMutation<
    User,
    unknown,
    { email: string, password: string },
    unknown
  >({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signUp(email, password),
    onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEY.user],data);
        // localStorage.setItem(ACCESS_TOKEN, data.accessToken)
        navigate("/", {replace: true});
    },
    onError: () => {
        enqueueSnackbar("fdmlgls", {
            variant: "error"
        })
    },
  });

  return singUpMutation;
}
