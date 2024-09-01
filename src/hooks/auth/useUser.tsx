import { QUERY_KEY } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import * as userLocalStorage from "./user.localstore";
import { ResponseError } from "@/utils/errors/ResponseError";
import React from "react";

async function getUser(user: User | null | undefined): Promise<User | null> {
  if (!user) {
    console.log("Humhee")
    return null; 
  }
  console.log(user)
  const response = await fetch("http://localhost:3000/api/users/assign-podcasters", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  },);
  if (!response.ok) throw new ResponseError("Failed on get User", response);
  const data = await response.json();
  console.log(data)
  return data;
}

export interface User {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    // password:string
  };
}

interface IUseUser {
  user: User | null;
}

export function useUser(): IUseUser {
  const { data: user } = useQuery<User | null>({
    queryKey: [QUERY_KEY.user],
    //@ts-ignore
    queryFn: async () : Promise<User | null> => getUser(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: userLocalStorage.getUser     //cookie
  });

  React.useEffect(()=>{
    if(!user) userLocalStorage.removeUser();
    else{
      console.log("Hiii")
      userLocalStorage.saveUser(user);
    } 
  },[user])

  return {
    //@ts-ignore
    user: user ?? null,
  }
}
