import React, { useEffect } from "react";
import * as d3 from "d3";

import pack from "./chart/pack";

const PackChart = () => {
  let chart;
  useEffect(() => {
    d3.json("/flare.json", function(nodes) {
      chart = pack()
        .nodes(nodes)
        .valueAccessor(d => d.size)
        .render("#pack-chart");
      // chart = pack().render("pack-chart");
    });
  }, []);
  return (
    <>
      <div id="pack-chart"></div>
    </>
  );
};
export default PackChart;
