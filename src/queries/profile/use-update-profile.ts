import { type UseMutationResult, useMutation, useQueries, useQuery } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { toast } from "react-hot-toast";


interface ProfileData {
  firstName: string;
  lastName: string;
  profileName: string;
  socialAccount: string;
  phoneNumber: string;
  profilePhoto: string;
  upiId: string;
  expertise: string[];
  availability: [];
}

const updateService = async (data: ProfileData) => {
  const token = localStorage.getItem("accessToken");
  const url = new URL(`${import.meta.env.VITE_BASE_URL}/users/update-profile`);
  console.log(data)

  await axios.patch(url.toString(),data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useUpdateProfile =  (): UseMutationResult<void,AxiosError,ProfileData> => {
  return useMutation({
    mutationFn: (params: UpdateProfileParams) => updateService(params),
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error: AxiosError) => {
      console.error("Error updating service:", error);
      toast.error("Error in updating Profile");
    },
  });
};

const getSignedUrl = async (fileType) => {
    const token = localStorage.getItem("accessToken")

    const url = new URL(`${import.meta.env.VITE_BASE_URL}/users/s3/signed-url?fileType=${fileType}`)

    const response = await axios.get(url.toString(),{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const useGetSignedUrl = () :UseMutationResult<void, AxiosError>=> {
    return useMutation(
        {
            mutationFn: (params) => getSignedUrl(params)
        }
    )
}

const uploadToS3 = async (params) => {

  const {signedUrl,file} = params

  await axios.put(signedUrl,file,{
    headers: {
      "Content-Type" : file.type
    }
  }) 
}

export const useUploadToS3 = (): UseMutationResult<void, AxiosError> => {
  return useMutation({
    mutationFn: (params) => uploadToS3(params), 
  })
}