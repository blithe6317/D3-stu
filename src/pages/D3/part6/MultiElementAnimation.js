import React, { useEffect } from "react";
import * as d3 from "d3";

const MultiElementAnimation = () => {
  var id = 0,
    data = [],
    left = 200,
    duration = 500,
    chartHeight = 100,
    chartWidth = 680;

  useEffect(() => {
    for (var i = 0; i < 20; i++) {
      push(data);
    }
    render(data);

    setInterval(() => {
      data.shift();
      push(data);
      render(data);
    }, 1000);

    d3.select("#multi")
      .append("div")
      .attr("class", "baseline")
      .style("position", "fixed")
      .style("z-index", "1")
      .style("top", chartHeight + "px")
      .style("left", "200px")
      .style("width", chartWidth + "px");
  }, []);

  const render = data => {
    var selection = d3
      .select("#multi")
      .selectAll("div.v-bar")
      .data(data, function(d) {
        return d.id;
      });

    selection
      .enter()
      .append("div")
      .attr("class", "v-bar")
      .style("z-index", "0")
      .style("position", "fixed")
      .style("top", chartHeight + "px")
      .style("left", function(d, i) {
        return barLeft(i + 1) + left + "px";
      })
      .style("height", "0px")
      .append("span");

    selection
      .transition()
      .duration(duration)
      .style("top", function(d) {
        return chartHeight - barHeight(d) + "px";
      })
      .style("left", function(d, i) {
        return barLeft(i) + left + "px";
      })
      .style("height", function(d) {
        return barHeight(d) + "px";
      })
      .select("span")
      .text(function(d) {
        return d.value;
      });

    selection
      .exit()
      .transition()
      .duration(duration)
      .style("left", function(d, i) {
        return barLeft(-1) + left + "px";
      })
      .remove();
  };

  const push = data => {
    data.push({ id: ++id, value: Math.round(Math.random() * chartHeight) });
  };

  const barLeft = i => {
    return i * (30 + 2);
  };

  const barHeight = d => {
    return d.value;
  };

  return (
    <>
      <div id="multi" style={{ position: "relative", top: "100px" }}></div>
    </>
  );
};

export default MultiElementAnimation;
