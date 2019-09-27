import React, { useEffect } from "react";
import * as d3 from "d3";

const CNMap = () => {
  const w = 960,
    h = 500,
    projection = d3.geoProjection((x, y) => [x, y * 1.2]).scale(175);

  let svg, g;
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    svg = d3
      .select("#map")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    g = svg.append("g").call(
      d3
        .zoom()
        .scaleExtent([1, 10])
        .on("zoom", zoomHandler)
    );

    d3.json("/china.geo.json", function(error, cn) {
      const path = d3.geoPath().projection(projection.fitSize([w, h], cn));
      g.selectAll("path.state")
        .data(cn.features)
        .enter()
        .append("path")

        .on("mouseover", function() {
          d3.select(this).style("fill", "#bbb");
        })
        .on("mouseout", function() {
          d3.select(this).style("fill", "#eee");
        })
        .attr("class", "state")
        .style("stroke-width", 0.5)
        .style("stroke", "#000")
        .style("fill", "#eee")
        .attr("d", path);
    });
  };

  const zoomHandler = () => {
    var transform = d3.event.transform;

    g.attr(
      "transform",
      `translate(${transform.x},${transform.y}) scale(${transform.k})`
    );
  };
  return (
    <>
      <div id="map"></div>
    </>
  );
};

export default CNMap;
