import styles from "./PreliminaryDecision.module.css";

const PreliminaryDecision = () => {
  return (
    <div className={styles.preliminary}>
      <h2 className={styles.preliminary__title}>
        The preliminary decision has been sent to your email.
      </h2>
      <p className={styles.preliminary__text}>
        In the letter you can get acquainted with the preliminary decision on
        the credit card.
      </p>
    </div>
  );
};

export default PreliminaryDecision;
