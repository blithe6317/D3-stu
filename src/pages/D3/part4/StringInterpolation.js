import React, { useEffect } from "react";
import * as d3 from "d3";

const StringInterpolation = () => {
  useEffect(() => {
    runRender();
  }, []);

  const runRender = () => {
    var max = 11,
      data = [];

    var sizeScale = d3
      .scaleLinear()
      .domain([0, max])
      .range([
        "italic bold 12px/30px Georgia, serif",
        "italic bold 120px/180px Georgia, serif"
      ]);

    for (var i = 0; i < max; i++) {
      data.push(i);
    }

    const render = (data, scale, selector) => {
      d3.select(selector)
        .selectAll("div.cell")
        .data(data)
        .enter()
        .append("div")
        .classed("cell", true)
        .style("display", "inline-block")
        .append("span")
        .style("font", function(d, i) {
          return scale(d);
        })
        .text(function(d, i) {
          return i;
        });
    };

    render(data, sizeScale, "#font");
  };
  return (
    <>
      <div id="font" className="clear">
        <span className="title">Font Interpolation</span>
      </div>
    </>
  );
};

export default StringInterpolation;
