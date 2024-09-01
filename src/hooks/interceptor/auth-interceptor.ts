import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "@/api/api";

export function useAuthInterceptor() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => {console.log(response); return response},
      (error) => {
        if (error.message === 'AUTH_ERROR' || error.response?.status === 401) {
          navigate('/auth/signin');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
}
