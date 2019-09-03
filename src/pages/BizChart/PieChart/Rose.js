import React from "react";
import { Chart, Geom, Axis, Shape, Tooltip, Legend, Coord } from "bizcharts";

const RoseChart = () => {
  const data1 = [
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
  const itemLegendTpl = (value, color, checked, index) => {
    const item = data1[index];
    return `<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" data-index={index} style="cursor: pointer;font-size: 14px;">
    <i class="g2-legend-marker" style="background-color: {color};"></i>
    <span class="g2-legend-text">${item.year}</span>
    <span class="g2-legend-text" style="padding-left:20px;">${
      item.population
    }</span>
    </li>`;
  };

  const itemTooltipTpl = `<li data-index={index}>
    <span style="background-color:{color};width:16px;height:16px;border-radius:3px;display:inline-block;margin-right:8px;"></span>
    <span style="line-height:16px;">{name}: {value}</span>
  </li>`;

  return (
    <Chart height={400} data={data1} padding="auto" forceFit>
      <Coord type="polar" radius={1} innerRadius={0.2} />
      <Tooltip itemTpl={itemTooltipTpl} />
      <Legend
        position="right"
        offsetY={-20}
        offsetX={-120}
        itemTpl={itemLegendTpl}
        useHtml
        g2-legend-marker={{
          width: "16px",
          height: "16px",
          borderRadius: "3px"
        }}
        g2-legend-text={{
          lineHeight: "16px"
        }}
      />
      <Geom
        type="interval"
        color="year"
        position="year*population"
        style={{
          lineWidth: 1,
          stroke: "#fff"
        }}
      />
    </Chart>
  );
};

export default RoseChart;
