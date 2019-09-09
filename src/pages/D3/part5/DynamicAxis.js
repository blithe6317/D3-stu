import React, { useEffect } from "react";
import * as d3 from "d3";

const DynamicAxis = () => {
  useEffect(() => {
    render();
  }, []);

  const render = () => {
    var height = 500,
      width = 500,
      margin = 25,
      xAxis,
      yAxis,
      xAxisLength,
      yAxisLength;

    var svg = d3
      .select("#dynamic")
      .append("svg")
      .attr("class", "axis")
      .attr("width", width)
      .attr("height", height);

    const renderXAxis = () => {
      xAxisLength = width - 2 * margin;
      var scale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, xAxisLength]);

      xAxis = d3.axisBottom().scale(scale);

      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", function() {
          return "translate(" + margin + "," + (height - margin) + ")";
        })
        .call(xAxis);
    };

    const renderYAxis = () => {
      yAxisLength = height - 2 * margin;

      var scale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, yAxisLength]);

      yAxis = d3.axisLeft().scale(scale);

      svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", function() {
          return "translate(" + margin + "," + margin + ")";
        })
        .call(yAxis);
    };

    const rescale = () => {
      var max = Math.round(Math.random() * 100);
      xAxis.scale().domain([0, max]);
      svg
        .select("g.x-axis")
        .transition()
        .call(xAxis);

      yAxis.scale().domain([max, 0]);

      svg
        .select("g.y-axis")
        .transition()
        .call(yAxis);

      renderXGridlines();
      renderYGridlines();
    };

    const renderXGridlines = () => {
      d3.selectAll("g.x-axis g.tick")
        .select("line.grid-line")
        .remove();

      d3.selectAll("g.x-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", -yAxisLength);
    };
    const renderYGridlines = () => {
      d3.selectAll("g.y-axis g.tick")
        .select("line.grid-line")
        .remove();

      d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", xAxisLength)
        .attr("y2", 0);
    };

    renderXAxis();
    renderYAxis();
    renderXGridlines();
    renderYGridlines();

    setInterval(() => {
      rescale();
    }, 3000);
  };
  return (
    <>
      <div id="dynamic"></div>
    </>
  );
};

export default DynamicAxis;
