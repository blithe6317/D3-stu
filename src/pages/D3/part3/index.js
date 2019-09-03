import React from "react";
import { Button, Row, Col } from "antd";
import * as d3 from "d3";

import styles from "./style.scss";

const Part = () => {
  const runBindData = () => {
    var data = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8];

    function render(data) {
      var bars = d3
        .select("#bindData")
        .selectAll("div.h-bar")
        .data(data);
      bars
        .enter()
        .append("div")
        .attr("class", "h-bar")
        .merge(bars)
        .style("width", function(d) {
          return d * 3 + "px";
        })
        .text(function(d) {
          return d;
        });
      bars.exit().remove();
    }

    setInterval(function() {
      data.shift();
      data.push(parseInt(Math.random() * 100));
      render(data);
    }, 1500);
    render(data);
  };

  const runBindObj = () => {
    var data = [
      { width: 10, color: 23 },
      { width: 15, color: 33 },
      { width: 30, color: 40 },
      { width: 50, color: 60 },
      { width: 80, color: 22 },
      { width: 65, color: 10 },
      { width: 55, color: 5 },
      { width: 30, color: 30 },
      { width: 20, color: 60 },
      { width: 10, color: 90 },
      { width: 8, color: 10 }
    ];
    var colorScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range(["#add8e6", "blue"]);
    function render(data) {
      var bars = d3
        .select("#bindObj")
        .selectAll("div.h-bar")
        .data(data);
      bars
        .enter()
        .append("div")
        .attr("class", "h-bar")
        .merge(bars)
        .style("width", function(d) {
          return d.width * 3 + "px";
        })
        .style("background-color", function(d) {
          return colorScale(d.color);
        })
        .text(function(d) {
          return d.width;
        });
      bars.exit().remove();
    }
    function randomValue() {
      return Math.round(Math.random() * 100);
    }

    setInterval(function() {
      data.shift();
      data.push({ width: randomValue(), color: randomValue() });
      render(data);
    }, 1500);
    render(data);
  };

  const runBindFunc = () => {
    var data = [];

    var datum = function(x) {
      return 15 + x * x;
    };

    var newData = function() {
      data.push(datum);
      return data;
    };

    function render() {
      var divs = d3
        .select("#bindFunc")
        .selectAll("div")
        .data(newData);
      divs
        .enter()
        .append("div")
        .append("span");
      divs
        .attr("class", "v-bar")
        .style("height", function(d, i) {
          return d(i) + "px";
        })
        .select("span")
        .text(function(d, i) {
          return d(i);
        });
      divs.exit().remove();
    }

    setInterval(function() {
      render();
    }, 1000);
    render();
  };

  const runArrayOpe = () => {
    var array = [3, 2, 11, 7, 6, 4, 10, 8, 15];

    var box = d3.select("#array-operation");
    box.select("#min span").text(d3.min(array));
    box.select("#max span").text(d3.max(array));
    box.select("#extent span").text(d3.extent(array));
    box.select("#sum span").text(d3.sum(array));
    box.select("#median span").text(d3.median(array));
    box.select("#mean span").text(d3.mean(array));
    box
      .select("#quantile span")
      .text(d3.quantile(array.sort(d3.ascending), 0.25));
    box.select("#deviation span").text(d3.deviation(array));
    box.select("#asc span").text(array.sort(d3.ascending));
    box.select("#desc span").text(array.sort(d3.descending));
    box.select("#bisect span").text(d3.bisect(array.sort(d3.ascending), 6));
  };
  return (
    <>
      <h1>第三章 与数据同行</h1>
      <Row gutter={24}>
        <Col span={6}>
          <h2>绑定数据</h2>
          <Button type="primary" onClick={runBindData}>
            运行示列
          </Button>
          <div id="bindData"></div>
          <br></br>
          <h2>绑定对象数据</h2>
          <Button type="primary" onClick={runBindObj}>
            运行示列
          </Button>
          <div id="bindObj"></div>
          <br></br>
          <h2>绑定函数</h2>
          <Button type="primary" onClick={runBindFunc}>
            运行示列
          </Button>
          <div id="bindFunc"></div>
        </Col>
        <Col span={6}>
          <h2>数组操作</h2>
          <p>数组：</p>
          <p>[3,2,11,7,6,4,10,8,15]</p>
          <Button type="primary" onClick={runArrayOpe}>
            运行示列
          </Button>
          <div id="array-operation">
            <p id="min">
              最小值：<span></span>
            </p>
            <p id="max">
              最大值：<span></span>
            </p>
            <p id="extent">
              最小值和最小值：<span></span>
            </p>
            <p id="sum">
              和：<span></span>
            </p>
            <p id="median">
              中位数：<span></span>
            </p>
            <p id="mean">
              平均值：<span></span>
            </p>
            <p id="quantile">
              分位数：<span></span>
            </p>
            <p id="deviation">
              偏差：<span></span>
            </p>
            <p id="asc">
              升序：<span></span>
            </p>
            <p id="desc">
              降序：<span></span>
            </p>
            <p id="bisect">
              二等分：<span></span>
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Part;
