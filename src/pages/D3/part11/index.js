import React from "react";
import { Tabs } from "antd";

import GravityAndCharge from "./GravityAndCharge";

const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="使用引力和相互作用力" key="1">
        <GravityAndCharge></GravityAndCharge>
      </TabPane>
      <TabPane tab="自定义速度" key="2">
        自定义速度
      </TabPane>
      <TabPane tab="设置连接约束" key="3">
        设置连接约束
      </TabPane>
      <TabPane tab="借助力来辅助可视化" key="4">
        借助力来辅助可视化
      </TabPane>
      <TabPane tab="操作“力”" key="5">
        操作“力”
      </TabPane>
      <TabPane tab="绘制力导向图" key="6">
        绘制力导向图
      </TabPane>
    </Tabs>
  );
};

export default Part;
