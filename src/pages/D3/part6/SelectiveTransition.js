import React, { useEffect } from "react";
import * as d3 from "d3";

const SelectiveTransition = () => {
  useEffect(() => {
    render();
  }, []);

  const render = () => {
    var data = ["Cat", "Dog", "Cat", "Dog", "Cat", "Dog", "Cat", "Dog"];

    var duration = 1500;

    d3.select("#select")
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "fixed-cell")
      .style("top", function(d, i) {
        return i * 40 + "px";
      })
      .style("background-color", "steelblue")
      .style("color", "white")
      .style("left", "500px")
      .text(function(d) {
        return d;
      })
      .transition()
      .delay(duration)
      .style("left", "10px")
      .filter(function(d) {
        return d == "Cat";
      })
      .transition()
      .duration(duration)
      .style("left", "500px");
  };
  return (
    <>
      <div id="select"></div>
    </>
  );
};

export default SelectiveTransition;
