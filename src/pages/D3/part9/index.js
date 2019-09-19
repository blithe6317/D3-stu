import React from "react";
import { Tabs } from "antd";

import PieChart from "./PieChart";
import StackedAreaChart from "./StackedAreaChart";
const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="2">
      <TabPane tab="创建饼图" key="1">
        <PieChart></PieChart>
      </TabPane>
      <TabPane tab="创建堆叠面积图" key="2">
        <StackedAreaChart></StackedAreaChart>
      </TabPane>
      <TabPane tab="创建矩形树状图图" key="3">
        创建矩形树状图图
      </TabPane>
      <TabPane tab="创建树" key="4">
        创建树
      </TabPane>
      <TabPane tab="创建封闭图" key="5">
        创建封闭图
      </TabPane>
    </Tabs>
  );
};

export default Part;
