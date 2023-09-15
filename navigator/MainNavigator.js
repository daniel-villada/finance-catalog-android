import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import Login from "../screens/login";
import Home from "../screens/home";
import Transfer from "../screens/transfer";
import Catalog from "../screens/catalog";
import Gallery from "../screens/gallery";
import Aviones from "../screens/service/aviones";
import Betregal from "../screens/service/betregal";
import Alquima from "../screens/service/alquima";
import Crypto from "../screens/service/crypto";
import Fiscales from "../screens/service/fiscales";
import Profile from "../screens/profile";
import CalendarScreen from "../screens/calendar";
import Wishlist from "../screens/wishlist";
import useWebApi from "@/hooks/useWebApi";

const Stack = createStackNavigator();
export const MainNavigator = () => {
  const { user } = useWebApi();
  return user ? <StackNavigator/> : <InitNavigator/>;
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Transfer" component={Transfer} />
      <Stack.Screen name="Catalog" component={Catalog} />
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="Aviones" component={Aviones} />
      <Stack.Screen name="Betregal" component={Betregal} />
      <Stack.Screen name="Alquima" component={Alquima} />
      <Stack.Screen name="Crypto" component={Crypto} />
      <Stack.Screen name="Fiscales" component={Fiscales} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
    </Stack.Navigator>
  );
};

const InitNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
