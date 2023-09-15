import React, {useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native";
import {NativeBaseProvider} from "native-base";
// Import your screens/components
import {WishlistProvider} from "./context/WishlistContext";

//Transfer Child scripts
import {useLoadFonts} from "./hooks/useLoadFonts";
import {nativeBaseTheme} from "./theme";
import {MainNavigator} from "./navigator/MainNavigator";
import useWebApiStore from "@/global-stores/useWebApiStore";
import http from "@/lib/axios"
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/query-client";
import Toast from "react-native-toast-message";

const App = () => {
    const [isLoaded] = useLoadFonts();

    const {accessToken, isHydrated} = useWebApiStore();

    useEffect(() => {
        if (accessToken) {
            http.setBearer(accessToken);
        }
    }, [accessToken]);


    if (!isHydrated || !isLoaded) {
        return null;
    }


    return (
        <QueryClientProvider client={queryClient}>
            <NativeBaseProvider theme={nativeBaseTheme}>
                <StatusBar backgroundColor="#000" barStyle="light-content"/>
                <WishlistProvider>
                    <NavigationContainer>
                        <MainNavigator/>
                    </NavigationContainer>
                </WishlistProvider>
            </NativeBaseProvider>
            <Toast/>
        </QueryClientProvider>

    );
};

export default App;
