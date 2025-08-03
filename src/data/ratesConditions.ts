export interface CardDetail {
  id: number;
  label: string;
  value: string;
}

export const cardDetails: CardDetail[] = [
  {
    id: 1,
    label: "Card currency",
    value: "Rubles, dollars, euro",
  },
  {
    id: 2,
    label: "Interest free period",
    value: "0% up to 160 days",
  },
  {
    id: 3,
    label: "Payment system",
    value: "Mastercard, Visa",
  },
  {
    id: 4,
    label: "Maximum credit limit on the card",
    value: "600 000 ₽",
  },
  {
    id: 5,
    label: "Replenishment and withdrawal",
    value:
      "At any ATM. Top up your credit card for free with cash or transfer from other cards",
  },
  {
    id: 6,
    label: "Max cashback per month",
    value: "15 000 ₽",
  },
  {
    id: 7,
    label: "Transaction Alert",
    value:
      "60 ₽ — SMS or push notifications\n0 ₽ — card statement, information about transactions in the online bank",
  },
];
