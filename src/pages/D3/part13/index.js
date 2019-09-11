import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Part = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Jasmine测试环境" key="1">
        Jasmine测试环境
      </TabPane>
      <TabPane tab="测试-创建图表" key="2">
        测试-创建图表
      </TabPane>
      <TabPane tab="测试-SVG渲染" key="3">
        测试-SVG渲染
      </TabPane>
      <TabPane tab="测试-精确渲染" key="4">
        测试-精确渲染
      </TabPane>
    </Tabs>
  );
};

export default Part;
