import { forwardRef, type Ref } from "react";
import { useApplicationStore } from "../../store/applicationStore";
import styles from "./LoanOffers.module.css";
import SurpriseImage from "./../../assets/images/SurpriseImage.svg";
import CheckIcon from "./../../assets/icons/CheckIcon.svg";
import CrossIcon from "./../../assets/icons/CrossIcon.svg";
import { type LoanOffer as LoanOfferType } from "../../store/applicationStore";
interface LoanOfferProps {
  offer: LoanOfferType;
}

const LoanOffer: React.FC<LoanOfferProps> = ({ offer }) => {
  const handleSelect = async () => {
    const payload = {
      ...offer,
    };

    try {
      const res = await fetch("http://localhost:8080/application/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }

      const data = await res.json();
      console.log("Ответ сервера:", data);
      alert("Заявка отправлена!");
    } catch (err) {
      console.error("Ошибка при отправке:", err);
      alert("Ошибка при отправке данных");
    }
  };

  return (
    <div className={styles.loanOffer}>
      <div className={styles.loanOffer__imageContainer}>
        <img src={SurpriseImage} alt="Credit offer" />
      </div>
      <div className={styles.loanOffer__details}>
        <p className={styles.loanOffer__detailItem}>
          Requested amount: {offer.requestedAmount.toLocaleString("ru-RU")} ₽
        </p>
        <p className={styles.loanOffer__detailItem}>
          Total amount: {offer.totalAmount.toLocaleString("ru-RU")} ₽
        </p>
        <p className={styles.loanOffer__detailItem}>For {offer.term} months</p>
        <p className={styles.loanOffer__detailItem}>
          Monthly payment: {offer.monthlyPayment.toLocaleString("ru-RU")} ₽
        </p>
        <p className={styles.loanOffer__detailItem}>Your rate: {offer.rate}%</p>
        <p className={styles.loanOffer__detailItem}>
          Insurance included:
          <img
            src={offer.isInsuranceEnabled ? CheckIcon : CrossIcon}
            alt={offer.isInsuranceEnabled ? "Yes" : "No"}
            className={styles.loanOffer__icon}
          />
        </p>
        <p className={styles.loanOffer__detailItem}>
          Salary client:
          <img
            src={offer.isSalaryClient ? CheckIcon : CrossIcon}
            alt={offer.isSalaryClient ? "Yes" : "No"}
            className={styles.loanOffer__icon}
          />
        </p>
      </div>
      <button className={styles.loanOffer__button} onClick={handleSelect}>
        Select
      </button>
    </div>
  );
};

const LoanOffers = forwardRef((_props, ref: Ref<HTMLDivElement>) => {
  const { offers } = useApplicationStore();

  const sortedOffers = [...offers].sort((a, b) => b.rate - a.rate);

  return (
    <div ref={ref} className={styles.loanOffersList}>
      {sortedOffers.map((offer, index) => (
        <LoanOffer key={index} offer={offer} />
      ))}
    </div>
  );
});

export default LoanOffers;
