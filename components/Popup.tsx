import { usePopup } from '../hooks/usePopup';
import styles from '../pages/styles.module.css';

export default function Popup() {
  const { showSuccess, setShowSuccess } = usePopup();

  if (!showSuccess) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <h2>Заказ оформлен!</h2>
        <p>Ваш заказ успешно отправлен.</p>
        <button
          className={styles.closeButton}
          onClick={() => setShowSuccess(false)}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}