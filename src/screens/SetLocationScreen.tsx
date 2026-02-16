import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppText from "../components/AppText";
import { colors, radius, spacing } from "../themes/themes";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";

// IMPORT SVG
import GroupSvg from "../assets/svg/group.svg";

type Props = NativeStackScreenProps<RootStackParamList, "SetLocation">;

export default function SetLocationScreen({ navigation }: Props) {
  const onAllowGoogleMaps = () => {
    //  navigate to next screen
    navigation.navigate("EnableNotification"); // change when next screen exists
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      <View style={styles.container}>

        
        {/* Illustration */}
        <View style={styles.illustrationWrap}>
          <GroupSvg width={260} height={220} />
        </View>

        {/* Title */}
        <AppText variant="semibold" style={styles.title}>
          Set your location
        </AppText>

        {/* Subtitle */}
        <AppText style={styles.subtitle}>
          This let us know your location for best shipping experience
        </AppText>

        {/* Buttons */}
        <View style={styles.bottom}>
          <Pressable
            onPress={onAllowGoogleMaps}
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && styles.pressed,
            ]}
          >
            <AppText variant="medium" style={styles.primaryText}>
              Allow Google Maps
            </AppText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && styles.pressed,
            ]}
            disabled
          >
            <AppText variant="medium" style={styles.secondaryText}>
              Set Manually
            </AppText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing[24],
    alignItems: "center",
    justifyContent: "center",
  },

  illustrationWrap: {
    marginBottom: spacing[24],
  },

  title: {
    fontSize: 20,
    color: colors.text,
    marginBottom: spacing[10],
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    color: colors.subtext,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: spacing[40],
    paddingHorizontal: spacing[20],
  },

  bottom: {
    position: "absolute",
    bottom: spacing[24],
    left: spacing[24],
    right: spacing[24],
  },

  primaryBtn: {
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[14],
  },

  primaryText: {
    color: colors.white,
    fontSize: 14,
  },

  secondaryBtn: {
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: "#E9E9E9",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryText: {
    color: "#3A3A3A",
    fontSize: 14,
  },

  pressed: {
    opacity: 0.85,
  },
});
