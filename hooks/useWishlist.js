import useWebApiStore from "@/global-stores/useWebApiStore";
import {useMemo} from "react";

const useWishlist = () => {
    const {wishlist, addWishlistItemById, clearWishlist} = useWebApiStore()

    const wishlistCollection = useMemo(() => Object.entries(wishlist)
        .map(([id, data]) => ({...data, id})).sort((a, b) => new Date(a.added_at) - new Date(b.added_at)), [wishlist])


    return {
        wishlist,
        wishlistCollection,
        hasItems: wishlistCollection.length > 0,
        addWishlistItemById,
        clearWishlist
    }
}
export default useWishlist