import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="鼠标交互" key="1">
        鼠标交互
      </TabPane>
      <TabPane tab="多点触摸设备交互" key="2">
        多点触摸设备交互
      </TabPane>
      <TabPane tab="缩放和平移的行为实现" key="3">
        缩放和平移的行为实现
      </TabPane>
      <TabPane tab="拖拽行为的实现" key="4">
        拖拽行为的实现
      </TabPane>
    </Tabs>
  );
};

export default Part;
