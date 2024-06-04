import React from 'react';

import { v4 } from 'uuid';
import styled from '@emotion/styled';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';

const SwiperStyle = styled.div`
  & .swiper-slide,
  & .swiper-container {
    border-radius: 1rem;
    width: 100%;
  }
  & .swiper-pagination.swiper-pagination-clickable {
    bottom: 1rem;
    width: 100%;
  }
  & .swiper-pagination-bullet {
    height: 1rem;
    width: 1rem;
    background: transparent;
    opacity: 1;
    border: 1px solid #efefef;
    display: inline-block;
    border-radius: 50%;
    margin: 0.25rem;
    box-shadow: 0px 0px 3px #00000050;
  }
  & .swiper-pagination-bullet-active {
    background-color: #ffffff;
  }

  & .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 1.5rem;
  }
  & .swiper-button-prev::after {
    content: '<';
  }
  & .swiper-button-next::after {
    content: '>';
  }

  & .swiper-button-next,
  .swiper-button-prev {
    border-radius: 50%;
    box-shadow: 0px 0px 5px 1px gray;
    height: 2rem;
    width: 2rem;
    background-color: white;
  }
`;

const Rounded = styled.div`
  border-radius: 1rem;
  & > img {
    border-radius: 1rem;
  }
`;

/**
 *
 * @param {Object} param0
 * @param {Object} param0.breakPoints
 * @param {number} param0.slidesPerView
 * @param {number} param0.spaceBetween
 * @param {Function} param0.onSlideChange
 * @param {Function} param0.onSwiper
 * @param {[any]} param0.datalist
 * @param {Boolean} param0.navigation
 * @param {Boolean} param0.pagination
 * @param {Number} param0.delay
 * @param {Number} param0.slidesPerGroup
 * @returns
 */
const CVCarrusel = React.memo(MemoCVCarrusel);

function MemoCVCarrusel({
  slidesPerView = 1,
  spaceBetween = 0,
  slidesPerGroup = 1,
  onSlideChange = () => {},
  onSwiper = (swiper) => {},
  datalist = [],
  navigation = false,
  pagination = true,
  delay = 4000,
  breakPoints = null,
  reverseSlide = false,
  speedTransition = 1000
}) {
  return (
    <SwiperStyle breakPoints={breakPoints}>
      <Swiper
        breakpoints={breakPoints}
        slidesPerGroup={slidesPerGroup}
        speed={speedTransition}
        navigation={navigation}
        autoplay={{
          delay,
          reverseDirection: reverseSlide
        }}
        loop={true}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onSlideChange={onSlideChange}
        onSwiper={onSwiper}
        pagination={
          pagination
            ? {
                clickable: true
              }
            : false
        }>
        {datalist.map((item) => (
          <SwiperSlide key={v4()}>
            <Rounded>{item}</Rounded>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperStyle>
  );
}

export default CVCarrusel;
