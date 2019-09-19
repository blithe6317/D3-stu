import * as d3 from "d3";

const stackArea = () => {
  const _chart = {};

  let _svg,
    _bodyG,
    _selector,
    _width = 900,
    _height = 450,
    _margin = { top: 30, left: 30, right: 30, bottom: 30 },
    _colors = d3.scaleOrdinal(d3.schemeCategory10),
    _xScale,
    _yScale,
    _line;

  _chart.renderTo = selector => {
    if (selector) {
      _selector = selector;
    }

    if (!_svg) {
      _svg = d3.select(_selector).append("svg");
    }

    _svg.attr("width", _width).attr("height", _height);

    return _chart;
  };

  _chart.width = w => {
    if (w === undefined) {
      return _width;
    }
    _width = w;
    return _chart;
  };

  _chart.height = h => {
    if (h === undefined) {
      return _height;
    }
    _height = h;
    return _chart;
  };

  return _chart;
};

export default stackArea;
