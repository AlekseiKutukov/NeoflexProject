import { useState } from "react";

import cardImage1 from "./../../assets/images/cardImage1.png";
// import cardImage2 from './../../assets/images/cardImage2.png';
// import cardImage3 from './../../assets/images/cardImage3.png';
// import cardImage4 from './../../assets/images/cardImage4.png';
import CreditCardModule from "./CreditCard/CreditCard";

import AboutCardTab from "../../components/LoanPageTabs/AboutCardTab/AboutCardTab";
import CashbackTab from "../../components/LoanPageTabs/CashbackTab/CashbackTab";
import FaqTab from "../../components/LoanPageTabs/FaqTab/FaqTab";
import RatesTab from "../../components/LoanPageTabs/RatesTab/RatesTab";
import Button from "../../components/UI/Button/Button";
import styles from "./LoanPage.module.css";

const LoanPage = () => {
  // Определяем типы для названий табов
  type TabName = "aboutCard" | "rates" | "cashback" | "faq";

  const [activeTab, setActiveTab] = useState<TabName>("aboutCard"); // Состояние для активной вкладки

  const handleTabClick = (tab: TabName) => {
    setActiveTab(tab);
  };

  const handleClickApplyForCard = () => {
    console.log("klac klac");
  };

  return (
    <div className={styles.loanPage}>
      <CreditCardModule />
      <section className={styles.cardPromo}>
        <div className={styles.cardPromo__textColumn}>
          <h1 className={styles.cardPromo__title}>
            Platinum digital credit card
          </h1>
          <div className={styles.cardPromo__description}>
            Our best credit card. Suitable for everyday spending and shopping.
            Cash withdrawals and transfers without commission and interest.
          </div>
          <div className={styles.cardPromo__conditions}>
            <div className={styles.cardPromo__conditionsItem}>
              <span className={styles.cardPromo__conditionsValue}>
                Up to 160 days
              </span>
              <span className={styles.cardPromo__conditionsLabel}>
                No percent
              </span>
            </div>
            <div className={styles.cardPromo__conditionsItem}>
              <span className={styles.cardPromo__conditionsValue}>
                Up to 600 000 ₽
              </span>
              <span className={styles.cardPromo__conditionsLabel}>
                Credit limit
              </span>
            </div>
            <div className={styles.cardPromo__conditionsItem}>
              <span className={styles.cardPromo__conditionsValue}>0 ₽</span>
              <span className={styles.cardPromo__conditionsLabel}>
                Card service is free
              </span>
            </div>
          </div>
          <Button
            onClick={handleClickApplyForCard}
            variant="blue"
            className={styles.cardPromo__button}
            aria-label="Apply For Card"
          >
            Apply For Card
          </Button>
        </div>
        <div className={styles.cardPromo__imageColumn}>
          <img
            src={cardImage1}
            alt="Platinum digital credit card"
            width="250"
            height="150"
            className={styles.cardProm__cardImage}
          />
        </div>
      </section>

      {/* --- Секция табов --- */}
      <section className={styles.cardTabs}>
        <div className={styles.cardTabs__navigation}>
          <button
            className={`${styles.cardTabs__button} ${activeTab === "aboutCard" ? styles["cardTabs__button--active"] : ""}`}
            onClick={() => handleTabClick("aboutCard")}
            role="tab" // ARIA-атрибуты для доступности
            aria-selected={activeTab === "aboutCard"}
          >
            About Card
          </button>
          <button
            className={`${styles.cardTabs__button} ${activeTab === "rates" ? styles["cardTabs__button--active"] : ""}`}
            onClick={() => handleTabClick("rates")}
            role="tab"
            aria-selected={activeTab === "rates"}
          >
            Rates
          </button>
          <button
            className={`${styles.cardTabs__button} ${activeTab === "cashback" ? styles["cardTabs__button--active"] : ""}`}
            onClick={() => handleTabClick("cashback")}
            role="tab"
            aria-selected={activeTab === "cashback"}
          >
            Cashback
          </button>
          <button
            className={`${styles.cardTabs__button} ${activeTab === "faq" ? styles["cardTabs__button--active"] : ""}`}
            onClick={() => handleTabClick("faq")}
            role="tab"
            aria-selected={activeTab === "faq"}
          >
            FAQ
          </button>
        </div>

        {/* Контейнер для содержимого табов */}
        <div className={styles.cardTabs__content}>
          {activeTab === "aboutCard" && <AboutCardTab />}
          {activeTab === "rates" && <RatesTab />}
          {activeTab === "cashback" && <CashbackTab />}
          {activeTab === "faq" && <FaqTab />}
        </div>
      </section>
    </div>
  );
};

export default LoanPage;
