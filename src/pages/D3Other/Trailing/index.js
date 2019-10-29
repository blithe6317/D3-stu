import React, { useEffect } from "react";
import * as d3 from "d3";

import trailChart from "./trailing";
import style from "./style.scss";

const Trailing = () => {
  useEffect(() => {
    const chart = trailChart();

    const data = [
      [{ x: 0, y: 5 }, { x: 9, y: 2 }],
      [{ x: 8, y: 4 }, { x: 7, y: 3 }],
      [{ x: 0, y: 4 }, { x: 9, y: 3 }],
      [{ x: 5, y: 4 }, { x: 7, y: 8 }],
      [{ x: 8, y: 4 }, { x: 7, y: 0 }]
    ];
    chart.data(data).render("#trailing");
  }, []);

  return (
    <>
      <div id="trailing"></div>
    </>
  );
};

export default Trailing;
