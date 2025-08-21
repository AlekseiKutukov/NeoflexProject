import { useState } from "react";
import ScoringPage from "../../components/ScoringPage/ScoringPage";
import AfterStep from "../../components/AfterStep/AfterStep";
import styles from "./Loan.module.css";
import { useParams } from "react-router-dom";
import type { LoanOffer } from "../../store/applicationStore";

const Loan = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsFormSubmitted(true);
  };

  const localStorageData = localStorage.getItem("loan-application-state");
  let offers: LoanOffer[] = [];

  if (localStorageData) {
    try {
      const parsedData = JSON.parse(localStorageData);
      offers = parsedData.state.offers;
    } catch (e) {
      console.error("Ошибка парсинга данных из localStorage", e);
    }
  }

  const isAccessAllowed = offers.some(
    (offer) => String(offer.applicationId) === applicationId
  );

  if (!isAccessAllowed) {
    return (
      <div className={styles.container}>
        <AfterStep
          title={"Access Denied"}
          text={"No application with this ID was found. Please check the link."}
        />
      </div>
    );
  }

  return (
    <>
      {isFormSubmitted ? (
        <div className={styles.container}>
          <AfterStep
            title={"The answer will come to your mail within 10 minutes"}
            text={"The answer will come to your mail within 10 minutes"}
          />
        </div>
      ) : (
        // console.log("Forma uletela")
        <ScoringPage onSuccess={handleSuccess} />
      )}
    </>
  );
};

export default Loan;
