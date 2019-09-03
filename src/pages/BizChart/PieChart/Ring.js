import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Shape,
  Tooltip,
  Legend,
  Coord,
  Guide
} from "bizcharts";
import DataSet from "@antv/data-set";
const { Html } = Guide;

const Ring = props => {
  const { DataView } = DataSet;
  const data = [
    { year: "2001", population: 41.8 },
    { year: "2002", population: 38 },
    { year: "2003", population: 33.7 },
    { year: "2004", population: 30.7 },
    { year: "2005", population: 25.8 },
    { year: "2006", population: 31.7 },
    { year: "2007", population: 33 },
    { year: "2008", population: 46 },
    { year: "2009", population: 38.3 },
    { year: "2010", population: 28 },
    { year: "2011", population: 42.5 },
    { year: "2012", population: 10.3 }
  ];
  const dv = new DataView();
  dv.source(data).transform({
    type: "percent",
    field: "population",
    dimension: "year",
    as: "percent"
  });

  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + "%";
        return val;
      }
    }
  };

  return (
    <Chart height={400} data={dv} scale={cols} forceFit>
      <Coord type="theta" radius={0.75} innerRadius={0.6} />
      <Axis name="percent" />
      <Legend position="right" offsetY={0} offsetX={-200} />
      <Tooltip
        showTitle={false}
        itemTpl="<li><span style='background-coor:{color}' class='g2-tooltip-marker'></span>{name}:{value}</li>"
      />
      <Guide>
        <Html
          position={["50%", "100%"]}
          html='<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">200</span>台</div>'
          alignX="middle"
          alignY="middle"
        />
      </Guide>
      <Geom
        type="intervalStack"
        position="percent"
        color="year"
        tooltip={[
          "year*percent",
          (year, percent) => {
            percent = percent * 100 + "%";
            return {
              name: year,
              value: percent
            };
          }
        ]}
        style={{
          lineWidth: 1,
          stroke: "#fff"
        }}
      />
    </Chart>
  );
};

export default Ring;
