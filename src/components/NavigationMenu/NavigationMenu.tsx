import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./NavigationMenu.module.css";

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: "Credit card", path: "/loan" },
  { label: "Product", path: "/product" },
  { label: "Account", path: "/account" },
  { label: "Resource", path: "/resource" },
];

const NavigationMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={styles.burgerMenu}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <div
          className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineActive1 : ""}`}
        />
        <div
          className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineActive2 : ""}`}
        />
        <div
          className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineActive3 : ""}`}
        />
      </button>

      <ul
        className={`${styles.navbar__list} ${isMenuOpen ? styles.navbar__listOpen : ""}`}
      >
        {navItems.map((item) => (
          <li key={item.path} className={styles.navbar__item}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navbar__link} ${styles["navbar__link--active"]}`
                  : styles.navbar__link
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavigationMenu;
