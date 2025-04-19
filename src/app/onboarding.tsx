import { PlantlyButton } from "@/components/plantly-button";
import { useUserStore } from "@/store/user-store";
import { theme } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { PlantlyImage } from "@/components/plantly-image";

export default function OnboardingScreen() {
  const router = useRouter();
  const toggleHadOnboarded = useUserStore((state) => state.toggleHadOnboarded);

  const handlePress = () => {
    toggleHadOnboarded();
    router.replace("/");
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colorGreen, theme.colorAppleGreen, theme.colorLimeGreen]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 1, y: 0.5 }}
    >
      <StatusBar style="light" />
      <View>
        <Text style={styles.heading}>Plantly</Text>
        <Text style={styles.tagLine}>
          Keep your plants healthy and hydrated
        </Text>
      </View>
      <PlantlyImage />
      <PlantlyButton title="Let me in!" onPress={handlePress} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  heading: {
    fontSize: 42,
    color: theme.colorWhite,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  tagLine: {
    fontSize: 18,
    color: theme.colorWhite,
    textAlign: "center",
  },
});
