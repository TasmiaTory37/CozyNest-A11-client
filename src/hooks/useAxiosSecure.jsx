import { useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext } from 'react';

const axiosSecure = axios.create({
  baseURL: 'https://assignment-11-server-nine-nu.vercel.app', // Your backend API
});

const useAxiosSecure = () => {
  const { token, logOut } = useContext(AuthContext);

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logOut();
         
        }
        return Promise.reject(error);
      }
    );

    // Cleanup on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [token, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
