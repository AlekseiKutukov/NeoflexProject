import styles from "./AfterStep.module.css";

interface AfterStepProps {
  title: string;
  text: string;
}

const AfterStep: React.FC<AfterStepProps> = ({ title, text }) => {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
    </>
  );
};

export default AfterStep;
