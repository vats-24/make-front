import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getProfileDetails =async () => {
    const token = localStorage.getItem("accessToken");
    const url = new URL(`${import.meta.env.VITE_BASE_URL}/users/me`)

    const response = await axios.get(url.toString(),{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    const data = response.data;
    return data;

}

const useGetprofileDetails = () => {
    return useQuery({
        queryKey: ["profile-details"],
        queryFn: () => getProfileDetails(),
        staleTime: 1000 * 60 * 60,
    })
}

export default useGetprofileDetails;