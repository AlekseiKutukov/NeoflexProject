import { Link } from "react-router-dom";
import SubscribeForm from "../UI/SubscribeForm/SubscribeForm";
import styles from "./SupportBlock.module.css";

const SupportBlock = () => {
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
      <SubscribeForm />
    </section>
  );
};

export default SupportBlock;
