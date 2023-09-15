import {useCallback, useMemo} from "react";
import useWebApiStore from "@/global-stores/useWebApiStore";
import singleton from "@/lib/axios";
import httpMethodFactory from "@/lib/http-method-factory";
import {wrap as queries} from "@/lib/wrap";
import {useToast} from "@/hooks/useToast";

const useWebApi = () => {
    const {loading, setLoading, accessToken, setAccessToken, setUser, user, reset} =
        useWebApiStore();

    const toast = useToast();
    const http = singleton;

    /* Request method */
    const request = useCallback(
        async (options) => {
            return (
                await http.request({
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        ...(accessToken ? {
                            Authorization: "Bearer " + accessToken,
                        } : {})
                    },
                })
            ).data;
        },
        [accessToken]
    );

    const methodFactory = useMemo(() => httpMethodFactory(request), [request]);

    const api = queries({
        ApiGet: methodFactory.get,
        ApiPost: methodFactory.post,
        ApiPut: methodFactory.put,
        ApiDelete: methodFactory.delete,
    }).query;

    const login = useCallback((token) => {
        http.setBearer(token);
        setAccessToken(token);
    }, []);

    return {
        user,
        isLoading: loading,
        setIsLoading: setLoading,
        api,
        http,
        request,

        ...methodFactory,

        isAuthenticated: !!accessToken,
        auth: {
            async logout() {
                reset()
                setAccessToken(null);
                http.setBearer("")
            },
            async login(payload) {
                setLoading(true);

                try {
                    const data = await api.login(payload);
                    login(data.jwt);
                    setUser({
                        id: data.user.id,
                        username: data.user.username,
                        email: data.user.email,
                        mediaUser: data.user.mediaUser
                    });
                    toast.success(`Bienvenido ${data?.user?.username ?? ""}!`, 'Es un placer tenerte aquí de nuevo')
                } catch (error) {
                    console.log(error.response)
                    console.log(error.response.data)
                    toast.error("Error de autenticación", "Ponte en contacto con los administradores");
                } finally {
                    setLoading(false);
                }
            },
        },
    };
};

export default useWebApi;