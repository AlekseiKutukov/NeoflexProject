import moneyDuotone from "./../assets/icons/money_duotone.svg";
import calendarDuotone from "./../assets/icons/сalendar_duotone.svg";
import clockDuotone from "./../assets/icons/clock_duotone.svg";
import bagDuotone from "./../assets/icons/bag_duotone.svg";
import cardDuotone from "./../assets/icons/card_duotone.svg";

export interface AboutCardData {
  id: number;
  img: string;
  title: string;
  description: string;
}

// Массив данных для карточек на странице NeoflexProject/loan-page
export const aboutCards: AboutCardData[] = [
  {
    id: 1,
    img: moneyDuotone,
    title: "Up to 50 000 ₽",
    description: "Cash and transfers without commission and percent",
  },
  {
    id: 2,
    img: calendarDuotone,
    title: "Up to 160 days",
    description: "Without percent on the loan",
  },
  {
    id: 3,
    img: clockDuotone,
    title: "Free delivery",
    description:
      "We will deliver your card by courier at a convenient place and time for you",
  },
  {
    id: 4,
    img: bagDuotone,
    title: "Up to 12 months",
    description:
      "No percent. For equipment, clothes and other purchases in installments",
  },
  {
    id: 5,
    img: cardDuotone,
    title: "Convenient deposit and withdrawal",
    description:
      "At any ATM. Top up your credit card for free with cash or transfer from other cards",
  },
];
