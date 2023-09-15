import {API_URL} from "@/env"

export const omit = (obj = {}, omittedKeys = []) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([key]) => !omittedKeys.includes(key)),
    );
};


export const getImageUrlByItem = item => {
    if (!item) {
        return ""
    }
    return item.attributes.url ? `${API_URL}${item.attributes.url}` : getImageUrlByItem(item.attributes?.image?.data?.[0]);
}