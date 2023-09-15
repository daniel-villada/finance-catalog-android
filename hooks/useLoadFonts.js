import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
// require function does not support imports dynamically because webpack should know which files are loaded at compile time
const path = "../assets/fonts/Poppins";

export const useLoadFonts = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "poppins-black": require(`${path}/Poppins-Black.ttf`),
          "poppins-bold": require(`${path}/Poppins-Bold.ttf`),
          "poppins-light": require(`${path}/Poppins-Light.ttf`),
          "poppins-medium": require(`${path}/Poppins-Medium.ttf`),
          "poppins-regular": require(`${path}/Poppins-Regular.ttf`),
          "poppins-semibold": require(`${path}/Poppins-SemiBold.ttf`),
          "poppins-thin": require(`${path}/Poppins-Thin.ttf`),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return [isLoadingComplete];
};
