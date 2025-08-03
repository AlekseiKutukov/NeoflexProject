import { aboutCards } from "./../../../data/aboutCardsData";
import type { AboutCardData } from "./../../../data/aboutCardsData";

import styles from "./AboutCardTab.module.css";

const AboutCardTab = () => {
  return (
    <section className={styles.aboutCardFlex}>
      {aboutCards.map((card: AboutCardData) => (
        <div key={card.id} className={styles.aboutCardFlex__card}>
          <img
            src={card.img}
            alt={card.title}
            width="40"
            height="40"
            className={styles.aboutCardFlex__image}
          />
          <h3 className={styles.aboutCardFlex__title}>{card.title}</h3>
          {
            <p className={styles.aboutCardFlex__description}>
              {card.description}
            </p>
          }
        </div>
      ))}
    </section>
  );
};

export default AboutCardTab;
