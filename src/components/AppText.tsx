import React from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import { fonts, colors } from "@/themes/themes";

type Variant = "regular" | "medium" | "semibold" | "bold";

type AppTextProps = TextProps & {
  variant?: Variant;
  style?: StyleProp<TextStyle>;
};

export default function AppText({
  variant = "regular",
  style,
  children,
  ...rest
}: AppTextProps) {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily: fonts[variant],
          color: colors.text,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
