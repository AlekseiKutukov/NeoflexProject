import type { RefObject } from "react";
import Tooltip from "../../../components/UI/Tooltip/Tooltip";
import styles from "./CreditCard.module.css";
import Button from "../../../components/UI/Button/Button";
import cardImage1 from "./../../../assets/images/cardImage1.png";

interface CreditCardProps {
  targetRef: RefObject<HTMLDivElement | null>;
}

const CreditCard: React.FC<CreditCardProps> = ({ targetRef }) => {
  const handleClickApplyForCard = () => {
    targetRef.current!.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
            <Tooltip
              content="When repaying the full debt up to 160 days."
              position="bottom"
            >
              <span className={styles.cardPromo__conditionsValue}>
                Up to 160 days
              </span>
            </Tooltip>
            <span className={styles.cardPromo__conditionsLabel}>
              No percent
            </span>
          </div>
          <div className={styles.cardPromo__conditionsItem}>
            <Tooltip
              content="Over the limit willaccrue percent"
              position="bottom"
            >
              <span className={styles.cardPromo__conditionsValue}>
                Up to 600 000 ₽
              </span>
            </Tooltip>
            <span className={styles.cardPromo__conditionsLabel}>
              Credit limit
            </span>
          </div>
          <div className={styles.cardPromo__conditionsItem}>
            <Tooltip
              content="Promotion valid until December 31, 2022."
              position="bottom"
            >
              <span className={styles.cardPromo__conditionsValue}>0 ₽</span>
            </Tooltip>
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
          width="380"
          height="226"
          className={styles.cardPromo__cardImage}
        />
      </div>
    </section>
  );
};

export default CreditCard;
