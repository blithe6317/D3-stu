import React, { useEffect } from "react";
import * as d3 from "d3";

const ArcTransition = () => {
  const width = 400,
    height = 400,
    endAngle = 2 * Math.PI,
    colors = d3.scaleOrdinal(d3.schemeCategory10);

  let svg;
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    svg = d3
      .select("#arc")
      .append("svg")
      .attr("class", "pie")
      .attr("height", height)
      .attr("width", width);
    render(100);
  };

  const render = innerRadius => {
    var data = [
      { startAngle: 0, endAngle: 0.1 * endAngle },
      { startAngle: 0.1 * endAngle, endAngle: 0.2 * endAngle },
      { startAngle: 0.2 * endAngle, endAngle: 0.4 * endAngle },
      { startAngle: 0.4 * endAngle, endAngle: 0.6 * endAngle },
      { startAngle: 0.6 * endAngle, endAngle: 0.7 * endAngle },
      { startAngle: 0.7 * endAngle, endAngle: 0.9 * endAngle },
      { startAngle: 0.9 * endAngle, endAngle: endAngle }
    ];

    var arc = d3
      .arc()
      .outerRadius(200)
      .innerRadius(innerRadius);

    svg.select("g").remove();

    svg
      .append("g")
      .attr("transform", "translate(200,200)")
      .selectAll("path.arc")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("fill", (d, i) => colors(i))
      .transition()
      .duration(3000)
      .ease(d3.easeBounce)
      .attrTween("d", d => {
        var start = { startAngle: 0, endAngle: 0 };
        var interpolate = d3.interpolate(start, d);
        return t => arc(interpolate(t));
      });
  };
  return (
    <>
      <div id="arc"></div>
    </>
  );
};

export default ArcTransition;
