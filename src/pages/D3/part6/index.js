import React from "react";
import { Tabs } from "antd";

import SingleElementAnimation from "./SingleElementAnimation";
import MultiElementAnimation from "./MultiElementAnimation";
import RetardationFunction from "./RetardationFunction";
import InbeTween from "./InbeTween";
import CascadeTransition from "./CascadeTransition";
import SelectiveTransition from "./SelectiveTransition";
import TransitionEvent from "./TransitionEvent";
import Interval from "./Interval";

const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="7">
      <TabPane tab="单元素动画" key="1">
        <SingleElementAnimation></SingleElementAnimation>
      </TabPane>
      <TabPane tab="多元素动画" key="2">
        <MultiElementAnimation></MultiElementAnimation>
      </TabPane>
      <TabPane tab="缓动函数" key="3">
        <RetardationFunction></RetardationFunction>
      </TabPane>
      <TabPane tab="中间帧计算" key="4">
        <InbeTween></InbeTween>
      </TabPane>
      <TabPane tab="级联过渡" key="5">
        <CascadeTransition></CascadeTransition>
      </TabPane>
      <TabPane tab="选择性过渡" key="6">
        <SelectiveTransition></SelectiveTransition>
      </TabPane>
      <TabPane tab="过渡事件" key="7">
        <TransitionEvent></TransitionEvent>
      </TabPane>
      <TabPane tab="定时器" key="8">
        <Interval></Interval>
      </TabPane>
    </Tabs>
  );
};

export default Part;
