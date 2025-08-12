import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoanOffer {
  requestedAmount: number;
  totalAmount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  insuranceIncluded: boolean;
  salaryClient: boolean;
}

interface ApplicationState {
  amount: number;
  term: string;
  offers: LoanOffer[];
  setAmount: (amount: number) => void;
  setTerm: (term: string) => void;
  setOffers: (offers: LoanOffer[]) => void;
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set) => ({
      amount: 150000,
      term: "6 month",
      offers: [],
      setAmount: (amount) => set({ amount }),
      setTerm: (term) => set({ term }),
      setOffers: (offers) => set({ offers }),
    }),
    {
      name: "loan-application-state",
    }
  )
);
