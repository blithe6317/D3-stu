import React from "react";
import { Chart, Geom, Axis, Shape, Tooltip, Legend, Coord } from "bizcharts";

const RoseRing = props => {
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
    { year: "2012", population: 30.3 }
  ];

  return (
    <Chart height={400} data={data} forceFit>
      <Coord type="polar" innerRadius={0.2} />
      <Tooltip />
      <Legend position="right" offsetX={-160} offsetY={20} />
      <Geom
        type="interval"
        color="year"
        position="year*population"
        style={{ lineWidth: 1, stroke: "#fff" }}
      />
    </Chart>
  );
};

export default RoseRing;
