import React, { useEffect } from "react";
import * as d3 from "d3";
import { func } from "prop-types";
import { duration } from "moment";

const RetardationFunction = () => {
  useEffect(() => {
    render();
  }, []);

  const render = () => {
    var data = [
      { name: "Linear", fn: d3.easeLinear },
      { name: "Cubic", fn: d3.easeCubic },
      { name: "CubicIn", fn: d3.easeCubicIn },
      { name: "Sin", fn: d3.easeSin },
      { name: "SinIn", fn: d3.easeSinIn },
      { name: "Exp", fn: d3.easeExp },
      { name: "Circle", fn: d3.easeCircle },
      { name: "Back", fn: d3.easeBack },
      { name: "Bounce", fn: d3.easeBounce },
      { name: "Elastic", fn: d3.easeElastic },
      {
        name: "Custom",
        fn: function(t) {
          return t * t;
        }
      }
    ];
    var colors = d3.scaleOrdinal(d3.schemeCategory20);

    d3.select("#reatr")
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "fixed-cell")
      .style("top", function(d, i) {
        return i * 40 + 100 + "px";
      })
      .style("background-color", function(d, i) {
        return colors(i);
      })
      .style("color", "white")
      .style("left", "1000px")
      .text(function(d) {
        return d.name;
      });

    d3.select("#reatr")
      .selectAll("div")
      .each(function(d) {
        d3.select(this)
          .transition()
          .ease(d.fn)
          .duration(20000)
          .style("left", "210px");
      });
  };
  return (
    <>
      <div id="reatr"></div>
    </>
  );
};

export default RetardationFunction;
