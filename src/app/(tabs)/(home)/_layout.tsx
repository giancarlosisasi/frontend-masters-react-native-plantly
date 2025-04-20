import { Link, Stack } from "expo-router";
import { theme } from "@/theme";

import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable } from "react-native";

// make sure to always render the index screen first
// so if the user comes from a deep link, it will show the back button in the header
export const unstable_settings = {
  initialRouteName: "index",
};

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable hitSlop={20}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={theme.colorGreen}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="plants/[plantId]"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
}
