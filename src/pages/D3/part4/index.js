import React from "react";
import { Tabs } from "antd";
import * as d3 from "d3";

import ContinuousScale from "./ContinuousScale";
import TimeScale from "./TimeScale";
import OrderScale from "./OrderScale";
import StringInterpolation from "./StringInterpolation";
import ColorInterpolation from "./ColorInterpolation";
import ObjectInterpolation from "./ObjectInterpolation";

import styles from "./style.scss";

const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="6">
      <TabPane tab="连续尺度" key="1">
        <ContinuousScale></ContinuousScale>
      </TabPane>
      <TabPane tab="时间尺度" key="2">
        <TimeScale></TimeScale>
      </TabPane>
      <TabPane tab="有序尺度" key="3">
        <OrderScale></OrderScale>
      </TabPane>
      <TabPane tab="字符串插值" key="4">
        <StringInterpolation></StringInterpolation>
      </TabPane>
      <TabPane tab="颜色插值" key="5">
        <ColorInterpolation></ColorInterpolation>
      </TabPane>
      <TabPane tab="复合对象插值" key="6">
        <ObjectInterpolation></ObjectInterpolation>
      </TabPane>
    </Tabs>
  );
};

export default Part;
