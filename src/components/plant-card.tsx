import { TPlant } from "@/store/plants-store";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { PlantlyImage } from "./plantly-image";
import { theme } from "@/theme";
import { Link } from "expo-router";

export function PlantCard({ plant }: { plant: TPlant }) {
  return (
    <Link href={`/plants/${plant.id}`} asChild>
      <Pressable style={styles.plantCard}>
        <PlantlyImage size={100} imageUri={plant.imageUri} />
        <View style={styles.details}>
          <Text numberOfLines={1} style={styles.plantName}>
            {plant.name}
          </Text>
          <Text style={styles.subtitle}>
            Water every {plant.wateringFrequencyDays} days
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  plantCard: {
    flexDirection: "row",
    shadowColor: theme.colorBlack,
    backgroundColor: theme.colorWhite,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    // only for iOS
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    // only for Android
    elevation: 3,
  },
  details: {
    padding: 14,
    justifyContent: "center",
  },
  plantName: {
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle: {
    color: theme.colorGrey,
  },
});
