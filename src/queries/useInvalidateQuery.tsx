import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IMovieKeys } from "./movies";
import { IState } from "@/lib/actions/movies";

type QueryKey = IMovieKeys;
//to extend, you can do type QueryKey = IMovieKeys | IUserKeys etc.

export const useInvalidateQuery = (queryKey: QueryKey, state?: IState) => {
  const queryClient = useQueryClient();

  const doInvalidate = () =>
    queryClient.invalidateQueries({
      queryKey,
    });

  useEffect(() => {
    if (state?.success) {
      doInvalidate();
    }
  }, [state, queryClient, queryKey]);

  return { doInvalidate };
};
