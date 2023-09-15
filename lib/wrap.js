import modules from "@/lib/modules";

export const wrap = (wrap) => ({
    query: modules(wrap),
});

export const requests = () => (wrap({}).query)