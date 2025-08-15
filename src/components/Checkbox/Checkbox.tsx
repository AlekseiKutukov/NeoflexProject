import styles from "./Checkbox.module.css";

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <div className={styles.checkbox__container}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id="payment-agreement"
        className={styles.checkboxInput}
      />
      <label htmlFor="payment-agreement" className={styles.checkbox_label}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
