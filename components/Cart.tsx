import { useState, useCallback } from 'react';
import { IMaskInput } from 'react-imask';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { usePopup } from '../hooks/usePopup';
import styles from '../pages/styles.module.css';

export default function Cart() {
  const { cart, setCart } = useCart();
  const { products } = useProducts();
  const { setShowSuccess } = usePopup();
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOrder = useCallback(async () => {
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setLoading(true);

    try {
      console.log('Заказ отправлен:', { phone: phoneDigits, cart });
      setShowSuccess(true);
      setCart([]);
      setPhone('');
      localStorage.removeItem('cart');
      localStorage.removeItem('phone');
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      window.alert('Ошибка при оформлении заказа');
    } finally {
      setLoading(false);
    }
  }, [phone, cart, setCart, setShowSuccess]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <section className={styles.cart}>
      <h2>Корзина</h2>
      <p>
        Товаров: {totalItems} | Сумма: {totalPrice} ₽
      </p>
      <IMaskInput
        mask="+7 (000) 000-00-00"
        value={phone}
        onAccept={(value: string) => setPhone(value)}
        className={`${styles.phoneInput} ${phoneError ? styles.error : ''}`}
        placeholder="Номер телефона"
        disabled={loading}
      />
      <button
        className={styles.orderButton}
        onClick={handleOrder}
        disabled={loading || !cart.length}
      >
        {loading ? 'Отправка...' : 'Заказать'}
      </button>
    </section>
  );
}