import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import bankImg from './../../assets/images/Group.svg';
import styles from './ExchangeRate.module.css';

interface ValuteItem {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}

interface Valute {
  [key: string]: ValuteItem;
}

interface CBRApiResponse {
  Date: string;
  PreviousDate: string;
  PreviousURL: string;
  Timestamp: string;
  Valute: Valute;
}

const CBR_API_URL: string = 'https://www.cbr-xml-daily.ru/daily_json.js';
const CALL_INTERVAL: number = 15 * 60 * 1000; // 15 минут

const CURRENCY_IDS_TO_DISPLAY: Set<string> = new Set([
  'usd',
  'cny',
  'chf',
  'uah',
  'jpy',
  'try',
]);

const ExchangeRate = () => {
  const [currentRates, setCurrentRates] = useState<Valute | null>(null);
  const [isAllCoursesVisible, setIsAllCoursesVisible] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  //мемоизирована -> useCallback
  const fetchCurrencyRates = useCallback(async () => {
    try {
      setError(null); // Сбрасываем ошибку перед новым запросом
      const response = await axios.get<CBRApiResponse>(CBR_API_URL);
      setCurrentRates(response.data.Valute);
      // console.log(response);

      const getTime = response.data.Timestamp;
      const date = new Date(getTime);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      setLastUpdate(`${day}.${month}.${year}`);
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
        {/* {error && <div className={styles.error}>{error}</div>} */}

        <div className={styles.converter__courses}>
          {/* Отображение основных валют */}
          {Array.from(CURRENCY_IDS_TO_DISPLAY).map((code) => {
            const valuteData = currentRates
              ? currentRates[code.toUpperCase()]
              : null;
            return (
              <div
                key={code}
                className={styles.converter__item}
                data-money={code}
              >
                {valuteData ? (
                  <>
                    <span className={styles.converter__money}>
                      {valuteData.CharCode.toUpperCase()}:
                    </span>
                    <span className={styles.converter__value}>
                      {valuteData.Value.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className={styles.converter__money}>
                    {code.toUpperCase()}: ...
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
            Object.values(currentRates).map((item) => {
              if (CURRENCY_IDS_TO_DISPLAY.has(item.CharCode.toLowerCase())) {
                return null; // Пропускаем уже отображенные валюты
              }
              return (
                <div key={item.ID} className={styles.converter__item}>
                  <>
                    <span className={styles.converter__money}>
                      {item.CharCode}:
                    </span>
                    <span className={styles.converter__value}>
                      {item.Value.toFixed(2)}
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
