import React, { useEffect } from "react";
import { Button } from "antd";
import lineChart from "./utils/lineChart";

const LineChart = () => {
  let chart;
  useEffect(() => {
    chart = lineChart().init("#line");
  }, []);
  return (
    <>
      <div id="line"></div>
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

export default LineChart;
