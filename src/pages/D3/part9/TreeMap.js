import React, { useEffect } from "react";
import * as d3 from "d3";
import { Button } from "antd";

import treeMapChart from "./chart/treeMapChart";

const TreeMap = () => {
  let chart;
  useEffect(() => {
    chart = treeMapChart();

    d3.json("/flare.json", function(nodes) {
      console.log("nodes:", nodes);
      chart
        .nodes(nodes)
        .valueAccessor(size)
        .render("#tree-map");
    });
  }, []);
  const size = d => d.size;
  const count = () => 1;
  return (
    <>
      <div id="tree-map"></div>
      <Button
        type="primary"
        onClick={() => {
          chart
            .valueAccessor(chart.valueAccessor() == size ? count : size)
            .render();
        }}
      >
        更新
      </Button>
    </>
  );
};

export default TreeMap;
