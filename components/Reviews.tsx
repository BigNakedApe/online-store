import { useState, useEffect } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { Review } from '../types';
import styles from '../pages/styles.module.css';

interface ReviewsProps {
  initialReviews: Review[];
}

export default function Reviews({ initialReviews }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMoreReviews = async () => {
      setLoading(true);
      try {
        setReviews(initialReviews);
      } catch (error) {
        console.error('Ошибка загрузки отзывов:', error);
        setReviews([{ id: 1, text: '<p>Нет отзывов, попробуйте позже</p>' }]);
      } finally {
        setLoading(false);
      }
    };

    loadMoreReviews();
  }, [initialReviews]);

  // Усиленная защита от XSS
  const sanitize = (html: string) =>
    DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'strong', 'em', 'br'],
      ALLOWED_ATTR: [],
      FORBID_TAGS: ['script', 'iframe', 'style'],
      FORBID_ATTR: ['onerror', 'onclick'],
    });

  return (
    <section className={styles.reviews}>
      <h2>Отзывы</h2>
      {loading && !reviews.length ? (
        <div className={styles.loader}>Загрузка отзывов...</div>
      ) : (
        <div className={styles.reviewList}>
          {reviews.map((review) => (
            <div
              key={review.id}
              className={styles.review}
              dangerouslySetInnerHTML={{
                __html: sanitize(review.text || ''),
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}