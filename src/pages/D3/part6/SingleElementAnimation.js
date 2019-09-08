import React, { useEffect } from "react";
import * as d3 from "d3";

const SingleElementAnimation = () => {
  useEffect(() => {
    var duration = 5000;
    var selector = d3.select("#single-ele-animation");
    selector
      .classed("box", true)
      .style("background-color", "#e9967a")
      .transition()
      .duration(duration)
      .style("margin-left", "600px")
      .style("width", "100px")
      .style("height", "100px");
  }, []);
  return (
    <>
      <div id="single-ele-animation"></div>
    </>
  );
};

export default SingleElementAnimation;
