import axios from "axios";

import {API_URL} from "@/env";

class ApiLib {
    static _instance;
    axios;

    constructor() {
        if (ApiLib._instance) {
            return ApiLib._instance;
        }

        ApiLib._instance = this;

        this.axios = axios.create({
            baseURL: `${API_URL}/api`,
            timeout: 60000,
        });

       /* this.axios.interceptors.response.use(
            response => {
                //  Any status code that lie within the range of 2xx cause this function to trigger
                //Do something with response data  console.log(error);
                return response;
            },
            error => {
                //Any status codes that falls outside the range of 2xx cause this function to trigger
                //Do something with response error

                console.log(error);
                console.log(error.response?.params);
                console.log(error.response?.data);

                return Promise.reject(error);
            },
        );*/
    }

    setBearer(token) {
        this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    request(options) {
        return this.axios.request(options);
    }

    get(url, params) {
        return this.request({method: "GET", url, params});
    }

    post(url, data) {
        return this.request({method: "POST", url, data});
    }

    put(url, data) {
        return this.request({method: "PUT", url, data});
    }

    delete(url, params) {
        return this.request({method: "DELETE", url, params});
    }

    getAxios() {
        return this.axios;
    }
}

export default new ApiLib();