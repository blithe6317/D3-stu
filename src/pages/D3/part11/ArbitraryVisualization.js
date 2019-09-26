import React, { useEffect } from "react";
import * as d3 from "d3";

const ArbitraryVisualization = () => {
  const w = 1280,
    h = 800,
    r = 4.5,
    duration = 10000,
    force = d3
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
      .force("collision", d3.forceCollide(r + 0.5).strength(1))
      .force("position", d3.forceY(h / 2));

  let nodes = [],
    links = [],
    svg;

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    svg = d3
      .select("#av")
      .append("svg")
      .attr("height", h)
      .attr("width", w);

    const defs = svg.append("defs");
    const rd = defs
      .append("radialGradient")
      .attr("id", "gradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "100%")
      .attr("fx", "50%")
      .attr("fy", "50%");

    rd.append("stop")
      .attr("offset", "0%")
      .style("stop-color", "blue")
      .style("stop-opacity", "0");

    rd.append("stop")
      .attr("offset", "100%")
      .style("stop-color", "#fff")
      .style("stop-opacity", "1");

    var line = d3
      .line()
      .curve(d3.curveBasisClosed)
      .x(d => d.x)
      .y(d => d.y);

    force.on("tick", () => {
      svg.selectAll("path").attr("d", line);
    });

    svg.on("click", function() {
      var point = d3.mouse(this),
        newNodes = createNodes(point),
        newLinks = createLinks(newNodes);

      svg
        .append("path")
        .data([newNodes])
        .attr("class", "bubble")
        .attr("fill", "url(#gradient)")
        .attr("d", d => line(d))
        .transition()
        .delay(duration)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("end", function() {
          d3.select(this).remove();
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

  const offset = () => Math.random() * 100;

  const createNodes = point => {
    var numberOfNodes = Math.round(Math.random() * 10 + 10);

    var newNodes = d3.range(numberOfNodes).map(i => ({
      x: point[0] + offset(),
      y: point[1] + offset()
    }));
    newNodes.forEach(e => nodes.push(e));

    return newNodes;
  };

  const createLinks = nodes => {
    var newLinks = [];
    for (var i = 0; i < nodes.length; i++) {
      if (i == nodes.length - 1) {
        newLinks.push({ source: nodes[i], target: nodes[0] });
      } else {
        newLinks.push({ source: nodes[i], target: nodes[i + 1] });
      }
    }

    newLinks.forEach(e => links.push(e));

    return newLinks;
  };

  return (
    <>
      <div id="av"></div>
    </>
  );
};

export default ArbitraryVisualization;
