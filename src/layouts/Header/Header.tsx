import './Header.css';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';

const Header = () => {
  return (
    <header className="navigation">
      <nav className="navbar">
        <Link to="/" className="navbar__logo">
          NeoBank
        </Link>
        {/* имхо выдернуть это (ul) в отдельный компонент??? */}
        <ul className="navbar__list">
          <li className="navbar__item">Credit card</li>
          <li className="navbar__item">Product</li>
          <li className="navbar__item">Account</li>
          <li className="navbar__item">Resource</li>
        </ul>
        <Button />
      </nav>
    </header>
  );
};

export default Header;
