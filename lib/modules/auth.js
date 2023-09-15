const auth = ({ ApiPost, ApiGet }) => {
    return {
        login(payload) {
            return ApiPost("/auth/local", payload);
        },
    };
};

export default auth;