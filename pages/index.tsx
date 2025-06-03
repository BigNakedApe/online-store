import { Suspense } from 'react';
import { GetServerSideProps } from 'next';
import Reviews from '../components/Reviews';
import Products from '../components/Products';
import Cart from '../components/Cart';
import Popup from '../components/Popup';
import { ProductProvider } from '../contexts/ProductContext';
import styles from './styles.module.css';
import { Review, Product } from '../types';

// Константы для заглушек
const MOCK_REVIEWS: Review[] = [
  { id: 1, text: '<p>Отличный товар, рекомендую!</p>' },
  { id: 2, text: '<p>Быстрая доставка, всё супер!</p>' },
];

const generateMockProducts = (page: number): Product[] => [
  {
    id: page * 10 + 1,
    image_url: 'https://picsum.photos/200/200',
    title: `Товар ${page * 10 + 1} с очень длинным названием для проверки`,
    description: 'Описание товара',
    price: 1000,
  },
  {
    id: page * 10 + 2,
    image_url: 'https://picsum.photos/200/200',
    title: `Товар ${page * 10 + 2}`,
    description: 'Описание другого товара',
    price: 1500,
  },
];

interface HomeProps {
  initialReviews: Review[];
  initialProducts: Product[];
}

export default function Home({ initialReviews, initialProducts }: HomeProps) {
  return (
    <ProductProvider initialProducts={initialProducts}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Интернет-магазин</h1>
        </header>

        <Suspense fallback={<div className={styles.loader}>Загрузка отзывов...</div>}>
          <Reviews initialReviews={initialReviews} />
        </Suspense>

        <Suspense fallback={<div className={styles.loader}>Загрузка товаров...</div>}>
          <Products initialProducts={initialProducts} />
        </Suspense>

        <Cart />
        <Popup />
      </div>
    </ProductProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const initialReviews = MOCK_REVIEWS;
  const initialProducts = generateMockProducts(1);

  return {
    props: {
      initialReviews,
      initialProducts,
    },
  };
};