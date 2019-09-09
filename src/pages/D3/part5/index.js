import React from "react";
import { Tabs } from "antd";
import * as d3 from "d3";

import AxisBasic from "./AxisBasic";

import styles from "./style.scss";

const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="坐标轴基础" key="1">
        <AxisBasic></AxisBasic>
      </TabPane>
      <TabPane tab="自定义刻度" key="2">
        自定义刻度
      </TabPane>
      <TabPane tab="绘制表格线" key="3">
        绘制表格线
      </TabPane>
      <TabPane tab="动态调节坐标轴刻度" key="4">
        动态调节坐标轴刻度
      </TabPane>
    </Tabs>
  );
};

export default Part;
