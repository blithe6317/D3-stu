import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import style from "./style.scss";

const Swiper = props => {
  const [active, setActive] = useState(0);
  const [maxActive, setMaxActive] = useState(0);
  const [nextClassName, setNextClassName] = useState("swiper-button-next");
  const [prevClassName, setPrevClassName] = useState("swiper-button-prev");

  const wrapperRef = useRef();
  const prevRef = useRef();
  const nextRef = useRef();

  useEffect(() => {
    initSwiper();
  }, []);

  useEffect(() => {
    moveWrapper(active);
    buttonClassName(active);
  }, [active]);

  const initSwiper = () => {
    const { defaultActive, children } = props;
    setActive(defaultActive);
    setMaxActive(children.length - 1);
  };

  useEffect(() => {
    const { autoplay, loop } = props;
    if (autoplay) {
      const autoplayTimer = setInterval(
        () => {
          if (active >= maxActive) {
            if (loop) {
              setActive(0);
            } else {
              clearInterval(autoplayTimer);
            }
          } else {
            setActive(active + 1);
          }
        },
        autoplay === true ? 3000 : autoplay
      );
      return () => clearInterval(autoplayTimer);
    }
  }, [props.autoplay, active, maxActive]);

  const moveWrapper = index => {
    const { speed } = props;
    const wraDom = wrapperRef.current;
    const { width } = wraDom.getBoundingClientRect();
    const moveW = index * (width + 20);
    wraDom.style.transitionDuration = speed + "ms";
    wraDom.style.transform = `translate3d(-${moveW}px,0px,0px)`;
  };

  const nextPage = () => {
    const { loop } = props;
    if (active >= maxActive) {
      if (loop) {
        setActive(0);
      }
    } else {
      setActive(active + 1);
    }
  };

  const prevPage = () => {
    const { loop } = props;
    if (active === 0) {
      if (loop) {
        setActive(maxActive);
      }
    } else {
      setActive(active - 1);
    }
  };

  const buttonClassName = active => {
    const { loop } = props;
    if (!loop) {
      if (active === 0) {
        setPrevClassName("swiper-button-prev disabled");
      } else {
        setPrevClassName("swiper-button-prev");
      }
      if (active === maxActive) {
        setNextClassName("swiper-button-next disabled");
      } else {
        setNextClassName("swiper-button-next");
      }
    }
  };
  const pointClassName = index => {
    return "point " + (active === index ? "active" : "");
  };

  return (
    <>
      <div style={{ width: "100%", height: "400px" }}>
        <div className="swiper-container">
          <div className="swiper-wrapper" ref={wrapperRef}>
            {props.children}
          </div>
          <div className="swiper-pagination">
            {props.children.map((_, index) => {
              return (
                <span
                  className={pointClassName(index)}
                  onClick={() => setActive(index)}
                ></span>
              );
            })}
          </div>
          {props.navigationShow ? (
            <>
              <div className={nextClassName} ref={nextRef} onClick={nextPage}>
                &gt;
              </div>
              <div className={prevClassName} ref={prevRef} onClick={prevPage}>
                &lt;
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
Swiper.propTypes = {
  // 默认活动页
  defaultActive: PropTypes.number,
  // 是否自动轮播 间隔
  autoplay: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  // 是否循环轮播
  loop: PropTypes.bool,
  // 轮播动画时间     transition-duration: 400ms;
  speed: PropTypes.number,
  // 是否显示翻页按钮
  navigationShow: PropTypes.bool
};

Swiper.defaultProps = {
  defaultActive: 0,
  autoplay: 3000,
  loop: true,
  speed: 500,
  navigationShow: true
};

export const SwiperSlide = props => {
  return (
    <>
      <div className="swiper-slide">{props.children}</div>
    </>
  );
};

export default Swiper;
