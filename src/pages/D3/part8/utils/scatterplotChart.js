import * as d3 from "d3";

const scatterChart = () => {
  const _chart = {};

  let _width = 500,
    _height = 500,
    _margin = 25,
    _svg,
    _selector,
    _data,
    _xScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([_margin, _width - _margin]),
    _yScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([_height - _margin, _margin]),
    _bodyG,
    _symbolTyps = d3
      .scaleOrdinal()
      .range([
        d3.symbolCircle,
        d3.symbolCross,
        d3.symbolDiamond,
        d3.symbolSquare,
        d3.symbolStar,
        d3.symbolTriangle,
        d3.symbolWye
      ]);

  _chart.renderTo = selector => {
    if (selector) {
      _selector = selector;
    }

    if (!_svg) {
      _svg = d3
        .select(selector)
        .append("svg")
        .attr("height", _height)
        .attr("width", _width);

      _chart.renderAxes().renderBodyClip();
    }

    return _chart;
  };

  _chart.data = data => {
    _data = data;
    return _chart;
  };

  _chart.renderAxes = () => {
    const xAxis = d3.axisBottom().scale(_xScale);
    const yAxis = d3.axisLeft().scale(_yScale);

    const g = _svg.append("g").attr("class", "axes");

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + (_height - _margin) + ")")
      .call(xAxis);

    g.select("g.x-axis")
      .selectAll("g.tick")
      .each(function(i) {
        if (i !== 0) {
          d3.select(this)
            .append("line")
            .attr("class", "grid-line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -(_height - 2 * _margin));
        }
      });

    g.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + _margin + ",0)")
      .call(yAxis);

    g.select("g.y-axis")
      .selectAll("g.tick")
      .each(function(i) {
        if (i !== 0) {
          d3.select(this)
            .append("line")
            .attr("class", "grid-line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", _width - 2 * _margin)
            .attr("y2", 0);
        }
      });
    return _chart;
  };

  _chart.renderBodyClip = () => {
    var padding = 5;
    _svg
      .append("defs")
      .append("clipPath")
      .attr("id", "clip-body")
      .append("rect")
      .attr("x", _margin - padding)
      .attr("y", _margin - padding)
      .attr("width", _width - 2 * (_margin - padding))
      .attr("height", _height - 2 * (_margin - padding));
    _chart.renderBody();
    return _chart;
  };

  _chart.renderBody = () => {
    if (!_bodyG) {
      _bodyG = _svg
        .append("g")
        .attr("class", "body")
        .attr("transform", "translate(0,0)")
        .attr("clip-path", "url(#clip-body)");
    }
    _chart.data(randomData()).renderSymbols();

    return _chart;
  };

  _chart.renderSymbols = () => {
    _data.forEach((list, i) => {
      var symbols = _bodyG.selectAll("path._" + i).data(list);

      symbols
        .enter()
        .append("path")
        .merge(symbols)
        .attr("class", "_" + i)
        .classed(_symbolTyps(i), true)
        .transition()
        .attr("transform", d => `translate(${_xScale(d.x)},${_yScale(d.y)})`)
        .attr("d", d3.symbol().type(_symbolTyps(i)));
    });
    return _chart;
  };

  _chart.update = () => {
    _chart.data(randomData()).renderSymbols();
    return _chart;
  };
  return _chart;
};

const randomData = () => {
  return d3.range(4).map(i => {
    return d3.range(11).map(i => ({
      x: i,
      y: Math.random() * 10
    }));
  });
};

export default scatterChart;
