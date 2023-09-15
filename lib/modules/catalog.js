import client from "@/lib/axios";

const catalog = ({ApiPost, ApiGet}) => {
    return {
        async getCatalog({page = 1} = {}) {
            return (await client.get(`/items?populate=*&pagination[page]=${page}&pagination[pageSize]=15`)).data?.data;
        },
        async getCatalogInfinity({page = 1} = {}) {
            return (await client.get(`/items?populate=*&pagination[page]=${page}&pagination[pageSize]=15&pagination[withCount]=true`)).data;
        },

        async getCatalogById({id} = {}) {
            return (await client.get(`/items/${id}?populate=*`)).data?.data;
        },
    };
};

export default catalog;