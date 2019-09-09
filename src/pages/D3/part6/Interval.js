import React, { useState, useEffect } from "react";
import { Button } from "antd";
import * as d3 from "d3";

const Interval = () => {
  const [count, setCount] = useState(0);

  let countDown;
  useEffect(() => {
    countDown = d3.select("#interval").append("input");
    render();
  }, []);

  const render = () => {
    countDown
      .attr("type", "button")
      .attr("class", "countdown")
      .attr("value", "0");
  };

  const countUp = target => {
    var t = d3.timer(function() {
      var value = countDown.attr("value");
      if (value === target) {
        t.stop();
        return true;
      }
      countDown.attr("value", ++value);
    });
  };

  const reset = () => {
    countDown.attr("value", 0);
  };
  return (
    <>
      <div id="interval"></div>
      <Button
        type="primary"
        onClick={() => {
          countUp(100);
        }}
      >
        Start
      </Button>
      <Button type="primary" onClick={reset}>
        Stop
      </Button>
    </>
  );
};

export default Interval;
