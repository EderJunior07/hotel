import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './search.module.scss';
import {
  HotelOutlined,
  AttractionsOutlined,
  CookieOutlined,
} from '@mui/icons-material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CardRoom from '../../components/CardRoom';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import { useTranslation } from 'next-i18next';
import Footer from '../../components/common/Footer';
import { OfficeDetails } from '../../../data/officeDetails';
import { Design } from '../../../data/design';
import CardService from '../../components/CardService';
import { mockSearchResults } from '../../../mock/mockSearchResult';
import { baseUrl } from '../../services';
import { motion } from 'framer-motion';
import CartModal from '../../components/CartModal';

interface ISearch {
  servicesResult: any;
  officeDetails: OfficeDetails;
  design: Design;
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const officeDetails = await fetch(baseUrl + '/offices/office1').then(
    (response) => response.json()
  );
  const design = await fetch(baseUrl + '/offices/office1/design').then(
    (response) => response.json()
  );

  const servicesResult = await fetch(
    baseUrl +
      '/booking/services/?' +
      new URLSearchParams({
        officeId: 'office1',
      })
  ).then((response) => response.json());

  return {
    props: {
      servicesResult,
      officeDetails,
      design,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60,
  };
};

const Search = ({ servicesResult, officeDetails, design }: ISearch) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [selectedTab, setSelectedTab] = useState('rooms');
  const [cartOpen, setCartOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(mockSearchResults);
  const { startDate, endDate, adults, children }: any = router.query;

  const formattedNumber = (number: number) =>
    number < 10 && number > 0 ? `0${number}` : '';

  const getSearchResult = async () => {
    console.log('SEARCHING...');
    await fetch(
      baseUrl +
        '/booking/room-search/?' +
        new URLSearchParams({
          officeId: 'office1',
          startDate,
          endDate,
          adults,
          children,
        })
    )
      .then((response) => response.json())
      .catch((err) => {
        window.alert('Não foi possível concluir a pesquisa...');
        console.log(err.message);
      });
  };

  // useEffect(() => {
  //   getSearchResult();
  // }, []);

  // Open Cart Modal
  const handleOpenCart = () => {
    document.body.style.overflow = 'hidden';
    setCartOpen(true);
  };
  const handleCloseCart = () => {
    document.body.style.overflow = 'initial';
    setCartOpen(false);
  };

  return (
    <>
      <Head>
        <title>Hotel - Pesquisa</title>
      </Head>
      <main className={styles.mainContainer}>
        <Header design={design} />
        {!searchResult || searchResult?.errors ? (
          <>
            <section className={styles.filterInfo}>
              <div style={{ flex: 1, paddingTop: 1 }}>
                <h2>Nenhum resultado foi encontrado...</h2>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className={styles.filterInfo}>
              <div style={{ flex: 1, paddingTop: 1 }}>
                <h2>
                  <span>{formattedNumber(searchResult?.length || 0)}</span>{' '}
                  quartos com{' '}
                  <span>{formattedNumber(servicesResult?.length || 0)}</span>{' '}
                  serviços foram encontrados
                </h2>
              </div>
              <div className={styles.filtersMobileSection}>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={
                    selectedTab === 'rooms'
                      ? {
                          borderBottom: '6px solid black',
                        }
                      : { opacity: 0.35, paddingBottom: '1.4rem' }
                  }
                  className={styles.filterButtonContainer}
                  onClick={() => {
                    (document.body.style.overflow = 'initial'),
                      setSelectedTab('rooms');
                  }}
                >
                  <HotelOutlined style={{ marginBottom: '0.2rem' }} />
                  <h4>Quartos</h4>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={
                    selectedTab === 'services'
                      ? {
                          borderBottom: '6px solid black',
                        }
                      : { opacity: 0.35, paddingBottom: '1.4rem' }
                  }
                  className={styles.filterButtonContainer}
                  onClick={() => {
                    (document.body.style.overflow = 'initial'),
                      setSelectedTab('services');
                  }}
                >
                  <AttractionsOutlined style={{ marginBottom: '0.2rem' }} />
                  <h4>Serviços</h4>
                </motion.div>
              </div>
            </section>
            <div className={styles.webResults}>
              <section className={styles.contentResultContainer}>
                {searchResult?.map((room, index) => (
                  <CardRoom key={index} room={room} />
                ))}
              </section>
              <section className={styles.serviceResultContainer}>
                <h4 className={styles.subtitle}>Confira</h4>
                <h2 className={styles.title}>Serviços disponíveis</h2>
                <div className={styles.contentResultContainer}>
                  {servicesResult?.map((service, index) => (
                    <CardService key={index} service={service} />
                  ))}
                </div>
              </section>
            </div>
            <div className={styles.mobileResults}>
              {selectedTab === 'rooms' && (
                <section className={styles.serviceResultContainer}>
                  <h4 className={styles.subtitle}>Confira</h4>
                  <h2 className={styles.title}>Quartos disponíveis</h2>
                  <div className={styles.contentResultContainer}>
                    {searchResult?.map((room, index) => (
                      <CardRoom key={index} room={room} />
                    ))}
                  </div>
                </section>
              )}
              {selectedTab === 'services' && (
                <section className={styles.serviceResultContainer}>
                  <h4 className={styles.subtitle}>Confira</h4>
                  <h2 className={styles.title}>Serviços disponíveis</h2>
                  <div className={styles.contentResultContainer}>
                    {servicesResult?.map((service, index) => (
                      <CardService key={index} service={service} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <section className={styles.facilitiesContainerHolder}>
              <h4 className={styles.subtitle}>Confira</h4>
              <h2 className={styles.title}>O que esse hotel oferece?</h2>
              <div className={styles.facilitiesCardContainer}>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className={styles.facilitiesCard}>
                    <h3>O que esse lugar oferece</h3>
                    {[...Array(7)].map((_, index) => (
                      <div className={styles.row} key={index}>
                        <CookieOutlined fontSize={'small'} />
                        <p>Cozinha</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          whileTap={{ scale: 0.9 }}
          className={styles.cartFloatingButton}
          onClick={handleOpenCart}
        >
          <ShoppingBagOutlinedIcon className={styles.cartIcon} />
        </motion.div>

        {cartOpen && <CartModal handleCloseCartModal={handleCloseCart} />}

        <Footer design={design} officeDetails={officeDetails} />
      </main>
    </>
  );
};

export default Search;
