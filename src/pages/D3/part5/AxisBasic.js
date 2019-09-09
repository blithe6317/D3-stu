import React, { useEffect } from "react";
import { Button } from "antd";
import * as d3 from "d3";

const AxisBasic = () => {
  useEffect(() => {
    runAxis();
  }, []);
  const runAxis = type => {
    var height = 500,
      width = 500,
      margin = 25,
      offset = 50,
      axisWidth = width - 2 * margin,
      svg;
    const createSvg = () => {
      svg = d3
        .select("#axis")
        .append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);
    };

    const renderAxis = (fn, scale, i) => {
      var axis = fn()
        .scale(scale)
        .ticks(5);
      svg
        .append("g")
        .attr("transform", function() {
          if ([d3.axisTop, d3.axisBottom].indexOf(fn) >= 0) {
            return "translate(" + margin + "," + i * offset + ")";
          } else {
            return "translate(" + i * offset + "," + margin + ")";
          }
        })
        .call(axis);
    };

    const renderAll = fn => {
      if (svg) svg.remove();
      createSvg();

      renderAxis(
        fn,
        d3
          .scaleLinear()
          .domain([0, 1000])
          .range([0, axisWidth]),
        1
      );

      renderAxis(
        fn,
        d3
          .scalePow()
          .exponent(2)
          .domain([0, 1000])
          .range([0, axisWidth]),
        2
      );

      renderAxis(
        fn,
        d3
          .scaleTime()
          .domain([new Date(2016, 0, 1), new Date(2017, 0, 1)])
          .range([0, axisWidth]),
        3
      );
    };

    switch (type) {
      case "ht":
        renderAll(d3.axisTop);
        break;
      case "hb":
        renderAll(d3.axisBottom);
        break;
      case "vl":
        renderAll(d3.axisLeft);
        break;
      case "vr":
        renderAll(d3.axisRight);
        break;
      default:
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          runAxis("hb");
        }}
      >
        horizontal bottom
      </Button>
      <Button
        type="primary"
        style={{ marginLeft: "10px" }}
        onClick={() => {
          runAxis("ht");
        }}
      >
        horizontal top
      </Button>
      <Button
        type="primary"
        style={{ marginLeft: "10px" }}
        onClick={() => {
          runAxis("vl");
        }}
      >
        vertical left
      </Button>
      <Button
        type="primary"
        style={{ marginLeft: "10px" }}
        onClick={() => {
          runAxis("vr");
        }}
      >
        vertical right
      </Button>
      <div id="axis"></div>
    </>
  );
};

export default AxisBasic;
