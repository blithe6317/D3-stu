import React, { useEffect } from "react";
import * as d3 from "d3";

const AreaGenerator = () => {
  var width = 500,
    height = 500,
    margin = 30,
    duration = 500,
    x = d3
      .scaleLinear()
      .domain([0, 10])
      .range([margin, width - margin]),
    y = d3
      .scaleLinear()
      .domain(0, 10)
      .range([height - margin, margin]);

  var data = d3.range(11).map(function(i) {
    return { x: i, y: Math.sin(i) * 3 + 5 };
  });
  var svg;

  useEffect(() => {
    init();
  }, []);
  const init = () => {
    svg = d3.select("#area").append("svg");

    svg.attr("height", height).attr("width", width);
  };
  const render = () => {};
  return (
    <>
      <div id="area"></div>
    </>
  );
};

export default AreaGenerator;
