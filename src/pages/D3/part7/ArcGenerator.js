import React, { useEffect } from "react";
import * as d3 from "d3";
import { Button } from "antd";

const ArcGenerator = () => {
  const width = 400,
    height = 400,
    fullAngle = 2 * Math.PI,
    colors = d3.scaleOrdinal(d3.schemeCategory20);

  let svg;
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    svg = d3
      .select("#arc")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "pie");
    render(0);
  };
  const render = (innerRadius, endAngle) => {
    if (!endAngle) {
      endAngle = fullAngle;
    }

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
      .attr("fill", function(d, i) {
        return colors(i);
      })
      .attr("d", function(d, i) {
        return arc(d, i);
      });
  };
  return (
    <>
      <div id="arc"></div>

      <Button
        type="primary"
        onClick={() => {
          render(0);
        }}
      >
        Circle
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(100);
        }}
      >
        Annulus(Donut)
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(0, Math.PI);
        }}
      >
        Circular Sector
      </Button>
      <Button
        type="primary"
        onClick={() => {
          render(100, Math.PI);
        }}
      >
        Annulus Sector
      </Button>
    </>
  );
};

export default ArcGenerator;
