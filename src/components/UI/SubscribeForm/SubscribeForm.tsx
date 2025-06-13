import React, { useState } from 'react';
import styles from './SubscribeForm.module.css';
import sendIcon from './../../../assets/icons/send1.svg';
import emailIcon from './../../../assets/icons/email1.svg';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Подписка на email:', email);
    alert(`Вы подписались на рассылку с email: ${email}`);
    setEmail(''); // Очищаем поле после отправки
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
      />
      <button type="submit" className={styles.subscribeForm__button}>
        <img
          src={sendIcon}
          alt="Send icon"
          className={styles.subscribeForm__buttonIcon}
          aria-label="Subscribe"
        />
        <span className={styles.subscribeForm__buttonText}>Subscribe</span>
      </button>
    </form>
  );
};

export default SubscribeForm;
