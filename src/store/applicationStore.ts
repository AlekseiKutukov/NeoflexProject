import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LoanOffer {
  applicationId: number;
  requestedAmount: number;
  totalAmount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
}

interface ApplicationState {
  offers: LoanOffer[];
  setOffers: (offers: LoanOffer[]) => void;
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set) => ({
      offers: [],
      setOffers: (offers) => set({ offers }),
    }),
    {
      name: "loan-application-state",
    }
  )
);
