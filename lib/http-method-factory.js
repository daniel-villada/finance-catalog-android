const httpMethodFactory = (request) => {
    /* Generate HTTP method calls */

    return Object.fromEntries(
        ["get", "post", "put", "delete"].map((verb) => {
            const method = verb;
            const hasData = ["GET", "DELETE"].indexOf(method);

            return [
                method,
                (url, data, params) =>
                    request({
                        method,
                        url,
                        data: hasData ? data : null,
                        params: hasData ? params : data,
                    }),
            ];
        })
    );
};
export default httpMethodFactory;