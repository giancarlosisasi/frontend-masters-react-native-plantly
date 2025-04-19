import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import * as FileSystem from "expo-file-system";

export type TPlant = {
  id: string;
  name: string;
  wateringFrequencyDays: number;
  lastWateredAtTimestamp?: number;
  imageUri?: string;
};

type TPlantStore = {
  nextId: number;
  plants: TPlant[];
};

type TPlantStoreActions = {
  addPlant: (
    name: string,
    wateringFrequencyDays: number,
    imageUri?: string,
  ) => Promise<void>;
  removePlant: (id: string) => void;
  waterPlant: (id: string) => void;
};

export const usePlantStore = create(
  persist<TPlantStore & TPlantStoreActions>(
    (set) => ({
      plants: [],
      nextId: 1,
      addPlant: async (
        name: string,
        wateringFrequencyDays: number,
        imageUri?: string,
      ) => {
        const savedImageUri =
          FileSystem.documentDirectory +
          `${new Date().getTime()}-${imageUri?.split("/").slice(-1)[0]}`;

        if (imageUri) {
          await FileSystem.copyAsync({
            from: imageUri,
            to: savedImageUri,
          });
        }

        return set((state) => {
          return {
            ...state,
            nextId: state.nextId + 1,
            plants: [
              {
                id: String(state.nextId),
                name,
                wateringFrequencyDays,
                imageUri: imageUri ? savedImageUri : undefined,
              },
              ...state.plants,
            ],
          };
        });
      },
      removePlant: (id: string) => {
        return set((state) => {
          return {
            ...state,
            plants: state.plants.filter((plant) => plant.id !== id),
          };
        });
      },
      waterPlant: (id: string) => {
        return set((state) => {
          return {
            ...state,
            plants: state.plants.map((plant) => {
              if (plant.id === id) {
                return {
                  ...plant,
                  lastWateredAtTimestamp: Date.now(),
                };
              }

              return plant;
            }),
          };
        });
      },
    }),
    {
      name: "plantly-plants-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
