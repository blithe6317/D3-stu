import React, { useEffect } from "react";
import { Button } from "antd";

import stackedArea from "./chart/stackedArea";

const StackedAreaChart = () => {
  useEffect(() => {
    const chart = stackedArea();
    chart.renderTo("#stacked-area");
  }, []);
  return (
    <>
      <div id="stacked-area"></div>
      <Button type="primary">更新</Button>
    </>
  );
};

export default StackedAreaChart;
