/* import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const useApi = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setisLoading(true);
    try {
      const response: AxiosResponse<T> = await axios(url, options);
      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setisLoading(false);
  };
// 
  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error };
};
 */
