import React, { useEffect } from "react";
import * as d3 from "d3";

import tree from "./chart/tree";
import { Button } from "antd";

const TreeChart = () => {
  const chart = tree();
  useEffect(() => {
    d3.json("/flare.json", function(nodes) {
      chart.nodes(nodes).render("#tree-chart");
    });
  }, []);
  return (
    <>
      <div id="tree-chart"></div>
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

export default TreeChart;
