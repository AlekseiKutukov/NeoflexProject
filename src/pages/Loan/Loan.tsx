import { useState } from "react";
import ScoringPage from "../../components/ScoringPage/ScoringPage";
import AfterStep from "../../components/AfterStep/AfterStep";
import styles from "./Loan.module.css";

const Loan = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsFormSubmitted(true);
  };

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
