import * as d3 from "d3";

const areaChart = () => {
  const _chart = {};
  var _width = 600,
    _height = 300,
    _margins = { top: 30, left: 30, bottom: 30, right: 30 },
    _x,
    _y,
    _data = [],
    _colors = d3.scaleOrdinal(d3.schemeCategory10),
    _svg,
    _bodyG,
    _dom,
    _line;

  _chart.render = () => {
    if (!_svg) {
      if (_dom) {
        _svg = d3
          .select(_dom)
          .append("svg")
          .attr("height", _height)
          .attr("width", _width);
      }
    }
  };
};

export default areaChart;
