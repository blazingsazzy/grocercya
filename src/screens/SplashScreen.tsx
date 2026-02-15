import React, { useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../themes/themes";

// SVG (hyphen-less file, simple import)
import LogoSvg from "../assets/svg/logo.svg";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2500); // 1200–3000ms range

    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LogoSvg width={180} height={180} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
});
