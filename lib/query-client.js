import {QueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            onError: (e) => {
            },
        }, queries: {
            retry: false, staleTime: 60 * 1000 * 5, onError: (e) => {
            },
        },
    },
});