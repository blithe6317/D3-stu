import React, { useEffect } from "react";
import * as d3 from "d3";
import { Button } from "antd";

const GravityAndCharge = () => {
  let svg;

  const w = 1280,
    h = 800,
    r = 4.5,
    nodes = [],
    force = d3
      .forceSimulation()
      .velocityDecay(0.8)
      .alphaDecay(0)
      .force("collision", d3.forceCollide(r + 0.5).strength(1));

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    svg = d3
      .select("#gc")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    force.on("tick", () => {
      svg
        .selectAll("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });

    svg.on("mousemove", function() {
      const point = d3.mouse(this);
      const node = { x: point[0], y: point[1] };

      svg
        .append("circle")
        .data([node])
        .attr("class", "node")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 1e-6)
        .transition()
        .attr("r", r)
        .transition()
        .delay(500)
        .transition()
        .duration(1000)
        // .attr("r", 1e-6
        .style("opacity", 0)
        .on("end", () => {
          nodes.shift();
          force.nodes(nodes);
        })
        .remove();

      nodes.push(node);
      force.nodes(nodes);
    });
  };

  const noForce = () => {
    force.force("charge", null);
    force.force("x", null);
    force.force("y", null);
    force.restart();
  };
  const repulsion = () => {
    force.force("charge", d3.forceManyBody().strength(-0.5));
    force.force("x", null);
    force.force("y", null);
    force.restart();
  };
  const gravity = () => {
    force.force("charge", d3.forceManyBody().strength(1));
    force.force("x", null);
    force.force("y", null);
    force.restart();
  };
  const positioningWithGravity = () => {
    force.force("charge", d3.forceManyBody().strength(0.5));
    force.force("x", d3.forceX(w / 2));
    force.force("y", d3.forceY(h / 2));
    force.restart();
  };
  const positioningWithRepulsion = () => {
    force.force("charge", d3.forceManyBody().strength(-20));
    force.force("x", d3.forceX(w / 2));
    force.force("y", d3.forceY(h / 2));
    force.restart();
  };
  return (
    <>
      <Button type="primary" onClick={noForce}>
        无作用力
      </Button>
      <Button type="primary" onClick={repulsion}>
        斥力
      </Button>
      <Button type="primary" onClick={gravity}>
        重力
      </Button>
      <Button type="primary" onClick={positioningWithGravity}>
        重力定位
      </Button>
      <Button type="primary" onClick={positioningWithRepulsion}>
        斥力定位
      </Button>
      <div id="gc"></div>
    </>
  );
};

export default GravityAndCharge;
