import styles from "./CreditCard.module.css";
import Button from "../../../components/UI/Button/Button";
import cardImage1 from "./../../../assets/images/cardImage1.png";

const CreditCard = () => {
  const handleClickApplyForCard = () => {
    console.log("klac klac");
  };

  return (
    <section className={styles.cardPromo}>
      <div className={styles.cardPromo__textColumn}>
        <h1 className={styles.cardPromo__title}>
          Platinum digital credit card
        </h1>
        <div className={styles.cardPromo__description}>
          Our best credit card. Suitable for everyday spending and shopping.
          Cash withdrawals and transfers without commission and interest.
        </div>
        <div className={styles.cardPromo__conditions}>
          <div className={styles.cardPromo__conditionsItem}>
            <span className={styles.cardPromo__conditionsValue}>
              Up to 160 days
            </span>
            <span className={styles.cardPromo__conditionsLabel}>
              No percent
            </span>
          </div>
          <div className={styles.cardPromo__conditionsItem}>
            <span className={styles.cardPromo__conditionsValue}>
              Up to 600 000 ₽
            </span>
            <span className={styles.cardPromo__conditionsLabel}>
              Credit limit
            </span>
          </div>
          <div className={styles.cardPromo__conditionsItem}>
            <span className={styles.cardPromo__conditionsValue}>0 ₽</span>
            <span className={styles.cardPromo__conditionsLabel}>
              Card service is free
            </span>
          </div>
        </div>
        <Button
          onClick={handleClickApplyForCard}
          variant="blue"
          className={styles.cardPromo__button}
          aria-label="Apply For Card"
        >
          Apply For Card
        </Button>
      </div>
      <div className={styles.cardPromo__imageColumn}>
        <img
          src={cardImage1}
          alt="Platinum digital credit card"
          width="250"
          height="150"
          className={styles.cardProm__cardImage}
        />
      </div>
    </section>
  );
};

export default CreditCard;
