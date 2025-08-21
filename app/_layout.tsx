import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import "react-native-reanimated";
import { AccessibilityProvider } from "./ContextProvider";
export default function AppLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("hasOnboarded").then((value: string | null) => {
      setHasOnboarded(value === "true");
    });
  }, []);

  // After successful onboarding:
  // await AsyncStorage.setItem("hasOnboarded", "true");
  if (!loaded || hasOnboarded === null) {
    return null;
  }

  return (
    <AccessibilityProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          {!hasOnboarded ? (
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          )}
          <Stack.Screen
            name="onboarding/learnmore"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="onboarding/signup"
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </AccessibilityProvider>
  );
}
