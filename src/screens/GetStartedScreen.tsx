import React, { useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneInput from "react-native-phone-number-input";
import CountryPicker, { Country } from "react-native-country-picker-modal";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";

import AppText from "@/components/AppText";
import { colors, radius, spacing } from "@/themes/themes";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "GetStarted">;

export default function GetStartedScreen({ navigation }: Props) {
  const phoneRef = useRef<PhoneInput>(null);

  // Default to Nigeria (matches your example use-case)
  const [countryCode, setCountryCode] = useState<string>("NG"); // ISO2 (cca2)
  const [callingCode, setCallingCode] = useState<string>("234");

  const [showHelper, setShowHelper] = useState(false);

  // Stored values (as requested)
  const [rawNationalDigits, setRawNationalDigits] = useState<string>(""); // digits only (national part)
  const [displayValue, setDisplayValue] = useState<string>(""); // what user sees (auto formatted)
  const [phoneE164, setPhoneE164] = useState<string>(""); // +234812...

  const [error, setError] = useState<string>("");

  const formatter = useMemo(() => new AsYouType(countryCode as any), [countryCode]);

  const openCountryPicker = () => {
    setPickerVisible(true);
  };

  const [pickerVisible, setPickerVisible] = useState(false);

  const onSelectCountry = (c: Country) => {
    setPickerVisible(false);

    const cca2 = c.cca2;
    const cc = Array.isArray(c.callingCode) ? c.callingCode[0] : (c.callingCode as any);

    setCountryCode(cca2);
    setCallingCode(cc ?? "");

    // Re-format current digits for new country rules
    const digits = rawNationalDigits;
    const nextDisplay = new AsYouType(cca2 as any).input(digits);
    setDisplayValue(nextDisplay);

    // recompute e164 and validate
    const nextE164 = digits ? `+${cc}${digits}` : "";
    setPhoneE164(nextE164);

    if (digits) {
      const valid = validatePhone(nextE164, cca2);
      setError(valid ? "" : "Enter a valid phone number");
    } else {
      setError("");
    }
  };

  const validatePhone = (e164: string, cca2: string) => {
    const parsed = parsePhoneNumberFromString(e164, cca2 as any);
    return !!parsed?.isValid();
  };

  const onChangeNumber = (text: string) => {
    // keep only digits (numeric keyboard still can include spaces on some devices)
    const digits = text.replace(/\D/g, "");
    setRawNationalDigits(digits);

    // As-you-type formatting for display
    const nextDisplay = new AsYouType(countryCode as any).input(digits);
    setDisplayValue(nextDisplay);

    // Build E.164
    const nextE164 = digits ? `+${callingCode}${digits}` : "";
    setPhoneE164(nextE164);

    // Live validation (error disappears when valid)
    if (!digits) {
      setError("");
      return;
    }

    const valid = validatePhone(nextE164, countryCode);
    setError(valid ? "" : "Enter a valid phone number");
  };

  const onContinue = () => {
    const digits = rawNationalDigits.trim();
    const e164 = phoneE164;

    if (!digits || !e164) {
      setError("Enter a valid phone number");
      return;
    }

    const valid = validatePhone(e164, countryCode);
    if (!valid) {
      setError("Enter a valid phone number");
      return;
    }

    setError("");
    navigation.navigate("OTP", { phoneE164: e164 });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <AppText variant="semibold" style={styles.title}>
                Get started
              </AppText>

              <AppText variant="regular" style={styles.subtitle}>
                You can log in or make an account if you're new
              </AppText>
            </View>

            <Pressable
              onPress={() => setShowHelper((v) => !v)}
              style={({ pressed }) => [styles.helpIcon, pressed && styles.pressed]}
              hitSlop={10}
            >
              <AppText variant="semibold" style={styles.helpText}>
                ?
              </AppText>
            </Pressable>
          </View>

          {showHelper ? (
            <AppText variant="regular" style={styles.helper}>
              Choose your country and input your number there
            </AppText>
          ) : null}

          {/* Label */}
          <AppText variant="medium" style={styles.label}>
            Enter your phone number
          </AppText>

          {/* Phone input row */}
          <View style={styles.phoneRow}>
            {/* Left: flag + dial code (tap opens country picker) */}
            <Pressable
              onPress={openCountryPicker}
              style={({ pressed }) => [styles.countryBox, pressed && styles.pressed]}
            >
              {/* We use the CountryPicker modal, but render nothing here (we draw our own compact UI) */}
              <CountryPicker
                withFilter
                withFlag
                withCallingCode
                withCallingCodeButton={false}
                withCountryNameButton={false}
                visible={pickerVisible}
                onClose={() => setPickerVisible(false)}
                onSelect={onSelectCountry}
                countryCode={countryCode as any}
                
              />

              <AppText style={styles.flagAndCode}>
                {/* PhoneInput keeps flags internally, but we prefer simple stable layout here */}
                {/* CountryPicker will still show flags in the modal list */}
                +{callingCode}
              </AppText>
            </Pressable>

            {/* Right: number input (auto formatted display, numeric keyboard) */}
            <View style={styles.inputBox}>
              {/* We keep PhoneInput in the tree to satisfy library use + future extensions */}
              <PhoneInput
                ref={phoneRef}
                defaultCode={countryCode as any}
                layout="first"
                containerStyle={styles.hiddenPhoneContainer}
                textContainerStyle={styles.hiddenPhoneTextContainer}
                textInputStyle={styles.hiddenPhoneTextInput}
              />

              <TextInput
                value={displayValue}
                onChangeText={onChangeNumber}
                placeholder="Phone Number"
                placeholderTextColor="#A7A7A7"
                keyboardType="number-pad"
                style={styles.input}
                maxLength={20}
              />
            </View>
          </View>

          {error ? (
            <AppText variant="regular" style={styles.error}>
              {error}
            </AppText>
          ) : null}

          {/* Continue button */}
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
    paddingTop: spacing[16],
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: spacing[16],
  },
  headerLeft: { flex: 1, paddingRight: spacing[16] },

  title: {
    fontSize: 22,
    color: colors.text,
    marginBottom: spacing[8],
  },
  subtitle: {
    fontSize: 13,
    color: colors.subtext,
    lineHeight: 18,
  },

  helpIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },
  helpText: { fontSize: 15, color: "#4A4A4A" },

  helper: {
    fontSize: 12,
    color: "#6A6A6A",
    marginTop: -spacing[8],
    marginBottom: spacing[16],
  },

  label: {
    fontSize: 12,
    color: "#4A4A4A",
    marginBottom: spacing[10],
  },

  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[12],
  },

  countryBox: {
    height: 48,
    flex: 0.35,
    borderRadius: 10,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[12],
  },
  flagAndCode: {
    fontSize: 14,
    color: colors.text,
  },

  inputBox: {
    flex: 0.65,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: spacing[14],
    justifyContent: "center",
  },
  input: {
    fontSize: 14,
    color: colors.text,
    paddingVertical: 0,
  },

  error: {
    color: "#D0342C",
    fontSize: 12,
    marginTop: spacing[10],
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

  pressed: { opacity: 0.85 },

  // We keep the PhoneInput mounted (library requirement), but visually hidden.
  hiddenPhoneContainer: { width: 0, height: 0, opacity: 0, position: "absolute" },
  hiddenPhoneTextContainer: { width: 0, height: 0 },
  hiddenPhoneTextInput: { width: 0, height: 0 },
});
