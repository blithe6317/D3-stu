import React, { useEffect } from "react";
import * as d3 from "d3";

const D3 = () => {
  useEffect(() => {
    darw();
  }, []);

  const darw = () => {
    test();
    darwCurve();
  };

  const test = () => {
    const arr = [
      "这是第一段",
      "这是第二段",
      "这是第三段",
      "这是第四段",
      "这是第五段",
      "这是第六段",
      "这是第七段"
    ];
    d3.select("#first-d3")
      .selectAll("p")
      .data(arr)
      .enter()
      .append("p")
      .text(function(d) {
        return d;
      });
    d3.select("p")
      .datum(arr[0])
      .text(d => d + "000000000");
    d3.selectAll("p").style("color", function() {
      return "hsl(" + Math.random() * 360 + ",100%,50%)";
    });
    // d3.selectAll("p").style("color", function(d, i) {
    //   return i % 2 ? "#000" : "#999";
    // });

    // setTimeout(() => {
    var p = d3
      .select("#first-d3")
      .selectAll("p")
      .data([1, 2, 3])
      .enter()
      .append("p")
      .text(d => d);
    // }, 3000);
    p.exit().remove();

    // d3.select("#first-d3")
    //   .transition()
    //   .duration(10000)
    //   .style("background-color", "black");
  };

  const darwCurve = () => {
    const svg = d3.select("#first-d3").append("svg");
    svg
      .attr("width", 800)
      .attr("height", 300)
      .style("background-color", "#fff");
    const data = [[100, 250], [800, 300]];
    const coef = 5;
    var x = Math.abs(data[0][0] + data[1][0]) / 2;
    var y = Math.abs(data[0][1] + data[1][1]) / 2;
    let point;
    if (data[0][1] - data[1][1] <= 0) {
      point = [x + y / coef, y - x / coef];
    } else {
      point = [x - y / coef, y + x / coef];
    }
    data.splice(1, 0, point);
    const line = d3.line().curve(d3.curveNatural);
    svg
      .append("path")
      .attr("d", line(data))
      .attr("stroke", "gray")
      .attr("fill", "none");
  };
  return (
    <>
      <div id="first-d3" />
    </>
  );
};
export default D3;
