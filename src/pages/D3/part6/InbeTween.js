import React, { useEffect } from "react";
import * as d3 from "d3";

const InbeTween = () => {
  useEffect(() => {
    render();
  }, []);

  const render = () => {
    var selector = d3.select("#inbetween"),
      duration = 5000;

    selector
      .append("div")
      .append("input")
      .attr("type", "button")
      .attr("class", "countdown")
      .attr("value", "0")
      .style("width", "150px")
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .style("width", "400px")
      .attr("value", "9");

    selector
      .append("div")
      .append("input")
      .attr("type", "button")
      .attr("class", "countdown")
      .attr("value", "0")
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .styleTween("width", widthTween)
      .attrTween("value", valueTween);
  };

  const widthTween = () => {
    var interpolate = d3
      .scaleQuantize()
      .domain([0, 1])
      .range([150, 200, 250, 350, 400]);

    return function(t) {
      return interpolate(t) + "px";
    };
  };

  const valueTween = () => {
    var interpolate = d3
      .scaleQuantize()
      .domain([0, 1])
      .range([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    return function(t) {
      return interpolate(t);
    };
  };
  return (
    <>
      <div id="inbetween"></div>
    </>
  );
};

export default InbeTween;
