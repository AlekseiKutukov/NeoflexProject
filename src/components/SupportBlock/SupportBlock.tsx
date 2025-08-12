import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import SubscribeForm from "../UI/SubscribeForm/SubscribeForm";
import styles from "./SupportBlock.module.css";

const SUPPORT_EMAIL_ENDPOINT = "http://localhost:8080/email";
const LOCAL_STORAGE_KEY = "bank_newsletter_subscribed";

const SupportBlock = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Проверяем localStorage при загрузке компонента
  useEffect(() => {
    const subscribedStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (subscribedStatus === "true") {
      setIsSubscribed(true);
      setSuccessMessage("You are already subscribed to the bank's newsletter");
    }
  }, []);

  // Обработчик отправки формы, который будет передан в SubscribeForm
  const handleSubscribeSubmit = useCallback(async (email: string) => {
    setError(null); //сбрасываем
    setSuccessMessage(null);
    setIsLoading(true); // Устанавливаем состояние загрузки

    try {
      const response = await fetch(SUPPORT_EMAIL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        // Проверяем, что ответ успешный
        setIsSubscribed(true);
        localStorage.setItem(LOCAL_STORAGE_KEY, "true"); // Сохраняем статус в localStorage
        setSuccessMessage(
          "You are already subscribed to the bank's newsletter"
        );
      }
    } catch (err) {
      // Обработка сетевых ошибок
      setError("Network error. Could not connect to the server.W");
      // console.error("Subscription error:", err);
    } finally {
      setIsLoading(false); // Сбрасываем состояние загрузки
    }
  }, []);

  return (
    <section className={styles.support}>
      <Link
        to="/about"
        className={styles.support__title}
        aria-label="Go to support and contact page"
      >
        Support
      </Link>
      <Link
        to="/about"
        className={styles.support__newsletterText}
        aria-label="Go to page Newsletter"
      >
        Subscribe & get
      </Link>
      <Link
        to="/about"
        className={styles.support__newsletterNews}
        aria-label="Go to page Bank News"
      >
        Bank News
      </Link>

      <div className={styles.support__subscribeSection}>
        {isSubscribed ? (
          // Если уже подписан, показываем сообщение об успехе
          <p className={styles.support__successMessage}>{successMessage}</p>
        ) : (
          // Иначе показываем форму SubscribeForm
          <SubscribeForm
            onSubmit={handleSubscribeSubmit}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </section>
  );
};

export default SupportBlock;
