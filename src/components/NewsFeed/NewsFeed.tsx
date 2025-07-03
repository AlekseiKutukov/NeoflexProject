import { useEffect, useState, useCallback, useRef } from 'react'; // Импортируем useRef
import axios from 'axios';
import styles from './NewsFeed.module.css';
import NewsCard from './NewsCard/NewsCard';
import arrow from './../../assets/icons/arrow.svg';

interface Article {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

const NEWS_API_KEY = 'd2b1b3f3911d4e8abc9c66dcce483269';
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${NEWS_API_KEY}`;
// const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=40&apiKey=${NEWS_API_KEY}`; // Увеличим до 40 для теста

const SCROLL_AMOUNT = 500; // Ширина прокрутки за один шаг

const NewsFeed = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null); // Ref для прокрутки, прямое взамосдейтсвие с Dom

  const fetchNews = useCallback(async () => {
    try {
      const response = await axios.get<NewsApiResponse>(NEWS_API_URL);
      // Проверка что есть картинка и описание не содержит разметки
      const filteredNews = response.data.articles.filter((article) => {
        const isValidImage =
          article.urlToImage && article.urlToImage.startsWith('http');
        const isHtmlInDescription =
          article.description && /<[^>]*>/.test(article.description);
        return isValidImage && !isHtmlInDescription;
      });

      setNews(filteredNews);
    } catch {
      console.error('Ошибка при получении новостей:');
    } finally {
    }
  }, []);

  // Функция для проверки состояния кнопок прокрутки
  const checkScrollability = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  }, []);

  // Обработчики прокрутки
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -SCROLL_AMOUNT,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: SCROLL_AMOUNT,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Проверяем возможность прокрутки после загрузки новостей и при изменении размеров
  useEffect(() => {
    if (news.length > 0) {
      console.log('Загружено новостей - ', news.length);
      checkScrollability();
      const currentRef = scrollRef.current;
      if (currentRef) {
        currentRef.addEventListener('scroll', checkScrollability);
        window.addEventListener('resize', checkScrollability); // Обновляем при изменении размера окна
      }
      return () => {
        if (currentRef) {
          currentRef.removeEventListener('scroll', checkScrollability);
          window.removeEventListener('resize', checkScrollability);
        }
      };
    }
  }, [news, checkScrollability]);

  return (
    <section className={styles.news}>
      <h2 className={styles.news__title}>
        Current news from the world of finance
      </h2>
      <div className={styles.news__description}>
        We update the news feed every 15 minutes. You can learn more by clicking
        on the news you are interested in.
      </div>

      <div className={styles.news__slider}>
        <div ref={scrollRef} className={styles.news__sliderGrid}>
          {news.map((article) => (
            <NewsCard
              key={article.url}
              title={article.title}
              description={article.description}
              url={article.url}
              urlToImage={article.urlToImage}
            />
          ))}
        </div>
        <div className={styles.news__button}>
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={styles.sliderButton}
          >
            <img src={arrow} alt="Next" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={styles.sliderButton}
          >
            <img
              src={arrow}
              alt="Previous"
              style={{ transform: 'rotate(180deg)' }}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;
