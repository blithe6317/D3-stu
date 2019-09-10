import React, { useEffect } from "react";
import * as d3 from "d3";

const LineGenerator = () => {
  useEffect(() => {
    render();
  }, []);

  const render = () => {
    var width = 500,
      height = 500,
      margin = 40;

    const x = d3
      .scaleLinear()
      .domain([0, 10])
      .range([margin, width - margin]);
    const y = d3
      .scaleLinear()
      .domain([0, 10])
      .range([height - margin, margin]);

    const data = [
      [
        { x: 0, y: 5 },
        { x: 1, y: 9 },
        { x: 2, y: 7 },
        { x: 3, y: 5 },
        { x: 4, y: 3 },
        { x: 6, y: 4 },
        { x: 7, y: 2 },
        { x: 8, y: 3 },
        { x: 9, y: 2 }
      ],
      d3.range(10).map(function(i) {
        return { x: i, y: Math.sin(i) + 5 };
      })
    ];

    const line = d3
      .line()
      .x(function(d) {
        return x(d.x);
      })
      .y(function(d) {
        return y(d.y);
      });

    const svg = d3.select("#line").append("svg");

    svg.attr("height", height).attr("width", width);

    svg
      .selectAll("path.line")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d);
      });

    const renderAxis = () => {
      var xScale = d3
        .scaleLinear()
        .domain([0, 10])
        .range([margin, width - margin]);
      var yScale = d3
        .scaleLinear()
        .domain([0, 10])
        .range([height - margin, margin]);

      var xAxis = d3.axisBottom().scale(xScale);
      var yAxis = d3.axisLeft().scale(yScale);

      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", function() {
          return "translate(0," + (height - margin) + ")";
        })
        .call(xAxis);

      svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", function() {
          return "translate(" + margin + ",0)";
        })
        .call(yAxis);
    };
    renderAxis();
  };
  return (
    <>
      <div id="line"></div>
    </>
  );
};

export default LineGenerator;
