import React from "react";
import SwiperComponent, { SwiperSlide } from "../components/Swiper/index";
import Part6 from "../../D3/part6";
import Part7 from "../../D3/part7";
import Part8 from "../../D3/part8";
import Part9 from "../../D3/part9";

const Swiper = props => {
  const onBeforeSwitchHandler = (active, oldActive) => {
    // console.log("Before active:", active);
    // console.log("Before oldActive:", oldActive);
  };
  const onAfterSwitchHandler = (active, oldActive) => {
    // console.log("After active:", active);
    // console.log("After oldActive:", oldActive);
  };
  const prevClickHandler = (active, oldActive) => {
    // console.log("prev active:", active);
    // console.log("prev ldActive:", oldActive);
  };
  const nextClickHandler = (active, oldActive) => {
    // console.log("next active:", active);
    // console.log("next oldActive:", oldActive);
  };
  const navigationClickHandler = (active, oldActive) => {
    // console.log("navigation active:", active);
    // console.log("navigation oldActive:", oldActive);
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <SwiperComponent>
          <SwiperSlide anchor="1">
            <h1>1</h1>
          </SwiperSlide>
          <SwiperSlide anchor="2">
            <h1>2</h1>
          </SwiperSlide>
          <SwiperSlide anchor="3">
            <h1>3</h1>
          </SwiperSlide>
          <SwiperSlide anchor="4">
            <h1>4</h1>
          </SwiperSlide>
        </SwiperComponent>
      </div>
    </>
  );
};

export default Swiper;
