import {useInfiniteQuery} from "@tanstack/react-query";

import useWebApi from "@/hooks/useWebApi";

import {GetterKeys, QueryType, UseTypeSafeInfiniteQueryOptions} from "./types"

export function useTypeSafeInfiniteQuery<
    TQueryKey extends GetterKeys,
    TQueryFnData = unknown,
    TError = unknown,
    TData = QueryType<TQueryKey>,
>({
      queryKey,
      queryParams = {},
      getNextPageParam,
      ...options
  }: UseTypeSafeInfiniteQueryOptions<TQueryKey, TQueryFnData, TError, TData>) {
    const {api} = useWebApi();
    const opts = options ? options : ({} as any);

    return useInfiniteQuery<QueryType<TQueryKey>>({
        queryKey,
        queryFn: ({pageParam = 1}) => {
            const fn = api[queryKey[0]];
            if (typeof fn !== 'function') {
                throw new Error(`${queryKey[0]} is not a valid key for make a query`);
            }

            return fn(
                // @ts-ignore
                queryParams
                    ? {
                        page: pageParam,
                        ...queryParams,
                    }
                    : {},
            );
        },
        getNextPageParam: (lastPage, allPages) => {

            if (getNextPageParam) {
                return getNextPageParam(lastPage as TData, allPages as TData[]);
            }

            const pagination = lastPage?.meta?.pagination ?? {}
            return pagination.page !== pagination.pageCount
                ? (pagination.page ?? 0) + 1
                : undefined;
        },
        ...opts,
    });
}