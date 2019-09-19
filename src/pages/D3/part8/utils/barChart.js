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
    if (!_svg) {
      _svg = d3
        .select(_selector)
        .append("svg")
        .attr("height", _height)
        .attr("width", _width);

      _chart.renderAxes().renderBodyClip();
    }
    _chart.renderBody();
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

    g.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${_margin},0)`)
      .call(yAxis);

    return _chart;
  };

  _chart.renderBodyClip = () => {
    const padding = 0;
    _svg
      .append("defs")
      .append("clipPath")
      .attr("id", "body-clip")
      .append("rect")
      .attr("x", _margin - padding)
      .attr("y", _margin - padding)
      .attr("width", _width - 2 * (_margin - padding))
      .attr("height", _height - 2 * (_margin - padding));
    return _chart;
  };

  _chart.renderBody = () => {
    if (!_bodyG) {
      _bodyG = _svg
        .append("g")
        .attr("class", "body")
        // .attr("transform", `translate(${_margin},0)`)
        .attr("clip-path", "url(#body-clip)");
    }
    _chart.data().renderBars();
    return _chart;
  };

  _chart.data = data => {
    if (!data) {
      data = randomData();
    }
    _data = data;
    return _chart;
  };

  _chart.renderBars = () => {
    const padding = 2;
    var bars = _bodyG.selectAll("rect.bar").data(_data);
    const width = Math.floor((_width - 2 * _margin) / _data.length) - padding;
    bars
      .enter()
      .append("rect")
      .merge(bars)
      .attr("class", "bar")
      .transition()
      .attr("x", d => _xScale(d.x) - width / 2)
      .attr("y", d => _yScale(d.y))
      .attr("height", d => _height - _margin - _yScale(d.y))
      .attr("width", width);
    return _chart;
  };

  _chart.update = data => {
    _chart.data(data).renderBars();
  };

  return _chart;
};

const randomData = () => {
  return d3.range(31).map(i => ({
    x: i,
    y: Math.random() * 10
  }));
};

export default barChart;
