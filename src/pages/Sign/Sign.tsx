import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Sign.module.css";
import AfterStep from "../../components/AfterStep/AfterStep";
import Checkbox from "../../components/Checkbox/Checkbox";
import StepOf from "../../components/StepOf/StepOf";
import DocumentIcon from "../../assets/icons/File_dock.svg";
import pdfFile from "../../assets/pdf/credit-card-offer.pdf";

const API_BASE =
  import.meta.env.MODE === "development"
    ? ""
    : "https://alekseikutukov.github.io/NeoflexProject/";

const Sign: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  const handleSend = async () => {
    try {
      const res = await fetch(`${API_BASE}/document/${applicationId}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAgreed: true }),
      });
      if (!res.ok) {
        throw new Error("Failed to sign documents.");
      }
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to sign documents.");
      console.error(err);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <AfterStep
          title={
            "Documents have been successfully signed and sent for approval"
          }
          text={
            "Within 10 minutes you will be sent a PIN code to your email for confirmation"
          }
        />
      </div>
    );
  }

  if (error) {
    return <AfterStep title={"Error"} text={error} />;
  }

  return (
    <section className={styles.signDocument__container}>
      <StepOf title={"Signing of documents"} number={4} />

      <p className={styles.signDocument__text}>
        Information on interest rates under bank deposit agreements with
        individuals. Center for Corporate Information Disclosure. Information of
        a professional participant in the securities market. Information about
        persons under whose control or significant influence the Partner Banks
        are. By leaving an application, you agree to the processing of personal
        data, obtaining information, obtaining access to a credit history, using
        an analogue of a handwritten signature, an offer, a policy regarding the
        processing of personal data, a form of consent to the processing of
        personal data.
      </p>

      <div className={styles.signDocument__footer}>
        <div className={styles.signDocument__document}>
          <img src={DocumentIcon} alt="Document icon" />
          <a
            href={pdfFile}
            download="credit-card-offer.pdf"
            className={styles.signDocument__link}
          >
            Information on your card
          </a>
        </div>
        <div className={styles.document__agreementContainer}>
          <Checkbox
            checked={isAgreed}
            onChange={handleCheckboxChange}
            label={"I agree"}
          />
          <button
            className={styles.document__sendButton}
            onClick={handleSend}
            disabled={!isAgreed}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sign;
