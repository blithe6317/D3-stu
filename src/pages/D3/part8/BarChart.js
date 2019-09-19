import React, { useEffect } from "react";

import barChart from "./utils/barChart";
import { Button } from "antd";

const BarChart = () => {
  const chart = barChart();
  useEffect(() => {
    chart.renderTo("#bar-chart");
  }, []);
  return (
    <>
      <div id="bar-chart"></div>
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

export default BarChart;
