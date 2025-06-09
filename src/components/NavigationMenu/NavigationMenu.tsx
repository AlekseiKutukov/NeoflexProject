import { NavLink } from 'react-router-dom';
import styles from './NavigationMenu.module.css';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Credit card', path: '/asd' },
  { label: 'Product', path: '/ss' },
  { label: 'Account', path: '/dd' },
  { label: 'Resource', path: '/aa' },
];

const NavigationMenu = () => {
  return (
    <ul className={styles.navbar__list}>
      {navItems.map((item) => (
        <li key={item.path} className={styles.navbar__item}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__link} ${styles['navbar__link--active']}`
                : styles.navbar__link
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavigationMenu;
