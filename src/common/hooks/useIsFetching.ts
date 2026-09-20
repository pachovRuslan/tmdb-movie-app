import { useAppSelector } from "@/app/model/hooks";


export const useIsFetching = (): boolean => {
  const queries = useAppSelector((state) => state.api.queries);
  return Object.values(queries).some((q) => q?.status === "pending");
};
