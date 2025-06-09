import styles from './Button.module.css';

export type ButtonVariant = 'blue' | 'red';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'blue',
  type = 'button',
}) => {
  const buttonClasses = `${styles.button} ${styles[`button--${variant}`]}`;

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
