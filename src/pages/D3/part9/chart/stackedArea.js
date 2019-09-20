import * as d3 from "d3";

const stackArea = () => {
  const _chart = {};

  let _svg,
    _bodyG,
    _selector,
    _width = 900,
    _height = 450,
    _data,
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

      _chart.renderBodyClip();
    }

    return _chart;
  };

  _chart.renderAxes = () => {
    const axesG = _svg.append("g").attr("class", "axes");

    const xAxis = d3.axisBottom().scale(_xScale.range([0, quadrantWidth()]));
    const yAxis = d3.axisLeft().scale(_yScale.range([quadrantHeight(), 0]));

    axesG
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(${xStart()},${yStart()})`)
      .call(xAxis);

    axesG
      .selectAll("g.x-axis g.tick")
      .append("line")
      .classed("grid-line", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", -quadrantHeight());

    axesG
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${xStart()},${yEnd()})`)
      .call(yAxis);

    axesG
      .selectAll("g.y-axis g.tick")
      .append("line")
      .classed("grid-line", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", quadrantWidth())
      .attr("y2", 0);

    return _chart;
  };

  _chart.renderBodyClip = () => {
    const padding = 5;

    _svg
      .append("defs")
      .append("clipPath")
      .attr("id", "body-clip")
      .append("rect")
      .attr("x", 0 - padding)
      .attr("y", 0)
      .attr("width", quadrantWidth() + 2 * padding)
      .attr("height", quadrantHeight());
  };

  _chart.renderBody = () => {
    if (!_bodyG) {
      _bodyG = _svg
        .append("g")
        .attr("class", "body")
        .attr("transform", `translate(${xStart()},${yEnd()})`)
        .attr("clip-path", "url(#body-clip)");
      //  dd
    }
  };

  const xStart = () => {
    return _margin.left;
  };

  const xEnd = () => {
    return _height - _margin.right;
  };

  const yStart = () => {
    return _height - _margin.bottom;
  };

  const yEnd = () => {
    return _margin.top;
  };

  const quadrantWidth = () => {
    return _width - _margin.left - _margin.right;
  };

  const quadrantHeight = () => {
    return _height - _margin.top - _margin.bottom;
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

  _chart.margin = m => {
    if (m === undefined) {
      return _margin;
    }
    _margin = m;
    return _chart;
  };

  _chart.colors = c => {
    if (c === undefined) {
      return _colors;
    }
    _colors = c;
    return _chart;
  };

  _chart.xScale = x => {
    if (x === undefined) {
      return _xScale;
    }
    _xScale = x;

    return _chart;
  };

  _chart.yScale = y => {
    if (y === undefined) {
      return _yScale;
    }
    _yScale = y;

    return _chart;
  };

  _chart.data = data => {
    if (data === undefined) {
      return _data;
    }
    _data = data;
    return _chart;
  };

  return _chart;
};

export default stackArea;
