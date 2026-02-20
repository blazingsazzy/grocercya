import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AppNavigator } from "@/navigation/AppNavigator";

import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { View } from "react-native";

//  Prevent native splash from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  //  Hide splash AFTER fonts load + short delay
  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [fontsLoaded]);

  //  Keep native splash visible while fonts load
  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#0B0B0B" }} />;
  }

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "#FFFFFF" },
      }}
    >
      <AppNavigator />
    </NavigationContainer>
  );
}
