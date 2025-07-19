import React, { useState } from "react";
import styles from "./SubscribeForm.module.css";
import sendIcon from "./../../../assets/icons/send1.svg";
import emailIcon from "./../../../assets/icons/email1.svg";

interface SubscribeFormProps {
  initialEmail?: string;
  onSubmit: (email: string) => void;
  isLoading: boolean;
  error?: string | null;
}

const SubscribeForm: React.FC<SubscribeFormProps> = ({
  initialEmail = "",
  onSubmit,
  isLoading,
  error,
}) => {
  const [email, setEmail] = useState<string>(initialEmail);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email); // Вызываем функцию, переданную через пропсы
    // console.log('Подписка на email:', email);
    // alert(`Вы подписались на рассылку с email: ${email}`);
    // setEmail(""); // Очищаем поле после отправки
  };

  return (
    <form className={styles.subscribeForm} onSubmit={handleSubmit}>
      <img
        src={emailIcon}
        alt="Email icon"
        className={styles.subscribeForm__icon}
      />
      <input
        type="email"
        placeholder="Your email"
        className={styles.subscribeForm__input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
      />
      <button
        type="submit"
        className={styles.subscribeForm__button}
        disabled={isLoading}
      >
        <img
          src={sendIcon}
          alt="Send icon"
          className={styles.subscribeForm__buttonIcon}
          aria-label="Subscribe"
        />
        <span className={styles.subscribeForm__buttonText}>
          {isLoading ? "Subscribing..." : "Subscribe"}
        </span>
        {error && <p className={styles.subscribeForm__errorMessage}>{error}</p>}
      </button>
    </form>
  );
};

export default SubscribeForm;
