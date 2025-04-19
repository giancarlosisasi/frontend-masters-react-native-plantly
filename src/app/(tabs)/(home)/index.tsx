// import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet } from "react-native";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { usePlantStore } from "@/store/plants-store";
import { PlantCard } from "@/components/plant-card";
import { PlantlyButton } from "@/components/plantly-button";

export default function Home() {
  const router = useRouter();
  const plants = usePlantStore((s) => s.plants);

  return (
    // <View style={styles.container}>
    //   <Text>Hello world</Text>
    //   <StatusBar style="auto" />
    // </View>
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={plants}
      renderItem={({ item }) => <PlantCard plant={item} />}
      ListEmptyComponent={
        <PlantlyButton
          title="Add your first plan"
          onPress={() => {
            router.navigate("/new");
          }}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    padding: 12,
  },
});
