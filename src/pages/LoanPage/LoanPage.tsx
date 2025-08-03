import { useState, useRef } from "react";
import CreditCard from "./CreditCard/CreditCard";
import AboutCardTab from "../../components/LoanPageTabs/AboutCardTab/AboutCardTab";
import CashbackTab from "../../components/LoanPageTabs/CashbackTab/CashbackTab";
import FaqTab from "../../components/LoanPageTabs/FaqTab/FaqTab";
import RatesTab from "../../components/LoanPageTabs/RatesTab/RatesTab";
import CustomizeCardForm from "../../components/Form/CustomizeCardForm/CustomizeCardForm";
import HowGetCard from "../../components/HowGetCard/HowGetCard";
import styles from "./LoanPage.module.css";

const LoanPage = () => {
  // Определяем типы для названий табов
  type TabName = "aboutCard" | "rates" | "cashback" | "faq";

  const [activeTab, setActiveTab] = useState<TabName>("aboutCard"); // Состояние для активной вкладки

  const handleTabClick = (tab: TabName) => {
    setActiveTab(tab);
  };

  const applicationFormRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.loanPage}>
      <CreditCard targetRef={applicationFormRef} />

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
            Rates and conditions
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
      <HowGetCard />
      <CustomizeCardForm ref={applicationFormRef} />
    </div>
  );
};

export default LoanPage;
