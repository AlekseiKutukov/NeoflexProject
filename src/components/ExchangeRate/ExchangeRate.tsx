import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import bankImg from './../../assets/images/Group.svg';
import styles from './ExchangeRate.module.css';

const CALL_INTERVAL: number = 15 * 60 * 1000; // 15 минут
const API_KEY: string = '1ce15a5127621865f9501bf5';
const EXCHANGE_RATE_API_URL = (baseCurrency: string) =>
  `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;

const CURRENCY_IDS_TO_DISPLAY: Set<string> = new Set([
  'USD',
  'EUR',
  'KZT',
  'UAH',
  'HUF',
  'GBP',
]);

interface ExchangeRateApiResponse {
  // result: string;
  // documentation: string;
  // terms_of_use: string;
  // time_last_update_unix: number;
  time_last_update_utc: string;
  // time_next_update_unix: number;
  // time_next_update_utc: string;
  base_code: string;
  conversion_rates: {
    [key: string]: number; // код валюты - курс
  };
}

const ExchangeRate = () => {
  const [currentRates, setCurrentRates] = useState<Record<
    string,
    number
  > | null>(null);
  const [isAllCoursesVisible, setIsAllCoursesVisible] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  //мемоизирована -> useCallback
  const fetchCurrencyRates = useCallback(async () => {
    try {
      setError(null); // Сбрасываем ошибку перед новым запросом
      const response = await axios.get<ExchangeRateApiResponse>(
        EXCHANGE_RATE_API_URL('RUB')
      );

      setCurrentRates(response.data.conversion_rates);

      // Обновление даты/времени последнего обновления
      const timestampString = response.data.time_last_update_utc;
      const date = new Date(timestampString);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      setLastUpdate(`${day}.${month}.${year} ${hours}:${minutes}`);
    } catch (err: unknown) {
      console.error('Ошибка при получении данных:', error);
      setCurrentRates(null); // Сбрасываем курсы при ошибке
    }
  }, []);

  // Эффект при монтировании компонента и установки интервала
  useEffect(() => {
    fetchCurrencyRates(); // Первый вызов при загрузке компонента
    const intervalId = setInterval(fetchCurrencyRates, CALL_INTERVAL);
    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [fetchCurrencyRates]);

  // Все курсы
  const toggleAllCoursesVisibility = () => {
    setIsAllCoursesVisible((prev) => !prev);
  };

  return (
    <div className={styles.converter__container}>
      <div className={styles.converter__columnLeft}>
        <div className={styles.converter__title}>
          Exchange rate in internet bank
        </div>
        <div className={styles.converter__currenc}>Currency</div>

        <div className={styles.converter__courses}>
          {Array.from(CURRENCY_IDS_TO_DISPLAY).map((code) => {
            const valuteValue = currentRates ? currentRates[code] : null;
            return (
              <div
                key={code}
                className={styles.converter__item}
                data-money={code}
              >
                {valuteValue !== null ? (
                  <>
                    <span className={styles.converter__money}>{code}:</span>
                    <span className={styles.converter__value}>
                      {(1 / valuteValue).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className={styles.converter__money}>
                    {code}: ...
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div
          className={styles.converter__toggleText}
          onClick={toggleAllCoursesVisibility}
        >
          {isAllCoursesVisible ? 'Hide' : 'All courses'}
        </div>

        <div
          id="all-courses-list"
          className={`${styles.converter__list} ${isAllCoursesVisible ? styles.visible : styles.hidden}`}
        >
          {currentRates ? (
            // ✨ Object.keys(currentRates) для получения всех доступных валют
            Object.keys(currentRates)
              .filter((code) => !CURRENCY_IDS_TO_DISPLAY.has(code)) // Фильтруем, чтобы не показывать уже отображенные
              .map((code) => {
                const valuteValue = currentRates[code];
                return (
                  <div key={code} className={styles.converter__item}>
                    <>
                      <span className={styles.converter__money}>{code}:</span>
                      <span className={styles.converter__value}>
                        {(1 / valuteValue).toFixed(2)}
                      </span>
                    </>
                  </div>
                );
              })
          ) : (
            <div>Загрузка остальных курсов...</div>
          )}
        </div>
      </div>

      <div className={styles.converter__columnRight}>
        <div className={styles.converter__data}>
          Update every 15 minutes, MSC{' '}
          {lastUpdate ? (
            <span className={styles.converter__date}>{lastUpdate}</span>
          ) : (
            'Download data...'
          )}
        </div>
        <div className={styles.converter__image}>
          <img
            src={bankImg}
            alt="Bank Image"
            width="120"
            height="113"
            className={styles.converter__img}
          />
        </div>
      </div>
    </div>
  );
};

export default ExchangeRate;
