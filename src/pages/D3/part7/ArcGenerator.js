import React, { useEffect } from "react";
import * as d3 from "d3";

const ArcGenerator = () => {
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

  var svg = d3.select("");
  useEffect(() => {}, []);
  const init = () => {};
  const render = () => {};
  return (
    <>
      <div id="arc"></div>
    </>
  );
};

export default ArcGenerator;
