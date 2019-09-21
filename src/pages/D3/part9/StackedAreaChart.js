import React, { useEffect } from "react";
import * as d3 from "d3";
import { Button } from "antd";

import stackedArea from "./chart/stackedArea";

const StackedAreaChart = () => {
  let chart;
  useEffect(() => {
    chart = stackedArea();
    chart
      .xScale(d3.scaleLinear().domain([0, 50]))
      .yScale(d3.scaleLinear().domain([0, 26]))
      .renderTo("#stacked-area");

    chart.update();
  }, []);
  return (
    <>
      <div id="stacked-area"></div>
      <Button
        type="primary"
        onClick={() => {
          chart.update();
        }}
      >
        更新
      </Button>
    </>
  );
};

export default StackedAreaChart;
