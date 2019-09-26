import React, { useEffect } from "react";
import * as d3 from "d3";

const Velocity = () => {
  const r = 4.5,
    nodes = [];

  var force = d3
    .forceSimulation()
    .velocityDecay(0.1)
    .alphaDecay(0)
    .force("collision", d3.forceCollide(r + 0.5).strength(1));

  let svg;
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    svg = d3
      .select("#velocity")
      .append("svg:svg")
      .attr("width", 1200)
      .attr("height", 800);

    force.on("tick", () => {
      svg
        .selectAll("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });

    let previousPoint;

    svg.on("mousemove", function() {
      var point = d3.mouse(this),
        node = {
          x: point[0],
          y: point[1],
          vx: previousPoint ? point[0] - previousPoint[0] : point[0],
          vy: previousPoint ? point[1] - previousPoint[1] : point[1]
        };

      previousPoint = point;

      svg
        .append("svg:circle")
        .data([node])
        .attr("class", "node")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 1e-6)
        .transition()
        .attr("r", r)
        .transition()
        .delay(5000)
        .attr("r", 1e-6)
        .on("end", () => {
          nodes.shift();
          force.nodes(nodes);
        })
        .remove();

      nodes.push(node);
      force.nodes(nodes);
    });
  };
  return (
    <>
      <div id="velocity"></div>
    </>
  );
};

export default Velocity;
