import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "./Pages/Index";
import Home from './Pages/Home'
import ProductDetailPage from "./Pages/ProductDetailPage";
import Toast from "react-native-toast-message";


const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Detail" component={ProductDetailPage} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
