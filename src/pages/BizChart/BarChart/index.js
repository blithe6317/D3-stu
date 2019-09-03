import React from "react";
import { Row, Col, Card } from "antd";
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from "bizcharts";
import DataSet from "@antv/data-set";

const BarChart = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const data1 = arr.map((item, index) => ({
    year: 1993 + index + "年",
    age: index + 1
  }));
  const cols = {
    sales: {
      tickInterval: 20,
      alias: "age"
    }
  };
  const Chart1 = () => (
    <Chart
      height={400}
      width={500}
      data={data1}
      scale={cols}
      forceFit
      padding={[10, 100, 40, 20]}
    >
      <Axis name="year" />
      <Axis name="age" title="岁" />
      <Tooltip
        crosshairs={{
          type: "y"
        }}
      />
      <Geom type="interval" position="year*age" />
    </Chart>
  );
  const data2 = [
    {
      name: "类别一",
      rang: [50, 90]
    },
    {
      name: "类别二",
      rang: [0, 80]
    },
    {
      name: "类别三",
      rang: [10, 90]
    },
    {
      name: "类别四",
      rang: [20, 160]
    },
    {
      name: "类别五",
      rang: [55, 20]
    },
    {
      name: "类别六",
      rang: [60, 90]
    },
    {
      name: "类别七",
      rang: [10, 30]
    },
    {
      name: "类别八",
      rang: [20, 40]
    },
    {
      name: "类别九",
      rang: [40, 150]
    }
  ];
  const Chart2 = () => (
    <Chart height={400} data={data2} forceFit padding={[10, 100, 20, 30]}>
      <Axis name="year" />
      <Axis name="rang" />
      <Tooltip />
      <Geom type="interval" position="name*rang" />
    </Chart>
  );

  const data3 = [
    {
      name: "中国",
      value: 300000
    },
    {
      name: "欧盟",
      value: 200000
    },
    {
      name: "俄罗斯",
      value: 100000
    }
  ];

  const ds = new DataSet();
  const dv = ds.createView().source(data3);
  dv.transform({
    type: "sort",
    callback(a, b) {
      return a.value - b.value > 0;
    }
  });
  const Chart3 = () => (
    <Chart height={400} data={data3} forceFit padding={[10, 120, 20, 60]}>
      <Coord transpose />
      <Axis name="name" />
      <Axis name="value" />
      <Tooltip />
      <Geom type="interval" position="name*value" />
    </Chart>
  );
  const data4 = [
    {
      name: "肉类",
      value1: 30,
      value2: 35,
      value3: 25,
      value4: 55
    },
    {
      name: "蔬菜",
      value1: 40,
      value2: 38,
      value3: 50,
      value4: 51
    },
    {
      name: "主食",
      value1: 32,
      value2: 45,
      value3: 66,
      value4: 44
    }
  ];

  const ds4 = new DataSet();
  const dv4 = ds4.createView().source(data4);
  dv4.transform({
    type: "fold",
    fields: ["value1", "value2", "value3", "value4"],
    key: "type",
    value: "value"
  });
  const Chart4 = () => (
    <Chart height={400} data={dv4} forceFit>
      <Legend />
      <Coord transpose scale={[1, -1]} />
      <Axis name="name" label={{ offset: 12 }} />
      <Axis name="value" position={"right"} />
      <Tooltip />
      <Geom
        type="interval"
        position="name*value"
        color={"type"}
        adjust={[{ type: "dodge", marginRatio: 1 / 32 }]}
      />
    </Chart>
  );
  const data5 = [
    {
      name: "中国",
      肉类: 50,
      蛋类: 56,
      蔬菜: 70,
      水果: 99,
      大米: 150
    },
    {
      name: "美国",
      肉类: 30,
      蛋类: 20,
      蔬菜: 25,
      水果: 60,
      大米: 10
    }
  ];
  const ds5 = new DataSet();
  const dv5 = ds5.createView().source(data5);
  dv5.transform({
    type: "fold",
    fields: ["肉类", "蛋类", "蔬菜", "水果", "大米"],
    key: "类别",
    value: "百万吨"
  });
  const Chart5 = () => (
    <Chart height={400} data={dv5} forceFit padding={[10, 150, 60, 20]}>
      <Axis name="类别" />
      <Axis name="百万吨" />
      <Legend />
      <Tooltip crosshairs={{ type: "y" }} />
      <Geom
        type="interval"
        position="类别*百万吨"
        color="name"
        adjust={{ type: "dodge", marginRatio: 1 / 32 }}
      />
    </Chart>
  );

  let data6 = [];
  for (var i = 0; i < 50; i++) {
    var obj = {
      value: (Math.random() * 100).toFixed(1)
    };
    data6.push(obj);
  }
  const ds6 = new DataSet();
  const dv6 = ds6.createView().source(data6);
  dv6.transform({
    type: "bin.histogram",
    fields: "value",
    binWidth: 2,
    as: ["value", "count"]
  });
  const cols6 = {
    value: { nice: false, min: 0, tickInterval: 1 },
    count: {
      max: 5
    }
  };
  const Chart6 = () => (
    <Chart
      height={400}
      data={dv6}
      scale={cols6}
      forceFit
      padding={[10, 110, 20, 30]}
    >
      <Axis
        name="value"
        label={{
          formatter: val => {
            if (val % 5 === 0) {
              return val;
            }
            return "";
          }
        }}
      />
      <Axis name="count" />
      <Tooltip inPlot={false} crosshairs={false} position={"top"} />
      <Geom type="interval" position="value*count" />
    </Chart>
  );

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="基础柱状图">
            <Chart1 />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="区间柱状图">
            <Chart2 />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "15px" }}>
        <Col span={12}>
          <Card title="基础条形图">
            <Chart3 />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="分组条形图">
            <Chart4 />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "15px" }}>
        <Col span={12}>
          <Card title="分组柱状图">
            <Chart5 />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="直方图">
            <Chart6 />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BarChart;
