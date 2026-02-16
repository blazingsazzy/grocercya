// src/screens/EnableNotificationScreen.tsx
import React from "react";
import { View, StyleSheet, Pressable, StatusBar } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "../components/AppText";
import { colors, radius, spacing } from "../themes/themes";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";

import NotificationSvg from "../assets/svg/notification.svg";

type Props = NativeStackScreenProps<RootStackParamList, "EnableNotification">;

export default function EnableNotificationScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      <View style={styles.container}>
        {/* ===== TOP BAR ===== */}
        <View style={styles.topBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={10}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          >
            <AppText variant="semibold" style={styles.backIcon}>
              ←
            </AppText>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.helpBtn, pressed && styles.pressed]}
            disabled
            hitSlop={10}
          >
            <AppText variant="semibold" style={styles.helpIcon}>
              ?
            </AppText>
          </Pressable>
        </View>

        {/* ===== TEXT (TOP) ===== */}
        <View style={styles.textBlock}>
          <AppText variant="semibold" style={styles.title}>
            Lastly, please enable notification
          </AppText>

          <AppText style={styles.subtitle}>
            Enable your notifications for more update and important messages about your grocery needs
          </AppText>
        </View>

        {/* ===== SVG (MIDDLE) ===== */}
        <View style={styles.illustrationArea}>
          <NotificationSvg width={260} height={220} />
        </View>

        {/* ===== BUTTONS (BOTTOM) ===== */}
        <View style={[styles.bottom, { paddingBottom: insets.bottom + 16 }]}>
          <Pressable
            disabled
            style={({ pressed }) => [
              styles.primaryBtn,
              styles.disabledBtn,
              pressed && styles.pressed,
            ]}
          >
            <AppText variant="medium" style={styles.primaryText}>
              Enable Notifications
            </AppText>
          </Pressable>

          <Pressable
            disabled
            style={({ pressed }) => [
              styles.secondaryBtn,
              styles.disabledBtn,
              pressed && styles.pressed,
            ]}
          >
            <AppText variant="medium" style={styles.secondaryText}>
              Skip For Now
            </AppText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },

  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing[24],
  },

  // Top icons aligned like screenshot
  topBar: {
    paddingTop: spacing[10],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 22,
    color: colors.text,
    marginTop: -2,
  },

  helpBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },
  helpIcon: { fontSize: 15, color: "#4A4A4A" },

  
  textBlock: {
    marginTop: spacing[16],
  },
  title: {
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing[8],
  },
  subtitle: {
    fontSize: 12,
    color: colors.subtext,
    lineHeight: 18,
    paddingRight: spacing[28], 
  },

  // SVG centered in the remaining space
  illustrationArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Buttons pinned bottom
  bottom: {
    paddingTop: spacing[10],
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

  disabledBtn: { opacity: 0.6 },
  pressed: { opacity: 0.85 },
});
