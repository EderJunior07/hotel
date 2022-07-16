import React, { useState } from 'react';
import styles from './styles.module.scss';

import { ChevronLeft } from 'react-feather';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import SingleBedOutlinedIcon from '@mui/icons-material/SingleBedOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { AppsOutlined } from '@mui/icons-material';
import Head from 'next/head';
import CardService from '../../components/CardService';
import CarouselHolder from '../../components/common/CarouselHolder';
import { GetStaticPaths, GetStaticProps } from 'next';
import { OfficeDetails } from '../../../data/officeDetails';
import Header from '../../components/Header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import moment from 'moment';
import { Design } from '../../../data/design';
import { useTranslation } from 'next-i18next';
import { useWindowSize } from '../../hooks/UseWindowSize';

import Footer from '../../components/common/Footer';
import OffersRoomModal from '../../components/OffersRoomModal';
import OffersAccordion from '../../components/OffersAccordion';
import { useRouter } from 'next/router';
import { mockSearchResults } from '../../../mock/mockSearchResult';
import { AmenitieDisplay } from '../../components/common/AmenitieDisplay';
import { motion } from 'framer-motion';
import {
  GetOfficeDesign,
  GetOfficeDetails,
} from '../../services/requests/office';
import { GetServiceSearch } from '../../services/requests/booking';

interface IRoomDetailsProps {
  officeDetails: OfficeDetails;
  design: Design;
  servicesResult: any;
  searchResult: any;
}

const RoomDetails = (props: IRoomDetailsProps) => {
  const { t } = useTranslation('common');
  const [openOffersModal, setOpenOffersModal] = useState(false);
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const handleOpenMobileOffersModal = () => {
    if (document.body.style.overflow === 'hidden') {
      setOpenOffersModal(false);
      document.body.style.overflow = 'initial';
    } else {
      document.body.style.overflow = 'hidden';
      setOpenOffersModal(true);
    }
  };
  const router = useRouter();
  // Window Sizes
  const size = useWindowSize();

  const currentRoom = mockSearchResults[0];

  const handleReserve = () => router.push('/checkout');

  const imageData = currentRoom.images?.map((image) => {
    return {
      url: image?.imageUrl,
      title: image?.subTitle,
      alt: image?.subTitle,
    };
  });

  return (
    <>
      <Head>
        <title>{props?.design?.browserTitle}</title>
        <meta name="description" content={props?.design?.metaDescription} />
        <meta name="keywords" content={props?.design?.metaKeywords} />
        <link rel="icon" href={props?.design?.favIconUrl} />
      </Head>
      <Header design={props.design} />

      <main className={styles.mainBox}>
        <motion.button
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          whileTap={{ scale: 0.98 }}
          className={styles.btnGoBackDesk}
          onClick={() => router.back()}
        >
          <ChevronLeft width={18} height={18} />
        </motion.button>

        <div className={styles.contentBox}>
          {size.width < 868 && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.back()}
              className={styles.btnGoBack}
            >
              <ChevronLeft width={18} height={18} />
            </motion.div>
          )}

          <div className={styles.carouselContainer}>
            <CarouselHolder isDiscountBoxActive={false} data={imageData} />
          </div>

          <div className={styles.imgsBox}>
            <div
              className={styles.imgLeftSide}
              style={{
                backgroundImage: `url(${imageData[0].url})`,
              }}
            ></div>
            <div className={styles.imgRightSide}>
              <div
                className={styles.secondImgBox}
                style={{
                  backgroundImage: `url(${imageData[1].url})`,
                }}
              ></div>
              <div
                className={styles.thirdImgBox}
                style={{
                  backgroundImage: `url(${imageData[2].url})`,
                }}
              >
                {imageData.length > 3 && (
                  <div className={styles.allButton}>
                    <AppsOutlined
                      fontSize={'small'}
                      style={{ color: '#000' }}
                    />
                    <p>{t('showAllPhotos')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.infoBox}>
              <div className={styles.iconsContainerHolder}>
                <div className={styles.iconWithNumberContainer}>
                  <BedOutlinedIcon fontSize={'small'} />
                  <h5>3</h5>
                </div>
                <div className={styles.iconWithNumberContainer}>
                  <SingleBedOutlinedIcon fontSize={'small'} />
                  <h5>1</h5>
                </div>
                <div className={styles.iconWithNumberContainer}>
                  <PersonOutlinedIcon fontSize={'small'} />
                  <h5>5</h5>
                </div>
              </div>

              <h2>{currentRoom?.objectName || '-'}</h2>

              <p>
                {currentRoom?.objectDescription.substring(
                  0,
                  showMoreDescription
                    ? currentRoom?.objectDescription?.length
                    : 300
                ) || '-'}
                <span
                  onClick={() => setShowMoreDescription(!showMoreDescription)}
                  style={{ cursor: 'pointer' }}
                >
                  {' '}
                  {showMoreDescription ? t('showLess') : `...${t('showMore')}`}
                </span>
              </p>

              <div className={styles.amenitiesContainer}>
                {currentRoom?.amenities?.map((item, index) => (
                  <AmenitieDisplay key={index} amenitie={item as any} />
                ))}
              </div>
            </div>

            <div className={styles.ctaBoxHolder}>
              <div className={styles.ctaBox}>
                <OffersAccordion />
                <motion.button
                  id={'button'}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.confirmBtn}
                  onClick={handleReserve}
                >
                  {t('book')}
                </motion.button>
              </div>
            </div>
          </div>

          <section className={styles.servicesContainer}>
            <h4 className={styles.customSubtitle}>Confira</h4>
            <h2 className={styles.customTitle}>Serviços disponíveis</h2>
            <div className={styles.gridHolder}>
              {props?.servicesResult?.map((service, index) => (
                <CardService key={index} service={service} />
              ))}
            </div>
          </section>
        </div>
      </main>
      {size.width < 868 && openOffersModal && (
        <OffersRoomModal
          openOffersModal={openOffersModal}
          handleOpenMobileOffersModal={handleOpenMobileOffersModal}
        />
      )}
      <div className={styles.offersControlContainer}>
        <div className={styles.leftSide}>
          <h4>
            R$ 98 <span>2 noites</span>{' '}
          </h4>
          <u onClick={() => handleOpenMobileOffersModal()}>
            <h6>Ver 2 ofertas</h6>
          </u>
        </div>

        <div className={styles.rightSide}>
          <motion.button
            id={'button'}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.confirmBtn}
            onClick={handleReserve}
          >
            {t('book')}
          </motion.button>
        </div>
      </div>
      {size.width > 868 && (
        <Footer design={props.design} officeDetails={props.officeDetails} />
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // pegar os quartos mais vistos e colocar nos paths

  const ids = ['13', '14', '15', '16', '17']; // Example
  const paths = ids.map((id) => ({
    params: { id },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const officeDetails = await GetOfficeDetails();
  const design = await GetOfficeDesign();
  const servicesResult = await GetServiceSearch();
  return {
    props: {
      searchResult: mockSearchResults[0],
      servicesResult,
      officeDetails,
      design,
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 60,
  };
};

export default RoomDetails;
