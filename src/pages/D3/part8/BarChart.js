import React, { useEffect } from "react";
import { Button } from "antd";

import barChart from "./utils/barChart";

const BarChart = () => {
  useEffect(() => {
    const chart = barChart();
    chart.renderTo("#bar-chart");
  }, []);
  return (
    <>
      <div id="bar-chart"></div>
    </>
  );
};

export default BarChart;
