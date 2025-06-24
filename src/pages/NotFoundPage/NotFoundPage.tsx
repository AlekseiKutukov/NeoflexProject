import { useNavigate } from 'react-router-dom';
import imageNotFound from './../../assets/images/NotFound.png';
import Button from '../../components/UI/Button/Button';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClickGoBack = () => {
    navigate(-1); //вернутся назад
  };

  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundPage__contentColumn}>
        <div className={styles.notFoundPage__oops}>Oops...</div>
        <h1 className={styles.notFoundPage__title}>Page not found</h1>
        <p className={styles.notFoundPage__description}>
          This Page doesn`t exist or was removed! We suggest you go back
        </p>
        <Button
          onClick={handleClickGoBack}
          variant="blue"
          className={styles.notFoundPage__button}
          aria-label="Go back"
        >
          Go back
        </Button>
      </div>
      <div className={styles.notFoundPage__imageColumn}>
        <img
          src={imageNotFound}
          alt="Image Not Found"
          width="526"
          height="526"
          className={styles.notFoundPage__image}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
