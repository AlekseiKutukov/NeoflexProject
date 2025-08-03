export interface FaqItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    id: 1,
    category: "Issuing and receiving a card",
    question: "How to get a card?",
    answer:
      "We will deliver your card by courier free of charge. Delivery in Moscow and St. Petersburg - 1-2 working days. For other regions of the Russian Federation - 2-5 working days.",
  },
  {
    id: 2,
    category: "Issuing and receiving a card",
    question: "What documents are needed and how should one be to get a card?",
    answer: "Need a passport. You must be between 20 and 70 years old.",
  },
  {
    id: 3,
    category: "Issuing and receiving a card",
    question: "In what currency can I issue a card?",
    answer: "In rubles, dollars or euro",
  },
  {
    id: 4,
    category: "Issuing and receiving a card",
    question: "How much income do I need to get a credit card?",
    answer:
      "To obtain a credit card, you will need an income of at least 25,000 rubles per month after taxes.",
  },
  {
    id: 5,
    category: "Issuing and receiving a card",
    question: "How do I find out about the bank's decision on my application?",
    answer:
      "After registration, you will receive an e-mail with a decision on your application.",
  },
  {
    id: 6,
    category: "Using a credit card",
    question: "What is an interest free credit card?",
    answer:
      "A credit card with a grace period is a bank card with an established credit limit, designed for payment, reservation of goods and services, as well as for receiving cash, which allows you to use credit funds free of charge for a certain period.",
  },
  {
    id: 7,
    category: "Using a credit card",
    question: "How to activate credit card",
    answer:
      "You can activate your credit card and generate a PIN code immediately after receiving the card at a bank branch using a PIN pad.",
  },
  {
    id: 8,
    category: "Using a credit card",
    question: "What is a settlement date?",
    answer:
      "The settlement date is the date from which you can pay off the debt for the reporting period. The settlement date falls on the first calendar day following the last day of the reporting period. The first settlement date is reported by the bank when transferring the issued credit card to the client, and then in the monthly account statement.",
  },
  {
    id: 9,
    category: "Using a credit card",
    question: "What do I need to know about interest rates?",
    answer:
      "For each reporting period from the 7th day of the previous month to the 6th day of the current month inclusive, a statement is generated for the credit card. The statement contains information on the amount and timing of the minimum payment, as well as the total amount of debt as of the date of issue.",
  },
];

// сгруппируем вопросы по категориям
export const groupedFaqData = faqData.reduce(
  (acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  },
  {} as Record<string, FaqItem[]>
);
