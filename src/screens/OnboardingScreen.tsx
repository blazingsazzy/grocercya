import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius, spacing, typography } from "../themes/themes";

import AppText from "../components/AppText";

// SVGs (hyphen filenames — keep exact paths + quotes)
import FullTrolleySvg from "../assets/svg/full-trolley.svg";
import DeliveryTruckSvg from "../assets/svg/delivery-truck.svg";
import BigBoxSvg from "../assets/svg/big-box.svg";
import CashRegisterSvg from "../assets/svg/cash-register.svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Slide = {
  key: string;
  title: string;
  subtitle: string;
  Illustration: React.ComponentType<{ width?: number; height?: number }>;
};

export default function OnboardingScreen() {
  const slides: Slide[] = useMemo(
    () => [
      {
        key: "1",
        title: "Welcome to Grocercya",
        subtitle:
          "Get your grocery needs at your service within a minute, fast, efficient, and convenient.",
        Illustration: FullTrolleySvg,
      },
      {
        key: "2",
        title: "Get any packages delivered",
        subtitle:
          "Get all your items conveniently, ensuring everything you need arrive without any hassle.",
        Illustration: DeliveryTruckSvg,
      },
      {
        key: "3",
        title: "Protected package delivery.",
        subtitle:
          "Your groceries are carefully packaged to ensure they arrive safely and in perfect condition.",
        Illustration: BigBoxSvg,
      },
      {
        key: "4",
        title: "Best price guaranteed",
        subtitle:
          "Allowing you to stock up on your favorite items while staying within your budget.",
        Illustration: CashRegisterSvg,
      },
    ],
    []
  );

  const listRef = useRef<FlatList<Slide>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLast = activeIndex === slides.length - 1;

  const scrollToIndex = (index: number) => {
    listRef.current?.scrollToOffset({
      offset: index * SCREEN_WIDTH,
      animated: true,
    });
  };

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const onSkip = () => {
    scrollToIndex(slides.length - 1);
  };

  const onNext = () => {
    scrollToIndex(Math.min(activeIndex + 1, slides.length - 1));
  };

  const onGetStarted = () => {
    Alert.alert("Onboarding completed");
  };

  const renderItem = ({ item }: { item: Slide }) => {
    const Illustration = item.Illustration;

    return (
      <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
        {/* Progress indicator */}
        <View style={styles.progressRow}>
          {slides.map((_, i) => {
            const active = i === activeIndex;
            return (
              <View
                key={i}
                style={[
                  styles.progressSegment,
                  { backgroundColor: active ? colors.black : colors.track },
                  i !== slides.length - 1 && { marginRight: 10 }, // spacing ONLY between bars
                ]}
              />
            );
          })}
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <View style={styles.illustrationWrap}>
            <Illustration width={250} height={210} />
          </View>

          <AppText variant="semibold" style={styles.title}>
            {item.title}
          </AppText>
          <AppText variant="regular" style={styles.subtitle}>
            {item.subtitle}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <View style={styles.container}>
        <FlatList
          ref={listRef}
          data={slides}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={onMomentumEnd}
          scrollEventThrottle={16}
        />

        {/* Bottom buttons */}
        <View style={styles.bottomArea}>
          {!isLast ? (
            <View style={styles.buttonRow}>
              <Pressable
                onPress={onSkip}
                style={({ pressed }) => [
                  styles.pillButton,
                  styles.skipButton,
                  pressed && styles.pressed,
                ]}
                hitSlop={8}
              >
                <AppText variant="medium" style={styles.skipText}>
                  Skip
                </AppText>
              </Pressable>

              <Pressable
                onPress={onNext}
                style={({ pressed }) => [
                  styles.pillButton,
                  styles.nextButton,
                  pressed && styles.pressed,
                ]}
                hitSlop={8}
              >
                <AppText variant="semibold" style={styles.nextText}>
                  Next
                </AppText>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={onGetStarted}
              style={({ pressed }) => [
                styles.getStartedButton,
                pressed && styles.pressed,
              ]}
              hitSlop={8}
            >
              <AppText variant="semibold" style={styles.getStartedText}>
                Get Started
              </AppText>
            </Pressable>
          )}
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
  },

  slide: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing[24],
  },

  progressRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 0,
    paddingHorizontal: 0,
    marginTop: 0,
  },

  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 999,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 110,
  },
  illustrationWrap: {
    marginBottom: spacing[24],
    alignItems: "center",
    justifyContent: "center",
  },

  // AppText handles fontFamily, so styles only define size/spacing/colors
  title: {
    fontSize: typography.title,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing[12],
    paddingHorizontal: spacing[8],
  },
  subtitle: {
    fontSize: typography.subtitle,
    lineHeight: 20,
    color: colors.subtext,
    textAlign: "center",
    paddingHorizontal: spacing[10],
  },

  bottomArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing[24],
    paddingBottom: spacing[24],
    backgroundColor: "transparent",
  },

  buttonRow: {
    flexDirection: "row",
    gap: spacing[12],
    alignItems: "center",
    justifyContent: "space-between",
  },

  pillButton: {
    height: 46,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[24],
  },

  skipButton: {
    backgroundColor: colors.pillGray,
    minWidth: 120,
  },
  nextButton: {
    backgroundColor: colors.black,
    minWidth: 120,
  },

  skipText: {
    color: "#2B2B2B",
    fontSize: 15,
  },
  nextText: {
    color: colors.white,
    fontSize: 15,
  },

  getStartedButton: {
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[24],
    width: "100%",
  },
  getStartedText: {
    color: colors.white,
    fontSize: 16,
  },

  pressed: {
    opacity: 0.85,
  },
});
