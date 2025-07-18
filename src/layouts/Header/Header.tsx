import { Link } from 'react-router-dom';
import NavigationMenu from '../../components/NavigationMenu/NavigationMenu';
import Button from '../../components/UI/Button/Button';
import styles from './Header.module.css';

const Header = () => {
  const clickOnlineBank = () => {
    console.log('Клац кнопка хидер Online Bank');
  };

  return (
    <header className={styles.navigation}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.navbar__logo}>
          NeoBank
        </Link>
        <NavigationMenu />
        <Button
          onClick={clickOnlineBank}
          variant="blue"
          aria-label="Go to online bank"
        >
          Online Bank
        </Button>
      </nav>
    </header>
  );
};

export default Header;
