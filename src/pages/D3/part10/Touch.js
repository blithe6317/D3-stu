import React, { useEffect } from "react";
import * as d3 from "d3";

const Touch = () => {
  let svg;
  const initR = 100,
    r = 400,
    thickness = 20;

  useEffect(() => {
    svg = d3.select("#touch").append("svg");

    d3.select("#touch")
      .on("touchstart", touch)
      .on("touchend", touch);
  }, []);

  const touch = () => {
    d3.event.preventDefault();

    var arc = d3
      .arc()
      .outerRadius(initR)
      .innerRadius(initR - thickness);

    var g = svg.selectAll("g.touch").data(d3.touches(svg.node()), (_, i) => i);

    g.enter()
      .append("g")
      .attr("class", "touch")
      .attr("transform", d => `translate(${d[0]},${d[1]})`)
      .append("path")
      .attr("class", "arc")
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attrTween("d", d => {
        const interpolate = d3.interpolate(
          { startAngle: 0, endAngle: 0 },
          { startAngle: 0, endAngle: 2 * Math.PI }
        );
        return function(t) {
          return arc(interpolate(t));
        };
      })
      .on("end", d => {
        if (complete(d)) {
          ripples(d);
        }
        g.remove();
      });

    g.exit()
      .remove()
      .each(d => {
        d[2] = "stopped";
      });
  };

  const complete = d => d.length < 3;

  const ripples = position => {
    for (var i = 1; i < 5; i++) {
      var circle = svg
        .append("circle")
        .attr("cx", position[0])
        .attr("cy", position[1])
        .attr("r", initR - thickness / 2)
        .style("stroke-width", thickness / i)
        .transition()
        .delay(Math.pow(i, 2.5) * 50)
        .duration(2000)
        .ease(d3.easeQuadIn)
        .attr("r", r)
        .style("stroke-opacity", 0)
        .on("end", function() {
          d3.select(this).remove();
        });
    }
  };
  return (
    <>
      <div id="touch"></div>
    </>
  );
};

export default Touch;
