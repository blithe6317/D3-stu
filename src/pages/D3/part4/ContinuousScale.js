import React, { useEffect } from "react";
import * as d3 from "d3";

const ContinuousScale = () => {
  useEffect(() => {
    runScale();
  }, []);

  const runScale = () => {
    var max = 11,
      data = [];
    for (var i = 1; i < max; i++) {
      data.push(i);
    }

    var linear = d3
      .scaleLinear()
      .domain([1, 10])
      .range([1, 10]);

    var linearCapped = d3
      .scaleLinear()
      .domain([1, 10])
      .range([1, 20]);

    var pow = d3.scalePow().exponent(2);
    var powCapped = d3
      .scalePow()
      .exponent(2)
      .domain([1, 10])
      .rangeRound([1, 10]);

    var log = d3.scaleLog();
    var logCapped = d3
      .scaleLog()
      .domain([1, 10])
      .rangeRound([1, 10]);

    const render = (data, scale, selector) => {
      d3.select(selector)
        .selectAll("div")
        .data(data)
        .enter()
        .append("div")
        .classed("cell", true)
        .style("display", "inline-block")
        .text(function(d) {
          return d3.format("0.2")(scale(d), 2);
        });
    };

    render(data, linear, "#linear");
    render(data, linearCapped, "#linear-capped");
    render(data, pow, "#pow");
    render(data, powCapped, "#pow-capped");
    render(data, log, "#log");
    render(data, logCapped, "#log-capped");
  };
  return (
    <>
      <h2>有序尺度</h2>
      <div id="linear" className="clear">
        <span className="title">n</span>
      </div>
      <div id="linear-capped" className="clear">
        <span className="title">1 &lt;= a*n &lt;=20</span>
      </div>
      <div id="pow" className="clear">
        <span className="title">n^2</span>
      </div>
      <div id="pow-capped" className="clear">
        <span className="title">1 &lt;= a*n^2 &lt;= 10</span>
      </div>
      <div id="log" className="clear">
        <span className="title">log(n)</span>
      </div>
      <div id="log-capped" className="clear">
        <span className="title">1 &lt;= a*log(n)+b &lt;= 10</span>
      </div>
    </>
  );
};

export default ContinuousScale;
