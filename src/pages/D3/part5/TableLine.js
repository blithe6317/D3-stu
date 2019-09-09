import React, { useEffect } from "react";
import * as d3 from "d3";

const TableLine = () => {
  useEffect(() => {
    render();
  }, []);
  const render = () => {
    var height = 500,
      width = 500,
      margin = 25;

    var svg = d3
      .select("#tableline")
      .append("svg")
      .attr("class", "axis")
      .attr("width", width)
      .attr("height", height);

    const renderXAxis = () => {
      var axisLength = width - 2 * margin;

      var scale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, axisLength]);

      var xAxis = d3.axisBottom().scale(scale);

      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", function() {
          return "translate(" + margin + "," + (height - margin) + ")";
        })
        .call(xAxis);

      d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("stroke", function(d, i) {
          if (i !== 0) {
            return "#666";
          }
        })
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", -(height - 2 * margin));
    };

    const renderYAxis = () => {
      var axisLength = height - 2 * margin;
      var scale = d3
        .scaleLinear()
        .domain([100, 0])
        .range([0, axisLength]);

      var yAxis = d3.axisLeft().scale(scale);

      svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", function() {
          return "translate(" + margin + "," + margin + ")";
        })
        .call(yAxis);

      d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", axisLength)
        .attr("y2", 0);
    };

    renderXAxis();
    renderYAxis();
  };
  return (
    <>
      <div id="tableline"></div>
    </>
  );
};

export default TableLine;
