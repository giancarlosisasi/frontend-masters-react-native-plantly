import { StyleSheet, View } from "react-native";
import { theme } from "@/theme";
import { useUserStore } from "@/store/user-store";
import { PlantlyButton } from "@/components/plantly-button";

export default function Profile() {
  const toggleHadOnboarded = useUserStore((state) => state.toggleHadOnboarded);

  const handlePress = () => {
    toggleHadOnboarded();
  };

  return (
    <View style={styles.container}>
      <PlantlyButton title="Back to onboarding" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
