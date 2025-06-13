import NavigationFooter from '../../components/NavigationFooter/NavigationFooter';
import logoNeoflex from './../../assets/images/logo_neoflex.png';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.footer__contactInfo}>
          <div className={styles.footer__logo}>
            <img
              src={logoNeoflex}
              alt="Логотип Neoflex"
              width="158"
              height="50"
            />
          </div>
          <div className={styles.footer__telephoneEmail}>
            <div className={styles.footer__telephone}>
              <a
                href="tel:+74959842513"
                aria-label="Позвонить по номеру +7 (495) 984 25 13"
              >
                +7 (495) 984 25 13
              </a>
            </div>
            <div className={styles.footer__email}>
              <a
                href="mailto:info@neoflex.ru"
                aria-label="Написать на почту info@neoflex.ru"
              >
                info@neoflex.ru
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footer__navigation}>
          <nav className={styles.footer__navbar} aria-label="Footer">
            <NavigationFooter />
          </nav>
        </div>
        <div className={styles.footer__cookiesNotice}>
          We use cookies to personalize our services and improve the user
          experience of our website. Cookies are small files containing
          information about previous visits to a website. If you do not want to
          use cookies, please change your browser settings
        </div>
      </div>
    </footer>
  );
};

export default Footer;
