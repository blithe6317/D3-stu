import React from "react";
import { Tabs } from "antd";

import Mouse from "./Mouse";
import Touch from "./Touch";
import Zoom from "./Zoom";
import Drag from "./Drag";

import style from "./style.scss";

const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="4">
      <TabPane tab="鼠标交互" key="1">
        <Mouse></Mouse>
      </TabPane>
      <TabPane tab="多点触摸设备交互" key="2">
        <Touch></Touch>
      </TabPane>
      <TabPane tab="缩放和平移的行为实现" key="3">
        <Zoom></Zoom>
      </TabPane>
      <TabPane tab="拖拽行为的实现" key="4">
        <Drag></Drag>
      </TabPane>
    </Tabs>
  );
};

export default Part;
