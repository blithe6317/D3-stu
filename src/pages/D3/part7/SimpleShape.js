import React, { useEffect } from "react";
import * as d3 from "d3";

const SimpleShape = () => {
  useEffect(() => {
    render();
  }, []);

  const render = () => {
    var width = 600,
      height = 500;

    var svg = d3.select("#simple").append("svg");

    svg.attr("height", height).attr("width", width);

    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", 200)
      .attr("x2", 100)
      .attr("y2", 100)
      .attr("stroke", "#000");

    svg
      .append("circle")
      .attr("cx", 200)
      .attr("cy", 150)
      .attr("r", 50);

    svg
      .append("rect")
      .attr("x", 300)
      .attr("y", 100)
      .attr("width", 100)
      .attr("height", 100)
      .attr("rx", 5)
      .attr("stroke", "#000")
      .attr("stroke-width", 1);

    svg
      .append("polygon")
      .attr("points", "450,200 500,100 550,200")
      .attr("stroke", "#000");
  };
  return (
    <>
      <div id="simple"></div>
    </>
  );
};

export default SimpleShape;
