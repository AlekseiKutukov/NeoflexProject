import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProgressState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  canNavigate: (step: number) => boolean;
  getStepUrl: (step: number) => string | undefined;
}

const stepUrls: { [key: number]: string } = {
  1: "/loan",
  2: "/loan/:applicationId",
  3: "/loan/:applicationId/document",
  4: "/loan/:applicationId/document/sign",
  5: "/loan/:applicationId/code",
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      setCurrentStep: (step: number) => set({ currentStep: step }),
      canNavigate: (step: number) => step <= get().currentStep,
      getStepUrl: (step: number) => stepUrls[step],
    }),
    {
      name: "loan-progress-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
