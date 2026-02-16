import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import AppText from "../components/AppText";
import { colors, radius, spacing } from "../themes/themes";

type Props = NativeStackScreenProps<RootStackParamList, "SelectCategory">;

const EXTRA = ["Seafood", "Carbonated drinks", "Grains", "Spices"];

export default function SelectCategoryScreen({ navigation }: Props) {
  const baseCategories = useMemo(
    () => [
      "Gluten-Free",
      "Vegan Friendly",
      "Raw Meat",
      "Organic",
      "Dairy-Free",
      "Sugar-Free",
      "Cruelty-Free",
      "Processed Food",
    ],
    []
  );

  const [showMore, setShowMore] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const categories = useMemo(() => {
    const list = [...baseCategories];
    if (showMore) list.push(...EXTRA);
    return list;
  }, [baseCategories, showMore]);

  const toggleCategory = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const onContinue = () => {
  navigation.navigate("SetLocation");
};


  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      <View style={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={10}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          >
            <AppText variant="semibold" style={styles.backIcon}>←</AppText>
          </Pressable>

          <Pressable
            onPress={() => setShowHelper((v) => !v)}
            hitSlop={10}
            style={({ pressed }) => [styles.helpBtn, pressed && styles.pressed]}
          >
            <AppText variant="semibold" style={styles.helpIcon}>?</AppText>
          </Pressable>
        </View>

        {/* Titles */}
        <AppText variant="semibold" style={styles.title}>
          All your grocery need in one place
        </AppText>
        <AppText style={styles.subtitle}>Select your desired shop category</AppText>
        {showHelper ? (
  <AppText variant="regular" style={styles.helper}>
    Choose one or multiple categories to personalize your grocery experience.
  </AppText>
) : null}


        {/* Pills */}
        <View style={styles.pillsWrap}>
          {categories.map((name) => {
            const isOn = selected.has(name);
            return (
              <Pressable
                key={name}
                onPress={() => toggleCategory(name)}
                style={({ pressed }) => [
                  styles.pill,
                  isOn ? styles.pillOn : styles.pillOff,
                  pressed && styles.pressed,
                ]}
              >
                <AppText
                  variant="medium"
                  style={[styles.pillText, isOn ? styles.pillTextOn : styles.pillTextOff]}
                >
                  {name}
                </AppText>
              </Pressable>
            );
          })}

          {/* Show +4 More */}
          <Pressable
            onPress={() => setShowMore((v) => !v)}
            style={({ pressed }) => [
              styles.pill,
              styles.pillOff,
              pressed && styles.pressed,
            ]}
          >
            <AppText variant="medium" style={[styles.pillText, styles.pillTextOff]}>
              {showMore ? "Show less" : "Show +4 More"}
            </AppText>
          </Pressable>
        </View>

        {/* Bottom button */}
        <View style={styles.bottom}>
          <Pressable
            onPress={onContinue}
            style={({ pressed }) => [styles.continueBtn, pressed && styles.pressed]}
          >
            <AppText variant="medium" style={styles.continueText}>
              Continue
            </AppText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const GREEN_BG = "#E8F8E9";   // light green fill like screenshot
const GREEN_BR = "#39B54A";   // green border

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing[24],
    paddingTop: spacing[14],
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[16],
  },

helper: {
  fontSize: 12,
  color: "#6A6A6A",
  marginTop: -spacing[8],
  marginBottom: spacing[16],
},


  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { fontSize: 22, color: colors.text, marginTop: -2 },

  helpBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },
  helpIcon: { fontSize: 15, color: "#4A4A4A" },

  title: {
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing[8],
  },
  subtitle: {
    fontSize: 12,
    color: colors.subtext,
    marginBottom: spacing[16],
  },

  pillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[12],
  },

  pill: {
    borderRadius: 999,
    paddingHorizontal: spacing[14],
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  pillOff: {
    backgroundColor: "#F3F3F3",
    borderColor: "#F0F0F0",
  },
  pillOn: {
    backgroundColor: GREEN_BG,
    borderColor: GREEN_BR,
  },

  pillText: {
    fontSize: 12,
  },
  pillTextOff: {
    color: "#2B2B2B",
  },
  pillTextOn: {
    color: "#1F7A2E",
  },

  bottom: {
    marginTop: "auto",
    paddingBottom: spacing[16],
  },
  continueBtn: {
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    fontSize: 14,
    color: colors.white,
  },

  pressed: { opacity: 0.85 },
});
