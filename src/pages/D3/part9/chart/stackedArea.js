import * as d3 from "d3";
import renderEmpty from "antd/lib/config-provider/renderEmpty";

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

      renderAxes();

      renderBodyClip();
    }
    if (_data) {
      renderBody();
    }
    return _chart;
  };

  const renderAxes = () => {
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

  const renderBodyClip = () => {
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

  const renderBody = () => {
    if (!_bodyG) {
      _bodyG = _svg
        .append("g")
        .attr("class", "body")
        .attr("transform", `translate(${xStart()},${yEnd()})`)
        .attr("clip-path", "url(#body-clip)");
    }

    const stack = d3
      .stack()
      .keys(["value1", "value2", "value3"])
      .offset(d3.stackOffsetNone);

    var series = stack(_data);

    renderLines(series);
    renderArea(series);
  };

  const renderLines = series => {
    _line = d3
      .line()
      .x((d, i) => _xScale(i))
      .y((d, i) => _yScale(d[1]));

    const linePath = _bodyG.selectAll("path.line").data(series);

    linePath
      .enter()
      .append("path")
      .merge(linePath)
      .style("stroke", (d, i) => _colors(i))
      .attr("class", "line")
      .transition()
      .attr("d", d => _line(d));
  };

  const renderArea = series => {
    var area = d3
      .area()
      .x((d, i) => _xScale(i))
      .y0(d => _yScale(d[0]))
      .y1(d => _yScale(d[1]));

    const areaPath = _bodyG.selectAll("path.area").data(series);

    areaPath
      .enter()
      .append("path")
      .merge(areaPath)
      .style("fill", (d, i) => _colors(i))
      .attr("class", "area")
      .transition()
      .attr("d", d => area(d));
  };

  _chart.update = data => {
    if (!data) {
      data = randomData();
    }
    _chart.data(data).renderTo();
    return _chart;
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

const randomData = () => {
  return d3.range(51).map(i => ({
    value1: Math.random() * 9,
    value2: Math.random() * 9,
    value3: Math.random() * 9
  }));
};

export default stackArea;
