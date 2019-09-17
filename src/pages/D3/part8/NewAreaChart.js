import React, { useEffect } from "react";

import areaChart from "./utils/areaChart";
import { Button } from "antd";

const NewAreaChart = () => {
  const chart = areaChart();
  useEffect(() => {
    chart.renderTo("#new-area-chart");
  }, []);
  return (
    <>
      <div id="new-area-chart"></div>
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

export default NewAreaChart;
