import React, { useEffect } from "react";
import * as d3 from "d3";

const CustomTicks = () => {
  useEffect(() => {
    render();
  }, []);

  const render = () => {
    var height = 500,
      width = 500,
      margin = 25,
      axisWidth = width - 2 * margin;

    var svg = d3
      .select("#ticks")
      .append("svg")
      .attr("class", "axis")
      .attr("width", width)
      .attr("height", height);

    var scale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, axisWidth]);

    var axis = d3
      .axisBottom()
      .scale(scale)
      .ticks(10)
      .tickSize(12)
      .tickPadding(10)
      .tickFormat(d3.format(".0%"));

    svg
      .append("g")
      .attr("transform", function() {
        return "translate(" + margin + "," + margin + ")";
      })
      .call(axis);
  };
  return (
    <>
      <div id="ticks"></div>
    </>
  );
};

export default CustomTicks;
