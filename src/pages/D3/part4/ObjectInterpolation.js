import React, { useEffect } from "react";
import * as d3 from "d3";

const ObjectInterpolation = () => {
  useEffect(() => {
    runScale();
  }, []);

  const runScale = () => {
    var max = 21,
      data = [];
    var compoundScale = d3
      .scalePow()
      .exponent(2)
      .domain([0, max])
      .range([
        { color: "#add8e6", height: "15px" },
        {
          color: "#4169e1",
          height: "150px"
        }
      ]);

    for (var i = 0; i < max; i++) {
      data.push(i);
    }

    const render = (data, scale, selector) => {
      var bars = d3
        .select(selector)
        .selectAll("div.v-bar")
        .data(data);
      bars
        .enter()
        .append("div")
        .classed("v-bar", true)
        .style("height", function(d) {
          return scale(d).height;
        })
        .style("background-color", function(d) {
          return scale(d).color;
        })
        .text(function(d, i) {
          return i;
        });
    };

    render(data, compoundScale, "#compound");
  };
  return (
    <>
      <div id="compound" className="clear">
        <span className="title">Compound Interpolation</span>
      </div>
    </>
  );
};

export default ObjectInterpolation;
