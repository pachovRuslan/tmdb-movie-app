import { useEffect } from "react";
import { toast } from "react-toastify";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined): string => {
  if (!error) return "Something went wrong";

  if ("status" in error) {
    if (error.status === "FETCH_ERROR") return "Network error. Check your internet connection";
    if (error.status === 401) return "Invalid API token";
    if (error.status === 404) return "Requested data not found";
    return `Request failed with status ${error.status}`;
  }

  if (error.name === "ZodError") return "Unexpected data format from server";

  return error.message ?? "Something went wrong";
};

export const useApiErrorToast = (error: FetchBaseQueryError | SerializedError | undefined) => {
  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error));
    }
  }, [error]);
};
