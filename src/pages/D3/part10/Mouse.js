import React, { useEffect } from "react";
import * as d3 from "d3";

const Mouse = () => {
  useEffect(() => {
    startMouse();
  }, []);

  const startMouse = () => {
    const r = 10;
    const svg = d3
      .select("#mouse")
      .append("svg")
      .attr("width", 1000)
      .attr("height", 800);

    const positionLabel = svg
      .append("text")
      .attr("x", 10)
      .attr("y", 30);

    svg.on("mousemove", () => {
      printPosition();
    });

    const printPosition = () => {
      var position = d3.mouse(svg.node());
      positionLabel.text(position);
    };
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    svg.on("mousemove", () => {
      const color = colors(Math.random() * 10);
      for (var i = 1; i < 3; i++) {
        var position = d3.mouse(svg.node());

        var circle = svg
          .append("circle")
          .attr("cx", position[0])
          .attr("cy", position[1])
          .attr("r", 0)
          .style("stroke-width", 5 / i)
          .style("stroke", color)
          .transition()
          .delay(i * 100)
          .duration(2000)
          .ease(d3.easeQuadIn)
          .attr("r", r)
          .style("stroke-opacity", 0)
          .on("end", function() {
            d3.select(this).remove();
          });
      }
    });
  };
  return (
    <>
      <div id="mouse"></div>
    </>
  );
};

export default Mouse;
