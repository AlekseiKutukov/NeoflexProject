import type { CardDetail } from "../../../data/ratesConditions";
import { cardDetails } from "../../../data/ratesConditions";

import styles from "./RatesTab.module.css";

const RatesTab = () => {
  return (
    <div className={styles.ratesContainer}>
      {cardDetails.map((detail: CardDetail, index: number) => (
        <div key={detail.id}>
          <div className={styles.ratesContainer__item}>
            <div className={styles.ratesContainer__label}>{detail.label}</div>
            <div className={styles.ratesContainer__value}>
              {/* Если значение содержит '\n', разбиваем на несколько строк */}
              {detail.value.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          {/* Добавляем разделитель после каждого элемента, кроме последнего */}
          {index < cardDetails.length - 1 && (
            <div className={styles.ratesContainer__divider}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RatesTab;
