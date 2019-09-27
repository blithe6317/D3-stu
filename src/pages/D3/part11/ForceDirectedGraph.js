import React, { useEffect } from "react";
import * as d3 from "d3";

const ForceDirectedGraph = () => {
  const w = 1200,
    h = 800,
    r = 4.5,
    colors = d3.scaleOrdinal(d3.schemeCategory10),
    force = d3
      .forceSimulation()
      .velocityDecay(0.8)
      .alphaDecay(0)
      .force("charge", d3.forceManyBody())
      .force("x", d3.forceX(w / 2))
      .force("y", d3.forceY(h / 2));

  let svg;
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    svg = d3
      .select("#fdg")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    d3.json("/flare.json", function(data) {
      var root = d3.hierarchy(data);
      var nodes = root.descendants();
      var links = root.links();

      force.nodes(nodes);

      force.force(
        "link",
        d3
          .forceLink(links)
          .strength(1)
          .distance(20)
      );

      var link = svg
        .selectAll("line")
        .data(links)
        .enter()
        .insert("line")
        .style("stroke", "#999")
        .style("stroke-width", "1px");

      var nodeElements = svg
        .selectAll("circle.node")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", r)
        .style("fill", d => colors(d.parent && d.parent.data.name))
        .style("stroke", "#000")
        .call(
          d3
            .drag() // <-G
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnd)
        );

      force.on("tick", function(e) {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
      });

      nodeElements.attr("cx", d => d.x).attr("cy", d => d.y);
    });
  };

  const dragStarted = d => {
    d.fx = d.x;
    d.fy = d.y;
  };
  const dragged = d => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };
  const dragEnd = d => {
    d.fx = null;
    d.fy = null;
  };
  return (
    <>
      <div id="fdg"></div>
    </>
  );
};

export default ForceDirectedGraph;
