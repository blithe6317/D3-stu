import React, { useEffect } from "react";
import * as d3 from "d3";
import { Button } from "antd";
const Curve = () => {
  var width = 500,
    height = 500,
    margin = 30,
    x = d3
      .scaleLinear()
      .domain([0, 10])
      .range([margin, width - margin]),
    y = d3
      .scaleLinear()
      .domain([0, 10])
      .range([margin, height - margin]);

  const data = [
    [
      { x: 0, y: 5 },
      // { x: 1, y: 9 },
      // { x: 2, y: 7 },
      // { x: 3, y: 5 },
      // { x: 4, y: 5 },
      // { x: 6, y: 4 },
      // { x: 7, y: 2 },
      // { x: 8, y: 3 },
      { x: 9, y: 2 }
    ]

    // d3.range(10).map(function(i) {
    //   return { x: i, y: Math.sin(i) + 5 };
    // })
  ];

  let svg;
  useEffect(() => {
    svg = d3.select("#curve").append("svg");
    svg.attr("height", height).attr("width", width);

    renderAxis();
    render(d3.curveLinear);
    renderDots(svg);
  }, []);
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
  const render = mode => {
    var line = d3
      .line()
      .x(function(d) {
        return x(d.x);
      })
      .y(function(d) {
        return y(d.y);
      })
      .curve(mode);

    svg
      .selectAll("path.line")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "line");
    svg
      .selectAll("path.line")
      .data(data)
      .attr("d", function(d) {
        return line(d);
      });
  };

  const renderDots = svg => {
    data.forEach(function(list) {
      svg
        .append("g")
        .selectAll("circle")
        .data(list)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) {
          return x(d.x);
        })
        .attr("cy", function(d) {
          return y(d.y);
        })
        .attr("r", 4.5);
    });
  };
  return (
    <>
      <div id="curve"></div>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveLinear);
        }}
      >
        Linear
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveLinearClosed);
        }}
      >
        Linear Closed
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveStepBefore);
        }}
      >
        Step Before
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveStepAfter);
        }}
      >
        Step After
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveBasis);
        }}
      >
        Basis
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveBasisOpen);
        }}
      >
        Basis Open
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveBasisClosed);
        }}
      >
        Basis Closed
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveBundle);
        }}
      >
        Bundle
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveCardinal);
        }}
      >
        Cardinal
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveCardinalOpen);
        }}
      >
        Cardinal Open
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveCardinalClosed);
        }}
      >
        Cardinal Closed
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveMonotoneX);
        }}
      >
        MonotoneX
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveMonotoneY);
        }}
      >
        MonotoneY
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveCatmullRom);
        }}
      >
        CatmullRom
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveCatmullRomOpen);
        }}
      >
        CatmullRom Open
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(d3.curveCatmullRomClosed);
        }}
      >
        CatmullRom Closed
      </Button>
    </>
  );
};

export default Curve;
