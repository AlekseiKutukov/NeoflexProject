import { useState } from "react";
import ScoringPage from "../../components/ScoringPage/ScoringPage";

const Loan = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsFormSubmitted(true);
  };

  return (
    <>
      {isFormSubmitted ? (
        console.log("Forma uletela")
      ) : (
        <ScoringPage onSuccess={handleSuccess} />
      )}
    </>
  );
};

export default Loan;
