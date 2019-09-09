import React, { useEffect } from "react";
import * as d3 from "d3";

const CascadeTransition = () => {
  let selector;

  useEffect(() => {
    selector = d3.select("#casca");
    render();
  }, []);

  const render = () => {
    selector
      .append("div")
      .style("position", "fixed")
      .style("background-color", "steelblue")
      .style("left", "10px")
      .style("width", "80px")
      .style("height", "80px")
      .call(teleport);
  };

  const teleport = s => {
    s.transition()
      .duration(2000)
      .style("width", "200px")
      .style("height", "1px")
      .transition()
      .duration(2000)
      .style("left", "600px")
      .transition()
      .duration(1000)
      .style("left", "800px")
      .style("height", "80px")
      .style("width", "80px");
  };

  return (
    <>
      <div id="casca"></div>
    </>
  );
};

export default CascadeTransition;
