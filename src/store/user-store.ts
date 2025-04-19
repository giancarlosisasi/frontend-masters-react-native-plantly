import { create } from "zustand";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type TUserStore = {
  hasFinishedOnboarding: boolean;
};

type TActions = {
  toggleHadOnboarded: () => void;
};

export const useUserStore = create(
  persist<TUserStore & TActions>(
    (set) => ({
      hasFinishedOnboarding: false,
      toggleHadOnboarded: () =>
        set((state) => {
          return {
            ...state,
            hasFinishedOnboarding: !state.hasFinishedOnboarding,
          };
        }),
    }),
    {
      name: "plantly-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
