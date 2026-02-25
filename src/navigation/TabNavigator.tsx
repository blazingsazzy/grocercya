// src/navigation/TabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet } from "react-native";

import HomeScreen     from "@/screens/tabs/HomeScreen";
import CartScreen     from "@/screens/tabs/CartScreen";
import FavoriteScreen from "@/screens/tabs/FavoriteScreen";
import ProfileScreen  from "@/screens/tabs/ProfileScreen";

import { colors } from "@/themes/themes";

export type TabParamList = {
  Home:     undefined;
  Cart:     undefined;
  Favorite: undefined;
  Profile:  undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

type IconConfig = {
  active:   string;
  inactive: string;
};

const TAB_ICON: Record<string, IconConfig> = {
  Home:     { active: "home",   inactive: "home-outline" },
  Cart:     { active: "bag",    inactive: "bag-outline" },
  Favorite: { active: "heart",  inactive: "heart-outline" },
  Profile:  { active: "person", inactive: "person-outline" },
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color }) => {
          const icons = TAB_ICON[route.name];
          const iconName = focused ? icons.active : icons.inactive;
          return (
            <Ionicons
              name={iconName as any}
              size={22}
              color={color}
            />
          );
        },

        tabBarActiveTintColor:   colors.black,
        tabBarInactiveTintColor: "#B0B0B0",

        tabBarStyle:      styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      })}
    >
      <Tab.Screen name="Home"     component={HomeScreen} />
      <Tab.Screen name="Cart"     component={CartScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="Profile"  component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth:  StyleSheet.hairlineWidth,
    borderTopColor:  "#E8E8E8",
    elevation:       0,
    shadowOpacity:   0,
    height:          Platform.OS === "ios" ? 82 : 62,
    paddingBottom:   Platform.OS === "ios" ? 24 : 8,
    paddingTop:      8,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
  },
});