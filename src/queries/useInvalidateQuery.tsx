import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IMovieKeys } from "./movies";
import { IState } from "@/lib/actions/movies";

type QueryKey = IMovieKeys;
//to extend, you can do type QueryKey = IMovieKeys | IUserKeys etc.

export const useInvalidateQuery = (
  state: IState | undefined,
  queryKey: QueryKey
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (state?.success) {
      queryClient.invalidateQueries({
        queryKey,
      });
    }
  }, [state, queryClient, queryKey]);
};
