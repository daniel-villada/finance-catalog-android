import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import {omit} from "@/helpers";

const initialValues = {
    accessToken: "", loading: false, user: null, isGrantedLocationPermissions: false, isHydrated: false, wishlist: {}
};

const STORE_NAME = "gyc-store"

const useWebApiStore = create(persist((set) => ({
    ...initialValues,

    setLoading: (loading) => set((state) => ({...state, loading})),
    setLocationPermission: (permission) => set((state) => ({
        ...state, isGrantedLocationPermissions: permission,
    })),
    setUser: (user) => set((state) => ({...state, user})),
    setAccessToken: (accessToken) => set((state) => ({...state, accessToken})),
    setIsHydrated: (isHydrated) => set((state) => ({...state, isHydrated})),
    addWishlistItemById: (id, data) => set((state) => ({
        ...state,
        wishlist: {...state.wishlist, [id]: {...data, added_at: new Date()}}
    })),
    clearWishlist: () => set((state) => ({
        ...state,
        wishlist: {}
    })),
    reset: () => set((state) => omit(initialValues, ['isHydrated'])),
}), {
    name: STORE_NAME,
    storage: createJSONStorage(() => AsyncStorage),
    partialize: state => omit(state, ['loading', 'isHydrated']),
    onRehydrateStorage: (state) => {
        return (state, error) => {
            if (error) {
                console.log(`an error happened during hydration in ${STORE_NAME}`, error);
            } else {
                console.log(`use ${STORE_NAME} hydration finished`);
                state?.setIsHydrated(true);
            }
        };
    },
}));

export default useWebApiStore;