"use client";
import { useState, useCallback, useEffect } from "react";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

// Define a generic type for the API function
// This allows the hook to be used with different API functions having different signatures
type ApiFunction<T = any, R = AxiosResponse<T>> = (...args: T[]) => Promise<R>;

// Define the type for the hook's return value
interface UseApiReturnType<T = any, R = AxiosResponse<T>> {
  execute: (...args: T[]) => Promise<boolean>;
  loading: boolean;
  error: Error | null;
  data: R | null;
}

export const useApi = <T = any, R = AxiosResponse<T>>(
  apiFunc: ApiFunction<T, R>,
  executeInitially = false,
  showError = true,
  ...params: any[]
): UseApiReturnType<T, R> => {
  const [loading, setLoading] = useState<boolean>(executeInitially);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<R | null>(null);

  useEffect(() => {
    if (executeInitially) {
      execute(...params);
    }
  }, []);

  const execute = useCallback(
    async (...args: T[]) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunc(...args);
        setData(response);
        return true;
      } catch (err: any) {
        if (showError) {
          if (
            err?.response?.data?.data &&
            !err?.response?.data?.includes(
              "TypeError: Cannot read properties of undefined "
            )
          ) {
            toast.error(
              err.response?.data?.message ||
                err.response?.data?.error ||
                "Something went wrong! Please try again."
            );
          }
        }

        setError(err as Error);
        setData(null);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  return { execute, loading, error, data };
};
