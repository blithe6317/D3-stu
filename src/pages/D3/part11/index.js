import React from "react";
import { Tabs } from "antd";

import GravityAndCharge from "./GravityAndCharge";
import Velocity from "./Velocity";
import LinkConstraint from "./LinkConstraint";
import ArbitraryVisualization from "./ArbitraryVisualization";

import style from "./style.scss";

const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="4">
      <TabPane tab="使用引力和相互作用力" key="1">
        <GravityAndCharge></GravityAndCharge>
      </TabPane>
      <TabPane tab="自定义速度" key="2">
        <Velocity></Velocity>
      </TabPane>
      <TabPane tab="设置连接约束" key="3">
        <LinkConstraint></LinkConstraint>
      </TabPane>
      <TabPane tab="借助力来辅助可视化" key="4">
        <ArbitraryVisualization></ArbitraryVisualization>
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
