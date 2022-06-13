import Head from 'next/head';
import { GetStaticProps } from 'next';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CarouselHolder from '../components/common/CarouselHolder';

import styles from './home.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import CardClient from '../components/CardClient';
import CardEventType1 from '../components/cardsEvents/CardEventType1';
import { useWindowSize } from '../hooks/UseWindowSize';
import Footer from '../components/common/Footer';

const imageData = [
  'https://images.unsplash.com/photo-1604156788856-2ce5f2171cce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1559686043-aef1bbc98d19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1514923995763-768e52f5af87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
];

const clientData = [
  {
    url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    name: 'Paulo Roberto',
    description:
      'Um lugar muito lindo. E com pessoas queridas, empáticas, incríveis e especiais.',
  },
  {
    url: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    name: 'Paula Roberta',
    description:
      'Um lugar muito lindo. E com pessoas queridas, empáticas, incríveis e especiais.',
  },
  {
    url: 'https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80',
    name: 'Paulo Roberto',
    description:
      'Um lugar muito lindo. E com pessoas queridas, empáticas, incríveis e especiais.',
  },
  {
    url: 'https://images.unsplash.com/photo-1519625594242-7db544018926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    name: 'Paula Roberta',
    description:
      'Um lugar muito lindo. E com pessoas queridas, empáticas, incríveis e especiais.',
  },
];

export default function Home(props ) {
  const { width } = useWindowSize();

  console.log(props);

  const swiperStyle = {
    paddingLeft:
      width >= 320 && width < 524
        ? '1rem'
        : width >= 524 && width < 1024
        ? '2rem'
        : width >= 628 && width < 1024
        ? '2rem'
        : width >= 1024 && width < 1280
        ? '4rem'
        : '8rem',
    paddingRight: 16,
    paddingBottom: 16,
    marginBottom: 48,
  };
  return (
    <>
      <Head>
        <title>Hotel</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header placeholder="Sua Hospedagem" />
        <Hero />

        <section className={styles.eventsContainer}>
          <h2 className={styles.title}>
            Confira nossos <br /> <span>eventos</span> próximos
          </h2>

          <div className={`${styles.scrollContainer} ${styles.grabbable}`}>
            <Swiper
              spaceBetween={16}
              slidesPerView={'auto'}
              freeMode={true}
              style={swiperStyle}
            >
              <SwiperSlide style={{ width: 'auto', marginRight: '1rem' }}>
                <CardEventType1 />
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto', marginRight: '1rem' }}>
                <CardEventType1 />
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto', marginRight: '1rem' }}>
                <CardEventType1 />
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto', marginRight: '1rem' }}>
                <CardEventType1 />
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto', marginRight: '1rem' }}>
                <CardEventType1 />
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        <section className={styles.slidesSection}>
          <div className={styles.hotelPhotosContainer}>
            <div className={styles.imgSlideContainer}>
              <CarouselHolder showArrows={true} data={imageData} />
            </div>
            <div className={styles.imgDescriptionContainer}>
              <div>
                <h3>{props?.officeDetails?.officeName}</h3>
                <h2>
                  Piscinas e uma vista incrível da natureza para a família.
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.clientsContainer}>
          <h2 className={styles.title} style={{ textAlign: 'center' }}>
            Confira o que nossos
            <br />
            clientes estão dizendo
          </h2>

          <div className={`${styles.scrollContainer} ${styles.grabbable}`}>
            <Swiper
              spaceBetween={16}
              slidesPerView={'auto'}
              freeMode={true}
              style={swiperStyle}
            >
              {clientData.map((item, index) => (
                <SwiperSlide
                  key={index}
                  style={{ width: 'auto', marginRight: '2rem' }}
                >
                  <CardClient data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const base_url = 'http://book.hospeda.in';
  const officeDetails = await fetch(base_url + '/offices/office1').then(
    (response) => response.json()
  );
  const design = await fetch(base_url + '/offices/office1/design').then(
    (response) => response.json()
  );
  const reviews = await fetch(base_url + '/offices/office1/reviews').then(
    (response) => response.json()
  );
  const events = await fetch(base_url + '/offices/office1/events').then(
    (response) => response.json()
  );
  const images = await fetch(base_url + '/offices/office1/images').then(
    (response) => response.json()
  );
  

  return {
    props: {
      officeDetails,
      design,
      reviews,
      events,
      images
    },
    revalidate: 60 * 60 / 4,
  };
};
