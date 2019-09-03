import React from "react";
import { Row, Col, Card } from "antd";
import { Chart, Geom, Axis, Shape, Tooltip, Legend, Coord } from "bizcharts";
import DataSet from "@antv/data-set";

import RoseChart from "./Rose";
import RoseRing from "./RoseRing";
import Ring from "./Ring";

const PieChart = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="南丁格尔玫瑰彩图">
            <RoseChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="南丁格尔玫瑰环图">
            <RoseRing />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="基础环图">
            <Ring />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="区域图" />
        </Col>
      </Row>
    </div>
  );
};

export default PieChart;
