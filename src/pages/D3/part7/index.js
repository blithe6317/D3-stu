import React from "react";
import { Tabs } from "antd";

import ArcGenerator from "./ArcGenerator";
import ArcTransition from "./ArcTransition";
import AreaGenerator from "./AreaGenerator";
import Curve from "./Curve";
import CurveSection from "./CurveSection";
import LineGenerator from "./LineGenerator";
import LineTension from "./LineTension";
import SimpleShape from "./SimpleShape";

const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="7">
      <TabPane tab="简单形状" key="1">
        <SimpleShape></SimpleShape>
      </TabPane>
      <TabPane tab="线条生成器" key="2">
        <LineGenerator></LineGenerator>
      </TabPane>
      <TabPane tab="曲线" key="3">
        <Curve></Curve>
      </TabPane>
      <TabPane tab="线的张力" key="4">
        <LineTension></LineTension>
      </TabPane>
      <TabPane tab="区域生成器" key="5">
        <AreaGenerator></AreaGenerator>
      </TabPane>
      <TabPane tab="断面曲线" key="6">
        <CurveSection></CurveSection>
      </TabPane>
      <TabPane tab="圆弧生成器" key="7">
        <ArcGenerator></ArcGenerator>
      </TabPane>
      <TabPane tab="圆弧过渡" key="8">
        <ArcTransition></ArcTransition>
      </TabPane>
    </Tabs>
  );
};

export default Part;
