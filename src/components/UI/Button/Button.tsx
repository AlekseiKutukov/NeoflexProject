import styles from './Button.module.css';

export type ButtonVariant = 'blue' | 'red';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'blue',
  type = 'button',
  className,
}) => {
  const buttonClasses = `${styles.button} ${styles[`button--${variant}`]} ${className || ''}`;

  return (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
