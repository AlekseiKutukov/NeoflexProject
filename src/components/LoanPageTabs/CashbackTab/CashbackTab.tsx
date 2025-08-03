import { cashbackCategories } from "../../../data/cashbackData";
import type { CashbackData } from "../../../data/cashbackData";
import styles from "./CashbackTab.module.css";

const CashbackTab = () => {
  return (
    <section className={styles.cashbackFlex}>
      {cashbackCategories.map((card: CashbackData) => (
        <div key={card.id} className={styles.cashbackFlex__item}>
          <p className={styles.cashbackFlex__description}>{card.description}</p>
          <h3 className={styles.cashbackFlex__title}>{card.title}</h3>
        </div>
      ))}
    </section>
  );
};

export default CashbackTab;
