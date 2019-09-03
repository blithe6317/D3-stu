import React from "react";
import { Button, Row, Col } from "antd";
import * as d3 from "d3";

import styles from "./style.scss";

const Part = () => {
  const run1 = () => {
    d3.select("p#target1").text("Hello World!");
  };

  const run2 = () => {
    // 添加属性/获取属性
    d3.select("p#target2").attr("foo", "goo");
    d3.select("p#target2").attr("foo");
  };

  const run3 = () => {
    // 对class的操作

    // 返回选中元素是否包含class
    d3.select("p#target3").classed("goo");
    // 向元素添加class
    d3.select("p#target3").classed("goo", true);
    // 删除元素的class，第二个参数可以是一个function
    d3.select("p#target3").classed("goo", function() {
      return false;
    });
  };

  const run4 = () => {
    // 对文字的操作
    // 获取元素文字内容
    d3.select("p#target4").text();
    // 设置元素文字
    d3.select("p#target4").text("Hello");
    d3.select("p#target4").text(function() {
      return new Date();
    });
  };

  const run5 = () => {
    // 对样式的操作
    // 获取元素的font-size
    d3.select("p#target5").style("font-size");
    // 给元素指定font-size
    d3.select("p#target5").style("font-size", "10px");
    // 给元素指定font-size ，第二个参数可以是function
    d3.select("p#target5").style("font-size", function() {
      return parseInt(d3.select(this).style("font-size") + 10 + "px");
    });
  };

  const run6 = () => {
    // 对元素内的html操作
    // 获取元素html
    d3.select("p#target6").html();
    // 设置元素的html
    d3.select("p#target6").html("<b>Hello</b>");
  };

  const runMult1 = () => {
    const divBox = d3.select(".mult1");
    divBox.selectAll("div").attr("class", "red-box");
  };

  const runMult2 = () => {
    const divBox = d3.select(".mult2");
    divBox
      .selectAll("div")
      .attr("class", "red-box")
      .each(function(d, i) {
        d3.select(this)
          .append("p")
          .text(i);
      });
  };

  const runChildSelect1 = () => {
    const divBox = d3.select(".child-select");
    divBox.select("#section1 > div").attr("class", "blue-box");
    divBox
      .select("#section2")
      .select("div")
      .attr("class", "red-box");
  };

  const runChildSelect2 = () => {
    const divBox = d3.select(".child-select2");
    divBox
      .append("section")
      .attr("id", "section-2")
      .append("div")
      .attr("class", "blue-box")
      .append("p")
      .text("dynamic blue box");
    divBox
      .append("section")
      .attr("id", "section-3")
      .append("div")
      .attr("class", "red-box")
      .append("p")
      .text("dynamic red box");
  };

  const runChapter = () => {
    var trSelection = d3.selectAll("tr");
    var headerElement = trSelection.nodes()[0];
    d3.select(headerElement).attr("class", "table-header");

    var rows = trSelection.nodes();
    d3.select(rows[1]).attr("class", "table-row-odd");
    d3.select(rows[2]).attr("class", "table-row-even");
    d3.select(rows[3]).attr("class", "table-row-odd");
  };
  return (
    <>
      <h1>第二章</h1>
      <br />
      <Row gutter={24}>
        <Col span={4}>
          <h2>开始编程</h2>
          <Button type="primary" onClick={run1}>
            运行示例 1
          </Button>
          <p id="target1" />
          <br />

          <h3>属性操作符</h3>
          <Button type="primary" onClick={run2}>
            运行示例 2
          </Button>
          <p id="target2" />
          <br />

          <h3>class操作符</h3>
          <Button type="primary" onClick={run3}>
            运行示例 3
          </Button>
          <p id="target3" />
          <br />

          <h3>text操作符</h3>
          <Button type="primary" onClick={run4}>
            运行示例 4
          </Button>
          <p id="target4" />
          <br />

          <h3>style操作符</h3>
          <Button type="primary" onClick={run5}>
            运行示例 5
          </Button>
          <p id="target5">这里是内容5</p>
          <br />

          <h3>html操作符</h3>
          <Button type="primary" onClick={run6}>
            运行示例 6
          </Button>
          <p id="target6">这里是内容6</p>
          <br />
        </Col>
        <Col span={4}>
          <h2>元素多选</h2>
          <Button type="primary" onClick={runMult1}>
            运行多选示例 1
          </Button>
          <div class="mult mult1">
            <div className="box" />
            <div className="box" />
            <div className="box" />
          </div>
          <br />
          <Button type="primary" onClick={runMult2}>
            运行多选示例 2
          </Button>
          <div class="mult mult2">
            <div className="box" />
            <div className="box" />
            <div className="box" />
          </div>
          <br />
        </Col>
        <Col span={4}>
          <h2>子选择器</h2>
          <Button type="primary" onClick={runChildSelect1}>
            运行子选择器示例 1
          </Button>
          <div className="child-select mult">
            <section id="section1">
              <div>
                <p>blue-box</p>
              </div>
            </section>
            <section id="section2">
              <div>
                <p>red-box</p>
              </div>
            </section>
          </div>
          <br />
        </Col>
        <Col span={4}>
          <h2>动态元素</h2>
          <Button type="primary" onClick={runChildSelect2}>
            运行动态元素示例 1
          </Button>
          <div className="child-select2 mult" />
          <br />
        </Col>
        <Col span={4}>
          <h2>原始选集</h2>
          <Button type="primary" onClick={runChapter}>
            运行原始选集示例 1
          </Button>
          <div className="chapter mult">
            <table className="table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10:22</td>
                  <td>Purchase</td>
                  <td>$10.00</td>
                </tr>
                <tr>
                  <td>12:12</td>
                  <td>Purchase</td>
                  <td>$12.50</td>
                </tr>
                <tr>
                  <td>14:11</td>
                  <td>Expense</td>
                  <td>$9.70</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
        </Col>
      </Row>
    </>
  );
};

export default Part;
