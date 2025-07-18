import styles from './NewsCard.module.css';

interface NewsCardProps {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
}

const NewsCard = ({ title, description, url, urlToImage }: NewsCardProps) => {
  return (
    <a href={url} target="_blank" className={styles.newsCard}>
      {urlToImage && (
        <img
          src={urlToImage}
          width="256"
          height="120"
          alt={title}
          className={styles.newsCard__image}
        />
      )}
      <h3 className={styles.newsCard__title}>{title}</h3>
      {description && (
        <p className={styles.newsCard__description}>{description}</p>
      )}
    </a>
  );
};

export default NewsCard;
