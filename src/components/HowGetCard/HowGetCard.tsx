import styles from "./HowGetCard.module.css";

const HowGetCard = () => {
  return (
    <section className={styles.howToGetCard}>
      <h2 className={styles.howToGetCard__title}>How to get a card</h2>

      <div className={styles.howToGetCard__steps}>
        <div className={styles.howToGetCard__stepItem}>
          <div className={styles.howToGetCard__stepNumber}>1</div>
          <p className={styles.howToGetCard__stepTitle}>
            Fill out an online application - you do not need to visit the bank
          </p>
          <div className={styles.howToGetCard__stepLine}></div>
        </div>

        <div className={styles.howToGetCard__stepItem}>
          <div className={styles.howToGetCard__stepNumber}>2</div>
          <p className={styles.howToGetCard__stepTitle}>
            Find out the bank's decision immediately after filling out the
            application
          </p>
          <div className={styles.howToGetCard__stepLine}></div>
        </div>

        <div className={styles.howToGetCard__stepItem}>
          <div className={styles.howToGetCard__stepNumber}>3</div>
          <p className={styles.howToGetCard__stepTitle}>
            The bank will deliver the card free of charge, wherever convenient,
            to your city
          </p>
          <div className={styles.howToGetCard__stepLine}></div>
        </div>
      </div>
    </section>
  );
};

export default HowGetCard;
