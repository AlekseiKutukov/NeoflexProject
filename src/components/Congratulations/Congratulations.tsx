import { useNavigate } from "react-router-dom";
import SurpriseImage from "./../../assets/images/SurpriseImage.svg";
import styles from "./Congratulations.module.css";

const Congratulations = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.congratulations}>
      <img
        src={SurpriseImage}
        alt="Surprise Image"
        className={styles.congratulations__image}
      />
      <h2 className={styles.congratulations_title}>
        Congratulations! You have completed your new credit card.
      </h2>
      <p className={styles.congratulations__text}>
        Your credit card will arrive soon. Thank you for choosing us!
      </p>
      <button
        className={styles.congratulations__button}
        onClick={handleButtonClick}
      >
        View other offers of our bank
      </button>
    </div>
  );
};

export default Congratulations;
