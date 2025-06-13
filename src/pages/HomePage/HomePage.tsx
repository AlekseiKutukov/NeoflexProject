import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import ExchangeRate from '../../components/ExchangeRate/ExchangeRate';
import SubscribeForm from '../../components/UI/SubscribeForm/SubscribeForm';
import NewsFeed from '../../components/NewsFeed/NewsFeed';
import cardImage1 from './../../assets/images/cardImage1.png';
import cardImage2 from './../../assets/images/cardImage2.png';
import cardImage3 from './../../assets/images/cardImage3.png';
import cardImage4 from './../../assets/images/cardImage4.png';
import Illustration from './../../assets/images/Illustration.svg';
import mapWorld from './../../assets/images/HugeGlobal.png';
import styles from './HomePage.module.css';

const HomePage = () => {
  const clickChooseCard = () => {
    console.log('Клац кнопка Choose the card');
  };
  return (
    <div className={styles.homePage}>
      <section className={styles.cardSelection}>
        <div className={styles.cardSelection__header}>
          <h1 className={styles.cardSelection__title}>
            Choose the design you like and apply for card right now
          </h1>
          <div className={styles.cardSelection__button}>
            <Button
              onClick={clickChooseCard}
              variant="blue"
              aria-label="Выбрать дизайн банковской карты и подать заявку"
            >
              Choose the card
            </Button>
          </div>
        </div>
        <div className={styles.cardSelection__cards}>
          <img
            src={cardImage1}
            alt="Card Design #1"
            width="250"
            height="150"
            className={styles.cardSelection__cardImage}
          />
          <img
            src={cardImage2}
            alt="Card Design #2"
            width="250"
            height="150"
            className={styles.cardSelection__cardImage}
          />
          <img
            src={cardImage3}
            alt="Card Design #3"
            width="250"
            height="150"
            className={styles.cardSelection__cardImage}
          />
          <img
            src={cardImage4}
            alt="Card Design #4"
            width="250"
            height="150"
            className={styles.cardSelection__cardImage}
          />
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.features__image}>
          <img
            src={Illustration}
            alt="Illustrations"
            width="510"
            height="415"
          />
        </div>
        <div className={styles.features__content}>
          <h2 className={styles.features__title}>
            We Provide Many Features You Can Use
          </h2>
          <div className={styles.features__description}>
            You can explore the features that we provide with fun and have their
            own functions each feature
          </div>
          <div className={styles.features__list}>
            <ul>
              <li>Powerfull online protection.</li>
              <li>Cashback without borders.</li>
              <li>Personal design</li>
              <li>Work anywhere in the world</li>
            </ul>
          </div>
        </div>
      </section>

      <ExchangeRate />

      <section className={styles.map}>
        <h2 className={styles.map__title}>
          You can use our services anywhere in the world
        </h2>
        <div className={styles.map__description}>
          Withdraw and transfer money online through our application
        </div>
        <div className={styles.map__image}>
          <img
            src={mapWorld}
            alt="Huge Global"
            width="1060"
            height="540"
            className={styles.map__img}
          />
        </div>
      </section>

      <section className={styles.news}>
        <h2 className={styles.news__title}>
          Current news from the world of finance
        </h2>
        <div className={styles.news__description}>
          We update the news feed every 15 minutes. You can learn more by
          clicking on the news you are interested in.
        </div>
        <div className={styles.news__feed}>
          <NewsFeed />
        </div>
      </section>

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
    </div>
  );
};

export default HomePage;
