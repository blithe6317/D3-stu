import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { Button } from "antd";

const AreaChart = () => {
  const [dotsData, setDotsData] = useState([]);

  const width = 800,
    height = 400,
    margin = 30,
    x = d3
      .scaleLinear()
      .domain([0, 10])
      .range([margin, width - margin]),
    y = d3
      .scaleLinear()
      .domain([0, 10])
      .range([height - margin, margin]),
    color = d3.scaleOrdinal(d3.schemeCategory10);
  let svg, svgBody;

  useEffect(() => {
    let dotsData = randomPotsData();
    setDotsData(dotsData);
  }, []);

  useEffect(() => {
    if (dotsData && dotsData.length > 0) {
      init();
    }
  }, [dotsData]);

  const upDate = () => {
    let dotsData = randomPotsData();
    setDotsData(dotsData);
  };

  const randomPotsData = () => {
    return d3.range(3).map(i => {
      return d3.range(11).map(i => {
        return { x: i, y: Math.random() * 10 };
      });
    });
  };

  const init = () => {
    window.d3 = d3;
    svg = d3.select("#area svg");
    if (!svg.node()) {
      svg = d3
        .select("#area")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      renderAxes(svg);
    }
    renderBodyClip(svg);

    renderDots(dotsData);
    renderLine(dotsData);
    renderArea(dotsData);
  };
  const renderBodyClip = svg => {
    if (!svg.select("defs").node()) {
      svg
        .append("defs")
        .append("clipPath")
        .attr("id", "body-clip")
        .append("rect")
        .attr("x", margin)
        .attr("y", margin)
        .attr("width", width - 2 * margin)
        .attr("height", height - 2 * margin);
    }
    svgBody = svg.select("g.body");
    if (!svgBody.node()) {
      svgBody = svg
        .append("g")
        .attr("class", "body")
        .attr("transform", "translate(0,0)")
        .attr("clip-path", "url(#body-clip)");
    }
  };

  const renderAxes = svg => {
    const axesG = svg.append("g").attr("class", "axes");

    renderXAxis(axesG);
    renderYAxis(axesG);
  };

  const renderXAxis = axesG => {
    const xAxis = d3.axisBottom().scale(x);

    axesG
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + (height - margin) + ")")
      .call(xAxis);

    d3.selectAll("g.x-axis g.tick").each(function(i) {
      if (i !== 0) {
        d3.select(this)
          .append("line")
          .attr("class", "grid-line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", -(height - 2 * margin));
      }
    });
  };

  const renderYAxis = axesG => {
    const yAxis = d3.axisLeft().scale(y);

    axesG
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + margin + ",0)")
      .call(yAxis);

    d3.selectAll("g.y-axis g.tick").each(function(i) {
      if (i !== 0) {
        d3.select(this)
          .append("line")
          .attr("class", "grid-line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", width - 2 * margin)
          .attr("y2", 0);
      }
    });
  };

  const renderDots = data => {
    data.forEach((dots, i) => {
      svgBody
        .selectAll("circle.dot_" + i)
        .data(dots)
        .enter()  
        .append("circle")
        .transition()
        .attr("class", "dot dot_" + i)
        .style("stroke", color(i))
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        .attr("r", 4);
    });
  };

  const renderLine = data => {
    const line = d3
      .line()
      .curve(d3.curveCardinal)
      .x(d => x(d.x))
      .y(d => y(d.y));

    svgBody
      .selectAll("path.line")
      .data(data)
      .enter()
      .append("path")
      .transition()
      .attr("class", "line")
      .style("stroke", (d, i) => color(i))
      .attr("d", d => line(d));
  };

  const renderArea = data => {
    const area = d3
      .area()
      .curve(d3.curveCardinal)
      .x(d => x(d.x))
      .y0(d => y(0))
      .y1(d => y(d.y));

    svgBody
      .selectAll("path.area")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "area")
      .transition()
      .style("fill", (d, i) => color(i))
      .attr("d", d => area(d));
  };
  return (
    <>
      <div id="area"></div>
      <Button type="primary" onClick={upDate}>
        更新数据
      </Button>
    </>
  );
};

export default AreaChart;
