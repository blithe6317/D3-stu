import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import style from "./style.scss";

const NEXT_BUTTON = "swiper-button-next";
const NEXT_BUTTON_DISABLED = NEXT_BUTTON + " disabled";
const PREV_BUTTON = "swiper-button-prev";
const PREV_BUTTON_DISABLED = PREV_BUTTON + " disabled";

const Swiper = props => {
  const [active, setActive] = useState(0);
  const [oldActive, setOldActive] = useState(null);
  const [maxActive, setMaxActive] = useState(0);
  const [nextClassName, setNextClassName] = useState(NEXT_BUTTON);
  const [prevClassName, setPrevClassName] = useState(PREV_BUTTON);

  const wrapperRef = useRef();
  const prevRef = useRef();
  const nextRef = useRef();

  const {
    onBeforeSwitch,
    onAfterSwitch,
    onNextClick,
    onPrevClick,
    onNavigationClick
  } = props;

  useEffect(() => {
    initSwiper();
  }, []);

  useEffect(() => {
    const { isAnchor } = props;
    onBeforeSwitch(active, oldActive);
    moveWrapper(active);
    buttonClassName(active);
    if (isAnchor) {
      const anchor = getAnchorUrl();
      const lastPlayAnchor = getAnchorByActive(active);
      if (anchor !== lastPlayAnchor) {
        setAnchorUrl(active);
      }

      window.onhashchange = () => {
        const anchor = getAnchorUrl();
        const lastPlayAnchor = getAnchorByActive(active);
        if (anchor !== lastPlayAnchor) {
          const newActive = getActiveByAnchor(anchor);
          setOldActive(active);
          setActive(newActive);
        }
      };
    }
  }, [active]);

  const initSwiper = () => {
    const { children } = props;
    initAnchor();
    setMaxActive(children.length - 1);
  };

  useEffect(() => {
    const { autoplay, loop } = props;
    if (autoplay) {
      const autoplayTimer = setInterval(
        () => {
          if (active >= maxActive) {
            if (loop) {
              setOldActive(active);
              setActive(0);
            } else {
              clearInterval(autoplayTimer);
            }
          } else {
            setOldActive(active);
            setActive(active + 1);
          }
        },
        autoplay === true ? 3000 : autoplay
      );
      return () => clearInterval(autoplayTimer);
    }
  }, [props.autoplay, active, maxActive]);

  const moveWrapper = index => {
    const { speed, children } = props;
    const len = children.length;
    const wraDom = wrapperRef.current;
    const { width } = wraDom.getBoundingClientRect();
    const moveW = index * (width + 20);
    const firstSlide = wraDom.getElementsByClassName("swiper-slide")[0];
    const lastSlide = wraDom.getElementsByClassName("swiper-slide")[len - 1];

    if (oldActive === len - 1 && index === 0) {
      wraDom.style.transitionDuration = speed + "ms";
      firstSlide.style.transform = `translate3d(${len *
        (width + 20)}px,0px,0px)`;
      wraDom.style.transform = `translate3d(-${len * (width + 20)}px,0px,0px)`;

      wraDom.addEventListener("transitionend", end);
    } else if (oldActive === 0 && index === len - 1) {
      wraDom.style.transitionDuration = speed + "ms";
      lastSlide.style.transform = `translate3d(-${len *
        (width + 20)}px,0px,0px)`;
      wraDom.style.transform = `translate3d(${width + 20}px,0px,0px)`;

      wraDom.addEventListener("transitionend", end);
    } else {
      wraDom.style.transitionDuration = speed + "ms";
      wraDom.style.transform = `translate3d(-${moveW}px,0px,0px)`;
    }

    function end() {
      wraDom.style.transitionDuration = "0ms";
      wraDom.style.transform = `translate3d(-${moveW}px,0px,0px)`;
      firstSlide.style.transform = `unset`;
      lastSlide.style.transform = `unset`;

      wraDom.removeEventListener("transitionend", end);
    }

    onAfterSwitch(active, oldActive);
  };

  const nextPage = () => {
    const { loop } = props;
    if (active >= maxActive) {
      if (loop) {
        setOldActive(active);
        setActive(0);
        onNextClick(0, active);
      }
    } else {
      setOldActive(active);
      setActive(active + 1);
      onNextClick(active + 1, active);
    }
  };

  const prevPage = () => {
    const { loop } = props;
    if (active === 0) {
      if (loop) {
        setOldActive(active);
        setActive(maxActive);
        onPrevClick(maxActive, active);
      }
    } else {
      setOldActive(active);
      setActive(active - 1);
      onPrevClick(active - 1, active);
    }
  };

  const getActiveByAnchor = anchor => {
    const { children } = props;
    if (anchor === "" || anchor === undefined) {
      return 0;
    }
    return children.findIndex(child => child.props.anchor === anchor);
  };

  const getAnchorByActive = active => {
    const { children } = props;
    active = active < 0 ? 0 : active;
    return children[active].props.anchor;
  };

  const getAnchorUrl = () => {
    return document.location.hash.replace("#", "");
  };

  const setAnchorUrl = active => {
    const anchor = getAnchorByActive(active);
    document.location.hash = anchor;
  };

  const initAnchor = () => {
    const { defaultActive } = props;
    const firstAnchor = getAnchorUrl();
    if (firstAnchor) {
      setActiveByAnchor(firstAnchor);
    } else {
      setOldActive(defaultActive);
      setActive(defaultActive);
    }
  };

  const setActiveByAnchor = anchor => {
    const ac = getActiveByAnchor(anchor);
    if (ac >= 0) {
      setOldActive(active);
      setActive(ac);
    }
  };

  const navigationClick = index => {
    setOldActive(active);
    setActive(index);
    onNavigationClick(index, active);
  };

  const buttonClassName = active => {
    const { loop } = props;
    if (!loop) {
      if (active === 0) {
        setPrevClassName(PREV_BUTTON_DISABLED);
      } else {
        setPrevClassName(PREV_BUTTON);
      }
      if (active === maxActive) {
        setNextClassName(NEXT_BUTTON_DISABLED);
      } else {
        setNextClassName(NEXT_BUTTON);
      }
    }
  };

  const pointClassName = index => {
    return "point " + (active === index ? "active" : "");
  };

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <div className="swiper-container">
          <div className="swiper-wrapper" ref={wrapperRef}>
            {props.children}
          </div>
          {props.navigationShow ? (
            <div className="swiper-pagination">
              {props.children.map((_, index) => {
                return (
                  <span
                    key={index}
                    className={pointClassName(index)}
                    onClick={() => {
                      navigationClick(index);
                    }}
                  ></span>
                );
              })}
            </div>
          ) : (
            ""
          )}

          {props.buttonShow ? (
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
  // 是否支持锚点路由
  isAnchor: PropTypes.bool,
  // 默认活动页
  defaultActive: PropTypes.number,
  // 是否自动轮播 间隔 0|false 不自动轮播 number|true自动轮播默认3000ms
  autoplay: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  // 是否循环轮播
  loop: PropTypes.bool,
  // 轮播切换动画时间
  speed: PropTypes.number,
  // 是否显示翻页按钮
  buttonShow: PropTypes.bool,
  // 是否显示分页器
  navigationShow: PropTypes.bool,
  // 切换前
  onBeforeSwitch: PropTypes.func,
  // 切换后
  onAfterSwitch: PropTypes.func,
  // 前进
  onNextClick: PropTypes.func,
  // 后退
  onPrevClick: PropTypes.func,
  // 翻页器点击
  onNavigationClick: PropTypes.func
};

Swiper.defaultProps = {
  isAnchor: true,
  defaultActive: 0,
  autoplay: 0,
  loop: true,
  speed: 700,
  buttonShow: true,
  navigationShow: true,
  onBeforeSwitch: () => {},
  onAfterSwitch: () => {},
  onNextClick: () => {},
  onPrevClick: () => {},
  onNavigationClick: () => {}
};

export const SwiperSlide = props => {
  return (
    <>
      <div className="swiper-slide">{props.children}</div>
    </>
  );
};

SwiperSlide.propTypes = {
  anchor: PropTypes.string
};
SwiperSlide.defaultProps = {
  anchor: ""
};

export default Swiper;
