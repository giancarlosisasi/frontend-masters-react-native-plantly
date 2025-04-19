import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { theme } from "@/theme";
import { PlantlyImage } from "@/components/plantly-image";
import { useState } from "react";
import { PlantlyButton } from "@/components/plantly-button";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { usePlantStore } from "@/store/plants-store";
import { useRouter } from "expo-router";

import * as ImagePicker from "expo-image-picker";

export default function NewScreen() {
  const router = useRouter();
  const addPlant = usePlantStore((s) => s.addPlant);

  const [name, setName] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleSubmit = () => {
    if (!name) {
      return Alert.alert("Validation error", "Give your plant a name");
    }

    if (!days) {
      return Alert.alert(
        "Validation error",
        `How often does ${name} need to be watered?`,
      );
    }

    if (Number.isNaN(Number(days))) {
      return Alert.alert(
        "validation error",
        "Watering frequency must be a number",
      );
    }

    addPlant(name, Number(days), image);
    router.replace("/");
  };

  const handleChooseImage = async () => {
    if (Platform.OS === "web") {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.centered}
        onPress={handleChooseImage}
      >
        <PlantlyImage imageUri={image} />
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="E.g. Casper the Cactus"
        keyboardType="default"
      />
      <Text style={styles.label}>Watering Frequency (every x days)</Text>
      <TextInput
        style={styles.input}
        value={days}
        onChangeText={setDays}
        placeholder="E.g. 6"
        keyboardType="number-pad"
      />
      <PlantlyButton title="Add plant" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
  centered: {
    alignItems: "center",
    marginBottom: 24,
  },
});
