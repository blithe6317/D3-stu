import React, { useEffect } from "react";

import pieChart from "./chart/pieChart";
import { Button } from "antd";

const PieChart = () => {
  const chart = pieChart();
  useEffect(() => {
    chart.renderTo("#pie-chart");
  }, []);
  return (
    <>
      <div id="pie-chart"></div>
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

export default PieChart;
