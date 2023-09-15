import {useQuery} from "@tanstack/react-query";

import useWebApi from "@/hooks/useWebApi";

import {GetterKeys, QueryType, UseTypeSafeQueryOptions} from "./types"

export const useTypeSafeQuery = <
    TQueryKey extends GetterKeys,
    TQueryFnData = unknown,
    TError = unknown,
    TData = QueryType<TQueryKey>,
>({
      queryKey,
      queryParams = {},
      ...options
  }: UseTypeSafeQueryOptions<TQueryKey, TQueryFnData, TError, TData>) => {
    const {api} = useWebApi();
    const opts = options ? options : ({} as any);

    return useQuery<QueryType<TQueryKey>>({
        queryKey,
        queryFn: () => {
            const fn = api[queryKey[0]];
            if (typeof fn !== 'function') {
                throw new Error(`${queryKey[0]} is not a valid key for make a query`);
            }

            // @ts-ignore
            return fn(queryParams ?? {});
        },
        ...opts,
    });
};
