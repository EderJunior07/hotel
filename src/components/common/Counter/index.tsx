import React from 'react';
import { RemoveOutlined, Add } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import { useWindowSize } from '../../../hooks/UseWindowSize';

interface ICounterProps {
  quantity: number;
  setQuantity: any;
}

export const Counter = ({ quantity = 0, setQuantity }: ICounterProps) => {
  const { t } = useTranslation('common');

  const { width } = useWindowSize();

  const handleRemove = (e) => {
    e.stopPropagation();
    quantity !== 0 &&
      toast.error(`${t('removedCart')}`, {
        position: width < 868 ? 'top-left' : 'bottom-right',
        autoClose: 9000,
        theme: 'colored',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    quantity > 0 && setQuantity(quantity - 1);
  };
  const handleAdd = (e) => {
    e.stopPropagation();
    width > 868 && toast.success(`${t('addedCart')}`, {
      position: width < 868 ? 'top-left' : 'bottom-right',
      autoClose: 9000,
      theme: 'colored',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    quantity < 1000 && setQuantity(quantity + 1);
  };

  return (
    <div className={styles.addButtons}>
      <button
        onClick={handleRemove}
        style={{ border: quantity < 1 && '1px solid #EDEDED' }}
      >
        <RemoveOutlined
          className={styles.removeIcon}
          style={{ color: quantity < 1 && '#EDEDED' }}
        />
      </button>
      <h5>{quantity}</h5>
      <button onClick={handleAdd}>
        <Add className={styles.addIcon} />
      </button>
    </div>
  );
};
