import React, { useState } from "react";
import styles from "./Accordion.module.css";
import ExpandUpIcon from "../../../assets/icons/Expand_up.svg";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <div className={styles.accordion__item}>
      <button
        className={`${styles.accordion__header} ${isOpen ? styles.accordion__headerOpen : ""}`}
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <img
          src={ExpandUpIcon}
          alt={isOpen ? "Collapse" : "Expand"}
          className={`${styles.accordion__icon} ${isOpen ? styles["accordion__icon--open"] : ""}`}
        />
      </button>
      <div
        className={`${styles.accordion__content} ${isOpen ? styles.accordion__contentOpen : ""}`}
        style={{ maxHeight: isOpen ? "500px" : "0" }}
      >
        <div className={styles.accordion__contentInner}>
          {answer.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: { id: number; question: string; answer: string }[];
  sectionTitle?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, sectionTitle }) => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const handleItemClick = (id: number) => {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className={styles.accordion}>
      {sectionTitle && (
        <h2 className={styles.accordion__title}>{sectionTitle}</h2>
      )}

      <div className={styles.accordion__body}>
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            question={item.question}
            answer={item.answer}
            isOpen={openItemId === item.id}
            onClick={() => handleItemClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Accordion;
