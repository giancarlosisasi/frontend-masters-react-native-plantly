import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";

import * as QuickActions from "expo-quick-actions";
import { Platform } from "react-native";

import { useQuickActionRouting } from "expo-quick-actions/router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useQuickActionRouting();

  useEffect(() => {
    QuickActions.setItems([
      {
        title: "Add a plant",
        icon: Platform.OS === "ios" ? "symbol:leaf" : "leaf",
        id: "0",
        params: {
          // because we are using the hook useQuickActionRouting, the redirection will be handled by the router automatically
          // the `href` is required for that
          href: "/new",
        },
      },
    ]);
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          presentation: "modal",
          title: "New plant",
        }}
      />
    </Stack>
  );
}
