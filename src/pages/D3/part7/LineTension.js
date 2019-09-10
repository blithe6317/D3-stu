import React, { useEffect } from "react";
import * as d3 from "d3";
import { Button } from "antd";

const LineTension = () => {
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
      .domain([0, 1])
      .range([height - margin, margin]);

  var data = d3.range(10).map(function(i) {
    return { x: i, y: (Math.sin(i * 3) + 1) / 2 };
  });

  let svg;
  useEffect(() => {
    svg = d3.select("#line").append("svg");
    svg.attr("height", height).attr("width", width);

    renderAxis();
    render(1);
  }, []);
  const renderAxis = () => {
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
  const render = tension => {
    var line = d3
      .line()
      .curve(d3.curveCardinal.tension(tension))
      .x(function(d) {
        return x(d.x);
      })
      .y(function(d) {
        return y(d.y);
      });

    svg
      .selectAll("path.line")
      .data([tension])
      .enter()
      .append("path")
      .attr("class", "line");

    svg
      .selectAll("path.line")
      .data([tension])
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attr("d", function(d) {
        return line(data);
      });

    svg
      .selectAll("cricle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", function(d) {
        return x(d.x);
      })
      .attr("cy", function(d) {
        return y(d.y);
      })
      .attr("r", 4);
  };
  return (
    <>
      <div id="line"></div>

      <Button
        type="primary"
        onClick={() => {
          render(0);
        }}
      >
        0
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(0.2);
        }}
      >
        0.2
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(0.4);
        }}
      >
        0.4
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(0.6);
        }}
      >
        0.6
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(0.8);
        }}
      >
        0.8
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(1);
        }}
      >
        1
      </Button>
    </>
  );
};

export default LineTension;
