import Toast from "react-native-toast-message";

const statuses = ["success", "error", "info"];

export const useToast = () => {
    return {
        ...statuses.reduce(
            (prev, curr) => ({
                ...prev,
                [curr]: (title, desc, options = {}) =>
                    Toast.show({
                        type: curr,
                        text1: title,
                        text2: desc,
                        ...options,
                    }),
            }),
            {}
        ),
        show: (params) =>
            Toast.show({
                type: statuses.includes(params.status) ? params.status : "info",
                text1: params.title,
                text2: params.desc,
                ...params,
            }),
    };
};