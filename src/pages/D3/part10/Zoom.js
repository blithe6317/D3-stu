import React, { useEffect } from "react";
import * as d3 from "d3";

const Zoom = () => {
  let svg;
  useEffect(() => {
    zoom();
  }, []);
  const zoom = () => {
    const width = 600,
      height = 350,
      r = 50;

    const data = [
      [width / 2 - r, height / 2 - r],
      [width / 2 - r, height / 2 + r],
      [width / 2 + r, height / 2 - r],
      [width / 2 + r, height / 2 + r]
    ];

    svg = d3
      .select("#zoom")
      .append("svg")
      .attr("style", "1px solid black")
      .attr("width", width)
      .attr("height", height)
      .call(
        d3
          .zoom()
          .scaleExtent([1, 10])
          .on("zoom", zoomHandler)
      )
      .append("g");

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", r)
      .attr("transform", d => `translate(${d})`);
  };

  const zoomHandler = () => {
    var transform = d3.event.transform;
    svg.attr(
      "transform",
      `translate(${transform.x},${transform.y}) scale(${transform.k})`
    );
  };
  return (
    <>
      <div id="zoom"></div>
    </>
  );
};

export default Zoom;
