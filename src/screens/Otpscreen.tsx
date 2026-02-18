import React, { useMemo, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/AppNavigator";
import AppText from "@/components/AppText";
import { colors, radius, spacing } from "@/themes/themes";

type Props = NativeStackScreenProps<RootStackParamList, "OTP">;

const OTP_LENGTH = 6; // set to 4 if you want 4 boxes

export default function OtpScreen({ navigation, route }: Props) {
  const { phoneE164 } = route.params;

  const [showHelper, setShowHelper] = useState(false);
  const [error, setError] = useState("");

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const otpValue = useMemo(() => digits.join(""), [digits]);
  const isComplete = otpValue.length === OTP_LENGTH && !digits.includes("");
  const insets = useSafeAreaInsets();

  const focusIndex = (i: number) => {
    inputsRef.current[i]?.focus();
  };

  const onChangeAt = (index: number, value: string) => {
    // allow only digits
    const cleaned = value.replace(/\D/g, "");

    // If user pasted multiple digits, distribute across boxes
    if (cleaned.length > 1) {
      const next = [...digits];
      let writeIndex = index;

      for (const ch of cleaned) {
        if (writeIndex >= OTP_LENGTH) break;
        next[writeIndex] = ch;
        writeIndex += 1;
      }

      setDigits(next);
      setError("");

      // focus next empty or last
      const nextFocus = Math.min(writeIndex, OTP_LENGTH - 1);
      focusIndex(nextFocus);
      return;
    }

    const next = [...digits];
    next[index] = cleaned; // either "" or "digit"
    setDigits(next);

    // remove error as user fixes input
    if (error) setError("");

    // auto-focus next when a digit is entered
    if (cleaned && index < OTP_LENGTH - 1) {
      focusIndex(index + 1);
    }
  };

  const onKeyPressAt = (index: number, key: string) => {
    if (key === "Backspace") {
      // If current box is empty, move back
      if (digits[index] === "" && index > 0) {
        const prev = index - 1;
        focusIndex(prev);

        // Optional: clear previous when backspacing into it (matches many OTP UX)
        const next = [...digits];
        next[prev] = "";
        setDigits(next);
      }
    }
  };

  const onContinue = () => {
    if (!isComplete) {
      setError("Enter the complete OTP");
      return;
    }

  //  Navigate to category screen
  navigation.navigate("SelectCategory");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          {/* Top bar */}
          <View style={styles.topBar}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
              hitSlop={10}
            >
              <AppText variant="semibold" style={styles.backIcon}>
                ←
              </AppText>
            </Pressable>

            <Pressable
              onPress={() => setShowHelper((v) => !v)}
              style={({ pressed }) => [styles.iconBtn, styles.helpBtn, pressed && styles.pressed]}
              hitSlop={10}
            >
              <AppText variant="semibold" style={styles.helpIcon}>
                ?
              </AppText>
            </Pressable>
          </View>

          {showHelper ? (
            <AppText style={styles.helper}>
              Enter the code we sent to your phone number.
            </AppText>
          ) : null}

          {/* Title + subtitle */}
          <AppText variant="semibold" style={styles.title}>
            Enter your OTP number
          </AppText>

          <AppText style={styles.subtitle}>
            We’ve sent the OTP number via SMS to{"\n"}
            <AppText variant="semibold" style={styles.phoneText}>
              {phoneE164}
            </AppText>
          </AppText>

          {/* OTP boxes */}
          <View style={styles.otpRow}>
            {Array.from({ length: OTP_LENGTH }).map((_, i) => (
              <TextInput
                key={i}
                ref={(r) => {
                  inputsRef.current[i] = r;
                }}
                value={digits[i]}
                onChangeText={(v) => onChangeAt(i, v)}
                onKeyPress={({ nativeEvent }) => onKeyPressAt(i, nativeEvent.key)}
                style={styles.otpBox}
                keyboardType="number-pad"
                returnKeyType="done"
                maxLength={1}
                textAlign="center"
                placeholder=""
                selectionColor={colors.black}
                autoFocus={i === 0}
              />
            ))}
          </View>

          {error ? (
            <AppText style={styles.error}>{error}</AppText>
          ) : (
            <View style={{ height: 18 }} />
          )}

          {/* Continue button */}
          <View style={[styles.bottom, { paddingBottom: insets.bottom + 12 }]}>

            <Pressable
              onPress={onContinue}
              style={({ pressed }) => [styles.continueBtn, pressed && styles.pressed]}
            >
              <AppText variant="medium" style={styles.continueText}>
                Continue
              </AppText>
            </Pressable>

            {/* Optional tiny policy line like screenshot */}
            <AppText style={styles.policy}>
              By clicking, I accept the{" "}
              <AppText variant="semibold" style={styles.policyBold}>
                Terms and Conditions
              </AppText>{" "}
              &{" "}
              <AppText variant="semibold" style={styles.policyBold}>
                Privacy Policy
              </AppText>
            </AppText>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: colors.white },

  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing[24],
    paddingTop: spacing[10],
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[10],
  },

  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  backIcon: {
    fontSize: 22,
    color: colors.text,
    marginTop: -2,
  },

  helpBtn: {
    backgroundColor: "#F1F1F1",
  },
  helpIcon: {
    fontSize: 15,
    color: "#4A4A4A",
  },

  helper: {
    fontSize: 12,
    color: "#6A6A6A",
    marginBottom: spacing[12],
  },

  title: {
    fontSize: 18,
    color: colors.text,
    marginTop: spacing[8],
    marginBottom: spacing[8],
  },

  subtitle: {
    fontSize: 12,
    color: colors.subtext,
    lineHeight: 18,
    marginBottom: spacing[20],
  },
  phoneText: {
    fontSize: 12,
    color: colors.text,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing[12],
    marginTop: spacing[8],
  },

  otpBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F3F3F3",
    fontSize: 16,
    color: colors.text,
  },

  error: {
    marginTop: spacing[10],
    fontSize: 12,
    color: "#D0342C",
    textAlign: "center",
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
    color: colors.white,
    fontSize: 14,
  },

  policy: {
    marginTop: spacing[10],
    fontSize: 10,
    lineHeight: 14,
    color: "#7A7A7A",
    textAlign: "center",
  },
  policyBold: {
    fontSize: 10,
    color: colors.text,
  },

  pressed: { opacity: 0.85 },
});
