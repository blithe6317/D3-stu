import React, { useEffect } from "react";

import bubbleChart from "./utils/bubbleChart";
import { Button } from "antd";

const BubbleChart = () => {
  const chart = bubbleChart();
  useEffect(() => {
    chart.renderTo("#bubble-chart");
  }, []);
  return (
    <>
      <div id="bubble-chart"></div>
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

export default BubbleChart;
