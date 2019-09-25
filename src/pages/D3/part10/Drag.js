import React, { useEffect } from "react";
import * as d3 from "d3";

const Drag = () => {
  let svg;
  useEffect(() => {
    dragfn();
  }, []);

  const dragfn = () => {
    const width = 960,
      height = 500,
      r = 50;

    const data = [
      [width / 2 - r, height / 2 - r],
      [width / 2 - r, height / 2 + r],
      [width / 2 + r, height / 2 - r],
      [width / 2 + r, height / 2 + r]
    ];

    svg = d3
      .select("#drag")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    const drag = d3.drag().on("drag", move);

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", r)
      .attr("transform", d => `translate(${d})`)
      .call(drag);

    function move(d) {
      const { x, y } = d3.event;
      if (inBoundaries(x, y)) {
        d3.select(this).attr("transform", d => `translate(${x},${y})`);
      }
    }

    const inBoundaries = (x, y) => {
      return x >= 0 + r && x <= width - r && (y >= 0 + r && y <= height - r);
    };
  };
  return (
    <>
      <div id="drag"></div>
    </>
  );
};

export default Drag;
