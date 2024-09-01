import {
  type UseMutateFunction,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import type { User } from "./useUser";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { QUERY_KEY } from "@/constants/queryKeys";
import { ResponseError } from "@/utils/errors/ResponseError";
import { useCookies } from "react-cookie";

async function signIn(email: string, password: string): Promise<User> {
  const response = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok)
    throw new ResponseError("Failed on sign in request", response);

  const data = await response.json();
  return data;
}

type IUseSignIn = UseMutateFunction<
  User,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown
>;

export function useSignIn(): IUseSignIn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [,setCookie] = useCookies(['ACCESS_TOKEN','REFRESH_TOKEN'])
  const { mutate: signInMutation } = useMutation<
    User,
    unknown,
    { email: string; password: string },
    unknown
  >({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.user], data);
      setCookie('REFRESH_TOKEN',data.refreshToken, {maxAge: 60 * 5});
      setCookie('ACCESS_TOKEN',data.accessToken, {maxAge: 60 * 3})
      navigate("/", { replace: true });
    },
    onError: () => {
      enqueueSnackbar("OOps.. Error on sign in. Try Again", {
        variant: "error",
      });
    },
  });

  return signInMutation;
}
