import React, { useRef } from "react";
import { Button } from "antd";
import * as d3 from "d3";

import styles from "./style.scss";

const Part = () => {
  const myRef = useRef();
  const SimpleWidget = spec => {
    var instance = {};
    var headline, description;

    instance.render = () => {
      const container = myRef.current;
      debugger;
      var div = d3.select(container).append("div");
      div.append("h3").text(headline);
      div
        .attr("class", "box")
        .attr("style", "color:" + spec.color)
        .append("p")
        .text(description);
    };
    instance.headline = function(h) {
      if (!arguments.length) return headline;
      headline = h;
      return instance;
    };
    instance.description = function(d) {
      if (!arguments.length) return description;
      description = d;
      return instance;
    };
    return instance;
  };

  const run = () => {
    var widget = SimpleWidget({ color: "#6495ed" })
      .headline("Simple Widget")
      .description(
        "The is a simple widget demoonstarting functional javascript."
      );
    widget.render();
  };
  return (
    <div ref={myRef}>
      <h1>第一章</h1>
      <Button
        type="primary"
        onClick={() => {
          run();
        }}
      >
        运行示例
      </Button>
    </div>
  );
};

export default Part;
