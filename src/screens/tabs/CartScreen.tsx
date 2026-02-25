import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "@/components/AppText";
import { colors } from "@/themes/themes";

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <AppText variant="semibold" style={styles.label}>Cart</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" },
  label: { fontSize: 18, color: colors.text },
});