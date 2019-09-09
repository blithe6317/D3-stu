import React from "react";
import { Tabs } from "antd";

import AxisBasic from "./AxisBasic";
import CustomTicks from "./CustomTicks";
import TableLine from "./TableLine";
import DynamicAxis from "./DynamicAxis";

import styles from "./style.scss";

const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="4">
      <TabPane tab="坐标轴基础" key="1">
        <AxisBasic></AxisBasic>
      </TabPane>
      <TabPane tab="自定义刻度" key="2">
        <CustomTicks></CustomTicks>
      </TabPane>
      <TabPane tab="绘制表格线" key="3">
        <TableLine></TableLine>
      </TabPane>
      <TabPane tab="动态调节坐标轴刻度" key="4">
        <DynamicAxis></DynamicAxis>
      </TabPane>
    </Tabs>
  );
};

export default Part;
