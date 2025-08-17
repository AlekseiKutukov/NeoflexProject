import styles from "./StepOf.module.css";

interface StepOf {
  title: string;
  number: number;
}

const StepOf = ({ title, number }: StepOf) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.info}>Step {number} of 5</div>
    </div>
  );
};

export default StepOf;
