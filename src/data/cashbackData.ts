export interface CashbackData {
  id: number;
  title: string;
  description: string;
}

export const cashbackCategories: CashbackData[] = [
  {
    id: 1,
    description: "For food delivery, cafes and restaurants",
    title: "5%",
  },
  {
    id: 2,
    description: "In supermarkets with our subscription",
    title: "5%",
  },
  {
    id: 3,
    description: "In clothing stores and children's goods",
    title: "2%",
  },
  {
    id: 4,
    description: "Other purchases and payment of services and fines",
    title: "1%",
  },
  {
    id: 5,
    description: "Shopping in online stores",
    title: "up to 3%",
  },
  {
    id: 6,
    description: "Purchases from our partners",
    title: "30%",
  },
];
