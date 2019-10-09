import React from "react";
import SwiperComponent, { SwiperSlide } from "../components/Swiper/index";

const Swiper = props => {
  return (
    <>
      <div style={{ width: "100%", height: "400px" }}>
        <SwiperComponent>
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
        </SwiperComponent>
      </div>
    </>
  );
};

export default Swiper;
