import React from "react";
import { Tabs } from "antd";

import LineChart from "./LineChart";
import AreaChart from "./AreaChart";
import NewAreaChart from "./NewAreaChart";
import ScatterplotChart from "./ScatterplotChart";
import BubbleChart from "./BubbleChart";
const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="4">
      <TabPane tab="创建线图" key="1">
        <LineChart></LineChart>
      </TabPane>
      <TabPane tab="创建面积图" key="2">
        <NewAreaChart></NewAreaChart>
      </TabPane>
      <TabPane tab="创建散点图" key="3">
        <ScatterplotChart></ScatterplotChart>
      </TabPane>
      <TabPane tab="创建气泡图" key="4">
        <BubbleChart></BubbleChart>
      </TabPane>
      <TabPane tab="创建条形图" key="5">
        创建条形图
      </TabPane>
    </Tabs>
  );
};

export default Part;
