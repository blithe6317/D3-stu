import React, { useEffect } from "react";
import * as d3 from "d3";

const ColorInterpolation = () => {
  useEffect(() => {
    runScale();
  }, []);

  const runScale = () => {
    var max = 12,
      data = [];

    var colorScale = d3
      .scaleLinear()
      .domain([0, max])
      .range(["white", "#4169e1"]);

    var divergingScale = function(pivot) {
      return d3
        .scaleLinear()
        .domain([0, pivot, max])
        .range(["white", "#4169e1", "white"]);
    };

    for (var i = 0; i < max; i++) {
      data.push(i);
    }

    const render = (data, scale, selector) => {
      var cells = d3
        .select(selector)
        .selectAll("div.cell")
        .data(data)
        .enter()
        .append("div")
        // .merge(cells)
        .classed("cell", true)
        .style("display", "inline-block")
        .style("background-color", function(d) {
          return scale(d);
        })
        .text(function(d, i) {
          return i;
        });
    };

    render(data, colorScale, "#color");
    render(data, divergingScale(5), "#color-diverge");
  };

  return (
    <>
      <div id="color" className="clear">
        <span className="title">Linear Color Interpolation</span>
      </div>
      <div id="color-diverge" className="clear">
        <span className="title">Poly-Linear Color Interpolation</span>
      </div>
    </>
  );
};

export default ColorInterpolation;
