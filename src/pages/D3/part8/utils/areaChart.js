import * as d3 from "d3";

const areaChart = () => {
  const _chart = {};
  let _svg,
    _height = 400,
    _width = 800,
    margin = 25,
    _bodyG,
    _data,
    _selector,
    _xScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([margin, _width - margin]),
    _yScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([_height - margin, margin]),
    _color = d3.scaleOrdinal(d3.schemeCategory10),
    _line = d3
      .line()
      .x(d => _xScale(d.x))
      .y(d => _yScale(d.y)),
    _area = d3
      .area()
      .x(d => _xScale(d.x))
      .y0(_yScale(0))
      .y1(d => _yScale(d.y));

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
      _chart
        .renderAxes()
        .renderClipBody()
        .renderBody();
    }

    _chart
      .data(randomData())

      .renderDots()
      .renderLine()
      .renderArea();

    return _chart;
  };

  _chart.renderClipBody = () => {
    _svg
      .append("defs")
      .append("clipPath")
      .attr("id", "body-clip")
      .append("rect")
      .attr("x", margin - 5)
      .attr("y", margin - 5)
      .attr("width", _width - 2 * margin + 10)
      .attr("height", _height - 2 * margin + 10);

    return _chart;
  };

  _chart.renderBody = () => {
    if (!_bodyG) {
      _bodyG = _svg
        .append("g")
        .attr("class", "body")
        .attr("transform", "translate(0,0)")
        .attr("clip-path", "url(#body-clip)");
    }
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

  _chart.data = data => {
    if (data !== undefined) {
      _data = data;
      return _chart;
    }
    return _data;
  };

  _chart.renderDots = () => {
    if (_data && _data.length > 0) {
      _data.forEach((item, i) => {
        const dots = _bodyG.selectAll("circle.dot_" + i).data(item);
        dots
          .enter()
          .append("circle")
          .merge(dots)
          .attr("class", "dot_" + i)
          .style("stroke", _color(i))
          .transition()
          .attr("cx", d => _xScale(d.x))
          .attr("cy", d => _yScale(d.y))
          .attr("r", 4);
      });
    }
    return _chart;
  };

  _chart.renderLine = () => {
    const linePath = _bodyG.selectAll("path.line").data(_data);
    linePath
      .enter()
      .append("path")
      .merge(linePath)
      .attr("class", "line")
      .style("stroke", (d, i) => _color(i))
      .transition()
      .attr("d", d => _line(d));
    return _chart;
  };

  _chart.renderArea = () => {
    const areaPath = _bodyG.selectAll("path.area").data(_data);

    areaPath
      .enter()
      .append("path")
      .merge(areaPath)
      .attr("class", "area")
      .style("fill", (d, i) => _color(i))
      .transition()
      .attr("d", d => _area(d));
    return _chart;
  };

  _chart.update = data => {
    if (!data) {
      data = randomData();
    }

    _chart.renderTo();
    return _chart;
  };
  return _chart;
};

const randomData = () => {
  return d3.range(2).map(i => {
    return d3.range(11).map(i => ({
      x: i,
      y: Math.random() * 10
    }));
  });
};

export default areaChart;
