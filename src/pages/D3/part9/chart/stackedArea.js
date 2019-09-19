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
      _svg = d3
        .select(_selector)
        .append("svg")
        .attr("width", _width)
        .attr("height", _height);

      _chart.renderAxes();
    }

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

  _chart.renderAxes = () => {
    const g = _svg.append("g").attr("class", "axes");

    _xScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([xStart(), xEnd()]);
    _yScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([yEnd(), yStart()]);

    const xAxis = d3.axisBottom().scale(_xScale);
    const yAxis = d3.axisLeft().scale(_yScale);

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${xEnd()})`)
      .call(xAxis);

    g.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${xStart()},0)`)
      .call(yAxis);

    return _chart;
  };

  const xStart = () => {
    return _margin.left;
  };

  const xEnd = () => {
    return _height - _margin.left;
  };

  const yStart = () => {
    return _margin.top;
  };

  const yEnd = () => {
    return _height - _margin.bottom;
  };

  return _chart;
};

export default stackArea;
