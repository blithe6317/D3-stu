import * as d3 from "d3";

const bubbleChart = () => {
  const _chart = {};

  let _selector,
    _width = 800,
    _height = 600,
    _margin = 25,
    _svg,
    _bodyG,
    _data,
    _color = d3.scaleOrdinal(d3.schemeCategory10),
    _xScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([_margin, _width - _margin]),
    _yScale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([_height - _margin, _margin]),
    _r = d3
      .scalePow()
      .exponent(2)
      .domain([0, 10]);

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

      _chart.renderBodyClip().renderAxes();
    }
  };

  _chart.renderAxes = () => {
    const g = _svg.append("g").attr("class", "axes");

    const xAxis = d3.axisBottom().scale(_xScale);
    const yAxis = d3.axisLeft().scale(_yScale);

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${_height - _margin})`)
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
      .attr("transform", `translate(${_margin},0)`)
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

    _chart.renderBody();
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
    _chart.data(randomData()).renderBubble();
    return _chart;
  };

  _chart.data = data => {
    _data = data;
    return _chart;
  };

  _chart.renderBubble = () => {
    _r.range([0, 50]);

    _data.forEach((list, i) => {
      var bubbles = _bodyG.selectAll("circle._" + i).data(list);

      bubbles
        .enter()
        .append("circle")
        .merge(bubbles)
        .attr("class", "_" + i)
        .style("stroke", (d, j) => _color(j))
        .style("fill", (d, j) => _color(j))
        .transition()
        .attr("cx", d => _xScale(d.x))
        .attr("cy", d => _yScale(d.y))
        .attr("r", d => _r(d.r));
    });
    return _chart;
  };

  _chart.update = data => {
    if (!data) {
      data = randomData();
    }
    _chart.data(randomData()).renderBubble();
    return _chart;
  };

  return _chart;
};

const randomData = () => {
  return d3.range(2).map(i => {
    return d3.range(11).map(i => ({
      x: Math.random() * 10,
      y: Math.random() * 10,
      r: Math.floor(Math.random() * 10)
    }));
  });
};

export default bubbleChart;
