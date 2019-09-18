import React, { useEffect } from "react";

import scatterChart from "./utils/scatterplotChart";
import { Button } from "antd";

const ScatterplotChart = () => {
  const chart = scatterChart();
  useEffect(() => {
    chart.renderTo("#scatter-chart");
  }, []);
  return (
    <>
      <div id="scatter-chart"></div>
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

export default ScatterplotChart;
