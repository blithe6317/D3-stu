import * as d3 from "d3";

const areaChart = () => {
  const _chart = {};
  let _svg,
    _height = 400,
    _width = 800,
    margin = 25,
    _xScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([margin, _width - margin]),
    _yScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([_height - margin, margin]);

  _chart.renderTo = selector => {
    _svg = d3
      .select(selector)
      .append("svg")
      .attr("height", _height)
      .attr("width", _width);

    _chart.renderAxes().renderClipBody();
    return _chart;
  };

  _chart.renderClipBody = () => {
    // svg
    // .append("defs")
    // .append("clipPath")
    // .attr("id", "body-clip")
    // .append("rect")
    // .attr("x", 0 - padding)
    // .attr("y", 0)
    // .attr("width", quadrantWidth() + 2 * padding)
    // .attr("height", quadrantHeight());
    _svg
      .append("defs")
      .append("clipPath")
      .attr("id", "body-clip")
      .append("rect")
      .attr("x", margin)
      .attr("y", margin)
      .attr("width", _width - 2 * margin)
      .attr("height", _height - 2 * margin);

    return _chart;
  };

  _chart.height = h => {
    if (h !== undefined) {
      _height = h;
      return _chart;
    }
    return _height;
  };

  _chart.width = w => {
    if (w !== undefined) {
      _width = w;
      return _chart;
    }
    return _width;
  };

  _chart.renderAxes = () => {
    const xAxis = d3.axisBottom().scale(_xScale);
    const yAxis = d3.axisLeft().scale(_yScale);

    const g = _svg.append("g").attr("class", "axes");

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + (_height - margin) + ")")
      .call(xAxis);

    g.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + margin + ",0)")
      .call(yAxis);

    return _chart;
  };

  _chart.renderDots = () => {};

  return _chart;
};

export default areaChart;
