import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";


import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { View } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // ⛔ Don't render app until fonts are ready
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
