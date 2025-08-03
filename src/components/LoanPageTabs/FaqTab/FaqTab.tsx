import Accordion from "../../UI/Accordion/Accordion";
import { groupedFaqData } from "../../../data/faqData";
const FaqTab = () => {
  // Получаем массив названий категорий (ключей объекта groupedFaqData)
  const categories = Object.keys(groupedFaqData);

  return (
    <>
      {categories.map((category) => (
        <Accordion
          key={category}
          sectionTitle={category}
          items={groupedFaqData[category]}
        />
      ))}
    </>
  );
};

export default FaqTab;
