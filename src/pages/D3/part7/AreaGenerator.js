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
      .domain([0, 10])
      .range([height - margin, margin]);

  var data = d3.range(11).map(function(i) {
    return { x: i, y: Math.sin(i) * 3 + 5 };
  });
  var svg;
  window.d3 = d3;
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    svg = d3.select("#area").append("svg");

    svg.attr("height", height).attr("width", width);
    renderAxis(svg);
    renderDots(svg);
    render();
  };

  const renderAxis = svg => {
    var xAxis = d3.axisBottom().scale(x);
    var yAxis = d3.axisLeft().scale(y);

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
  const render = () => {
    var line = d3
      .line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    svg
      .selectAll("path.line")
      .data([data])
      .enter()
      .append("path")
      .attr("class", "line");

    svg
      .selectAll("path.line")
      .data([data])
      .attr("d", d => line(d));

    var area = d3
      .area()
      .x(d => x(d.x))
      .y0(y(0))
      .y1(d => y(d.y));

    var area1 = d3
      .area()
      .x(d => x(d.x))
      .y0(d => y(d.y))
      .y1(10);

    svg
      .selectAll("path.area")
      .data([data])
      .enter()
      .append("path")
      .attr("class", "area")
      .attr("d", d => area(d));
    // svg
    //   .selectAll("path.area1")
    //   .data([data])
    //   .enter()
    //   .append("path")
    //   .attr("class", "area1")
    //   .attr("d", d => area1(d))
    //   .attr("fill", "red");
  };
  const renderDots = svg => {
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.x))
      .attr("cy", d => y(d.y))
      .attr("r", 4);
  };
  return (
    <>
      <div id="area"></div>
    </>
  );
};

export default AreaGenerator;
