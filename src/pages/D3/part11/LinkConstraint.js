import React, { useEffect } from "react";
import * as d3 from "d3";

const LinkConstraint = () => {
  const w = 1200,
    h = 800,
    r = 4.5,
    duration = 100000;

  let nodes = [],
    links = [],
    svg;

  const force = d3
    .forceSimulation()
    .velocityDecay(0.8)
    .alphaDecay(0)
    .force(
      "charge",
      d3
        .forceManyBody()
        .strength(-50)
        .distanceMax(h / 4)
    )
    .force("collision", d3.forceCollide(r + 0.5).strength(1));

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    svg = d3
      .select("#link-con")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    force.on("tick", function() {
      svg
        .selectAll("circle")
        .attr("cx", d => boundX(d.x))
        .attr("cy", d => boundY(d.y));

      svg
        .selectAll("line")
        .attr("x1", d => boundY(d.source.x))
        .attr("y1", d => boundY(d.source.y))
        .attr("x2", d => boundX(d.target.x))
        .attr("y2", d => boundY(d.target.y));
    });
    addListener();
  };

  const boundX = x => (x > w - r ? w - r : x > r ? x : r);
  const boundY = y => (y > h - r ? h - r : y > r ? y : r);
  const offset = () => Math.random() * 100;

  const createNodes = point => {
    const numberOfNodes = Math.round(Math.random() * 10);
    let newNodes = [];

    for (var i = 0; i < numberOfNodes; i++) {
      newNodes.push({
        x: point[0] + offset(),
        y: point[1] + offset()
      });
    }

    newNodes.forEach(e => nodes.push(e));

    return newNodes;
  };

  const createLinks = nodes => {
    var newLinks = [];

    for (var i = 0; i < nodes.length; i++) {
      if (i === nodes.length - 1) {
        newLinks.push({ source: nodes[i], target: nodes[0] });
      } else {
        newLinks.push({ source: nodes[i], target: nodes[i + 1] });
      }
    }

    newLinks.forEach(e => links.push(e));

    return newLinks;
  };

  const addListener = () => {
    svg.on("click", function() {
      var point = d3.mouse(this),
        newNodes = createNodes(point),
        newLinks = createLinks(newNodes);

      newNodes.forEach(node => {
        svg
          .append("circle")
          .data([node])
          .attr("class", "node")
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
          .attr("r", 1e-6)
          .call(
            d3
              .drag()
              .on("start", dragStarted)
              .on("drag", dragged)
              .on("end", dragEnded)
          )
          .transition()
          .attr("r", 7)
          .transition()
          .delay(duration)
          .attr("r", 1e-6)
          .on("end", () => nodes.shift())
          .remove();
      });

      newLinks.forEach(link => {
        svg
          .append("line")
          .data([link])
          .attr("class", "line")
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y)
          .transition()
          .delay(duration)
          .style("stroke-opacity", 1e-6)
          .on("end", () => links.shift())
          .remove();
      });

      force.nodes(nodes);
      force.force(
        "link",
        d3
          .forceLink(links)
          .strength(1)
          .distance(20)
      );
      force.restart();
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
  const dragEnded = d => {
    d.fx = null;
    d.fy = null;
  };
  return (
    <>
      <div id="link-con"></div>
    </>
  );
};

export default LinkConstraint;
