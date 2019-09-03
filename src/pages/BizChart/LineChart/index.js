import React from "react";
import { Row, Col, Card } from "antd";
import { Chart, Geom, Axis, Shape, Tooltip, Legend } from "bizcharts";
import DataSet from "@antv/data-set";

const LineChart = () => {
  Shape.registerShape("interval", "triangle", {
    getPoints(cfg) {
      const { x, y, y0, size } = cfg;
      return [{ x: x - size / 2, y: y0 }, { x, y }, { x: x + size / 2, y: y0 }];
    },
    draw(cfg, container) {
      const points = this.parsePoints(cfg.points);
      const polygon = container.addShape("polygon", {
        attrs: {
          points: [
            [points[0].x, points[0].y],
            [points[1].x, points[1].y],
            [points[2].x, points[2].y]
          ],
          fill: cfg.color
        }
      });
      return polygon;
    }
  });
  const data = [
    { genre: "Sports", sold: 275 },
    { genre: "Strategy", sold: 115 },
    { genre: "Action", sold: 120 },
    { genre: "Shooter", sold: 350 },
    { genre: "Other", sold: 150 }
  ];
  const ShapeChart = () => (
    <Chart height={400} data={data} forceFit padding={[10, 100, 20, 30]}>
      <Axis name="genre" />
      <Axis name="sold" />
      <Geom
        type="interval"
        position="genre*sold"
        color="genre"
        shape="triangle"
      />
    </Chart>
  );

  const data1 = [0, 3, 5, 9, 8, 6, 4, 3, 8, 15].map((i, index) => ({
    year: (2000 + index).toString(),
    value: i
  }));
  const cols1 = {
    value: {
      min: 0
    },
    year: {
      rang: [0, 1]
    }
  };
  const Chart1 = () => (
    <Chart
      height={400}
      data={data1}
      scale={cols1}
      forceFit
      padding={[10, 100, 30, 30]}
    >
      <Axis name="year" />
      <Axis name="value" />
      <Tooltip crosshairs />
      <Geom type="line" size={2} position="year*value" />
      <Geom
        type="point"
        position="year*value"
        size={4}
        shape={"circle "}
        style={{ stroke: "#fff", lineWidth: 1 }}
      />
      <Geom type="area" position="year*value" color="value" />
    </Chart>
  );
  const data2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => ({
    month: i + "月",
    value1: (i * i) / 2,
    value2: i + i
  }));

  const ds2 = new DataSet();
  const dv2 = ds2.createView().source(data2);
  dv2.transform({
    type: "fold",
    fields: ["value1", "value2"],
    key: "city",
    value: "value"
  });
  console.log(dv2);
  const cols2 = {
    month: {
      range: [0, 1]
    }
  };
  const Chart2 = () => (
    <Chart
      height={400}
      data={dv2}
      scale={cols2}
      forceFit
      padding={[10, 100, 60, 30]}
    >
      <Axis name="month" />
      <Axis name="value" label={{ formatter: val => `${val}°` }} />
      <Tooltip crosshairs={{ type: "y" }} />
      <Legend />
      <Geom
        type="line"
        position="month*value"
        size={2}
        color={"city"}
        shape={"smooth"}
      />
      <Geom
        type="point"
        position="month*value"
        size={4}
        color={"city"}
        shape={"circle"}
        style={{ stroke: "#fff", lineWidth: 1 }}
      />
      <Geom type="area" position="month*value" color="city" shape="smooth" />
    </Chart>
  );

  const data3 = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ].map((i, index) => ({
    year: 2000 + i,
    value1: Math.random() * 100,
    value2: (Math.random() / 2) * 100
  }));
  const ds3 = new DataSet();
  const dv3 = ds3.createView().source(data3);

  dv3.transform({
    type: "fold",
    fields: ["value1", "value2"],
    key: "type",
    value: "value"
  });
  const cols3 = {
    value: {
      ailas: "the ..val",
      formatter: val => `${val} ‰`
    },
    year: { range: [0, 1] }
  };
  const Chart3 = () => (
    <Chart
      data={dv3}
      height={400}
      forceFit
      padding={[10, 100, 70, 50]}
      scale={cols3}
    >
      <Axis />
      <Tooltip crosshairs />
      <Legend />
      <Geom type="area" position="year*value" color="type" shape="smooth" />
      <Geom
        type="line"
        position="year*value"
        color="type"
        shape="smooth"
        size={2}
      />
    </Chart>
  );
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Shape 示例">
            <ShapeChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="基础线图">
            <Chart1 />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="双曲线">
            <Chart2 />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="区域图">
            <Chart3 />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LineChart;
