import React, { useEffect } from "react";
import * as d3 from "d3";
import { func } from "prop-types";

const TransitionEvent = () => {
  useEffect(() => {
    render();
  }, []);

  const render = () => {
    var selector = d3.select("#event"),
      duration = 3000;

    var div = selector
      .append("div")
      .classed("box", true)
      .style("background-color", "steelblue")
      .style("color", "white")
      .text("waiting")
      .transition()
      .duration(duration)
      .delay(1000)
      .on("start", function() {
        d3.select(this).text(function(d, i) {
          return "transitioning";
        });
      })
      .on("end", function() {
        d3.select(this).text(function() {
          return "done";
        });
      })
      .style("margin-left", "600px");
  };

  return (
    <>
      <div id="event"></div>
    </>
  );
};

export default TransitionEvent;
