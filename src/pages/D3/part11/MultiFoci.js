import React, { useEffect } from "react";
import * as d3 from "d3";

const MultiFoci = () => {
  let svg,
    nodes = [],
    centers = [];

  const colors = d3.scaleOrdinal(d3.schemeCategory10),
    r = 4.5,
    w = 1290,
    h = 800,
    force = d3
      .forceSimulation()
      .velocityDecay(0.8)
      .alphaDecay(0)
      .force("charge", d3.forceManyBody().strength(-30))
      .force("x", d3.forceX(w / 2))
      .force("y", d3.forceY(h / 2))
      .force("collision", d3.forceCollide(r + 0.5).strength(1));

  useEffect(() => {
    init();
  }, []);

  const offset = () => Math.random() * 100;
  const boundX = x => (x > w - r ? w - r : x > r ? x : r);
  const boundY = y => (y > h - r ? h - r : y > r ? y : r);
  const init = () => {
    svg = d3
      .select("#multifoci")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 1; j++) {
        nodes.push({
          x: w / 2 + offset(),
          y: h / 2 + offset(),
          color: colors(i),
          type: i
        });
      }
    }

    force.nodes(nodes);
    genCircle();
  };

  const genCircle = () => {
    svg
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("fill", d => d.color)
      .attr("r", 1e-6)
      .transition()
      .attr("r", r);

    force.on("tick", function() {
      var k = 0.1;
      nodes.forEach(function(node) {
        var center = centers[node.type];
        if (center) {
          node.x += (center[0] - node.x) * k;
          node.y += (center[1] - node.y) * k;
        }
      });

      svg
        .selectAll("circle")
        .attr("cx", d => boundX(d.x))
        .attr("cy", d => boundY(d.y));
    });

    d3.select("#multifoci")
      .on("touchstart", touch)
      .on("touchend", touch);
  };

  const touch = () => {
    d3.event.preventDefault();

    centers = d3.touches(svg.node());

    const g = svg.selectAll("g.touch").data(centers, d => d.identifier);

    g.enter()
      .append("g")
      .attr("class", "touch")
      .attr("transform", d => `translate(${d[0]},${d[1]})`)
      .append("circle")
      .attr("class", "touch")
      .attr("fill", d => colors(d.identifier))
      .transition()
      .attr("r", 50);

    g.exit().remove();
  };
  return (
    <>
      <div id="multifoci"></div>
    </>
  );
};

export default MultiFoci;
