import * as d3 from "d3";

const lineChart = () => {
  const _chart = {};

  var _width = 600,
    _height = 300,
    _margins = { top: 30, left: 30, right: 30, bottom: 30 },
    _x,
    _y,
    _data = [],
    _colors = d3.scaleOrdinal(d3.schemeCategory10),
    _svg,
    _bodyG,
    _line,
    _dom;

  _chart.setDom = dom => {
    _dom = dom;
    return _chart;
  };

  _chart.render = () => {
    if (!_svg) {
      if (!_dom) {
        throw "先设置元素";
      }
      _svg = d3
        .select(_dom)
        .append("svg")
        .attr("width", _width)
        .attr("height", _height);

      renderAxes(_svg);
      defineBodyClip(_svg);
    }
    renderBody(_svg);
  };

  const renderAxes = svg => {
    var axesG = svg.append("g").attr("class", "axes");

    renderXAxis(axesG);
    renderYAxis(axesG);
  };

  const renderXAxis = axesG => {
    var xAxis = d3.axisBottom().scale(_x.range([0, quadrantWidth()]));

    axesG
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + xStart() + "," + yStart() + ")")
      .call(xAxis);
    d3.selectAll("g.axis g.tick")
      .append("line")
      .classed("grid-line", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", -quadrantHeight());
  };

  const renderYAxis = axesG => {
    var yAxis = d3.axisLeft().scale(_y.range([quadrantHeight(), 0]));

    axesG
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + xStart() + "," + yEnd() + ")")
      .call(yAxis);

    d3.selectAll("g.axis g.tick")
      .append("line")
      .classed("grid-line", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", quadrantWidth())
      .attr("y2", 0);
  };

  const defineBodyClip = svg => {
    var padding = 5;
    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "body-clip")
      .append("rect")
      .attr("x", 0 - padding)
      .attr("y", 0)
      .attr("width", quadrantWidth() + 2 * padding)
      .attr("height", quadrantHeight());
  };

  const renderBody = svg => {
    if (!_bodyG) {
      _bodyG = svg
        .append("g")
        .attr("class", "body")
        .attr("transform", "translate(" + xStart() + "," + yEnd() + ")")
        .attr("clip-path", "url(#body-clip)");
    }

    renderLines();
    renderDots();
  };

  const renderLines = () => {
    _line = d3
      .line()
      .x(d => _x(d.x))
      .y(d => _y(d.y));

    var pathLines = _bodyG.selectAll("path.line").data(_data);

    pathLines
      .enter()
      .append("path")
      .merge(pathLines)
      .style("stroke", (d, i) => _colors(i))
      .attr("class", "line")
      .transition()
      .attr("d", d => _line(d));
  };

  const renderDots = () => {
    _data.forEach((list, i) => {
      var circle = _bodyG.selectAll("circle._" + i).data(list);

      circle
        .enter()
        .append("circle")
        .merge(circle)
        .attr("class", "dot _" + i)
        .style("stroke", () => _colors(i))
        .transition()
        .attr("cx", d => _x(d.x))
        .attr("cy", d => _y(d.y))
        .attr("r", 4);
    });
  };

  const xStart = () => {
    return _margins.left;
  };

  const xEnd = () => {
    return _width - _margins.right;
  };

  const yStart = () => {
    return _height - _margins.bottom;
  };

  const yEnd = () => {
    return _margins.top;
  };

  const quadrantWidth = () => {
    return _width - _margins.left - _margins.right;
  };

  const quadrantHeight = () => {
    return _height - _margins.top - _margins.bottom;
  };

  _chart.width = function(w) {
    if (!arguments.length) return _width;
    _width = w;
    return _chart;
  };

  _chart.height = function(h) {
    if (!arguments.length) return _height;
    _height = h;
    return _chart;
  };

  _chart._margins = function(m) {
    if (!arguments.length) return _margins;
    _margins = m;
    return _chart;
  };

  _chart.colors = function(c) {
    if (!arguments.length) return _colors;
    _colors = c;
    return _chart;
  };

  _chart.x = function(x) {
    if (!arguments.length) return _x;
    _x = x;
    return _chart;
  };

  _chart.y = function(y) {
    if (!arguments.length) return _y;
    _y = y;
    return _chart;
  };

  _chart.addSerise = series => {
    _data.push(series);
    return _chart;
  };

  _chart.init = dom => {
    _chart
      .x(d3.scaleLinear().domain([0, 10]))
      .y(d3.scaleLinear().domain([0, 10]));

    _chart.setDom(dom).update();
    return _chart;
  };

  _chart.update = () => {
    _data = [];
    const data = genData();
    data.forEach(series => _chart.addSerise(series));
    _chart.render();
    return _chart;
  };

  return _chart;
};

const randomData = () => {
  return Math.random() * 9;
};

const numberOfSeries = 2;
const numberOfDataPoint = 11;

const genData = () => {
  let data = [];
  for (var i = 0; i < numberOfSeries; i++) {
    data.push(
      d3.range(numberOfDataPoint).map(i => {
        return { x: i, y: randomData() };
      })
    );
  }
  return data;
};

export default lineChart;
