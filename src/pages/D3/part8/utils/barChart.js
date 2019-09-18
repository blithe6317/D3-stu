import * as d3 from "d3";

const barChart = () => {
  const _chart = {};

  let _width = 600,
    _height = 250,
    _margin = 25,
    _selector,
    _svg,
    _bodyG,
    _data,
    _color = d3.scaleLinear(d3.schemeCategory10),
    _xScale = d3
      .scaleLinear()
      .domain([-1, 32])
      .range([_margin, _width - _margin]),
    _yScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([_height - _margin, _margin]);

  _chart.renderTo = selector => {
    if (selector) {
      _selector = selector;
    }
    if (_svg) {
      _svg = d3
        .select(selector)
        .append("svg")
        .attr("height", _height)
        .attr("width", _width);

      _chart.renderAxes();
    }
    return _chart;
  };

  _chart.renderAxes = () => {
    const g = _svg.append("g").attr("class", "axes");

    const xAxis = d3.axisBottom().scale(_xScale);
    const yAxis = d3.axisLeft().scale(_yScale);

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${_height - _margin})`)
      .call(xAxis);

    return _chart;
  };

  return _chart;
};

export default barChart;
