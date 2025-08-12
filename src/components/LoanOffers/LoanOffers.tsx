import { useApplicationStore } from "../../store/applicationStore";
import styles from "./LoanOffers.module.css";
import SurpriseImage from "./../../assets/images/SurpriseImage.svg";
import CheckIcon from "./../../assets/icons/CheckIcon.svg";
import CrossIcon from "./../../assets/icons/CrossIcon.svg";

const parseTerm = (termString: string): number => {
  const parts = termString.split(" ");
  const termNumber = parseInt(parts[0], 10);
  return termNumber;
};

const monthlyPayment = (amount: number, rate: number, term: number): number => {
  const percent = (amount * rate) / 100; // проценты
  const result = (amount + percent) / term;
  return Math.round(result);
};

interface LoanOfferProps {
  rate: number;
  insuranceIncluded: boolean;
  salaryClient: boolean;
}

const LoanOffer: React.FC<LoanOfferProps> = ({
  rate,
  insuranceIncluded,
  salaryClient,
}) => {
  const { amount, term } = useApplicationStore();

  return (
    <div className={styles.loanOffer}>
      <div className={styles.loanOffer__imageContainer}>
        <img src={SurpriseImage} alt="Credit offer" />
      </div>
      <div className={styles.loanOffer__details}>
        <p className={styles.loanOffer__detailItem}>
          Requested amount: {amount.toLocaleString("ru-RU")} ₽
        </p>
        <p className={styles.loanOffer__detailItem}>
          Total amount: {amount.toLocaleString("ru-RU")} ₽
        </p>
        <p className={styles.loanOffer__detailItem}>
          For {parseTerm(term)} months
        </p>
        <p className={styles.loanOffer__detailItem}>
          Monthly payment:{" "}
          {monthlyPayment(amount, rate, parseTerm(term)).toLocaleString(
            "ru-RU"
          )}{" "}
          ₽
        </p>
        <p className={styles.loanOffer__detailItem}>Your rate: {rate}%</p>
        <p className={styles.loanOffer__detailItem}>
          Insurance included:
          <img
            src={insuranceIncluded ? CheckIcon : CrossIcon}
            alt={insuranceIncluded ? "Yes" : "No"}
            className={styles.loanOffer__icon}
          />
        </p>
        <p className={styles.loanOffer__detailItem}>
          Salary client:
          <img
            src={salaryClient ? CheckIcon : CrossIcon}
            alt={salaryClient ? "Yes" : "No"}
            className={styles.loanOffer__icon}
          />
        </p>
      </div>
      <button className={styles.loanOffer__button}>Select</button>
    </div>
  );
};

const LoanOffers = () => {
  const offers = [
    {
      rate: 15,
      insuranceIncluded: false,
      salaryClient: false,
    },
    {
      rate: 14,
      insuranceIncluded: true,
      salaryClient: false,
    },
    {
      rate: 11,
      insuranceIncluded: false,
      salaryClient: true,
    },
    {
      rate: 10,
      insuranceIncluded: true,
      salaryClient: true,
    },
  ];

  return (
    <div className={styles.loanOffersList}>
      {offers.map((offer, index) => (
        <LoanOffer key={index} {...offer} />
      ))}
    </div>
  );
};

export default LoanOffers;
