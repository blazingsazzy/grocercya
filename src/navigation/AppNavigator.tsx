import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import GetStartedScreen from "../screens/GetStartedScreen";
import OtpScreen from "../screens/Otpscreen";
import SelectCategoryScreen from "../screens/SelectCategoryScreen";
import SetLocationScreen from "../screens/SetLocationScreen";
import EnableNotificationScreen from "../screens/EnableNotificationScreen";
import TabNavigator            from "@/navigation/TabNavigator";


export type RootStackParamList = {
 
  Onboarding: undefined;
  GetStarted: undefined;
  OTP: { phoneE164: string };
  SelectCategory: undefined;
  SetLocation: undefined;
  EnableNotification: undefined;
  MainTabs:            undefined;


};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
     <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="OTP" component={OtpScreen} />
      <Stack.Screen name="SelectCategory" component={SelectCategoryScreen} />
      <Stack.Screen name="SetLocation" component={SetLocationScreen} />
      <Stack.Screen name="EnableNotification" component={EnableNotificationScreen} />
      <Stack.Screen name="MainTabs"           component={TabNavigator} />

      
    </Stack.Navigator>
  );
}
