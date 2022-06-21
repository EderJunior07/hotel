import { CloseOutlined } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import styles from './styles.module.scss';

interface ILanguageSwitcher {
  handleCloseLanguageSwitcher: () => void;
}

const LanguageSwitcher = ({
  handleCloseLanguageSwitcher,
}: ILanguageSwitcher) => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const locale = router?.locale;

  const handleLang = (lang: string) => {
    document.body.style.overflow = 'initial';
    router.push('/', '/', { locale: lang });
    handleCloseLanguageSwitcher();
  };

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <CloseOutlined className={styles.closeButton} />
          </div>{' '}
          <h3>Escolha um idioma e uma região</h3>
          <div className={styles.contentContainer}>
            <button
              onClick={() => handleLang('ptBR')}
              className={styles.languageSwitcherButton}
              style={{
                border: locale === 'ptBR' ? '1px solid var(--dark)' : 'none',
              }}
            >
              <h4>Portugues</h4>
              <h5>Brasil</h5>
            </button>
            <button
              onClick={() => handleLang('enUS')}
              className={styles.languageSwitcherButton}
              style={{
                border: locale === 'enUS' ? '1px solid var(--dark)' : 'none',
              }}
            >
              <h4>English</h4>
              <h5>United States</h5>
            </button>
          </div>
        </div>
        <div
          onClick={handleCloseLanguageSwitcher}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            //   zIndex: -1,
            background: 'rgba(0,0,0,0.5)',
          }}
        ></div>
      </div>
    </>
  );
};

export default LanguageSwitcher;