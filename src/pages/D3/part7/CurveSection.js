import React, { useEffect } from "react";
import * as d3 from "d3";
import { Button } from "antd";

const CurveSection = () => {
  const width = 500,
    height = 500,
    margin = 30;

  const x = d3
    .scaleLinear()
    .domain([0, 10])
    .range([margin, width - margin]);

  const y = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height - margin, margin]);

  const data = d3.range(11).map(i => ({ x: i, y: Math.sin(i) * 3 + 5 }));

  let svg;
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    svg = d3.select("#section").append("svg");
    svg.attr("height", height).attr("width", width);
    renderAxis();
    renderDots();
    render(d3.curveLinear);
  };
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

  const renderDots = () => {
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

  const render = mode => {
    var line = d3
      .line()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .curve(mode);

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
      .y1(d => y(d.y))
      .curve(mode);

    svg
      .selectAll("path.area")
      .data([data])
      .enter()
      .append("path")
      .attr("class", "area");
    svg
      .selectAll("path.area")
      .data([data])
      .attr("d", d => area(d));
  };
  return (
    <>
      <div id="section"></div>
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

export default CurveSection;
