import { NavLink } from 'react-router-dom';
import styles from './NavigationFooter.module.css';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'About bank', path: '/about-bank' },
  { label: 'Ask a Question', path: '/ask-a-question' },
  { label: 'Quality of service', path: '/quality-of-service' },
  { label: 'Requisites', path: '/requisites' },
  { label: 'Press center', path: '/press-center' },
  { label: 'Bank career', path: '/bank-career' },
  { label: 'Investors', path: '/investors' },
  { label: 'Analytics', path: '/analytics' },
  { label: 'Business and processes', path: '/business-and-processes' },
  {
    label: 'Compliance and business ethics',
    path: '/compliance-and-business-ethics',
  },
];

const NavigationFooter = () => {
  return (
    <ul className={`${styles.navigationFooter__list}`}>
      {navItems.map((item) => (
        <li key={item.path} className={styles.navigationFooter__item}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? `${styles.navigationFooter__link} ${styles.navigationFooter__linkActive}`
                : styles.navigationFooter__link
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavigationFooter;
