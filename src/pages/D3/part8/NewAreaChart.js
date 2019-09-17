import React, { useEffect } from "react";

import areaChart from "./utils/areaChart";

const NewAreaChart = () => {
  useEffect(() => {
    const chart = areaChart();
    chart.renderTo("#new-area-chart");
  }, []);
  return (
    <>
      <div id="new-area-chart"></div>
    </>
  );
};

export default NewAreaChart;
