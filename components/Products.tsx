import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Product, CartItem } from '../types';
import { useCart } from '../hooks/useCart';
import styles from '../pages/styles.module.css';

interface ProductsProps {
  initialProducts: Product[];
}

export default function Products({ initialProducts }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { cart, addToCart, updateQuantity } = useCart();
  const { ref, inView } = useInView({ threshold: 0 });

  const fetchProducts = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const mockProducts: Product[] = [
        {
          id: pageNum * 10 + 1,
          image_url: 'https://picsum.photos/200/200',
          title: `Товар ${pageNum * 10 + 1} с очень длинным названием для проверки`,
          description: 'Описание товара',
          price: 1000,
        },
        {
          id: pageNum * 10 + 2,
          image_url: 'https://picsum.photos/200/200',
          title: `Товар ${pageNum * 10 + 2}`,
          description: 'Описание другого товара',
          price: 1500,
        },
      ];
      setProducts((prev) => [...prev, ...mockProducts]);
      setPage(pageNum);
      setHasMore(pageNum < 3);
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchProducts(page + 1);
    }
  }, [inView, page, hasMore, loading, fetchProducts]);

  return (
    <section className={styles.products}>
      <h2>Товары</h2>
      {loading && !products.length ? (
        <div className={styles.loader}>Загрузка товаров...</div>
      ) : (
        <div className={styles.productGrid}>
          {products.map((product) => {
            const cartItem = cart.find((item: CartItem) => item.id === product.id);
            return (
              <div key={product.id} className={styles.productCard}>
                <Image
                  src={product.image_url}
                  alt={product.title}
                  width={200}
                  height={200}
                  className={styles.productImage}
                  priority={page === 1}
                />
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <p className={styles.productPrice}>{product.price} ₽</p>
                {cartItem ? (
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                      disabled={loading}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={cartItem.quantity}
                      onChange={(e) =>
                        updateQuantity(product.id, parseInt(e.target.value) || 1)
                      }
                      min="1"
                      className={styles.quantityInput}
                      disabled={loading}
                    />
                    <button
                      onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                      disabled={loading}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.buyButton}
                    onClick={() => addToCart(product.id)}
                    disabled={loading}
                  >
                    Купить
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      {loading && products.length > 0 && <div className={styles.loader}>Загрузка...</div>}
      {hasMore && <div ref={ref} className={styles.infiniteScrollTrigger} />}
    </section>
  );
}