import React, { useEffect } from "react";
import * as d3 from "d3";

const OrderScale = () => {
  useEffect(() => {
    runScale();
  }, []);

  const runScale = () => {
    var max = 10,
      data = [];

    for (var i = 1; i <= max; i++) {
      data.push(i);
    }

    var alphabet = d3
      .scaleOrdinal()
      .domain(data)
      .range(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);

    const render = (data, scale, selector) => {
      var cells = d3
        .select(selector)
        .selectAll("div.cell")
        .data(data)
        .enter()
        .append("div")
        .classed("cell", true)
        .style("display", "inline-block")
        .style("background-color", function(d) {
          return scale(d).indexOf("#") >= 0 ? scale(d) : "white";
        })
        .text(function(d) {
          return scale(d);
        });
    };

    render(data, alphabet, "#alphabet");

    render(data, d3.scaleOrdinal(d3.schemeCategory10), "#category10");

    render(data, d3.scaleOrdinal(d3.schemeCategory20), "#category20");

    render(data, d3.scaleOrdinal(d3.schemeCategory20b), "#category20b");
    render(data, d3.scaleOrdinal(d3.schemeCategory20c), "#category20c");
  };
  return (
    <>
      <div id="alphabet" className="clear">
        <span className="title">Ordinal Scale width Alphabet</span>
        <span className="title">Mapping [1...10] to [a....j]</span>
      </div>
      <br></br>
      <div id="category10" className="clear">
        <span className="title">Ordinal Color Scale Category 10</span>
        <span className="title">Mapping [1...10] to Category 10 colors</span>
      </div>
      <br></br>
      <div id="category20" className="clear">
        <span className="title">Ordinal Color Scale Category 20</span>
        <span className="title">Mapping [1...10] to Category 20 colors</span>
      </div>
      <br></br>
      <div id="category20b" className="clear">
        <span className="title">Ordinal Color Scale Category 20b</span>
        <span className="title">Mapping [1...10] to Category 20b colors</span>
      </div>
      <br></br>
      <div id="category20c" className="clear">
        <span className="title">Ordinal Color Scale Category 20c</span>
        <span className="title">Mapping [1...10] to Category 20c colors</span>
      </div>
    </>
  );
};

export default OrderScale;
