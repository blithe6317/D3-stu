import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="美国地图的投影" key="1">
        美国地图的投影
      </TabPane>
      <TabPane tab="等值区域图的构建" key="2">
        等值区域图的构建
      </TabPane>
    </Tabs>
  );
};

export default Part;
