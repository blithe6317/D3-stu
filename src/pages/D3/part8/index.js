import React from "react";
import { Tabs } from "antd";

import LineChart from "./LineChart";
const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="创建线图" key="1">
        <LineChart></LineChart>
      </TabPane>
      <TabPane tab="创建面积图" key="2">
        创建面积图
      </TabPane>
      <TabPane tab="创建散点图" key="3">
        创建散点图
      </TabPane>
      <TabPane tab="创建气泡图" key="4">
        创建气泡图
      </TabPane>
      <TabPane tab="创建条形图" key="5">
        创建条形图
      </TabPane>
    </Tabs>
  );
};

export default Part;
