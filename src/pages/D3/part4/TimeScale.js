import React, { useEffect } from "react";
import * as d3 from "d3";

const TimeScale = () => {
  useEffect(() => {
    reunScale();
  }, []);

  const reunScale = () => {
    var start = new Date(2016, 0, 1),
      end = new Date(2016, 11, 31),
      range = [0, 1200],
      time = d3
        .scaleTime()
        .domain([start, end])
        .rangeRound(range),
      max = 12,
      data = [];

    for (var i = 0; i < max; i++) {
      var date = new Date(start.getTime());
      date.setMonth(start.getMonth() + i);
      data.push(date);
    }

    const render = (data, scale, selector) => {
      d3.select(selector)
        .selectAll("div.fixed-cell")
        .data(data)
        .enter()
        .append("div")
        .classed("fixed-cell", true)
        .style("margin-left", function(d) {
          return "10px";
        })
        .html(function(d) {
          var format = d3.timeFormat("%x");
          return format(d) + "<br>" + scale(d);
        });
    };

    render(data, time, "#time");
  };
  return (
    <>
      <div id="time" className="clear">
        <span> Linear Time Progression></span>
        <span>Mapping [01/01/2016,12/21/2016] to [0,1200]</span>
        <br></br>
      </div>
    </>
  );
};
export default TimeScale;
